import crypto from 'crypto';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const DEFAULT_SPREADSHEET_ID = '1S-ZvDpj2LSc6-z4Cs35PDzDDmsj-Ht_txQCOCOMeubs';
const DEFAULT_SHEET_NAME = 'Website Cms';

export const LEAD_SHEET_HEADERS = [
  'ID',
  'Name',
  'Phone',
  'Email',
  'Service',
  'Source Form',
  'Status',
  'Message',
  'Date',
];

let cachedAccessToken = null;
let accessTokenExpiresAt = 0;
let sheetOperationQueue = Promise.resolve();

function normalizePrivateKey(value = '') {
  let key = String(value).trim();
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n');
}

function getConfig() {
  const clientEmail = String(process.env.GOOGLE_SHEETS_CLIENT_EMAIL || '').trim();
  const base64Key = String(process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64 || '').trim();
  const privateKey = base64Key
    ? Buffer.from(base64Key, 'base64').toString('utf8')
    : normalizePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY);

  return {
    clientEmail,
    privateKey,
    spreadsheetId: String(
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID
    ).trim(),
    sheetName: String(process.env.GOOGLE_SHEETS_SHEET_NAME || DEFAULT_SHEET_NAME).trim(),
  };
}

export function isGoogleSheetsSyncConfigured() {
  const { clientEmail, privateKey, spreadsheetId, sheetName } = getConfig();
  return Boolean(clientEmail && privateKey && spreadsheetId && sheetName);
}

function encodeJwtPart(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < accessTokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const { clientEmail, privateKey } = getConfig();
  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets service account credentials are not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = encodeJwtPart({ alg: 'RS256', typ: 'JWT' });
  const claim = encodeJwtPart({
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  });
  const unsignedJwt = `${header}.${claim}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedJwt)
    .end()
    .sign(privateKey, 'base64url');

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsignedJwt}.${signature}`,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    throw new Error(`Google OAuth failed (${response.status}): ${payload.error_description || payload.error || 'unknown error'}`);
  }

  cachedAccessToken = payload.access_token;
  accessTokenExpiresAt = Date.now() + Number(payload.expires_in || 3600) * 1000;
  return cachedAccessToken;
}

async function sheetsRequest(path, options = {}) {
  const token = await getAccessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(20_000),
  });

  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text };
  }

  if (!response.ok) {
    const detail = payload?.error?.message || payload.raw || response.statusText;
    throw new Error(`Google Sheets API failed (${response.status}): ${detail}`);
  }
  return payload;
}

function a1Range(sheetName, cells) {
  const escapedName = sheetName.replace(/'/g, "''");
  return `'${escapedName}'!${cells}`;
}

function valuesPath(spreadsheetId, range) {
  return `spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
}

async function getValues(range) {
  const { spreadsheetId } = getConfig();
  return sheetsRequest(
    `${valuesPath(spreadsheetId, range)}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`
  );
}

async function putValues(range, values) {
  const { spreadsheetId } = getConfig();
  return sheetsRequest(`${valuesPath(spreadsheetId, range)}?valueInputOption=RAW`, {
    method: 'PUT',
    body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
  });
}

async function ensureLeadHeaders() {
  const { sheetName } = getConfig();
  const headerRange = a1Range(sheetName, 'A1:I1');
  const payload = await getValues(headerRange);
  const currentHeaders = payload.values?.[0] || [];

  if (currentHeaders.length === 0) {
    await putValues(headerRange, [LEAD_SHEET_HEADERS]);
    return;
  }

  const matches = LEAD_SHEET_HEADERS.every(
    (header, index) => String(currentHeaders[index] ?? '').trim() === header
  );
  if (!matches) {
    throw new Error(
      `The Google Sheet header does not match the CMS lead columns. Expected: ${LEAD_SHEET_HEADERS.join(', ')}`
    );
  }
}

function leadRow(lead) {
  return [
    lead.id,
    lead.name || '',
    lead.phone || '',
    lead.email || '',
    lead.service || '',
    lead.sourceForm || 'Website Form',
    lead.status || 'New',
    lead.message || '',
    lead.createdAt instanceof Date
      ? lead.createdAt.toISOString()
      : new Date(lead.createdAt).toISOString(),
  ];
}

async function upsertLead(lead) {
  const { spreadsheetId, sheetName } = getConfig();
  await ensureLeadHeaders();

  const idRange = a1Range(sheetName, 'A2:A');
  const idPayload = await getValues(idRange);
  const ids = idPayload.values || [];
  const existingIndex = ids.findIndex(row => String(row?.[0] ?? '') === String(lead.id));
  const row = leadRow(lead);

  if (existingIndex >= 0) {
    const rowNumber = existingIndex + 2;
    const range = a1Range(sheetName, `A${rowNumber}:I${rowNumber}`);
    await putValues(range, [row]);
    return { action: 'updated', rowNumber };
  }

  const appendRange = a1Range(sheetName, 'A:I');
  const result = await sheetsRequest(
    `${valuesPath(spreadsheetId, appendRange)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      body: JSON.stringify({ range: appendRange, majorDimension: 'ROWS', values: [row] }),
    }
  );

  return { action: 'appended', updatedRange: result?.updates?.updatedRange || null };
}

export function syncLeadToGoogleSheet(lead) {
  const operation = sheetOperationQueue.then(() => upsertLead(lead));
  sheetOperationQueue = operation.catch(() => undefined);
  return operation;
}
