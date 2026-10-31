import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description: "About aadyosh: a mentor-led learning platform built around real projects, honest reviews, and interview-ready proof.",
};

export default function AboutPage() {
  return (
    <>
    <div className="anim-page">
        <section className="page-hero">
          <div className="container">
            <h1>
              We Build Portfolio-Grade{" "}
              <span className="highlight">Outcomes,</span>
              {" "}Not Just Programs.
            </h1>
            <p className="lead">
              aadyosh is a mentor-led learning platform built around real projects, honest reviews, and interview-ready proof.
            </p>
            <div className="cta-actions">
              <Link href="/#programs" className="btn btn-primary">
                <i className="fa-solid fa-layer-group"></i>
                {" "}Explore programs
              </Link>
              {" "}
              <Link href="/careers" className="btn btn-outline">Join the team</Link>
            </div>
          </div>
        </section>
        <section className="eco-section">
          <div className="container">
            <div className="section-head center">
              <h2>
                A Clean Bridge Between{" "}
                <span className="highlight">Learning And Real Work</span>
              </h2>
              <p>
                We're building a system where learners don't just learn — they produce proof: projects, reviews, and interview-grade clarity.
              </p>
            </div>
            <div className="eco-grid">
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4>A gap we kept seeing</h4>
                <p>
                  Learners were picking up tools but not building proof. Hiring teams look for depth, trade-offs, and execution quality.
                </p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-diagram-project"></i>
                </div>
                <h4>A different model</h4>
                <p>Mentor-led projects and honest reviews, designed to produce work you can actually show.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-scale-balanced"></i>
                </div>
                <h4>Systems that scale</h4>
                <p>
                  Consistent standards and repeatable review processes, so quality doesn't slip as cohorts grow.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="how">
          <div className="container">
            <div className="section-head center">
              <h2>
                Clarity In What We Build.{" "}
                <span className="highlight">Discipline In How We Execute.</span>
              </h2>
            </div>
            <div className="eco-grid two">
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h4>Mission — bridge education and industry with proof</h4>
                <p>
                  Deliver mentor-led, project-driven programs where learners build portfolio-grade work, improve through feedback, and graduate with credible signals.
                </p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <h4>Vision — make career readiness systematic</h4>
                <p>
                  Create a learning ecosystem where mentors, structured reviews, and AI assistance help learners consistently reach hiring-level output, regardless of background.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="eco-section" style={{ paddingTop: "90px" }}>
          <div className="container">
            <div className="section-head center">
              <h2>
                Principles That Keep{" "}
                <span className="highlight">Quality High</span>
              </h2>
              <p>The "why" behind our product decisions, cohorts, and evaluation loop.</p>
            </div>
            <div className="eco-grid">
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
                <h4>Evaluation-first</h4>
                <p>Feedback and proof of work — not course completion.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h4>AI-assisted learning</h4>
                <p>Guidance, hints, and structured practice built into the learning flow.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <h4>Career readiness</h4>
                <p>Projects positioned like real work, with interview-centric signals.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <h4>Mentor-led cohorts</h4>
                <p>Industry workflows, live reviews, and what actually matters in hiring.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h4>Outcome tracking</h4>
                <p>Measurable progress with checkpoints and improvement loops.</p>
              </div>
              <div className="eco-card">
                <div className="ic">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <h4>Community and accountability</h4>
                <p>Cohorts move faster when execution is visible and consistent.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-banner">
          <div className="container">
            <div className="cta-box">
              <h2>Want To Build With Us?</h2>
              <p>Explore a program, or join the small team behind aadyosh.</p>
              <div className="cta-actions">
                <Link href="/#programs" className="btn btn-dark">
                  Browse programs{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                {" "}
                <Link href="/careers" className="btn btn-ghost-light">See open roles</Link>
              </div>
            </div>
          </div>
        </section>
    </div>
    </>
  );
}
