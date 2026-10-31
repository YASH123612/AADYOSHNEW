/* Tests the "next batch" date rule (lib/batch.ts).  Run: npm test */
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeNextBatch } from "../lib/batch.ts";

const utc = (...a: [number, number, number, number?, number?]) => new Date(Date.UTC(a[0], a[1] - 1, a[2], a[3] ?? 0, a[4] ?? 0));

const CASES: Array<[string, Date, { BATCH_DAY?: string; BATCH_DATE?: string }, [string, string, string]]> = [
  ["mid-month before the 10th shows this month",       utc(2026, 10, 3, 12),    {}, ["10 Oct", "2026-10-10", "monthly"]],
  ["after the 10th rolls to NEXT month",               utc(2026, 10, 25, 12),   {}, ["10 Nov", "2026-11-10", "monthly"]],
  ["one minute before the start still shows today",    utc(2026, 10, 9, 18, 29), {}, ["10 Oct", "2026-10-10", "monthly"]],
  ["exactly at the start moment moves on",             utc(2026, 10, 9, 18, 30), {}, ["10 Nov", "2026-11-10", "monthly"]],
  ["December rolls into the next YEAR",                utc(2026, 12, 20, 6),    {}, ["10 Jan", "2027-01-10", "monthly"]],
  ["day 31 is clamped to a 28-day February",           utc(2027, 2, 1, 6),      { BATCH_DAY: "31" }, ["28 Feb", "2027-02-28", "monthly"]],
  ["day 31 is clamped to a 30-day April",              utc(2026, 4, 5, 6),      { BATCH_DAY: "31" }, ["30 Apr", "2026-04-30", "monthly"]],
  ["custom day (15th)",                                utc(2026, 10, 25, 12),   { BATCH_DAY: "15" }, ["15 Nov", "2026-11-15", "monthly"]],
  ["garbage BATCH_DAY falls back to the 10th",         utc(2026, 10, 25, 12),   { BATCH_DAY: "abc" }, ["10 Nov", "2026-11-10", "monthly"]],
  ["one-off date override wins while it is ahead",     utc(2026, 10, 25, 12),   { BATCH_DATE: "2026-12-01" }, ["01 Dec", "2026-12-01", "override"]],
  ["an override already in the past is ignored",       utc(2026, 10, 25, 12),   { BATCH_DATE: "2026-10-01" }, ["10 Nov", "2026-11-10", "monthly"]],
  ["an invalid override is ignored",                   utc(2026, 10, 25, 12),   { BATCH_DATE: "soon" }, ["10 Nov", "2026-11-10", "monthly"]],
];

for (const [name, now, env, expected] of CASES) {
  test(name, () => {
    const r = computeNextBatch(now, env);
    assert.deepEqual([r.label, r.date, r.source], expected);
  });
}

test("start is an ISO string in India time and days_left counts whole days", () => {
  const r = computeNextBatch(utc(2026, 10, 25, 12));
  assert.equal(r.start, "2026-11-10T00:00:00+05:30");
  assert.equal(r.days_left, 15);
});

test("the date is always in the future and moves forward monotonically for two years", () => {
  let last = 0;
  for (let d = 0; d < 730; d++) {
    const now = new Date(Date.UTC(2026, 0, 1, 7, 15) + d * 86400000);
    const start = new Date(computeNextBatch(now).start).getTime();
    assert.ok(start > now.getTime(), `day ${d}: start not after now`);
    assert.ok(start >= last, `day ${d}: went backwards`);
    last = start;
  }
});
