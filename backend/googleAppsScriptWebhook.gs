const SPREADSHEET_ID = '1S-ZvDpj2LSc6-z4Cs35PDzDDmsj-Ht_txQCOCOMeubs';
const SHEET_NAME = 'Website Cms';
const LEAD_HEADERS = [
  'ID', 'Name', 'Phone', 'Email', 'Service', 'Source Form', 'Status', 'Message', 'Date'
];

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function ensureHeaders_(sheet) {
  const current = sheet.getRange(1, 1, 1, LEAD_HEADERS.length).getDisplayValues()[0];
  const isEmpty = current.every(value => !String(value).trim());
  if (isEmpty) {
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
    return;
  }

  const matches = LEAD_HEADERS.every((header, index) => current[index] === header);
  if (!matches) {
    throw new Error('Sheet headers do not match the CMS lead columns.');
  }
}

function doGet() {
  return jsonResponse_({ success: true, service: 'Advait Digital lead webhook' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse_({ success: false, error: 'Unauthorized' });
    }
    if (payload.id == null || String(payload.id).trim() === '') {
      return jsonResponse_({ success: false, error: 'Lead ID is required' });
    }

    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Target sheet was not found.');
    ensureHeaders_(sheet);

    const lastRow = Math.max(sheet.getLastRow(), 1);
    const ids = lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues().map(row => String(row[0]).trim())
      : [];
    const leadId = String(payload.id).trim();
    const existingIndex = ids.indexOf(leadId);
    const firstBlankIndex = ids.findIndex(id => !id);
    const rowNumber = existingIndex >= 0
      ? existingIndex + 2
      : firstBlankIndex >= 0
        ? firstBlankIndex + 2
        : lastRow + 1;

    const row = [
      leadId,
      safeCell_(payload.name),
      safeCell_(payload.phone),
      safeCell_(payload.email),
      safeCell_(payload.service),
      safeCell_(payload.sourceForm || 'Website Form'),
      safeCell_(payload.status || 'New'),
      safeCell_(payload.message),
      safeCell_(payload.createdAt),
    ];
    sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);

    return jsonResponse_({
      success: true,
      action: existingIndex >= 0 ? 'updated' : 'appended',
      rowNumber,
    });
  } catch (error) {
    return jsonResponse_({ success: false, error: String(error.message || error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
