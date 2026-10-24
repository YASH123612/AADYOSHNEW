#!/usr/bin/env python3
"""aadyosh backend: serves the static site and a small JSON API.

Standard library only (Python 3.9+) - no pip install needed.

    python backend/server.py            # http://127.0.0.1:5173
    PORT=8080 HOST=0.0.0.0 python backend/server.py

Public endpoints (POST, JSON):
    /api/leads            roadmap popup on the homepage
    /api/support          support ticket form
    /api/ambassador       campus ambassador application
    /api/delete-request   account deletion request

Admin endpoints (GET, header "Authorization: Bearer <token>"):
    /api/admin/summary                     row counts per table
    /api/admin/<table>?limit=100&format=csv   leads | support | ambassador | delete-request

The admin token is ADMIN_TOKEN from the environment, or a random one that is
generated on first run and saved to backend/data/admin_token.txt.
"""
import calendar
import csv
import hmac
import io
import json
import os
import re
import secrets
import sqlite3
import threading
import time
import urllib.request
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE = Path(__file__).resolve().parent
SITE_ROOT = BASE.parent / "aadyosh"
DATA_DIR = BASE / "data"
DB_PATH = Path(os.environ.get("DB_PATH", DATA_DIR / "aadyosh.db"))
MAX_BODY = 32 * 1024
RATE_LIMIT = (int(os.environ.get("RATE_LIMIT", "8")), 60)  # submissions per 60 seconds per IP

GRAD_YEARS = ("2026", "2027", "2028", "2029", "2030", "Already graduated")

# field spec: (name, required, max_length, kind[, choices])
FORMS = {
    "leads": ("leads", [
        ("name", True, 80, "text"),
        ("phone", True, 10, "phone"),
        ("college", False, 120, "text"),
        ("grad_year", False, 20, "choice", GRAD_YEARS),
        ("state", False, 40, "text"),
        ("department", False, 60, "text"),
        ("source", False, 100, "text"),
    ]),
    "support": ("support_tickets", [
        ("topic", True, 60, "text"),
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("phone", False, 10, "phone"),
        ("message", True, 2000, "long"),
        ("source", False, 100, "text"),
    ]),
    "ambassador": ("ambassador_applications", [
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("phone", True, 10, "phone"),
        ("college", True, 120, "text"),
        ("referral", False, 80, "text"),
        ("grad_year", True, 20, "choice", GRAD_YEARS[:4]),
        ("source", False, 100, "text"),
    ]),
    "mentor-request": ("mentor_requests", [
        ("program", True, 80, "text"),
        ("domain", False, 60, "text"),
        ("name", True, 80, "text"),
        ("phone", True, 10, "phone"),
        ("email", False, 120, "email"),
        ("preferred_time", False, 30, "choice", ("Morning", "Afternoon", "Evening", "Weekend")),
        ("message", False, 500, "long"),
        ("source", False, 100, "text"),
    ]),
    "delete-request": ("deletion_requests", [
        ("name", True, 80, "text"),
        ("email", True, 120, "email"),
        ("reason", False, 80, "text"),
        ("confirmed", True, 5, "bool"),
        ("source", False, 100, "text"),
    ]),
}
ROUTE_BY_TABLE = {table: route for route, (table, _) in FORMS.items()}

EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$")


# ---------------------------------------------------------------- next batch date
# Batches start on a fixed day of every month (India time), so the date shown on the site always rolls forward by
# itself. Change the day with the BATCH_DAY env var or {"day": 15} in backend/data/batch.json; to run a one-off cohort on
# a specific date set BATCH_DATE=2026-12-01 (or {"date": "2026-12-01"}). The override is used until that date has passed.
IST = timezone(timedelta(hours=5, minutes=30))
MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def next_batch(now=None):
    now = (now or datetime.now(timezone.utc)).astimezone(IST)
    cfg = {}
    cfg_path = DATA_DIR / "batch.json"
    if cfg_path.exists():
        try:
            cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        except (ValueError, OSError):
            cfg = {}

    def payload(start, source):
        return {"start": start.isoformat(), "date": start.date().isoformat(),
                "label": f"{start.day:02d} {MONTH_ABBR[start.month - 1]}",
                "days_left": max(0, (start - now).days), "source": source}

    override = (os.environ.get("BATCH_DATE") or str(cfg.get("date") or "")).strip()
    if override:
        try:
            start = datetime.strptime(override, "%Y-%m-%d").replace(tzinfo=IST)
            if start > now:
                return payload(start, "override")
        except ValueError:
            pass  # bad override: fall back to the monthly rule

    try:
        day = int(os.environ.get("BATCH_DAY") or cfg.get("day") or 10)
    except (TypeError, ValueError):
        day = 10
    day = min(max(day, 1), 31)
    year, month = now.year, now.month
    for _ in range(14):  # this month, then following months, until one is still in the future
        start = datetime(year, month, min(day, calendar.monthrange(year, month)[1]), tzinfo=IST)
        if start > now:
            break
        month += 1
        if month > 12:
            month, year = 1, year + 1
    return payload(start, "monthly")


# --------------------------------------------------------------------- storage
def db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with db() as conn:
        conn.execute("PRAGMA journal_mode=WAL")
        for table, fields in FORMS.values():
            cols = ", ".join(f"{f[0]} TEXT" for f in fields)
            conn.execute(
                f"CREATE TABLE IF NOT EXISTS {table} ("
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                f"{cols}, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL, "
                "synced INTEGER NOT NULL DEFAULT 0)"
            )
            if "synced" not in [r["name"] for r in conn.execute(f"PRAGMA table_info({table})")]:
                conn.execute(f"ALTER TABLE {table} ADD COLUMN synced INTEGER NOT NULL DEFAULT 0")


# ------------------------------------------------------------ Google Sheets sync
# Each stored row is forwarded to a Google Apps Script web app
# (backend/google-apps-script.gs) which appends it to that form's Sheet.
# Rows that fail (offline, script not deployed yet) stay synced=0 and are retried.
_sync_wake = threading.Event()


def sheets_config():
    url = os.environ.get("SHEETS_WEBHOOK_URL", "").strip()
    if not url and (DATA_DIR / "sheets_webhook.txt").exists():
        url = (DATA_DIR / "sheets_webhook.txt").read_text(encoding="utf-8").strip()
    secret = os.environ.get("SHEETS_WEBHOOK_SECRET", "").strip()
    if not secret and (DATA_DIR / "sheets_secret.txt").exists():
        secret = (DATA_DIR / "sheets_secret.txt").read_text(encoding="utf-8").strip()
    secure = url.startswith("https://") or url.startswith("http://127.0.0.1")  # loopback allowed for local testing
    return (url, secret) if secure and secret else (None, None)


def push_to_sheet(url, secret, route, row):
    req = urllib.request.Request(
        url,
        data=json.dumps({"secret": secret, "form": route, "row": row}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=90) as resp:  # Apps Script answers via a 302 (cold starts can take 10-20s)
        return json.loads(resp.read().decode("utf-8")).get("ok") is True


def sync_pending():
    url, secret = sheets_config()
    if not url:
        return
    for table, route in ROUTE_BY_TABLE.items():
        with db() as conn:
            pending = [dict(r) for r in conn.execute(f"SELECT * FROM {table} WHERE synced = 0 ORDER BY id LIMIT 50")]
        for row in pending:
            row.pop("synced", None)
            try:
                ok = push_to_sheet(url, secret, route, row)
            except Exception as exc:  # network / bad JSON: retry next round
                print(f"[sheets] {route} #{row['id']} not synced yet: {exc}")
                return
            if not ok:
                # e.g. an older deployed script that does not know this form yet: pause only this form, keep the others syncing
                print(f"[sheets] {route} #{row['id']} rejected by the Apps Script (check the secret, and that the deployed script is the latest version)")
                break
            with db() as conn:
                conn.execute(f"UPDATE {table} SET synced = 1 WHERE id = ?", (row["id"],))


def sync_loop():
    while True:
        _sync_wake.wait(timeout=60)
        _sync_wake.clear()
        try:
            sync_pending()
        except Exception as exc:
            print(f"[sheets] sync error: {exc}")


def admin_token():
    env = os.environ.get("ADMIN_TOKEN")
    if env:
        return env
    path = DATA_DIR / "admin_token.txt"
    if not path.exists():
        path.write_text(secrets.token_urlsafe(32), encoding="utf-8")
    return path.read_text(encoding="utf-8").strip()


# ------------------------------------------------------------------ validation
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


# ---------------------------------------------------------------- rate limiting
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


# --------------------------------------------------------------------- handler
class Handler(SimpleHTTPRequestHandler):
    server_version = "aadyosh"
    sys_version = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE_ROOT), **kwargs)

    def end_headers(self):
        # Static files get no Cache-Control from SimpleHTTPRequestHandler, so browsers reuse stale copies of the
        # pages while the site is being edited. "no-cache" = always revalidate (cheap 304 when unchanged).
        if not any(h.lower().startswith(b"cache-control") for h in getattr(self, "_headers_buffer", [])):
            self.send_header("Cache-Control", "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        super().end_headers()

    # -- helpers
    def send_json(self, status, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        if "application/json" not in (self.headers.get("Content-Type") or ""):
            self.send_json(415, {"error": "Content-Type must be application/json."})
            return None
        try:
            length = int(self.headers.get("Content-Length") or "")
        except ValueError:
            self.send_json(411, {"error": "Content-Length required."})
            return None
        if length > MAX_BODY:
            self.send_json(413, {"error": "Request too large."})
            return None
        try:
            payload = json.loads(self.rfile.read(length) or b"null")
        except (ValueError, UnicodeDecodeError):
            self.send_json(400, {"error": "Invalid JSON."})
            return None
        if not isinstance(payload, dict):
            self.send_json(400, {"error": "Expected a JSON object."})
            return None
        return payload

    def client_ip(self):
        return self.client_address[0]

    # -- routes
    def do_POST(self):
        path = urlparse(self.path).path.rstrip("/")
        route = path[len("/api/"):] if path.startswith("/api/") else None
        if route not in FORMS:
            return self.send_json(404, {"error": "Not found."})
        if rate_limited(self.client_ip()):
            return self.send_json(429, {"error": "Too many requests. Please wait a minute and try again."})
        payload = self.read_json()
        if payload is None:
            return
        # Honeypot: humans never see or fill this field. Pretend success.
        if payload.get("fax"):
            return self.send_json(201, {"ok": True})

        table, fields = FORMS[route]
        values, errors = validate(fields, payload)
        if errors:
            return self.send_json(422, {"error": "Please check the highlighted details.", "fields": errors})

        cols = list(values)
        with db() as conn:
            cur = conn.execute(
                f"INSERT INTO {table} ({', '.join(cols)}, created_at) VALUES ({', '.join('?' * len(cols))}, ?)",
                [values[c] for c in cols] + [datetime.now(timezone.utc).isoformat(timespec="seconds")],
            )
        _sync_wake.set()
        self.send_json(201, {"ok": True, "id": cur.lastrowid})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        if path == "/api/health":
            return self.send_json(200, {"ok": True})
        if path == "/api/next-batch":
            return self.send_json(200, next_batch())
        if path.startswith("/api/admin/"):
            return self.admin(path[len("/api/admin/"):], parse_qs(parsed.query))
        if path.startswith("/api/"):
            return self.send_json(404, {"error": "Not found."})
        super().do_GET()

    def do_PUT(self):
        self.send_json(405, {"error": "Method not allowed."})

    do_DELETE = do_PATCH = do_PUT

    # -- admin
    def admin(self, what, query):
        supplied = (self.headers.get("Authorization") or "").removeprefix("Bearer ").strip()
        if not supplied or not hmac.compare_digest(supplied.encode(), TOKEN.encode()):
            return self.send_json(401, {"error": "Unauthorized."})

        if what == "summary":
            with db() as conn:
                counts = {route: conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
                          for route, (table, _) in FORMS.items()}
            return self.send_json(200, counts)

        if what not in FORMS:
            return self.send_json(404, {"error": "Not found."})
        table = FORMS[what][0]
        try:
            limit = max(1, min(1000, int(query.get("limit", ["100"])[0])))
        except ValueError:
            limit = 100
        with db() as conn:
            rows = [dict(r) for r in conn.execute(f"SELECT * FROM {table} ORDER BY id DESC LIMIT ?", (limit,))]

        if query.get("format", [""])[0] == "csv":
            buf = io.StringIO()
            if rows:
                writer = csv.DictWriter(buf, fieldnames=list(rows[0]))
                writer.writeheader()
                for r in rows:  # neutralise spreadsheet formula injection
                    writer.writerow({k: ("'" + v if isinstance(v, str) and v[:1] in "=+-@" else v) for k, v in r.items()})
            body = buf.getvalue().encode("utf-8-sig")
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", f'attachment; filename="{table}.csv"')
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_json(200, {"count": len(rows), "rows": rows})


def connect_sheets(url):
    """python backend/server.py --connect <web-app-url>: verify the Apps Script deployment, then save its URL."""
    if not url.startswith("https://script.google.com/macros/"):
        print("That does not look like an Apps Script web app URL (expected https://script.google.com/macros/s/.../exec).")
        return 1
    secret_file = DATA_DIR / "sheets_secret.txt"
    secret = os.environ.get("SHEETS_WEBHOOK_SECRET", "").strip() or (secret_file.read_text(encoding="utf-8").strip() if secret_file.exists() else "")
    if not secret:
        print("No secret found. Expected backend/data/sheets_secret.txt (the same value you pasted into the SECRET line of google-apps-script.gs).")
        return 1
    try:
        ok = push_to_sheet(url, secret, "ping", {})
    except ValueError:
        print("The URL answered, but not with JSON. In Apps Script use Deploy > Manage deployments > Edit and set")
        print("'Execute as: Me' and 'Who has access: Anyone', then deploy a new version and use that /exec URL.")
        return 1
    except Exception as exc:
        print(f"Could not reach the web app: {exc}")
        return 1
    if not ok:
        print("The script rejected the request. Make sure you pasted the latest backend/google-apps-script.gs")
        print("(its SECRET must match backend/data/sheets_secret.txt) and deployed a NEW version after editing.")
        return 1
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "sheets_webhook.txt").write_text(url, encoding="utf-8")
    print("Connected. Saved to backend/data/sheets_webhook.txt - a running server picks it up within a minute,")
    print("and any submissions already stored will be copied to their Sheets automatically.")
    return 0


if __name__ == "__main__":
    import sys
    if len(sys.argv) >= 3 and sys.argv[1] == "--connect":
        raise SystemExit(connect_sheets(sys.argv[2].strip()))
    init_db()
    TOKEN = admin_token()
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "5173"))
    httpd = ThreadingHTTPServer((host, port), Handler)
    httpd.daemon_threads = True
    print(f"aadyosh running at http://{host}:{port}")
    print(f"database: {DB_PATH}")
    print(f"admin token: {'ADMIN_TOKEN env var' if os.environ.get('ADMIN_TOKEN') else DATA_DIR / 'admin_token.txt'}")
    if sheets_config()[0]:
        print("google sheets sync: on")
        _sync_wake.set()  # push anything left over from a previous run
    else:
        print("google sheets sync: off (deploy backend/google-apps-script.gs, then put its URL in backend/data/sheets_webhook.txt)")
    threading.Thread(target=sync_loop, daemon=True).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
