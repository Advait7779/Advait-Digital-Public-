import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const script = fs.readFileSync(path.join(here, 'googleAppsScriptWebhook.gs'), 'utf8');
const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Source Form', 'Status', 'Message', 'Date'];

function setup(rows, secrets = { CRM_READ_SECRET: 'a'.repeat(40), WEBHOOK_SECRET: 'write-secret' }) {
  let sheetReads = 0;
  let lockCalls = 0;
  const context = {
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput(content) { return { content, setMimeType() { return this; } }; }
    },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => secrets[key] }) },
    LockService: { getScriptLock: () => ({ waitLock() { lockCalls += 1; }, hasLock() { return lockCalls > 0; }, releaseLock() {} }) },
    SpreadsheetApp: { openById: () => ({
      getSheetByName: () => ({
        getLastRow: () => rows.length,
        getRange(row, col, count, width) {
          sheetReads += 1;
          assert.equal(col, 1);
          assert.equal(width, headers.length);
          return { getDisplayValues: () => rows.slice(row - 1, row - 1 + count) };
        }
      })
    }) }
  };
  vm.runInNewContext(script, context);
  return {
    call(payload) { return JSON.parse(context.doPost({ postData: { contents: JSON.stringify(payload) } }).content); },
    get sheetReads() { return sheetReads; },
    get lockCalls() { return lockCalls; }
  };
}

test('CRM read action rejects the website write secret without reading sheet data', () => {
  const app = setup([headers, [43, 'Name', '0900000000', '', 'CCTV', 'Contact', 'New', '', '2026-10-15T05:00:00.000Z']]);
  assert.deepEqual(app.call({ action: 'readLeads', secret: 'write-secret', afterId: 42 }), { success: false, error: 'Unauthorized' });
  assert.equal(app.sheetReads, 0);
  assert.equal(app.lockCalls, 0);
});

test('CRM read action returns only later website leads in ID order', () => {
  const app = setup([
    headers,
    ['44', 'Later', '0900000002', '', 'CCTV', 'Contact', 'New', '', '2026-10-15T05:02:00.000Z'],
    ['42', 'Old', '0900000000', '', 'CCTV', 'Contact', 'New', '', '2026-10-15T05:00:00.000Z'],
    ['43', 'New', '0900000001', '', 'CCTV', 'Contact', 'New', '', '2026-10-15T05:01:00.000Z']
  ]);
  const result = app.call({ action: 'readLeads', secret: 'a'.repeat(40), afterId: 42 });
  assert.equal(result.success, true);
  assert.deepEqual(result.rows.map(row => row[0]), ['43', '44']);
  assert.equal(result.rows[0][2], '0900000001');
  assert.equal(result.hasMore, false);
});

test('CRM read action pages after 250 leads', () => {
  const rows = [headers, ...Array.from({ length: 251 }, (_, index) => [String(index + 43), 'Lead', '0900000000', '', 'CCTV', 'Contact', 'New', '', '2026-10-15T05:00:00.000Z'])];
  const app = setup(rows);
  const first = app.call({ action: 'readLeads', secret: 'a'.repeat(40), afterId: 42 });
  assert.equal(first.rows.length, 250);
  assert.equal(first.hasMore, true);
  const second = app.call({ action: 'readLeads', secret: 'a'.repeat(40), afterId: 292 });
  assert.equal(second.rows.length, 1);
  assert.equal(second.rows[0][0], '293');
  assert.equal(second.hasMore, false);
});
