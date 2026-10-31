"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { Accordion } from "@/components/Accordion";
import { Honeypot, useSubmit } from "@/components/forms/useSubmit";

/* ---------- "Become a Campus Captain" application ---------- */
const YEARS = ["2026", "2027", "2028", "2029"];

export function AmbassadorFormCard() {
  const { submit, pending, error } = useSubmit("ambassador");
  const [done, setDone] = useState(false);
  const [year, setYear] = useState("2026");
  const [fax, setFax] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (await submit({ name: v("fullName"), email: v("email"), phone: v("phone"), college: v("college"), referral: v("referral"), grad_year: year, fax })) setDone(true);
  }

  return (
    <div className="app-form-card">
      <span className="eyebrow" style={{ marginBottom: 10 }}>Application</span>
      <h3 style={{ fontSize: 22, marginBottom: 22 }}>Become a Campus Captain</h3>
      {!done && (
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field"><label htmlFor="fullName">Full Name *</label><input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required /></div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="email">Email *</label><input type="email" id="email" name="email" placeholder="you@example.com" required /></div>
            <div className="field"><label htmlFor="phone">Phone *</label><input type="tel" id="phone" name="phone" placeholder="10-digit number" required /></div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="college">College Name *</label><input type="text" id="college" name="college" placeholder="Enter your college name" required /></div>
            <div className="field"><label htmlFor="referral">Referred By (optional)</label><input type="text" id="referral" name="referral" placeholder="Executive / guide name" /></div>
          </div>
          <div className="field" style={{ marginBottom: 22 }}>
            <label>Graduation Year *</label>
            <div className="year-pills" role="radiogroup" aria-label="Graduation year">
              {YEARS.map((y) => (
                <button key={y} type="button" className={"year-pill" + (year === y ? " active" : "")} role="radio" aria-checked={year === y} onClick={() => setYear(y)}>{y}</button>
              ))}
            </div>
          </div>
          <Honeypot value={fax} onChange={setFax} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
            {pending ? "Sending..." : <>Submit application <i className="fa-solid fa-arrow-right"></i></>}
          </button>
          <p className="form-consent">By submitting, you agree to be contacted by aadyosh about the Campus Captain program.</p>
        </form>
      )}
      <div className={"form-success" + (done ? " show" : "")} role="status">
        <div className="ic"><i className="fa-solid fa-check"></i></div>
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>Application received</h3>
        <p style={{ color: "var(--ink-500)", fontSize: 14 }}>We&apos;ll review your details and follow up over email within a few days.</p>
      </div>
    </div>
  );
}

/* ---------- responsibilities tabs ---------- */
const AMB_TABS = {
  reach: {
    label: "Build Reach", icon: "fa-solid fa-bullhorn",
    items: ["Share aadyosh cohorts + internship tracks in groups", "Host a mini-session (online/offline) with a provided kit", "Collect feedback & objections from students"],
    time: "3–5 hours/week · Flexible · Works alongside academics",
  },
  community: {
    label: "Build Community", icon: "fa-solid fa-people-group",
    items: ["Run a campus WhatsApp/Discord group for learners", "Organize monthly meetups or study circles", "Onboard new members with the starter kit"],
    time: "2–4 hours/week · Flexible · Ongoing",
  },
  outcomes: {
    label: "Build Outcomes", icon: "fa-regular fa-square-check",
    items: ["Track referred students through enrollment", "Share verified outcomes (placements, certificates) back to HQ", "Flag drop-off points so the program can improve"],
    time: "1–3 hours/week · Monthly reporting cadence",
  },
} as const;
type TabKey = keyof typeof AMB_TABS;

export function AmbTabs() {
  const [key, setKey] = useState<TabKey>("reach");
  const t = AMB_TABS[key];
  return (
    <>
      <div className="tab-pill-row" id="ambTabs" role="tablist" aria-label="Ambassador responsibilities">
        {(Object.keys(AMB_TABS) as TabKey[]).map((k) => (
          <button key={k} className={"tab-pill" + (key === k ? " active" : "")} id={`tab-${k}`} role="tab" aria-selected={key === k} aria-controls="ambTabContent" onClick={() => setKey(k)}>
            <i className={AMB_TABS[k].icon} aria-hidden="true"></i> {AMB_TABS[k].label}
          </button>
        ))}
      </div>
      <div className="tab-content-card" id="ambTabContent" role="tabpanel" aria-live="polite">
        <span className="now">Now viewing</span>
        <h3>{t.label}</h3>
        <ul className="check-list">{t.items.map((i) => <li key={i}><i className="fa-solid fa-circle-check"></i>{i}</li>)}</ul>
        <div className="time-box"><div className="lbl">Time commitment</div>{t.time}</div>
      </div>
    </>
  );
}

/* ---------- tier rail: dots that scroll to the matching tier card ---------- */
const TIERS = [
  { tier: "bronze", label: "Bronze · 5+", color: "var(--bronze)", fill: "linear-gradient(135deg,#c98a45,#8a5323)" },
  { tier: "silver", label: "Silver · 15+", color: "var(--silver)", fill: "linear-gradient(135deg,#9aa4b2,#4d5560)" },
  { tier: "gold", label: "Gold · 30+", color: "var(--gold)", fill: "linear-gradient(135deg,#f8dc86,#c9960c)" },
  { tier: "platinum", label: "Platinum · 50+", color: "var(--brand-500)", fill: "linear-gradient(135deg,var(--brand-500),var(--accent-500))" },
];

export function TierRail() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="tier-rail">
      <div className="tier-rail-nodes" id="tierRailNodes">
        {TIERS.map((t) => (
          <button
            key={t.tier}
            type="button"
            className={"tier-rail-node" + (active === t.tier ? " active" : "")}
            style={{ "--dot-color": t.color, "--dot-fill": t.fill } as CSSProperties}
            onClick={() => { setActive(t.tier); document.querySelector(".tier-card." + t.tier)?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
          >
            <span className="tier-rail-dot"></span>
            <span className="tier-rail-label">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- FAQ (one open at a time) ---------- */
export function AmbFaq() {
  return (
    <Accordion
      id="ambFaqList"
      single
      items={[
        { icon: "fa-solid fa-sack-dollar", q: "Do Campus Captains get paid?", a: "Yes — stipends and rewards are performance-based and unlock via the verified milestones ladder." },
        { icon: "fa-solid fa-user-check", q: "How do referrals get verified?", a: "Verification happens through onboarding and internal checks, to prevent spam or duplicate submissions." },
        { icon: "fa-solid fa-people-group", q: "Can multiple students from the same college apply?", a: "Yes, but only one captain is selected per college for each program cycle." },
        { icon: "fa-regular fa-clock", q: "How much time is required weekly?", a: "Typically 3–5 hours a week — designed to fit alongside academics." },
      ]}
    />
  );
}
