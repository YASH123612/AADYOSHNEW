/* Server-side form handling shared by the /api/* route handlers.

   Every valid submission is forwarded to the Google Apps Script web app (docs/google-apps-script.gs), which appends it
   to that form's Google Sheet. Vercel has no persistent disk, so nothing is stored here.

   Environment variables (set in Vercel / .env.local, never committed):
     SHEETS_WEBHOOK_URL     the Apps Script /exec URL
     SHEETS_WEBHOOK_SECRET  the shared secret baked into the script
     RATE_LIMIT             optional: max requests per IP per minute (default 8)

   In `next dev` with no webhook configured, submissions are appended to .data/<form>.jsonl so the forms can be tried
   locally. In production a missing webhook is reported to the visitor as a failed save. */
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const MAX_BODY = 32 * 1024;
const GRAD_YEARS = ["2026", "2027", "2028", "2029", "2030", "Already graduated"];

type Kind = "text" | "phone" | "email" | "choice" | "long" | "bool";
type Field = { name: string; required: boolean; max: number; kind: Kind; choices?: string[] };
const f = (name: string, required: boolean, max: number, kind: Kind, choices?: string[]): Field => ({ name, required, max, kind, choices });

export const FORMS: Record<string, Field[]> = {
  leads: [
    f("name", true, 80, "text"), f("phone", true, 10, "phone"), f("college", false, 120, "text"),
    f("grad_year", false, 20, "choice", GRAD_YEARS), f("state", false, 40, "text"), f("department", false, 60, "text"), f("source", false, 100, "text"),
  ],
  support: [
    f("topic", true, 60, "text"), f("name", true, 80, "text"), f("email", true, 120, "email"), f("phone", false, 10, "phone"),
    f("message", true, 2000, "long"), f("source", false, 100, "text"),
  ],
  ambassador: [
    f("name", true, 80, "text"), f("email", true, 120, "email"), f("phone", true, 10, "phone"), f("college", true, 120, "text"),
    f("referral", false, 80, "text"), f("grad_year", true, 20, "choice", GRAD_YEARS.slice(0, 4)), f("source", false, 100, "text"),
  ],
  "mentor-request": [
    f("program", true, 80, "text"), f("domain", false, 60, "text"), f("name", true, 80, "text"), f("phone", true, 10, "phone"),
    f("email", false, 120, "email"), f("preferred_time", false, 30, "choice", ["Morning", "Afternoon", "Evening", "Weekend"]),
    f("message", false, 500, "long"), f("source", false, 100, "text"),
  ],
};

const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;

export function validate(fields: Field[], payload: Record<string, unknown>) {
  const values: Record<string, string | null> = {};
  const errors: Record<string, string> = {};
  for (const { name, required, max, kind, choices } of fields) {
    let raw = payload[name];
    if (raw === undefined || raw === null || raw === false) raw = "";
    if (typeof raw === "boolean") raw = "true";
    if (typeof raw !== "string" && typeof raw !== "number") { errors[name] = "Invalid value."; continue; }
    let text = String(raw);
    text = kind === "long"
      ? text.split(/\r?\n/).map((ln) => ln.replace(/[ \t]+/g, " ").trim()).join("\n").trim()
      : text.replace(/\s+/g, " ").trim();

    if (!text) {
      if (required) errors[name] = "This field is required.";
      values[name] = null;
      continue;
    }
    if (kind === "phone") {
      let digits = text.replace(/\D/g, "");
      if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
      if (!/^[6-9]\d{9}$/.test(digits)) { errors[name] = "Enter a valid 10-digit mobile number."; continue; }
      text = digits;
    } else if (kind === "email") {
      if (!EMAIL_RE.test(text)) { errors[name] = "Enter a valid email address."; continue; }
      text = text.toLowerCase();
    } else if (kind === "choice") {
      if (!choices!.includes(text)) { errors[name] = "Choose one of the listed options."; continue; }
    } else if (kind === "bool") {
      if (text.toLowerCase() !== "true") { errors[name] = "You must confirm to continue."; continue; }
      text = "yes";
    }
    if (text.length > max) { errors[name] = `Too long (max ${max} characters).`; continue; }
    values[name] = text;
  }
  return { values, errors };
}

/* Best-effort rate limit: per warm server instance, per IP. */
const RATE_LIMIT = () => parseInt(process.env.RATE_LIMIT ?? "", 10) || 8;
const hits = new Map<string, number[]>();
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= RATE_LIMIT()) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

async function forwardToSheet(route: string, row: Record<string, string | null>): Promise<boolean> {
  const url = (process.env.SHEETS_WEBHOOK_URL ?? "").trim();
  const secret = (process.env.SHEETS_WEBHOOK_SECRET ?? "").trim();
  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, `${route}.jsonl`), JSON.stringify(row) + "\n", "utf8");
      console.log(`[forms] SHEETS_WEBHOOK_* not set - saved ${route} submission to .data/${route}.jsonl`);
      return true;
    }
    throw new Error("SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET are not set");
  }
  const res = await fetch(url, {                     // Apps Script answers via a 302 that fetch follows
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, form: route, row }),
    signal: AbortSignal.timeout(25_000),
  });
  const data = (await res.json()) as { ok?: boolean };
  return data.ok === true;
}

export type HandleResult = { status: number; body: Record<string, unknown> };

/** Pure request logic: returns the HTTP status and JSON body. */
export async function handleForm(route: string, contentType: string | null, bodyText: string, ip: string): Promise<HandleResult> {
  const spec = FORMS[route];
  if (!spec) return { status: 404, body: { error: "Not found." } };
  if (rateLimited(ip)) return { status: 429, body: { error: "Too many requests. Please wait a minute and try again." } };
  if (!(contentType ?? "").includes("application/json")) return { status: 415, body: { error: "Content-Type must be application/json." } };
  if (Buffer.byteLength(bodyText) > MAX_BODY) return { status: 413, body: { error: "Request too large." } };

  let payload: unknown;
  try { payload = JSON.parse(bodyText || "null"); } catch { return { status: 400, body: { error: "Invalid JSON." } }; }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return { status: 400, body: { error: "Expected a JSON object." } };
  const data = payload as Record<string, unknown>;
  if (data.fax) return { status: 201, body: { ok: true } };   // honeypot: pretend success

  const { values, errors } = validate(spec, data);
  if (Object.keys(errors).length) return { status: 422, body: { error: "Please check the highlighted details.", fields: errors } };

  const now = new Date();
  const row = { ...values, id: String(now.getTime()), status: "new", created_at: now.toISOString().replace(/\.\d{3}Z$/, "+00:00") };
  let ok = false;
  try { ok = await forwardToSheet(route, row); }
  catch (exc) { console.error(`[sheets] ${route} not saved:`, exc); }
  if (!ok) return { status: 502, body: { error: "We couldn't save that just now. Please try again in a moment." } };
  return { status: 201, body: { ok: true, id: row.id } };
}
