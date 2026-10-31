import type { Metadata } from "next";
import Link from "next/link";
import { AmbassadorFormCard, AmbTabs, TierRail, AmbFaq } from "@/components/pages/CampusParts";

export const metadata: Metadata = {
  title: "Campus Ambassador",
  description: "Become an aadyosh Campus Captain: lead your campus, unlock internships and stipends, and build real community impact.",
};

export default function CampusAmbassadorPage() {
  return (
    <>
      <section className="amb-hero">
        <div className="container amb-hero-grid">
          <div>
            <span className="eyebrow">
              <i className="fa-solid fa-earth-asia"></i>
              {" "}Pan-India rollout · Merit shortlisting
            </span>
            <h1 style={{ fontSize: "clamp(30px,4.2vw,48px)", margin: "20px 0 16px", color: "var(--ink-900)" }}>
              Lead Your Campus.{" "}
              <span className="highlight">Unlock</span>
              {" "}Internships + Stipends.
            </h1>
            <p style={{ color: "var(--ink-500)", fontSize: "16px", maxWidth: "480px" }}>
              A structured program for high-intent students who can execute with integrity — build reach, build community, and drive measurable outcomes.
            </p>
            <div className="amb-benefit-grid">
              <div className="amb-benefit">
                <div className="ic">
                  <i className="fa-solid fa-sack-dollar"></i>
                </div>
                <div>
                  <h4>Performance stipends</h4>
                  <p>Earn on verified impact, not hype.</p>
                </div>
              </div>
              <div className="amb-benefit">
                <div className="ic">
                  <i className="fa-solid fa-unlock-keyhole"></i>
                </div>
                <div>
                  <h4>Priority opportunities</h4>
                  <p>Internships + program access for top captains.</p>
                </div>
              </div>
              <div className="amb-benefit">
                <div className="ic">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div>
                  <h4>Merch + recognition</h4>
                  <p>Badges, certificates, spotlight features.</p>
                </div>
              </div>
              <div className="amb-benefit">
                <div className="ic">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <div>
                  <h4>Establish a chapter</h4>
                  <p>Create a real community on your campus.</p>
                </div>
              </div>
            </div>
          </div>
          <AmbassadorFormCard />
        </div>
      </section>
      <section className="stats-row" style={{ paddingTop: "70px" }}>
        <div className="container">
          <div className="section-head center" style={{ marginBottom: "36px" }}>
            <span className="eyebrow">
              <i className="fa-solid fa-chart-line"></i>
              {" "}Program impact
            </span>
            <h2>
              A Ladder You Can{" "}
              <span className="highlight">Actually Climb</span>
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <div className="num">50+</div>
              <div className="lbl">Colleges targeted (Phase 1)</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div className="num">5000+</div>
              <div className="lbl">Students reached / month</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="num">25</div>
              <div className="lbl">Top captains shortlisted</div>
            </div>
          </div>
        </div>
      </section>
      <section className="programs">
        <div className="container">
          <span className="eyebrow">
            <i className="fa-solid fa-crown"></i>
            {" "}What captains actually do
          </span>
          <h2 style={{ margin: "16px 0 30px" }}>
            Simple Responsibilities.{" "}
            <span className="highlight">High Leverage Impact.</span>
          </h2>
          <AmbTabs />
        </div>
      </section>
      <section className="how">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">
            <i className="fa-solid fa-gift"></i>
            {" "}Milestones & rewards
          </span>
          <h2 style={{ margin: "16px 0 14px" }}>
            A Clean Ladder.{" "}
            <span className="highlight">Strong Incentives.</span>
          </h2>
          <p style={{ color: "var(--ink-500)", maxWidth: "560px", margin: "0 auto 10px" }}>
            Compact tiers, verified milestones, tangible perks — targets verified, rewards unlocked after review.
          </p>
          <TierRail />
          <div className="tier-grid">
            <div className="tier-card bronze">
              <div className="tier-icon">
                <i className="fa-solid fa-medal" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div className="tier-label">Tier</div>
                <div className="tier-name">Bronze</div>
                <div className="tier-count">5+ verified referrals</div>
              </div>
              <div className="tier-divider"></div>
              <div className="tier-perks">
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Captain badge + verification</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Certificate of appreciation</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Starter workshop access</span>
                </div>
              </div>
            </div>
            <div className="tier-card silver">
              <div className="tier-icon">
                <i className="fa-solid fa-award" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div className="tier-label">Tier</div>
                <div className="tier-name">Silver</div>
                <div className="tier-count">15+ verified referrals</div>
              </div>
              <div className="tier-divider"></div>
              <div className="tier-perks">
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Everything in Bronze</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Coupon benefits (program-based)</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Letter of recommendation</span>
                </div>
              </div>
            </div>
            <div className="tier-card gold">
              <div className="tier-badge">Most earned</div>
              <div className="tier-icon">
                <i className="fa-solid fa-trophy" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div className="tier-label">Tier</div>
                <div className="tier-name">Gold</div>
                <div className="tier-count">30+ verified referrals</div>
              </div>
              <div className="tier-divider"></div>
              <div className="tier-perks">
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Lead a student chapter</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Merch kit (hoodie + stickers)</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Priority internship shortlisting</span>
                </div>
              </div>
            </div>
            <div className="tier-card platinum">
              <div className="tier-icon">
                <i className="fa-solid fa-gem" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div className="tier-label">Tier</div>
                <div className="tier-name">Platinum</div>
                <div className="tier-count">50+ verified referrals</div>
              </div>
              <div className="tier-divider"></div>
              <div className="tier-perks">
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Competitive stipends</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>PPO consideration*</span>
                </div>
                <div className="tier-perk">
                  <div className="check-pop">
                    <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "11px" }}></i>
                  </div>
                  <span>Work with the aadyosh team</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tier-footnote">
            <span className="shield-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            {" "}
            <span>
              Verification matters — perks are tied to verified referrals to keep the program clean and fair.
            </span>
          </div>
        </div>
      </section>
      <section className="programs">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">
              <i className="fa-solid fa-list-check"></i>
              {" "}Selection & onboarding
            </span>
            <h2>
              Fast, Structured,{" "}
              <span className="highlight">Merit-Based.</span>
            </h2>
            <p>No long interviews, no unnecessary steps — optimized for execution.</p>
          </div>
          <div className="convert-grid" style={{ textAlign: "left", gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--brand-600)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", marginBottom: "14px" }}>1</div>
              <h4 style={{ color: "var(--ink-900)" }}>Apply</h4>
              <p style={{ color: "var(--ink-500)" }}>A 60-second form. One unique captain per college.</p>
            </div>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--brand-600)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", marginBottom: "14px" }}>2</div>
              <h4 style={{ color: "var(--ink-900)" }}>Shortlist</h4>
              <p style={{ color: "var(--ink-500)" }}>We check communication, campus activity, and intent.</p>
            </div>
            <div className="convert-card" style={{ borderColor: "var(--ink-100)", background: "var(--white)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--brand-600)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", marginBottom: "14px" }}>3</div>
              <h4 style={{ color: "var(--ink-900)" }}>Onboard</h4>
              <p style={{ color: "var(--ink-500)" }}>Starter kit, assets, and playbook. First milestone starts right away.</p>
            </div>
          </div>
          <div style={{ marginTop: "30px", background: "var(--ink-50)", borderRadius: "var(--radius-lg)", padding: "22px 26px", display: "flex", flexWrap: "wrap", gap: "18px", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: "800", fontSize: "14px", color: "var(--ink-900)", marginBottom: "4px" }}>Eligibility</div>
              <div style={{ fontSize: "13px", color: "var(--ink-500)" }}>
                Engineering / Management undergrads · Strong communication · Active on campus · Consistent weekly time
              </div>
            </div>
            <a href="#top" className="btn btn-primary btn-sm">
              Apply now{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow on-dark">
              <i className="fa-solid fa-circle-question"></i>
              {" "}Frequently asked questions
            </span>
            <h2 style={{ color: "#fff", margin: "18px 0 14px" }}>
              Fast Answers.{" "}
              <span style={{ color: "var(--brand-300)" }}>No Confusion.</span>
            </h2>
            <p style={{ color: "var(--ink-300)", fontSize: "16px" }}>One accordion open at a time, clean and easy to scan.</p>
            <div className="faq-tag-row">
              <span>Limited seats per college</span>
            </div>
          </div>
          <AmbFaq />
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Ready To Represent aadyosh On Campus?</h2>
            <p>Apply now — if shortlisted, you'll receive onboarding details and your starter kit.</p>
            <div className="cta-actions">
              <a href="#top" className="btn btn-dark">
                Apply now{" "}
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
