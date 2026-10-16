#!/usr/bin/env python3
"""End-to-end test of the form pipeline: form POST -> SQLite -> Google Sheets (emulated Apps Script).

    python backend/test_e2e.py

Starts throw-away servers on ports 5190/5191 with a temp database, so real data is never touched.
The Apps Script is emulated with the same contract as google-apps-script.gs (secret check, header-name
column matching, duplicate-id guard). It cannot prove YOUR deployed script works - use
`python backend/server.py --connect <url>` for that.
"""
import csv, io, json, os, subprocess, sys, tempfile, threading, time, urllib.error, urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
SECRET, ADMIN = "test-secret", "test-admin-token"
APP, MOCK = 5190, 5191
HEADERS = {
    "leads": "created_at,id,name,phone,college,grad_year,state,department,source,status".split(","),
    "support": "created_at,id,topic,name,email,phone,message,source,status".split(","),
    "ambassador": "created_at,id,name,email,phone,college,referral,grad_year,source,status".split(","),
    "delete-request": "created_at,id,name,email,reason,confirmed,source,status".split(","),
    "mentor-request": "created_at,id,program,domain,name,phone,email,preferred_time,message,source,status".split(","),
}
sheets = {k: [] for k in HEADERS}
state = {"down": False, "last": {"ok": False}}


class Mock(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        if state["down"]:
            self.send_response(503); self.end_headers(); return
        res = {"ok": False, "error": "unauthorized"}
        if body.get("secret") == SECRET:
            h = HEADERS.get(body.get("form"))
            if body.get("form") == "ping":
                res = {"ok": True}
            elif not h or not body.get("row"):
                res = {"ok": False, "error": "unknown form"}
            elif any(r[h.index("id")] == str(body["row"]["id"]) for r in sheets[body["form"]]):
                res = {"ok": True, "duplicate": True}
            else:
                sheets[body["form"]].append([str(body["row"].get(c) or "") for c in h]); res = {"ok": True}
        state["last"] = res
        self.send_response(302); self.send_header("Location", "/echo"); self.end_headers()

    def do_GET(self):
        out = json.dumps(state["last"]).encode()
        self.send_response(200); self.send_header("Content-Length", str(len(out))); self.end_headers(); self.wfile.write(out)


def start_app(port, db, extra_env=None):
    env = dict(os.environ, PORT=str(port), DB_PATH=str(db), ADMIN_TOKEN=ADMIN, SHEETS_WEBHOOK_SECRET=SECRET,
               SHEETS_WEBHOOK_URL=f"http://127.0.0.1:{MOCK}/exec")
    env.update({"RATE_LIMIT": "200", **(extra_env or {})})
    p = subprocess.Popen([sys.executable, str(HERE / "server.py")], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(50):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/api/health", timeout=1); return p
        except Exception:
            time.sleep(0.2)
    p.kill(); raise RuntimeError("server did not start")


def call(port, method, path, body=None, headers=None, raw=None):
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    h = {"Content-Type": "application/json"} if data is not None else {}
    h.update(headers or {})
    req = urllib.request.Request(f"http://127.0.0.1:{port}{path}", data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def js(t): return json.loads(t[1])


def wait_for(cond, secs=15):
    end = time.time() + secs
    while time.time() < end:
        if cond(): return True
        time.sleep(0.3)
    return False


results = []
def check(name, ok, detail=""):
    results.append(ok); print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail and not ok else ""), flush=True)


LEAD = {"name": "Asha Rao", "phone": "9876543210", "college": "ABC College", "grad_year": "2027", "state": "Kerala", "department": "Computer Science", "source": "index.html"}
SUPPORT = {"topic": "Certificates", "name": "Ravi K", "email": "Ravi@Example.com", "phone": "9123456780", "message": "Where is my certificate?", "source": "support.html"}
AMB = {"name": "Meera S", "email": "meera@example.com", "phone": "+91 98765 00001", "college": "XYZ Univ", "referral": "Priya", "grad_year": "2026", "source": "campus-ambassador.html"}
MENTOR = {"program": "Machine Learning", "domain": "Computer Science", "name": "Mentor Seeker", "phone": "9876543299", "email": "Seeker@Example.com", "preferred_time": "Evening", "message": "Is this right for a final-year student?", "source": "program.html"}
DEL = {"name": "Del User", "email": "del@example.com", "reason": "Other", "confirmed": True, "source": "delete-account.html"}

if __name__ == "__main__":
    mock = HTTPServer(("127.0.0.1", MOCK), Mock)
    threading.Thread(target=mock.serve_forever, daemon=True).start()
    tmp = tempfile.mkdtemp()
    procs = []
    try:
        app = start_app(APP, Path(tmp) / "t.db"); procs.append(app)
        auth = {"Authorization": f"Bearer {ADMIN}"}

        check("health endpoint", js(call(APP, "GET", "/api/health")) == {"ok": True})

        # 1. every form stores and reaches its sheet, columns matched by header name
        for route, payload in (("leads", LEAD), ("support", SUPPORT), ("ambassador", AMB), ("delete-request", DEL), ("mentor-request", MENTOR)):
            st, body = call(APP, "POST", f"/api/{route}", payload)
            check(f"{route}: valid submission accepted (201)", st == 201, f"{st} {body[:80]}")
        check("all 5 sheets received exactly 1 row", wait_for(lambda: all(len(v) == 1 for v in sheets.values())), str({k: len(v) for k, v in sheets.items()}))
        if sheets["leads"]:
            row = dict(zip(HEADERS["leads"], sheets["leads"][0]))
            check("leads row has right values in right columns", row["name"] == "Asha Rao" and row["phone"] == "9876543210" and row["grad_year"] == "2027" and row["department"] == "Computer Science" and row["source"] == "index.html")
        if sheets["support"]:
            check("support: email lower-cased", dict(zip(HEADERS["support"], sheets["support"][0]))["email"] == "ravi@example.com")
        if sheets["ambassador"]:
            check("ambassador: '+91 98765 00001' normalised to 10 digits", dict(zip(HEADERS["ambassador"], sheets["ambassador"][0]))["phone"] == "9876500001")
        summary = js(call(APP, "GET", "/api/admin/summary", headers=auth))
        check("admin summary counts 1 each", summary == {"leads": 1, "support": 1, "ambassador": 1, "delete-request": 1, "mentor-request": 1}, str(summary))

        # 2. validation
        for name, route, bad, field in (
            ("bad phone", "leads", dict(LEAD, phone="1234567890"), "phone"),
            ("missing name", "leads", dict(LEAD, name=""), "name"),
            ("bad grad year", "leads", dict(LEAD, grad_year="1999"), "grad_year"),
            ("bad email", "support", dict(SUPPORT, email="nope"), "email"),
            ("missing message", "support", dict(SUPPORT, message=""), "message"),
            ("ambassador missing college", "ambassador", dict(AMB, college=""), "college"),
            ("deletion not confirmed", "delete-request", dict(DEL, confirmed=False), "confirmed"),
            ("mentor request missing program", "mentor-request", dict(MENTOR, program=""), "program"),
            ("mentor request bad phone", "mentor-request", dict(MENTOR, phone="12345"), "phone"),
            ("mentor request bad time slot", "mentor-request", dict(MENTOR, preferred_time="Midnight"), "preferred_time"),
        ):
            st, body = call(APP, "POST", f"/api/{route}", bad)
            check(f"validation: {name} -> 422 on '{field}'", st == 422 and field in json.loads(body).get("fields", {}), f"{st} {body[:100]}")
        check("rejected submissions were not stored", js(call(APP, "GET", "/api/admin/summary", headers=auth)) == summary)

        # 3. protocol / abuse handling
        check("wrong content-type -> 415", call(APP, "POST", "/api/leads", raw=b"a=1", headers={"Content-Type": "text/plain"})[0] == 415)
        check("invalid JSON -> 400", call(APP, "POST", "/api/leads", raw=b"{nope")[0] == 400)
        check("oversized body -> 413", call(APP, "POST", "/api/leads", raw=b"x" * 40000)[0] == 413)
        check("unknown route -> 404", call(APP, "POST", "/api/nothing", {})[0] == 404)
        st, _ = call(APP, "POST", "/api/leads", dict(LEAD, name="Bot", fax="spam"))
        check("honeypot: pretends success but stores nothing", st == 201 and js(call(APP, "GET", "/api/admin/summary", headers=auth))["leads"] == 1)
        check("admin without token -> 401", call(APP, "GET", "/api/admin/leads")[0] == 401)
        check("admin with wrong token -> 401", call(APP, "GET", "/api/admin/leads", headers={"Authorization": "Bearer nope"})[0] == 401)
        check("server source not downloadable (404)", call(APP, "GET", "/backend/server.py")[0] == 404 and call(APP, "GET", "/../backend/server.py")[0] in (400, 404))
        check("static site still served", call(APP, "GET", "/index.html")[0] == 200)
        call(APP, "POST", "/api/leads", dict(LEAD, name="=1+1", phone="9000000001"))
        st, body = call(APP, "GET", "/api/admin/leads?format=csv", headers=auth)
        cells = [r["name"] for r in csv.DictReader(io.StringIO(body.decode("utf-8-sig")))]
        check("CSV export neutralises formula injection", "'=1+1" in cells and "=1+1" not in cells, str(cells))

        # 4. Sheets outage -> rows kept, retried, no duplicates
        wait_for(lambda: len(sheets["leads"]) == 2)
        state["down"] = True
        call(APP, "POST", "/api/leads", dict(LEAD, name="During Outage", phone="9000000002"))
        time.sleep(2)
        rows = js(call(APP, "GET", "/api/admin/leads", headers=auth))["rows"]
        check("during outage: row is stored but marked unsynced", [r["synced"] for r in rows if r["name"] == "During Outage"] == [0])
        check("during outage: user-facing submit still succeeded (row exists)", any(r["name"] == "During Outage" for r in rows))
        state["down"] = False
        call(APP, "POST", "/api/leads", dict(LEAD, name="After Recovery", phone="9000000003"))
        ok = wait_for(lambda: len(sheets["leads"]) == 4)
        names = [dict(zip(HEADERS["leads"], r))["name"] for r in sheets["leads"]]
        check("after recovery: missed row + new row both arrive, no duplicates", ok and len(set(names)) == 4, str(names))
        rows = js(call(APP, "GET", "/api/admin/leads", headers=auth))["rows"]
        check("after recovery: every row marked synced", all(r["synced"] == 1 for r in rows))

        # 5. rate limit (own server with a tiny limit)
        rl = start_app(APP + 10, Path(tmp) / "rl.db", {"RATE_LIMIT": "3"}); procs.append(rl)
        codes = [call(APP + 10, "POST", "/api/leads", dict(LEAD, phone="9111111111"))[0] for _ in range(5)]
        check("rate limit: 4th+ request in a minute -> 429", codes == [201, 201, 201, 429, 429], str(codes))
    finally:
        for p in procs:
            p.kill()
        mock.shutdown()
    print(f"\n{sum(results)}/{len(results)} checks passed", flush=True)
    sys.exit(0 if all(results) else 1)
