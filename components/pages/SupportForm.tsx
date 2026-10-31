"use client";

import { useState, type FormEvent } from "react";
import { Honeypot, useSubmit } from "@/components/forms/useSubmit";

const TOPICS = ["Programs & enrollment", "Payments & billing", "Certificates", "Placement support", "Technical / LMS access", "Partnerships", "Other"];

/** "Submit A Request" ticket form (card with heading, form and success state). */
export function SupportFormCard() {
  const { submit, pending, error } = useSubmit("support");
  const [done, setDone] = useState(false);
  const [fax, setFax] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (await submit({ topic: v("topic"), name: v("name"), email: v("email"), phone: v("phone"), message: v("message"), fax })) setDone(true);
  }

  return (
    <div className="app-form-card">
      <h3 style={{ fontSize: 22, marginBottom: 6 }}>Submit A Request</h3>
      <p style={{ color: "var(--ink-500)", fontSize: 13, marginBottom: 22 }}>Routed automatically to the right team. Expected response: within 24–48 hours.</p>

      {!done && (
        <form onSubmit={onSubmit}>
          <div className="field" style={{ marginBottom: 18 }}>
            <label htmlFor="suTopic">Topic</label>
            <select id="suTopic" name="topic" defaultValue="" required>
              <option value="">Select a topic</option>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="suName">Full name</label><input type="text" id="suName" name="name" placeholder="Your full name" autoComplete="name" required /></div>
            <div className="field"><label htmlFor="suEmail">Email</label><input type="email" id="suEmail" name="email" placeholder="you@example.com" autoComplete="email" required /></div>
          </div>
          <div className="field" style={{ marginBottom: 18 }}>
            <label htmlFor="suPhone">Phone (optional)</label>
            <input type="tel" id="suPhone" name="phone" placeholder="10-digit number" inputMode="numeric" pattern="[0-9]{10}" autoComplete="tel-national" />
          </div>
          <div className="field" style={{ marginBottom: 22 }}>
            <label htmlFor="suMessage">Message</label>
            <textarea id="suMessage" name="message" placeholder="Tell us what's going on — the more detail, the faster we can help." required></textarea>
          </div>
          <Honeypot value={fax} onChange={setFax} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
            {pending ? "Sending..." : <>Send ticket <i className="fa-solid fa-arrow-right"></i></>}
          </button>
          <p className="form-consent">By submitting, you agree to be contacted by aadyosh about this request.</p>
        </form>
      )}

      <div className={"form-success" + (done ? " show" : "")} role="status">
        <div className="ic"><i className="fa-solid fa-check"></i></div>
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>Ticket received</h3>
        <p style={{ color: "var(--ink-500)", fontSize: 14 }}>We&apos;ve routed your request to the right team and will follow up over email within 24–48 hours.</p>
      </div>
    </div>
  );
}
