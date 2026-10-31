/* Tests form validation and the request handler (lib/forms.ts) against a stub Apps Script endpoint.  Run: npm test */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { FORMS, handleForm, validate } from "../lib/forms.ts";

let server: http.Server;
let received: Array<{ secret: string; form: string; row: Record<string, string | null> }> = [];
let ok = true;

before(async () => {
  server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      received.push(JSON.parse(body));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok }));
    });
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  process.env.SHEETS_WEBHOOK_URL = `http://127.0.0.1:${(server.address() as AddressInfo).port}/exec`;
  process.env.SHEETS_WEBHOOK_SECRET = "test-secret";
  process.env.RATE_LIMIT = "1000";
});
after(() => { server.close(); });

const post = (route: string, payload: unknown, ip = "1.1.1.1", ct = "application/json") => handleForm(route, ct, JSON.stringify(payload), ip);

test("a valid lead is forwarded to the sheet with the secret and normalised fields", async () => {
  received = [];
  const r = await post("leads", { name: "  Aarav   M ", phone: "+91 98765 43210", college: "XYZ", grad_year: "2027", state: "Maharashtra", department: "Management", source: "/" });
  assert.equal(r.status, 201);
  assert.equal(received.length, 1);
  assert.equal(received[0].secret, "test-secret");
  assert.equal(received[0].form, "leads");
  assert.equal(received[0].row.name, "Aarav M");
  assert.equal(received[0].row.phone, "9876543210");
  assert.equal(received[0].row.status, "new");
  assert.ok(received[0].row.id && received[0].row.created_at);
});

test("invalid input is rejected with per-field errors and never forwarded", async () => {
  received = [];
  const r = await post("support", { topic: "t", name: "", email: "nope", message: "" });
  assert.equal(r.status, 422);
  const fields = (r.body as { fields: Record<string, string> }).fields;
  assert.deepEqual(Object.keys(fields).sort(), ["email", "message", "name"]);
  assert.equal(received.length, 0);
});

test("phone, email, choice and bool rules", () => {
  const spec = FORMS.ambassador;
  const base = { name: "A", email: "a@b.co", phone: "9876543210", college: "C", grad_year: "2026" };
  assert.deepEqual(validate(spec, base).errors, {});
  assert.ok(validate(spec, { ...base, phone: "5876543210" }).errors.phone);          // must start 6-9
  assert.ok(validate(spec, { ...base, phone: "98765" }).errors.phone);
  assert.ok(validate(spec, { ...base, email: "a@b" }).errors.email);
  assert.ok(validate(spec, { ...base, grad_year: "2030" }).errors.grad_year);        // ambassadors: 2026-2029 only
  assert.equal(validate(spec, { ...base, email: "A@B.CO" }).values.email, "a@b.co");
});

test("mentor requests keep program, domain, call time and message", async () => {
  received = [];
  const r = await post("mentor-request", { program: "DevOps", domain: "Computer Science", name: "M", phone: "9123456780", preferred_time: "Evening", message: "line one\n\n  line two " });
  assert.equal(r.status, 201);
  assert.equal(received[0].row.program, "DevOps");
  assert.equal(received[0].row.preferred_time, "Evening");
  assert.equal(received[0].row.message, "line one\n\nline two");
});

test("honeypot submissions pretend to succeed but are dropped", async () => {
  received = [];
  const r = await post("leads", { name: "bot", phone: "9876543210", fax: "spam" });
  assert.equal(r.status, 201);
  assert.equal(received.length, 0);
});

test("protocol errors: unknown form, wrong content type, bad JSON, oversize", async () => {
  assert.equal((await post("nope", {})).status, 404);
  assert.equal((await post("leads", {}, "1.1.1.1", "text/plain")).status, 415);
  assert.equal((await handleForm("leads", "application/json", "{not json", "1.1.1.1")).status, 400);
  assert.equal((await handleForm("leads", "application/json", "[1]", "1.1.1.1")).status, 400);
  assert.equal((await handleForm("leads", "application/json", JSON.stringify({ name: "x".repeat(40000) }), "1.1.1.1")).status, 413);
});

test("a sheet that refuses the row is reported as a failed save (502)", async () => {
  ok = false;
  const r = await post("leads", { name: "A", phone: "9876543210" });
  ok = true;
  assert.equal(r.status, 502);
});
