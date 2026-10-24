"""Shared logic for the Vercel serverless form endpoints (files in api/ that start with _ are not routed).

Vercel has no persistent disk, so there is no SQLite here: every valid submission is forwarded straight to
the Google Apps Script web app (backend/google-apps-script.gs), which appends it to that form's Sheet.

Environment variables (set in Vercel, never committed):
    SHEETS_WEBHOOK_URL     the Apps Script /exec URL
    SHEETS_WEBHOOK_SECRET  the shared secret baked into the script
"""
import calendar
import json
import os
import re
import threading
import time
import urllib.request
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone

MAX_BODY = 32 * 1024
RATE_LIMIT = (int(os.environ.get("RATE_LIMIT", "8")), 60)  # best effort: per warm serverless instance, per IP
GRAD_YEARS = ("2026", "2027", "2028", "2029", "2030", "Already graduated")

# field spec: (name, required, max_length, kind[, choices]) - kept in sync with backend/server.py
FORMS = {
    "leads": [
        ("name", True, 80, "text"),
        ("phone", True, 10, "phone"),
        ("college", False, 120, "text"),
        ("grad_year", False, 20, "choice", GRAD_YEARS),
        ("state", False, 40, "text"),
        ("department", False, 60, "text"),
        ("source", False, 100, "text"),
    ],
    "support": [
        ("topic", True, 60, "text"),
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("phone", False, 10, "phone"),
        ("message", True, 2000, "long"),
        ("source", False, 100, "text"),
    ],
    "ambassador": [
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("phone", True, 10, "phone"),
        ("college", True, 120, "text"),
        ("referral", False, 80, "text"),
        ("grad_year", True, 20, "choice", GRAD_YEARS[:4]),
        ("source", False, 100, "text"),
    ],
    "mentor-request": [
        ("program", True, 80, "text"),
        ("domain", False, 60, "text"),
        ("name", True, 80, "text"),
        ("phone", True, 10, "phone"),
        ("email", False, 120, "email"),
        ("preferred_time", False, 30, "choice", ("Morning", "Afternoon", "Evening", "Weekend")),
        ("message", False, 500, "long"),
        ("source", False, 100, "text"),
    ],
    "delete-request": [
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("reason", False, 80, "text"),
        ("confirmed", True, 5, "bool"),
        ("source", False, 100, "text"),
    ],
}

EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$")


def validate(fields, payload):
    values, errors = {}, {}
    for spec in fields:
        name, required, max_len, kind = spec[:4]
        raw = payload.get(name)
        if raw is None or raw is False:
            raw = ""
        if isinstance(raw, bool):
            raw = "true"
        if not isinstance(raw, (str, int)):
            errors[name] = "Invalid value."
            continue
        text = str(raw)
        if kind == "long":
            text = "\n".join(re.sub(r"[ \t]+", " ", ln).strip() for ln in text.splitlines()).strip()
        else:
            text = re.sub(r"\s+", " ", text).strip()

        if not text:
            if required:
                errors[name] = "This field is required."
            values[name] = None
            continue
        if kind == "phone":
            digits = re.sub(r"\D", "", text)
            if len(digits) == 12 and digits.startswith("91"):
                digits = digits[2:]
            if not re.fullmatch(r"[6-9]\d{9}", digits):
                errors[name] = "Enter a valid 10-digit mobile number."
                continue
            text = digits
        elif kind == "email":
            if not EMAIL_RE.match(text):
                errors[name] = "Enter a valid email address."
                continue
            text = text.lower()
        elif kind == "choice":
            if text not in spec[4]:
                errors[name] = "Choose one of the listed options."
                continue
        elif kind == "bool":
            if text.lower() != "true":
                errors[name] = "You must confirm to continue."
                continue
            text = "yes"
        if len(text) > max_len:
            errors[name] = f"Too long (max {max_len} characters)."
            continue
        values[name] = text
    return values, errors


_hits = defaultdict(deque)
_hits_lock = threading.Lock()


def rate_limited(ip):
    limit, window = RATE_LIMIT
    now = time.monotonic()
    with _hits_lock:
        q = _hits[ip]
        while q and now - q[0] > window:
            q.popleft()
        if len(q) >= limit:
            return True
        q.append(now)
        return False


def forward_to_sheet(route, row):
    url = os.environ.get("SHEETS_WEBHOOK_URL", "").strip()
    secret = os.environ.get("SHEETS_WEBHOOK_SECRET", "").strip()
    if not url or not secret:
        raise RuntimeError("SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET are not set")
    req = urllib.request.Request(
        url,
        data=json.dumps({"secret": secret, "form": route, "row": row}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=25) as resp:  # Apps Script answers via a 302 that urllib follows
        return json.loads(resp.read().decode("utf-8")).get("ok") is True


# ---------------------------------------------------------------- next batch date
# Same rule as backend/server.py: a fixed start day every month, India time. Set BATCH_DAY (default 10) or a one-off
# BATCH_DATE=YYYY-MM-DD in the Vercel project's environment variables.
IST = timezone(timedelta(hours=5, minutes=30))
MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def next_batch(now=None):
    now = (now or datetime.now(timezone.utc)).astimezone(IST)

    def payload(start, source):
        return {"start": start.isoformat(), "date": start.date().isoformat(),
                "label": f"{start.day:02d} {MONTH_ABBR[start.month - 1]}",
                "days_left": max(0, (start - now).days), "source": source}

    override = os.environ.get("BATCH_DATE", "").strip()
    if override:
        try:
            start = datetime.strptime(override, "%Y-%m-%d").replace(tzinfo=IST)
            if start > now:
                return payload(start, "override")
        except ValueError:
            pass
    try:
        day = int(os.environ.get("BATCH_DAY") or 10)
    except ValueError:
        day = 10
    day = min(max(day, 1), 31)
    year, month = now.year, now.month
    for _ in range(14):
        start = datetime(year, month, min(day, calendar.monthrange(year, month)[1]), tzinfo=IST)
        if start > now:
            break
        month += 1
        if month > 12:
            month, year = 1, year + 1
    return payload(start, "monthly")


def serve_next_batch(h):
    out = json.dumps(next_batch()).encode("utf-8")
    h.send_response(200)
    h.send_header("Content-Type", "application/json; charset=utf-8")
    h.send_header("Content-Length", str(len(out)))
    h.send_header("Cache-Control", "public, max-age=300, s-maxage=300")  # the date only changes once a month
    h.end_headers()
    h.wfile.write(out)


def serve(h, route):
    """Glue between a BaseHTTPRequestHandler and handle()."""
    try:
        length = int(h.headers.get("Content-Length") or 0)
    except ValueError:
        length = 0
    # read at most one byte over the cap so oversized bodies are rejected without buffering them
    body = h.rfile.read(min(length, MAX_BODY + 1)) if length else b""
    fwd = (h.headers.get("x-forwarded-for") or "").split(",")[0].strip()
    status, obj = handle(route, h.headers.get("Content-Type"), body, fwd or h.client_address[0])
    out = json.dumps(obj).encode("utf-8")
    h.send_response(status)
    h.send_header("Content-Type", "application/json; charset=utf-8")
    h.send_header("Content-Length", str(len(out)))
    h.send_header("Cache-Control", "no-store")
    h.end_headers()
    h.wfile.write(out)


def not_allowed(h):
    out = json.dumps({"error": "Method not allowed."}).encode("utf-8")
    h.send_response(405)
    h.send_header("Content-Type", "application/json; charset=utf-8")
    h.send_header("Allow", "POST")
    h.send_header("Content-Length", str(len(out)))
    h.end_headers()
    h.wfile.write(out)


def handle(route, content_type, body, ip):
    """Pure request logic: returns (http_status, json_dict)."""
    if route not in FORMS:
        return 404, {"error": "Not found."}
    if rate_limited(ip):
        return 429, {"error": "Too many requests. Please wait a minute and try again."}
    if "application/json" not in (content_type or ""):
        return 415, {"error": "Content-Type must be application/json."}
    if len(body) > MAX_BODY:
        return 413, {"error": "Request too large."}
    try:
        payload = json.loads(body or b"null")
    except (ValueError, UnicodeDecodeError):
        return 400, {"error": "Invalid JSON."}
    if not isinstance(payload, dict):
        return 400, {"error": "Expected a JSON object."}
    if payload.get("fax"):  # honeypot: pretend success
        return 201, {"ok": True}

    values, errors = validate(FORMS[route], payload)
    if errors:
        return 422, {"error": "Please check the highlighted details.", "fields": errors}

    now = datetime.now(timezone.utc)
    row = dict(values, id=str(int(now.timestamp() * 1000)), status="new", created_at=now.isoformat(timespec="seconds"))
    try:
        ok = forward_to_sheet(route, row)
    except Exception as exc:  # network / misconfiguration: tell the visitor so they can retry
        print(f"[sheets] {route} not saved: {exc}")
        ok = False
    if not ok:
        return 502, {"error": "We couldn't save that just now. Please try again in a moment."}
    return 201, {"ok": True, "id": row["id"]}
