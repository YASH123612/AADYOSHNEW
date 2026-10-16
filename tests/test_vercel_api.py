#!/usr/bin/env python3
"""Tests the Vercel serverless form endpoints (api/*.py) against an emulated Apps Script.

    python tests/test_vercel_api.py

Runs the real handler classes under a local HTTP server (port 5201) and a mock of the Google Apps
Script web app (port 5202) that has the same contract as backend/google-apps-script.gs.
"""
import importlib.util
import json
import os
import sys
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = ROOT / "api"
SECRET = "test-secret"
sheet_rows = {}
state = {"down": False, "last": {"ok": False}}
HEADERS = {
    "leads": "created_at,id,name,phone,college,grad_year,state,department,source,status".split(","),
    "support": "created_at,id,topic,name,email,phone,message,source,status".split(","),
    "ambassador": "created_at,id,name,email,phone,college,referral,grad_year,source,status".split(","),
    "delete-request": "created_at,id,name,email,reason,confirmed,source,status".split(","),
    "mentor-request": "created_at,id,program,domain,name,phone,email,preferred_time,message,source,status".split(","),
}


class MockScript(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        if state["down"]:
            self.send_response(503); self.end_headers(); return
        res = {"ok": False, "error": "unauthorized"}
        if body.get("secret") == SECRET and body.get("form") in HEADERS:
            h = HEADERS[body["form"]]
            sheet_rows.setdefault(body["form"], []).append({c: ("" if body["row"].get(c) is None else str(body["row"][c])) for c in h})
            res = {"ok": True}
        state["last"] = res
        self.send_response(302); self.send_header("Location", "/echo"); self.end_headers()

    def do_GET(self):
        out = json.dumps(state["last"]).encode()
        self.send_response(200); self.send_header("Content-Length", str(len(out))); self.end_headers(); self.wfile.write(out)


def load(name):
    spec = importlib.util.spec_from_file_location("ep_" + name.replace("-", "_"), API / (name + ".py"))
    mod = importlib.util.module_from_spec(spec)
    sys.path.insert(0, str(API))
    spec.loader.exec_module(mod)
    return mod.handler


class Router(BaseHTTPRequestHandler):
    """Dispatches /api/<name> to the real endpoint handler classes."""
    def log_message(self, *a): pass

    def _dispatch(self):
        name = self.path.split("?")[0].rstrip("/").split("/")[-1]
        cls = ENDPOINTS.get(name)
        if not cls:
            self.send_response(404); self.end_headers(); return
        cls.do_POST(self) if self.command == "POST" else cls.do_GET(self)

    do_POST = do_GET = do_PUT = do_DELETE = _dispatch


def call(method, path, body=None, headers=None, raw=None):
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    h = {"Content-Type": "application/json"} if data is not None else {}
    h.update(headers or {})
    req = urllib.request.Request("http://127.0.0.1:5201" + path, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


results = []
def check(name, ok, detail=""):
    results.append(ok); print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail and not ok else ""), flush=True)


LEAD = {"name": "Asha Rao", "phone": "9876543210", "college": "ABC College", "grad_year": "2027", "state": "Kerala", "department": "Computer Science", "source": "index.html"}

if __name__ == "__main__":
    os.environ["SHEETS_WEBHOOK_URL"] = "http://127.0.0.1:5202/exec"
    os.environ["SHEETS_WEBHOOK_SECRET"] = SECRET
    os.environ["RATE_LIMIT"] = "1000"
    ENDPOINTS = {n: load(n) for n in ("leads", "support", "ambassador", "delete-request", "mentor-request")}
    mock = HTTPServer(("127.0.0.1", 5202), MockScript)
    app = HTTPServer(("127.0.0.1", 5201), Router)
    for s in (mock, app):
        threading.Thread(target=s.serve_forever, daemon=True).start()

    # every endpoint accepts a valid submission and the row reaches the right sheet
    cases = {
        "leads": LEAD,
        "support": {"topic": "Certificates", "name": "Ravi K", "email": "Ravi@Example.com", "phone": "9123456780", "message": "Hi", "source": "support.html"},
        "ambassador": {"name": "Meera S", "email": "meera@example.com", "phone": "+91 98765 00001", "college": "XYZ", "grad_year": "2026", "source": "campus-ambassador.html"},
        "mentor-request": {"program": "Machine Learning", "domain": "Computer Science", "name": "Mentor Seeker", "phone": "9876543299", "email": "Seeker@Example.com", "preferred_time": "Evening", "message": "Hi", "source": "program.html"},
        "delete-request": {"name": "Del User", "email": "del@example.com", "confirmed": True, "source": "delete-account.html"},
    }
    for route, payload in cases.items():
        st, body = call("POST", "/api/" + route, payload)
        check(f"{route}: valid submission -> 201 {{ok:true}}", st == 201 and body.get("ok") is True, f"{st} {body}")
        row = (sheet_rows.get(route) or [{}])[-1]
        check(f"{route}: row reached its sheet with id/status/created_at", bool(row.get("id")) and row.get("status") == "new" and "T" in row.get("created_at", ""), str(row))
    check("leads: values land in the right columns", sheet_rows["leads"][0]["name"] == "Asha Rao" and sheet_rows["leads"][0]["grad_year"] == "2027" and sheet_rows["leads"][0]["department"] == "Computer Science")
    check("support: email lower-cased", sheet_rows["support"][0]["email"] == "ravi@example.com")
    check("ambassador: phone normalised to 10 digits", sheet_rows["ambassador"][0]["phone"] == "9876500001")
    check("mentor-request: program/domain stored, email lower-cased", sheet_rows["mentor-request"][0]["program"] == "Machine Learning" and sheet_rows["mentor-request"][0]["domain"] == "Computer Science" and sheet_rows["mentor-request"][0]["email"] == "seeker@example.com")
    check("delete-request: confirmed stored as yes", sheet_rows["delete-request"][0]["confirmed"] == "yes")

    # validation matches the Python backend
    for name, route, bad, field in (
        ("bad phone", "leads", dict(LEAD, phone="1234567890"), "phone"),
        ("missing name", "leads", dict(LEAD, name=""), "name"),
        ("bad grad year", "leads", dict(LEAD, grad_year="1999"), "grad_year"),
        ("bad email", "support", dict(cases["support"], email="nope"), "email"),
        ("ambassador missing college", "ambassador", dict(cases["ambassador"], college=""), "college"),
        ("deletion not confirmed", "delete-request", dict(cases["delete-request"], confirmed=False), "confirmed"),
        ("mentor request missing program", "mentor-request", dict(cases["mentor-request"], program=""), "program"),
    ):
        before = sum(len(v) for v in sheet_rows.values())
        st, body = call("POST", "/api/" + route, bad)
        check(f"validation: {name} -> 422 on '{field}', nothing sent to the sheet", st == 422 and field in body.get("fields", {}) and sum(len(v) for v in sheet_rows.values()) == before, f"{st} {body}")

    # protocol / abuse handling
    check("wrong content-type -> 415", call("POST", "/api/leads", raw=b"a=1", headers={"Content-Type": "text/plain"})[0] == 415)
    check("invalid JSON -> 400", call("POST", "/api/leads", raw=b"{nope")[0] == 400)
    check("oversized body -> 413", call("POST", "/api/leads", raw=b"x" * 40000)[0] == 413)
    check("GET -> 405", call("GET", "/api/leads")[0] == 405)
    n = len(sheet_rows["leads"])
    st, _ = call("POST", "/api/leads", dict(LEAD, name="Bot", fax="spam"))
    check("honeypot: pretends success, sends nothing", st == 201 and len(sheet_rows["leads"]) == n)

    # Sheets unreachable -> visitor is told, and nothing is silently lost
    state["down"] = True
    st, body = call("POST", "/api/leads", dict(LEAD, name="During Outage"))
    check("sheets down -> 502 with a retry message (not a fake success)", st == 502 and "try again" in body.get("error", ""), f"{st} {body}")
    state["down"] = False
    st, _ = call("POST", "/api/leads", dict(LEAD, name="After Recovery"))
    check("after recovery -> 201 again", st == 201)

    # missing configuration
    os.environ["SHEETS_WEBHOOK_URL"] = ""
    st, _ = call("POST", "/api/leads", LEAD)
    check("missing env vars -> 502 (no crash)", st == 502)
    os.environ["SHEETS_WEBHOOK_URL"] = "http://127.0.0.1:5202/exec"

    # rate limit (library level: 8 per minute per IP)
    import _lib
    _lib.RATE_LIMIT = (8, 60)
    codes = [_lib.handle("leads", "application/json", json.dumps(LEAD).encode(), "9.9.9.9")[0] for _ in range(10)]
    check("rate limit: requests beyond 8/min from one IP -> 429", codes.count(429) >= 2 and codes[0] == 201, str(codes))

    print(f"\n{sum(results)}/{len(results)} checks passed", flush=True)
    sys.exit(0 if all(results) else 1)
