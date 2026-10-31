import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join aadyosh: open roles, how we work, and why a small mentor-obsessed team might be the right fit for you.",
};

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>
            Help Us Build The{" "}
            <span className="highlight">Future Of Learning.</span>
          </h1>
          <p className="lead">
            We're a small, mentor-obsessed team. If you care about outcomes over vanity metrics, we'd like to meet you.
          </p>
          <div className="cta-actions">
            <a href="#roles" className="btn btn-primary">
              <i className="fa-solid fa-list-check"></i>
              {" "}View open roles
            </a>
            {" "}
            <a href="mailto:hr@aadyosh.com" className="btn btn-outline">Email us</a>
          </div>
        </div>
      </section>
      <section className="stats-row">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-list-check"></i>
              </div>
              <div className="num">4</div>
              <div className="lbl">Open roles</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-house-laptop"></i>
              </div>
              <div className="num">100%</div>
              <div className="lbl">Remote-friendly</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="num">2</div>
              <div className="lbl">Hiring locations</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-people-group"></i>
              </div>
              <div className="num">Small</div>
              <div className="lbl">Tight-knit team</div>
            </div>
          </div>
        </div>
      </section>
      <section className="programs" id="roles">
        <div className="container">
          <div className="section-head center">
            <h2>
              Current{" "}
              <span className="highlight">Openings</span>
            </h2>
            <p>
              Don't see a fit below? Send your resume anyway — we're always open to meeting good people.
            </p>
          </div>
          <div className="convert-grid" style={{ textAlign: "left" }}>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <i className="fa-solid fa-chalkboard-user" style={{ color: "var(--brand-600)" }}></i>
              <h4 style={{ color: "var(--ink-900)" }}>Curriculum Designer</h4>
              <p style={{ color: "var(--ink-500)", marginBottom: "14px" }}>Remote · Full-time</p>
              <a href="mailto:hr@aadyosh.com?subject=Application%3A%20Curriculum%20Designer" className="link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "var(--brand-600)" }}>
                Apply now{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <i className="fa-solid fa-headset" style={{ color: "var(--brand-600)" }}></i>
              <h4 style={{ color: "var(--ink-900)" }}>Learner Success Associate</h4>
              <p style={{ color: "var(--ink-500)", marginBottom: "14px" }}>Bengaluru · Full-time</p>
              <a href="mailto:hr@aadyosh.com?subject=Application%3A%20Learner%20Success%20Associate" className="link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "var(--brand-600)" }}>
                Apply now{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <i className="fa-solid fa-code" style={{ color: "var(--brand-600)" }}></i>
              <h4 style={{ color: "var(--ink-900)" }}>Frontend Engineer</h4>
              <p style={{ color: "var(--ink-500)", marginBottom: "14px" }}>Remote · Full-time</p>
              <a href="mailto:hr@aadyosh.com?subject=Application%3A%20Frontend%20Engineer" className="link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "var(--brand-600)" }}>
                Apply now{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <i className="fa-solid fa-people-group" style={{ color: "var(--brand-600)" }}></i>
              <h4 style={{ color: "var(--ink-900)" }}>Placement Partnerships Lead</h4>
              <p style={{ color: "var(--ink-500)", marginBottom: "14px" }}>Bengaluru · Full-time</p>
              <a href="mailto:hr@aadyosh.com?subject=Application%3A%20Placement%20Partnerships%20Lead" className="link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "var(--brand-600)" }}>
                Apply now{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Don't See The Right Role?</h2>
            <p>Send us your resume anyway — we're always looking for great people to join aadyosh.</p>
            <div className="cta-actions">
              <a href="mailto:hr@aadyosh.com" className="btn btn-dark">
                Email your resume{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              {" "}
              <Link href="/" className="btn btn-ghost-light">Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
