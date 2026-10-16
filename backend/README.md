# aadyosh backend

One Python file, standard library only (Python 3.9+, no `pip install`). It serves the
static site from `../aadyosh` **and** the API, so the forms work same-origin.

```
python backend/server.py                          # http://127.0.0.1:5173
PORT=8080 HOST=0.0.0.0 python backend/server.py   # custom port / expose on network
```

## What is stored (SQLite, `backend/data/aadyosh.db`)

| Form (page)                         | Endpoint                   | Table                     |
| ----------------------------------- | -------------------------- | ------------------------- |
| Roadmap popup (index)               | `POST /api/leads`          | `leads`                   |
| Submit a request (support)          | `POST /api/support`        | `support_tickets`         |
| Become a Campus Captain (ambassador)| `POST /api/ambassador`     | `ambassador_applications` |
| Request deletion (delete-account)   | `POST /api/delete-request` | `deletion_requests`       |

Every row also gets `status` (default `new`), `created_at` (UTC) and `source` (page it came from).
Front-end glue is `aadyosh/assets/js/api.js`.

## Google Sheets

Each form has its own Sheet in the Drive folder "aadyosh - form responses" (Roadmap Leads,
Support Tickets, Campus Ambassador Applications, Account Deletion Requests). The database
stays the source of truth; every new row is also pushed to its Sheet in the background, and
anything that fails (offline, not set up yet) is retried automatically (`synced` column).

One-time setup (the backend cannot write to your Google account by itself):

1. Open <https://script.google.com>, create a project, paste in `backend/google-apps-script.gs`.
2. Deploy > New deployment > Web app > Execute as **Me**, access **Anyone** > copy the URL.
3. Google asks you to authorise the script the first time (it needs access to your Sheets) - click
   through "Advanced > Go to ... (unsafe)"; that warning appears for every personal script.
4. Connect it - this pings the script, and only saves the URL if it answers correctly:

   ```
   python backend/server.py --connect https://script.google.com/macros/s/XXXX/exec
   ```

   A running server picks the URL up within a minute (no restart) and copies any rows already
   stored to their Sheets. If you later edit the script, use Deploy > Manage deployments >
   Edit > New version; the `/exec` URL stays the same.

The script only accepts requests carrying the secret in `backend/data/sheets_secret.txt`
(paste it into the `SECRET` line of the `.gs` file, together with the four Sheet IDs, before deploying - the file in git
only holds `PASTE_...` placeholders; a filled-in copy lives in the git-ignored `backend/data/`), ignores duplicates,
and matches columns by header name.

## Reading submissions

Token: the `ADMIN_TOKEN` env var, otherwise the random one in `backend/data/admin_token.txt`.

```
curl -H "Authorization: Bearer <token>" http://127.0.0.1:5173/api/admin/summary
curl -H "Authorization: Bearer <token>" http://127.0.0.1:5173/api/admin/leads
curl -H "Authorization: Bearer <token>" "http://127.0.0.1:5173/api/admin/leads?format=csv" -o leads.csv
```

Tables: `leads`, `support`, `ambassador`, `delete-request`. Optional `?limit=` (max 1000).

## Built-in protections

Server-side validation (10-digit Indian mobile, email, allowed graduation years), JSON-only
POSTs, 32 KB body cap, 8 submissions/minute/IP, hidden honeypot field, parameterised SQL,
constant-time token check, CSV formula-injection guard, and the DB lives outside the web root.

## Not included yet

Sign In (the header button is still a placeholder), sending email/WhatsApp notifications,
and an admin web page. `deletion_requests` only records the request; the actual deletion is
a manual step for now.

## Going live

Run it behind HTTPS (nginx/Caddy or a host that terminates TLS). Behind a proxy every visitor
shares the proxy's IP, so the rate limiter should be switched to read `X-Forwarded-For`
before deploying. Keep `backend/data/` out of version control and back it up.
