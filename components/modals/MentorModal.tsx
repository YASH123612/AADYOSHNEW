"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Honeypot, useSubmit } from "@/components/forms/useSubmit";
import type { MentorContext } from "./ModalProvider";

const FOCUSABLE = "a[href], button:not([disabled]), input:not([type=hidden]), select, textarea";

/** "Talk to a mentor" pop-up: one form, filled in for whichever program and domain opened it. */
export function MentorModal({ open, ctx, onClose }: { open: boolean; ctx: MentorContext; onClose: () => void }) {
  const { submit, pending, error } = useSubmit("mentor-request");
  const [done, setDone] = useState(false);
  const [fax, setFax] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => nameRef.current?.focus(), 30);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !boxRef.current) return;      // keep keyboard focus inside the dialog
      const f = [...boxRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const ok = await submit({ program: ctx.program, domain: ctx.domain, name: v("name"), phone: v("phone"), email: v("email"), preferred_time: v("preferred_time"), message: v("message"), fax });
    if (ok) setDone(true);
  }

  return (
    <div className={"modal-overlay" + (open ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={boxRef} className="modal-box lead-modal" role="dialog" aria-modal="true" aria-labelledby="mentorModalTitle">
        <div className="modal-head">
          <Link href="/" className="logo" onClick={onClose}>
            <img className="logo-mark-img" src="/assets/img/logo-mark.png" alt="" />
            <img className="logo-word-img" src="/assets/img/logo-wordmark.png" alt="aadyosh" />
          </Link>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog"><i className="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <div className="modal-body">
          <h3 id="mentorModalTitle">Talk to a mentor</h3>
          <p className="sub">Tell us how to reach you. A mentor for <b>{ctx.program || "this program"}</b> will get in touch.</p>
          <hr />

          {!done && (
            <form onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="mtName">Full name</label>
                <input ref={nameRef} type="text" id="mtName" name="name" placeholder="Your full name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="mtPhone">Phone number</label>
                <div className="phone-field">
                  <span className="phone-code">IN +91</span>
                  <input type="tel" id="mtPhone" name="phone" placeholder="10-digit number" inputMode="numeric" pattern="[0-9]{10}" autoComplete="tel-national" required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="mtEmail">Email (optional)</label>
                  <input type="email" id="mtEmail" name="email" placeholder="you@example.com" autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="mtTime">Best time to call</label>
                  <select id="mtTime" name="preferred_time" defaultValue="">
                    <option value="">Any time</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Weekend</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="mtMessage">Anything you&apos;d like to ask? (optional)</label>
                <textarea id="mtMessage" name="message" rows={2} maxLength={500} placeholder="e.g. Is this right for a final-year student?"></textarea>
              </div>
              <Honeypot value={fax} onChange={setFax} />
              <p className="form-consent">We&apos;ll call or WhatsApp you about this program. No spam.</p>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
                {pending ? "Sending..." : <>Request a call back <i className="fa-solid fa-arrow-right"></i></>}
              </button>
            </form>
          )}

          <div className={"form-success" + (done ? " show" : "")} role="status">
            <div className="ic"><i className="fa-solid fa-check"></i></div>
            <h3 style={{ fontSize: 19, marginBottom: 8 }}>Got it — thanks!</h3>
            <p style={{ color: "var(--ink-500)", fontSize: 14 }}>A mentor will reach out shortly about <b>{ctx.program || "your program"}</b>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
