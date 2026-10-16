# aadyosh

Marketing and enrolment site for a mentor-led, project-based bootcamp. Plain HTML/CSS/JS (no build step),
a small Python backend for local use, and Vercel serverless functions for production.

```
aadyosh/    the website (static)
api/        Vercel serverless form endpoints (Python) -> Google Sheets
backend/    local server (stdlib only), Google Apps Script, tests
tests/      tests for the Vercel endpoints
```

## Run locally

```
python backend/server.py        # http://127.0.0.1:5173  (Python 3.9+, nothing to install)
python backend/test_e2e.py      # form -> database -> Google Sheets checks
python tests/test_vercel_api.py # the Vercel endpoints
```

## Configuration (none of this is committed)

| What | Where |
|---|---|
| Admin token, DB | `backend/data/` (git-ignored, created on first run) |
| Google Sheets | deploy `backend/google-apps-script.gs` (fill in the `PASTE_...` values), then `python backend/server.py --connect <web-app-url>` |
| Vercel | env vars `SHEETS_WEBHOOK_URL` and `SHEETS_WEBHOOK_SECRET` |
| Clerk (sign-in) | publishable key in `aadyosh/assets/js/auth.js` (public by design; never commit the secret key) |
| tawk.to chat | `CHAT_LINK` in `aadyosh/assets/js/tawk.js` |

See `HANDOFF.md` for status, open to-dos and conventions.
