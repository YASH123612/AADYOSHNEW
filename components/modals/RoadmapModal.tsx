"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Honeypot, useSubmit } from "@/components/forms/useSubmit";

const SUBMITTED_KEY = "roadmapModalSubmitted";
const FIRST_OPEN_MS = 5000;
const REPEAT_MS = 120000;

const store = {
  submitted: () => { try { return !!sessionStorage.getItem(SUBMITTED_KEY); } catch { return false; } },
  markSubmitted: () => { try { sessionStorage.setItem(SUBMITTED_KEY, "1"); } catch { /* private mode */ } },
};

const STATES = ["Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other"];
const DEPARTMENTS = ["Computer Science", "Electrical & Electronics", "Mechanical", "Civil", "Management", "Healthcare & Life Sciences"];
const GRAD_YEARS = ["2026", "2027", "2028", "2029", "2030", "Already graduated"];

/** "Get your best-fit program roadmap" lead form. Opens on request, and by itself on the homepage (5s in, then every 2 min after each close). */
export function RoadmapModal({ open, onClose, onOpenRequest }: { open: boolean; onClose: () => void; onOpenRequest: () => void }) {
  const pathname = usePathname();
  const { submit, pending, error } = useSubmit("leads");
  const [done, setDone] = useState(false);
  const [fax, setFax] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // reset to the form each time it opens
  useEffect(() => {
    if (open) { setDone(false); setTimeout(() => nameRef.current?.focus(), 30); }
  }, [open]);

  // homepage auto-open: after 5s, then again 2 minutes after each close (until the form has been submitted)
  useEffect(() => {
    if (pathname !== "/" || open || store.submitted()) return;
    timer.current = setTimeout(() => { if (!store.submitted()) onOpenRequest(); }, hasOpenedBefore.value ? REPEAT_MS : FIRST_OPEN_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [pathname, open, onOpenRequest]);
  useEffect(() => { if (open) hasOpenedBefore.value = true; }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const ok = await submit({ name: v("name"), phone: v("phone"), college: v("college"), grad_year: v("grad_year"), state: v("state"), department: v("department"), fax });
    if (ok) { setDone(true); store.markSubmitted(); if (timer.current) clearTimeout(timer.current); }
  }

  return (
    <div className={"modal-overlay" + (open ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box lead-modal" role="dialog" aria-modal="true" aria-labelledby="roadmapModalTitle">
        <div className="modal-head">
          <Link href="/" className="logo" onClick={onClose}>
            <img className="logo-mark-img" src="/assets/img/logo-mark.png" alt="" />
            <img className="logo-word-img" src="/assets/img/logo-wordmark.png" alt="aadyosh" />
          </Link>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog"><i className="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <div className="modal-body">
          <h3 id="roadmapModalTitle">Get your best-fit program roadmap</h3>
          <p className="sub">Share a few details. We&apos;ll suggest the most relevant track.</p>
          <hr />

          {!done && (
            <form onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="rmName">Full name</label>
                <input ref={nameRef} type="text" id="rmName" name="name" placeholder="Your full name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="rmPhone">Phone number</label>
                <div className="phone-field">
                  <span className="phone-code">IN +91</span>
                  <input type="tel" id="rmPhone" name="phone" placeholder="10-digit number" inputMode="numeric" pattern="[0-9]{10}" autoComplete="tel-national" required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="rmCollege">College</label>
                  <input type="text" id="rmCollege" name="college" placeholder="College / university name" autoComplete="organization" />
                </div>
                <div className="field">
                  <label htmlFor="rmGradYear">Graduation year</label>
                  <select id="rmGradYear" name="grad_year" defaultValue="">
                    <option value="">Select year</option>
                    {GRAD_YEARS.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="rmState">State</label>
                  <select id="rmState" name="state" defaultValue="">
                    <option value="">State</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="rmDept">Department</label>
                  <select id="rmDept" name="department" defaultValue="">
                    <option value="">Department</option>
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <Honeypot value={fax} onChange={setFax} />
              <p className="form-consent">We&apos;ll reach out via call or WhatsApp for quick counselling.</p>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
                {pending ? "Sending..." : <>Get my roadmap <i className="fa-solid fa-arrow-right"></i></>}
              </button>
            </form>
          )}

          <div className={"form-success" + (done ? " show" : "")} role="status">
            <div className="ic"><i className="fa-solid fa-check"></i></div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>Got it — thanks!</h3>
            <p style={{ color: "var(--ink-500)", fontSize: 14 }}>A mentor will reach out shortly with your best-fit program roadmap.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Module-level flag: the first auto-open waits 5s, later ones 2 minutes. */
const hasOpenedBefore = { value: false };
