import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything aadyosh learners get: AI mock interviews, code practice, an ATS resume builder, analytics, and more, in one platform.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>
            Everything You Need In{" "}
            <span className="highlight">One Platform.</span>
          </h1>
          <p className="lead">
            Practice, feedback, and placement tools that stay with you for the whole program — not a stack of disconnected tools.
          </p>
          <div className="cta-actions">
            <a href="#ecosystem" className="btn btn-primary">
              <i className="fa-solid fa-layer-group"></i>
              {" "}Explore all features
            </a>
            {" "}
            <a className="btn btn-outline">Talk to a mentor</a>
          </div>
        </div>
      </section>
      <section className="stats-row">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div className="num">50+</div>
              <div className="lbl">Code lab challenges</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-clipboard-check"></i>
              </div>
              <div className="num">10k+</div>
              <div className="lbl">Assessments taken</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div className="num">92%</div>
              <div className="lbl">Cohort completion rate</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="num">24/7</div>
              <div className="lbl">Assistance</div>
            </div>
          </div>
        </div>
      </section>
      <section className="eco-section" id="ecosystem">
        <div className="container">
          <div className="section-head center">
            <h2>
              A Complete Setup For{" "}
              <span className="highlight">Your Success</span>
            </h2>
            <p>
              Everything you need to build skills, prepare for interviews, and land roles — integrated into one account.
            </p>
          </div>
          <div className="eco-grid">
            <div className="eco-card">
              <div className="ic">
                <i className="fa-regular fa-file-lines"></i>
              </div>
              <h4>ATS Resume Builder</h4>
              <p>
                Build a resume formatted to clear applicant tracking systems, tailored to each role you apply for.
              </p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-square-poll-vertical"></i>
              </div>
              <h4>AI Aptitude Tests</h4>
              <p>
                Dynamic, AI-generated logical, quantitative, and verbal reasoning tests that adapt to your skill level.
              </p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-code"></i>
              </div>
              <h4>Code Lab</h4>
              <p>
                Timed and untimed coding challenges across data structures, algorithms, and applied programming.
              </p>
              <Link href="/#programs" className="link">
                Solve challenges{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <h4>Curated Job Portal</h4>
              <p>
                Browse openings from our hiring network, filtered by role, salary, and location — no noise, just relevant roles.
              </p>
              <Link href="/#outcomes" className="link">
                Explore roles{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h4>Progress Analytics</h4>
              <p>
                Track skill growth, assessment scores, and readiness signals in one dashboard, updated after every activity.
              </p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-route"></i>
              </div>
              <h4>Placement Roadmap</h4>
              <p>
                A week-by-week plan connecting your curriculum, projects, and interview prep to your target role.
              </p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
              <h4>Mentor Reviews</h4>
              <p>
                Every project and assessment gets written feedback from a real mentor, not just an auto-grader.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="eco-section">
        <div className="container">
          <div className="section-head center">
            <h2>
              Small Team.{" "}
              <span className="highlight">High Ownership.</span>
            </h2>
            <p>
              No layers of process for the sake of process. If you can own outcomes, you'll fit right in.
            </p>
          </div>
          <div className="eco-grid">
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h4>Outcomes Over Vanity Metrics</h4>
              <p>We track learner outcomes, not just enrollment numbers or page views.</p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-chalkboard-user"></i>
              </div>
              <h4>Mentor-Obsessed Culture</h4>
              <p>Every decision gets stress-tested against "does this actually help a learner."</p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-user-check"></i>
              </div>
              <h4>Ownership & Autonomy</h4>
              <p>You'll own real problems end to end, not just tickets from a backlog.</p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-house-laptop"></i>
              </div>
              <h4>Remote-First</h4>
              <p>Work from anywhere. We optimize for output, not hours logged online.</p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h4>Bias For Shipping</h4>
              <p>We'd rather ship a good version this week than a perfect one next quarter.</p>
            </div>
            <div className="eco-card">
              <div className="ic">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h4>Direct Feedback</h4>
              <p>
                Clear, honest feedback loops — no surprises in a review that should've come up weeks earlier.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Ready To Unlock Your Full Potential?</h2>
            <p>
              Join learners using aadyosh's full platform — practice, feedback, and placement support in one place.
            </p>
            <div className="cta-actions">
              <Link href="/#programs" className="btn btn-dark">
                Get started{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              {" "}
              <Link href="/#pricing" className="btn btn-ghost-light">View pricing plans</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
