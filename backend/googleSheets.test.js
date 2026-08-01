import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import test from 'node:test';

test('lead sync appends once and updates the same row on retry', async () => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL = 'sheet-sync@example.iam.gserviceaccount.com';
  process.env.GOOGLE_SHEETS_PRIVATE_KEY = privateKey.export({ type: 'pkcs8', format: 'pem' });
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = 'test-spreadsheet';
  process.env.GOOGLE_SHEETS_SHEET_NAME = 'Website Cms';

  const calls = [];
  let idColumnReadCount = 0;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), method: options.method || 'GET', body: options.body });

    if (String(url).includes('oauth2.googleapis.com/token')) {
      return Response.json({ access_token: 'test-token', expires_in: 3600 });
    }
    if (String(url).includes('A1%3AI1')) {
      return Response.json({ values: [[
        'ID', 'Name', 'Phone', 'Email', 'Service', 'Source Form', 'Status', 'Message', 'Date',
      ]] });
    }
    if (String(url).includes('A2%3AA')) {
      idColumnReadCount += 1;
      return Response.json(idColumnReadCount === 1 ? {} : { values: [[42]] });
    }
    if (String(url).includes(':append')) {
      return Response.json({ updates: { updatedRange: "'Website Cms'!A2:I2" } });
    }
    if ((options.method || 'GET') === 'PUT') {
      return Response.json({ updatedRange: "'Website Cms'!A2:I2" });
    }
    return Response.json({ error: { message: 'Unexpected test request' } }, { status: 500 });
  };

  try {
    const { syncLeadToGoogleSheet } = await import(`./googleSheets.js?test=${Date.now()}`);
    const lead = {
      id: 42,
      name: '=Formula-safe name',
      phone: '+919999999999',
      email: 'lead@example.com',
      service: 'Website Design',
      sourceForm: 'Website Form',
      status: 'New',
      message: 'Please call me',
      createdAt: new Date('2026-08-01T10:00:00.000Z'),
    };

    const first = await syncLeadToGoogleSheet(lead);
    const second = await syncLeadToGoogleSheet({ ...lead, status: 'Contacted' });

    assert.equal(first.action, 'appended');
    assert.equal(second.action, 'updated');
    assert.equal(calls.filter(call => call.url.includes(':append')).length, 1);

    const writes = calls.filter(
      call => call.url.includes('sheets.googleapis.com') && ['POST', 'PUT'].includes(call.method) && call.body
    );
    assert.ok(writes.every(call => call.url.includes('valueInputOption=RAW')));
    assert.ok(writes.some(call => String(call.body).includes('=Formula-safe name')));
    assert.ok(writes.some(call => String(call.body).includes('Contacted')));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
