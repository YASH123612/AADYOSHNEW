"use client";

import { useState } from "react";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { CERT_TABS, FAQS, REVIEWS, STEPS } from "@/lib/content";
import { PROGRAMS, programHref } from "@/lib/programs";

/* ---------- 5-step enrolment stepper ---------- */
export function Stepper() {
  const [step, setStep] = useState(1);
  const s = STEPS[step - 1];
  return (
    <>
      <div className="stepper" id="stepper">
        {STEPS.map((st, i) => (
          <div key={st.label} className={"step-node" + (i + 1 < step ? " done" : "") + (i + 1 === step ? " active" : "")} onClick={() => setStep(i + 1)}>
            <div className="circle"><i className={st.icon}></i></div>
            <span className="label">{st.label}</span>
            <div className="step-line"></div>
          </div>
        ))}
      </div>
      <div className="step-panel" id="stepPanel">
        <div className="step-card">
          <span className="tag">{s.tag}</span>
          <h3>{s.title}</h3>
          <ul className="check-list">{s.checks.map((c) => <li key={c}><i className="fa-solid fa-circle-check"></i>{c}</li>)}</ul>
        </div>
        <div className="step-info">
          <span className="tag">What happens here</span>
          <h3>{s.panelTitle}</h3>
          <p style={{ color: "var(--ink-300)", fontSize: 14, marginBottom: 20 }}>{s.info}</p>
          <div className="progress-label"><span>Progress</span><span>{step}/{STEPS.length}</span></div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${(step / STEPS.length) * 100}%` }}></div></div>
          <div className="step-controls">
            <button className="btn btn-outline" disabled={step === 1} style={step === 1 ? { opacity: 0.4 } : undefined} onClick={() => setStep((n) => Math.max(1, n - 1))}>
              <i className="fa-solid fa-chevron-left"></i> Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep((n) => Math.min(STEPS.length, n + 1))}>
              {step === STEPS.length ? "Finish" : "Next"} <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Programs section: domain tabs + program cards ---------- */
const PROGRAM_TABS = [
  { cat: "cs", icon: "fa-solid fa-code", label: "Computer Science" },
  { cat: "mgmt", icon: "fa-solid fa-briefcase", label: "Management" },
] as const;

export function ProgramTabs() {
  const [cat, setCat] = useState<(typeof PROGRAM_TABS)[number]["cat"]>("cs");
  return (
    <>
      <div className="tab-bar" id="tabBar">
        {PROGRAM_TABS.map((t) => (
          <button key={t.cat} className={cat === t.cat ? "active" : ""} onClick={() => setCat(t.cat)}>
            <i className={t.icon}></i> {t.label} <span className="count">{PROGRAMS[t.cat].length}</span>
          </button>
        ))}
      </div>
      <div className="program-grid" id="programGrid">
        {PROGRAMS[cat].map((p) => (
          <Link key={p.title} className="program-card" href={programHref(p.title)} aria-label={`View program: ${p.title}`}>
            <div className="program-icon"><i className={p.icon} aria-hidden="true"></i></div>
            <div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <div className="mega-tags"><span>Certificate</span><span>Mentor-led</span></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

/* ---------- certificate preview ---------- */
export function CertPreview() {
  const [i, setI] = useState(0);
  const c = CERT_TABS[i];
  const go = (n: number) => setI((n + CERT_TABS.length) % CERT_TABS.length);
  const TABS = [["Training", "Cohort completion"], ["Internship", "Project + review proof"], ["Excellence", "Top performance"]];
  return (
    <div className="cert-preview">
      <div className="cert-preview-head">
        <div><span className="l">Certificate preview</span><h4>{c.label}</h4></div>
        <div className="cert-arrows">
          <button onClick={() => go(i - 1)} aria-label="Previous certificate"><i className="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
          <button onClick={() => go(i + 1)} aria-label="Next certificate"><i className="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <div className="cert-canvas">
        <div className="brand">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4 L44 40 L32 40 L24 24 L16 40 L4 40 Z" fill="#5f1fa3" /></svg>
          aadyosh
        </div>
        <div className="kind">{c.kind}</div>
        <div className="sub">of training completion</div>
        <div className="name">Student Name</div>
        <p className="desc">{c.desc}</p>
        <div className="foot">
          <div className="sig">Program Mentor<small>Signature</small></div>
          <div className="seal">SAMPLE<br />SEAL</div>
        </div>
      </div>
      <div className="cert-tabs">
        {TABS.map(([t1, t2], n) => (
          <button key={t1} className={i === n ? "active" : ""} onClick={() => setI(n)}><div className="t1">{t1}</div><div className="t2">{t2}</div></button>
        ))}
      </div>
      <p className="sample-note">Sample layout for illustration — not a real issued certificate.</p>
    </div>
  );
}

/* ---------- short testimonials + FAQ ---------- */
export function ReviewGrid() {
  return (
    <div className="review-grid" id="reviewGrid">
      {REVIEWS.map((r) => (
        <div key={r.name} className="review-card">
          <div className="stars">{"★".repeat(5)}</div>
          <p className="quote">&quot;{r.quote}&quot;</p>
          <div className="review-person">
            <div className="avatar">{r.name.split(" ").map((w) => w[0]).join("")}</div>
            <div><div className="name">{r.name}</div><div className="role">{r.role}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqList() {
  return <Accordion id="faqList" miniLinks items={FAQS.map((f) => ({ icon: f.icon, tag: f.tag, q: f.q, a: f.a }))} />;
}
