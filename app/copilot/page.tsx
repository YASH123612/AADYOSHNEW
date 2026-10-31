import type { Metadata } from "next";
import Link from "next/link";
import { CopilotDemo } from "@/components/pages/CopilotDemo";

export const metadata: Metadata = {
  title: "Copilot",
  description: "Meet the aadyosh Copilot: an AI assistant for your workspace and a live AI mock-interview simulator for placement prep.",
};

export default function CopilotPage() {
  return (
    <>
      <section className="copilot-hero">
        <div className="container">
          <h1>
            Your AI Partner For{" "}
            <span style={{ color: "var(--brand-300)" }}>Learning & Placement.</span>
          </h1>
          <p className="lead">
            One assistant to help you move faster through coursework, and a live AI interviewer to get you interview-ready before the real thing.
          </p>
        </div>
      </section>
      <CopilotDemo />
      <section className="copilot-benefits">
        <div className="container">
          <div className="section-head center">
            <h2>
              Built To Turn Practice Into{" "}
              <span className="highlight">Placement.</span>
            </h2>
          </div>
          <div className="benefit-split">
            <div className="benefit-tile">
              <h3>Weak-area analysis ranks your gaps</h3>
              <p>
                Every mock interview and assessment feeds a running skill profile, so you always know the highest-leverage thing to practice next — not just a list of scores.
              </p>
            </div>
            <div className="benefit-tile dark">
              <h3>Placement-ready decisions from live signals</h3>
              <p>
                Interview debriefs, code lab results, and mentor feedback roll up into one weekly priority list, so prepping for placement stays concrete instead of overwhelming.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Ready To Learn With aadyosh Copilot?</h2>
            <p>
              Join a cohort and get a learning assistant grounded in your own courses, practice, and placement goals.
            </p>
            <div className="cta-actions">
              <a className="btn btn-dark">
                <i className="fa-solid fa-phone-volume"></i>
                {" "}Talk to a Mentor
              </a>
              {" "}
              <Link href="/#programs" className="btn btn-ghost-light">Explore programs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
