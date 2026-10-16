# aadyosh – project handoff

Ed-tech / bootcamp marketing site. Plain HTML/CSS/JS (no build step) + a small Python backend
that serves the site and stores form submissions. Layout was inspired by aptisure.com; all copy,
logos and syllabus text are original.

```
aadyosh/    the website (open pages directly, or via the server)
backend/    server.py (stdlib only), README.md, Google Apps Script, tests, data/ (secrets + DB)
.claude/    launch.json (preview config for Claude Code)
```

## Run it

```
python backend/server.py        # -> http://127.0.0.1:5173   (Python 3.9+, nothing to install)
python backend/test_e2e.py      # 33 checks: forms -> DB -> Google Sheets (uses a throwaway DB)
```

## Deploying to Vercel

Vercel has no persistent disk and cannot run `backend/server.py`, so production uses a different path:

- `aadyosh/` is served as the static site (`vercel.json` -> `outputDirectory`).
- `api/*.py` are serverless functions with the same four endpoints as the Python backend
  (`/api/leads`, `/api/support`, `/api/ambassador`, `/api/delete-request`). They validate with the same
  rules and send each submission **straight to the Google Sheets Apps Script** - Google Sheets is the
  datastore in production. There is no SQLite and no `/api/admin/*` there; read submissions in the Sheets.
- Two environment variables must exist in the Vercel project (never commit them):
  `SHEETS_WEBHOOK_URL` (the Apps Script `/exec` URL, = `backend/data/sheets_webhook.txt`) and
  `SHEETS_WEBHOOK_SECRET` (= `backend/data/sheets_secret.txt`).
- `.vercelignore` keeps `backend/` (secrets, DB), `tests/` and `.claude/` out of the upload.
- If Google's script is down, the form shows "couldn't save, try again" (HTTP 502) instead of a fake success.
- Test the functions locally: `python tests/test_vercel_api.py` (27 checks, no network needed).
- Deploy: `vercel` (preview) then `vercel --prod`. Add the Vercel domain to Clerk's allowed origins.
- Local development is unchanged: `python backend/server.py` still works (SQLite + background Sheets sync).

## Status of each integration

| Part | State |
|---|---|
| Forms (roadmap popup, support, campus ambassador, delete account) | Working. Validated server-side, stored in `backend/data/aadyosh.db`. Glue: `aadyosh/assets/js/api.js` |
| Google Sheets | Working. Apps Script deployed, URL in `backend/data/sheets_webhook.txt`. One Sheet per form in the Drive folder "aadyosh - form responses". Failed pushes retry automatically. Script source: `backend/google-apps-script.gs` |
| Clerk sign-in / sign-up | Working with a **development** key (`pk_test_...` in `aadyosh/assets/js/auth.js`). Header Sign In opens a modal; `sign-in.html` shows the inline form |
| tawk.to live chat | **Not connected.** Paste the Direct Chat Link into `CHAT_LINK` in `aadyosh/assets/js/tawk.js`. Until then the built-in "Ady" demo panel is used |
| Admin API | `GET /api/admin/{summary,leads,support,ambassador,delete-request}` with `Authorization: Bearer <backend/data/admin_token.txt>`; add `?format=csv` for a download |

## Open to-dos

- [ ] **Rotate the Clerk secret key** (it was pasted into a chat once). The site does not use it.
- [ ] Delete test rows: Google Sheet "Account Deletion Requests" row 2 ("Policy Test User"), and the
      "TEST popup to Sheets" row in the Roadmap Leads sheet + `leads` table (id 3).
- [ ] Connect tawk.to (see above).
- [ ] Fill every `[bracketed]` placeholder in the policy pages (company name/address, hosting and
      payment providers, retention periods, governing law/city, grievance officer) and have a
      lawyer review them. Same for the footer: company reg. no., GSTIN, phone, office address.
- [ ] Clerk: rename the application from "RoadMap" to "aadyosh", add the production domain and
      switch to a `pk_live_` key before launch (removes the "Development mode" label).
- [ ] Before going live: host behind HTTPS; the rate limiter keys on the client IP, so behind a
      proxy it must read `X-Forwarded-For`. Keep `backend/data/` out of version control.
- [ ] Prices, batch date (10 Oct), seat counts, ratings and the mentor "company" marquee are
      placeholders. Replace with real figures.
- [ ] The syllabus text for the 37 programs (`syllabus-data*.js`) is original draft content; review it.
- [ ] Optional: Sign In currently records nothing on your side (Clerk keeps users). Add a Sheet if wanted.

## Conventions / gotchas

- Every HTML page loads assets with `?v=N` cache-busting (`styles.css` is around v67). When you change
  a CSS/JS file, bump the number in **all** pages together. The preview server does not send
  no-cache headers, so test with a fresh query string (e.g. `page.html?x=1`) or hard refresh.
- `html`/`body` use `overflow-x: clip`, not `hidden`: `hidden` on both breaks the sticky header.
  Grid/flex children need `min-width: 0` (a safety-net rule exists in `styles.css`).
- Copilot: `copilot.html` still exists but is removed from the main nav and the features page.
- Windows PowerShell 5.1: read/write files with .NET `UTF8Encoding($false)` to avoid encoding damage.

## Standing instructions from the owner

- Do **not** change anything on `campus-ambassador.html` (only footer link/cache-version tweaks happened).
- Do not copy aptisure's marketing copy, use real company logos, or claim real affiliation with
  Google/MAANG etc. Mentor logos are labelled placeholders.
- Colour palette: purple / white / black (gradients allowed); the hero keeps its multicolour look.

## Secrets in this folder

`backend/data/` contains `admin_token.txt`, `sheets_secret.txt`, `sheets_webhook.txt` and the database
with real submissions. Do not share or publish that folder.
