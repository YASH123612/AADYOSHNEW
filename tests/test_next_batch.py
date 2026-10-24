#!/usr/bin/env python3
"""Tests the "next batch" date rule in both backends (backend/server.py and api/_lib.py).

    python tests/test_next_batch.py

Both implementations must agree, so every case is run against each.
"""
import importlib.util
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    sys.path.insert(0, str(Path(path).parent))
    spec.loader.exec_module(mod)
    return mod


impls = {"backend/server.py": load("server_mod", ROOT / "backend" / "server.py"),
         "api/_lib.py": load("lib_mod", ROOT / "api" / "_lib.py")}
results = []


def utc(*a):
    return datetime(*a, tzinfo=timezone.utc)


def check(name, ok, detail=""):
    results.append(ok)
    print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail and not ok else ""))


def label(impl, now, **env):
    for k in ("BATCH_DAY", "BATCH_DATE"):
        os.environ.pop(k, None)
    os.environ.update({k: str(v) for k, v in env.items()})
    try:
        r = impl.next_batch(now)
        return r["label"], r["date"], r["source"]
    finally:
        for k in env:
            os.environ.pop(k, None)


CASES = [
    ("mid-month before the 10th shows this month",        utc(2026, 10, 3, 12),  {}, ("10 Oct", "2026-10-10", "monthly")),
    ("after the 10th rolls to NEXT month",               utc(2026, 10, 25, 12), {}, ("10 Nov", "2026-11-10", "monthly")),
    ("one minute before the start still shows today",    utc(2026, 10, 9, 18, 29), {}, ("10 Oct", "2026-10-10", "monthly")),
    ("exactly at the start moment moves on",             utc(2026, 10, 9, 18, 30), {}, ("10 Nov", "2026-11-10", "monthly")),
    ("December rolls into the next YEAR",                utc(2026, 12, 20, 6),  {}, ("10 Jan", "2027-01-10", "monthly")),
    ("day 31 is clamped to a 28-day February",           utc(2027, 2, 1, 6),    {"BATCH_DAY": 31}, ("28 Feb", "2027-02-28", "monthly")),
    ("day 31 is clamped to a 30-day April",              utc(2026, 4, 5, 6),    {"BATCH_DAY": 31}, ("30 Apr", "2026-04-30", "monthly")),
    ("custom day (15th)",                                utc(2026, 10, 25, 12), {"BATCH_DAY": 15}, ("15 Nov", "2026-11-15", "monthly")),
    ("garbage BATCH_DAY falls back to the 10th",         utc(2026, 10, 25, 12), {"BATCH_DAY": "abc"}, ("10 Nov", "2026-11-10", "monthly")),
    ("one-off date override wins while it is ahead",     utc(2026, 10, 25, 12), {"BATCH_DATE": "2026-12-01"}, ("01 Dec", "2026-12-01", "override")),
    ("an override already in the past is ignored",       utc(2026, 10, 25, 12), {"BATCH_DATE": "2026-10-01"}, ("10 Nov", "2026-11-10", "monthly")),
    ("an invalid override is ignored",                   utc(2026, 10, 25, 12), {"BATCH_DATE": "soon"}, ("10 Nov", "2026-11-10", "monthly")),
]
for impl_name, impl in impls.items():
    for name, now, env, expected in CASES:
        got = label(impl, now, **env)
        check(f"{impl_name}: {name}", got == expected, f"got {got}, expected {expected}")

# the two implementations must agree for every day of two years
os.environ.pop("BATCH_DAY", None); os.environ.pop("BATCH_DATE", None)
a, b = impls["backend/server.py"], impls["api/_lib.py"]
mismatch = [d for d in range(0, 730) if a.next_batch(utc(2026, 1, 1, 7, 15) + __import__("datetime").timedelta(days=d))["date"]
            != b.next_batch(utc(2026, 1, 1, 7, 15) + __import__("datetime").timedelta(days=d))["date"]]
check("both implementations agree for 730 consecutive days", not mismatch, str(mismatch[:3]))

print(f"\n{sum(results)}/{len(results)} checks passed")
sys.exit(0 if all(results) else 1)
