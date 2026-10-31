# aadyosh – project handoff

Ed-tech / bootcamp marketing site, now a **Next.js 16 + React 19 + TypeScript** app (App Router). It was a plain
HTML/CSS/JS site with a Python backend; the move to Next.js kept every page, section and behaviour (checked page by
page against the old site). Layout was inspired by aptisure.com; all copy, logos and syllabus text are original.

```
app/              routes: pages, /api/[form] and /api/next-batch route handlers, globals.css (the old styles.css, unchanged)
components/       SiteHeader, SiteFooter, ChatWidget, modals/ (roadmap + mentor pop-ups), forms/, home/, program/, pages/, auth/
lib/              programs, program templates, projects, search, batch (next-batch rule), forms (validation + Sheets), clerk, tawk
lib/data/         the editable content: programs.ts, syllabus.ts, project-rows.ts, program-meta.ts
public/assets/    logo + technology icons
docs/             google-apps-script.gs
tests/            node:test suites (npm test)
backend/data/     LEGACY, git-ignored: the old Python server's DB + secrets (see "Secrets")
```

The old static site and Python backend are still in git history on `main` (commit `12f7675`).

## Run it

```
npm install
npm run dev          # http://localhost:5173
npm test             # 21 checks
npm run typecheck
npm run build        # all 51 pages prerender; API routes are dynamic
```

Old `*.html` URLs redirect to the new routes (`/program.html?slug=x` -> `/programs/x`), see `next.config.mjs`.

## Deploying to Vercel

Import the GitHub repo (framework: Next.js is detected). Set these environment variables, then deploy:

- `SHEETS_WEBHOOK_URL` and `SHEETS_WEBHOOK_SECRET` (values: `backend/data/sheets_webhook.txt` and `sheets_secret.txt`)
- optional: `BATCH_DAY`, `BATCH_DATE`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_TAWK_CHAT_LINK`, `RATE_LIMIT`

Vercel has no persistent disk: every valid form submission goes straight to the Google Apps Script, which appends it to
that form's Sheet (Sheets is the datastore). If the script is down the visitor sees "couldn't save, try again" (HTTP 502),
never a fake success. There is no SQLite and no admin API any more; read submissions in the Sheets.
Add the Vercel domain to Clerk's allowed origins.

## Status of each integration

| Part | State |
|---|---|
| Forms (roadmap pop-up, mentor pop-up, support, campus ambassador) | Working. Validated server-side in `lib/forms.ts`, forwarded to Sheets. Without a webhook, `next dev` writes `.data/<form>.jsonl` |
| Google Sheets | Apps Script deployed earlier. **Needs a redeploy** so mentor requests have a sheet: paste `backend/data/google-apps-script.filled.gs` (has the real secret + sheet IDs) and Deploy > Manage deployments > New version |
| Clerk sign-in / sign-up | Working with a **development** key (default in `lib/clerk.ts`). Header Sign In opens a modal; `/sign-in` shows the inline form |
| tawk.to live chat | **Not connected.** Set `NEXT_PUBLIC_TAWK_CHAT_LINK`. Until then the built-in "Ady" demo panel is used |

## Open to-dos

- [ ] **Rotate the Clerk secret key** (it was pasted into a chat once). The site does not use it.
- [ ] Delete test rows: Google Sheet "Account Deletion Requests" row 2 ("Policy Test User"), and the
      "TEST popup to Sheets" row in the Roadmap Leads sheet.
- [ ] Redeploy the Apps Script (above) and set the Vercel env vars.
- [ ] Connect tawk.to.
- [ ] Fill the remaining `[bracketed]` placeholders in the Privacy Policy (grievance officer, hosting/payment
      providers, retention periods) and have a lawyer review all policy pages, including the guaranteed-internship wording.
- [ ] Clerk: rename the application from "RoadMap" to "aadyosh", add the production domain and switch to a `pk_live_`
      key before launch (removes the "Development mode" label).
- [ ] Prices, seat counts, ratings, testimonials and the mentor "company" marquee are placeholders. Replace with real data.
- [ ] The syllabus text for the 35 programs (`lib/data/syllabus.ts`) is original draft content; review it.
- [ ] Optional: Sign In records nothing on your side (Clerk keeps users). Add a Sheet if wanted.

## Content you can edit

- Programs shown in the menu / homepage / search: `lib/data/programs.ts`. Curated program pages: `lib/data/program-meta.ts`.
  Everything else uses the shared template in `lib/program.ts`; modules come from `lib/data/syllabus.ts`.
- **Projects**: `lib/data/project-rows.ts` holds 105 original briefs (3 per program: Minor, Major, Capstone), one string per row:
  `"Level | Title | What you build | Tool, Tool"`. The homepage Projects section (search, domain filter, 12 at a time) and each
  program page read it. aptisure.com has no projects section to mirror; the layout is our own.
- Shared copy (FAQ, reviews, contact details, social links, enrol link): `lib/content.ts`. Price/plan card: `app/page.tsx`
  and `app/programs/[slug]/page.tsx`.
- Next batch date: the batch starts on a fixed day each month (default the **10th**, midnight India time); after that moment the site
  shows the next month. `GET /api/next-batch` is authoritative (honours `BATCH_DAY` and a one-off `BATCH_DATE=YYYY-MM-DD`);
  the browser also computes the same rule locally so the date is right even on a cached page. Rule + tests: `lib/batch.ts`, `tests/batch.test.ts`.
- Account deletion: there is no Delete Account page. The Privacy Policy and Terms tell users to email hr@aadyosh.com with the
  subject "Account Deletion Request". The old page is in git history.

## Conventions / gotchas

- Styles are one global stylesheet, `app/globals.css`. `html`/`body` use `overflow-x: clip`, not `hidden` (`hidden` on both breaks the
  sticky header). Grid/flex children need `min-width: 0` (a safety-net rule exists).
- The hero must not use `overflow: hidden` (it would clip the search dropdown); it uses `overflow-x: clip`.
- Hydration: anything that depends on "now" (batch label, countdown, footer year) has `suppressHydrationWarning`, and the batch date is
  corrected right after mount. The layout re-renders at most hourly (`revalidate = 3600`).
- `components/modals/ModalProvider.tsx` owns both pop-ups. "Talk to a Mentor" buttons use `<TalkLink>` (roadmap form) or
  `<MentorLink program domain>` (program pages).
- Windows PowerShell 5.1: read/write files with .NET `UTF8Encoding($false)` to avoid encoding damage.

## Standing instructions from the owner

- `/campus-ambassador` is kept exactly as it was: its content, its older header (all six domains in the menu, a Copilot link,
  the "Rubric evaluation" tagline) and its "Return Policy" footer label. `SiteHeader` and `SiteFooter` special-case that one path.
- Do not copy aptisure's marketing copy, use real company logos, or claim real affiliation with Google/MAANG etc.
  Mentor logos are labelled placeholders.
- Colour palette: purple / white / black (gradients allowed); the hero keeps its multicolour look.
- Copilot (`/copilot`) exists but is not linked from the main nav.

## Secrets

`backend/data/` (git-ignored) still holds the old server's `admin_token.txt`, `sheets_secret.txt`, `sheets_webhook.txt`,
`google-apps-script.filled.gs` and `aadyosh.db` with real submissions. Do not share or publish that folder; you need two of
those files to fill in the Vercel variables.
