/**
 * aadyosh - Google Sheets receiver
 *
 * Paste this whole file into a new Apps Script project (script.google.com),
 * then Deploy > New deployment > type "Web app":
 *     Execute as: Me        Who has access: Anyone
 * Copy the Web app URL into backend/data/sheets_webhook.txt (or the
 * SHEETS_WEBHOOK_URL environment variable) and restart the backend.
 *
 * Every request must carry SECRET, so the URL alone cannot write to your sheets.
 * Columns are matched by header name, so you may reorder/add columns freely.
 */
const SECRET = 'PASTE_YOUR_SHARED_SECRET_HERE';
const SHEETS = {
  'leads': 'PASTE_SHEET_ID_HERE',            // aadyosh - Roadmap Leads
  'support': 'PASTE_SHEET_ID_HERE',          // aadyosh - Support Tickets
  'ambassador': 'PASTE_SHEET_ID_HERE',       // aadyosh - Campus Ambassador Applications
  'delete-request': 'PASTE_SHEET_ID_HERE',   // aadyosh - Account Deletion Requests
  'mentor-request': 'PASTE_SHEET_ID_HERE',   // aadyosh - Mentor Requests
};

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return reply({ ok: false, error: 'bad json' }); }
  if (!body || body.secret !== SECRET) return reply({ ok: false, error: 'unauthorized' });
  if (body.form === 'ping') return reply({ ok: true, ping: true });   // used by: python backend/server.py --connect <url>
  const sheetId = SHEETS[body.form];
  if (!sheetId || !body.row) return reply({ ok: false, error: 'unknown form' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const idCol = headers.indexOf('id') + 1;
    if (idCol && sheet.getLastRow() > 1) {          // retries must not create duplicates
      const ids = sheet.getRange(2, idCol, sheet.getLastRow() - 1, 1).getValues().map(r => String(r[0]));
      if (ids.indexOf(String(body.row.id)) !== -1) return reply({ ok: true, duplicate: true });
    }
    const values = headers.map(h => (body.row[h] === null || body.row[h] === undefined) ? '' : String(body.row[h]));
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length);
    range.setNumberFormat('@');                       // plain text: no formula/number coercion
    range.setValues([values]);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return reply({ ok: true, service: 'aadyosh-sheets' }); }

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}