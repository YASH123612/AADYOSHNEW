# aadyosh

Marketing and enrolment site for a mentor-led, project-based bootcamp, built with **Next.js 16 (App Router), React 19 and TypeScript**.
Forms are API routes that write straight to Google Sheets. Deploys to Vercel.

```
app/            routes (pages + /api/* route handlers), global stylesheet (globals.css)
components/     React components (header, footer, modals, forms, home sections, program page parts)
lib/            data and logic: programs, syllabus, projects, search, next-batch date, form validation
public/assets/  logo and technology icons
docs/           google-apps-script.gs (the Sheets webhook)
tests/          node:test suites for the batch-date rule and the form handler
backend/data/   LEGACY, git-ignored: the old Python server's database and secrets (see HANDOFF.md)
```

## Run locally

```
npm install
npm run dev        # http://localhost:5173
npm test           # 21 checks: next-batch rule, form validation, sheet forwarding
npm run typecheck
npm run build && npm start
```

Forms work locally without any setup: with no Sheets webhook configured, `next dev` appends each submission to
`.data/<form>.jsonl` (git-ignored). In production a missing webhook is reported to the visitor as a failed save.

## Configuration (nothing here is committed; copy `.env.example` to `.env.local`)

| Variable | What it does |
|---|---|
| `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_SECRET` | Google Apps Script web app that appends form rows to Sheets (`docs/google-apps-script.gs`) |
| `BATCH_DAY` / `BATCH_DATE` | optional: monthly batch start day (default 10) / one-off date `YYYY-MM-DD` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk sign-in; defaults to the development key. Never commit the secret key |
| `NEXT_PUBLIC_TAWK_CHAT_LINK` | tawk.to Direct Chat Link; empty = built-in "Ady" demo chat |
| `RATE_LIMIT` | optional: form submissions per minute per IP (default 8) |

See `HANDOFF.md` for status, open to-dos and conventions.
