/* Next batch date - the rule shared by the server (/api/next-batch) and the browser fallback.

   A fixed start day each month (default the 10th) at midnight India time (UTC+05:30, no DST). The date is
   always the next occurrence strictly after "now", so after 10 Oct the site shows 10 Nov, then 10 Dec, and so on.
   A day past the end of a short month is clamped (31 -> 28/29/30).

   Config (server only, e.g. Vercel environment variables):
     BATCH_DAY=15            move the monthly start day
     BATCH_DATE=2026-12-01   one-off override; ignored once that moment has passed */

export const DEFAULT_START_DAY = 10;
const IST_OFFSET_MIN = 330;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type NextBatch = { start: string; date: string; label: string; days_left: number; source: "monthly" | "override" };

/** "10 Nov" for an instant, read on India's calendar. */
export function batchLabel(d: Date): string {
  const ist = new Date(d.getTime() + IST_OFFSET_MIN * 60000);
  return String(ist.getUTCDate()).padStart(2, "0") + " " + MONTHS[ist.getUTCMonth()];
}

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

/** ISO string with the +05:30 offset, e.g. 2026-11-10T00:00:00+05:30 */
function istIso(d: Date): string {
  const ist = new Date(d.getTime() + IST_OFFSET_MIN * 60000);
  return `${ist.getUTCFullYear()}-${pad(ist.getUTCMonth() + 1)}-${pad(ist.getUTCDate())}T${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}:${pad(ist.getUTCSeconds())}+05:30`;
}
const istDate = (d: Date) => istIso(d).slice(0, 10);

/** Next occurrence of `day` (clamped to short months) strictly after `now`, as a real instant. */
export function nextMonthlyStart(now: Date, day: number = DEFAULT_START_DAY): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60000);
  let y = ist.getUTCFullYear();
  let m = ist.getUTCMonth();
  for (let i = 0; i < 14; i++) {
    const dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    const start = new Date(Date.UTC(y, m, Math.min(day, dim)) - IST_OFFSET_MIN * 60000);
    if (start > now) return start;
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return new Date(now.getTime() + 30 * 86400000);
}

/** Authoritative answer used by the API route. */
export function computeNextBatch(now: Date = new Date(), env: { BATCH_DAY?: string; BATCH_DATE?: string } = {}): NextBatch {
  const payload = (start: Date, source: NextBatch["source"]): NextBatch => ({
    start: istIso(start),
    date: istDate(start),
    label: batchLabel(start),
    days_left: Math.max(0, Math.floor((start.getTime() - now.getTime()) / 86400000)),
    source,
  });

  const override = (env.BATCH_DATE ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(override)) {
    const start = new Date(`${override}T00:00:00+05:30`);
    if (!isNaN(start.getTime()) && start > now) return payload(start, "override");
  }
  let day = parseInt(env.BATCH_DAY ?? "", 10);
  if (isNaN(day)) day = DEFAULT_START_DAY;
  day = Math.min(Math.max(day, 1), 31);
  return payload(nextMonthlyStart(now, day), "monthly");
}

export function countdownText(target: Date, now: Date = new Date()): string {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${days}d ${hours}h ${mins}m`;
}
