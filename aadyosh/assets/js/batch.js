/* ==========================================================================
   aadyosh - next batch date (shared by the homepage and program pages)

   The batch date rolls forward by itself: it is always the next upcoming
   start day (default: the 10th of every month, at midnight India time), so
   after 10 Oct the site shows 10 Nov, then 10 Dec, and so on.

   1. A local calculation with the same rule shows the right date instantly.
   2. /api/next-batch (backend) is then asked for the authoritative date, so the
      team can change the day, or set a one-off date, without touching the site.
      If the backend is unreachable the local value simply stays.

   Anything marked data-batch-label gets the "10 Nov" text. Scripts that count
   down read window.AADYOSH_BATCH.date and re-run on the "batch:update" event.
   ========================================================================== */
(function () {
  const START_DAY = 10;            // fallback if the backend cannot be reached
  const IST_OFFSET_MIN = 330;      // India Standard Time, UTC+05:30, no daylight saving
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function labelFor(d) {
    const ist = new Date(d.getTime() + IST_OFFSET_MIN * 60000);
    return String(ist.getUTCDate()).padStart(2, "0") + " " + MONTHS[ist.getUTCMonth()];
  }

  /* next occurrence of START_DAY (clamped to short months) strictly after "now", as a real instant */
  function computeLocal(now) {
    const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60000);
    let y = ist.getUTCFullYear(), m = ist.getUTCMonth();
    for (let i = 0; i < 3; i++) {
      const day = Math.min(START_DAY, new Date(Date.UTC(y, m + 1, 0)).getUTCDate());
      const start = new Date(Date.UTC(y, m, day) - IST_OFFSET_MIN * 60000);
      if (start > now) return start;
      m += 1; if (m > 11) { m = 0; y += 1; }
    }
    return new Date(now.getTime() + 30 * 86400000);
  }

  function apply(date) {
    const batch = { date, label: labelFor(date) };
    window.AADYOSH_BATCH = batch;
    document.querySelectorAll("[data-batch-label]").forEach(el => { el.textContent = batch.label; });
    document.dispatchEvent(new CustomEvent("batch:update", { detail: batch }));
  }

  window.AADYOSH_NEXT_BATCH = computeLocal;   // exposed so the rule can be tested for any date
  apply(computeLocal(new Date()));

  if (typeof fetch === "function") {
    fetch("/api/next-batch", { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error("status " + r.status))))
      .then(j => {
        const d = new Date(j && j.start);
        if (!isNaN(d) && d > new Date()) apply(d);
      })
      .catch(() => { /* keep the locally computed date */ });
  }
})();
