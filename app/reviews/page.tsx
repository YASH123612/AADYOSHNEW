import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedReview, TestimonialGrids } from "@/components/pages/ReviewsParts";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What aadyosh learners say — outcome-focused reviews and testimonials from real cohorts.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>
            Reviews That Show{" "}
            <span className="highlight">Real Outcomes.</span>
          </h1>
          <p className="lead">
            Short, specific feedback with the kind of detail hiring teams actually care about — mentors push clarity, project depth, and interview readiness.
          </p>
          <div className="pill-row" style={{ justifyContent: "center" }}>
            <span>
              <i className="fa-solid fa-bullseye"></i>
              {" "}Outcome-focused
            </span>
            {" "}
            <span>
              <i className="fa-solid fa-chart-line"></i>
              {" "}Signal-rich
            </span>
            {" "}
            <span>
              <i className="fa-solid fa-shield-halved"></i>
              {" "}Clean credibility
            </span>
          </div>
        </div>
      </section>
      <section className="stats-row">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="num">4.8/5</div>
              <div className="lbl">Average rating</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <div className="num">5k+</div>
              <div className="lbl">Learners</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-building"></i>
              </div>
              <div className="num">100+</div>
              <div className="lbl">Hiring companies reached</div>
            </div>
            <div className="stat-card">
              <div className="ic">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div className="num">10+</div>
              <div className="lbl">Program tracks</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ paddingBottom: "20px" }}>
        <div className="container">
          <FeaturedReview />
        </div>
      </section>
      <section className="reviews">
        <TestimonialGrids />
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Want To Be The Next Story?</h2>
            <p>
              Join a cohort, ship real projects, and get feedback specific enough for hiring teams to notice.
            </p>
            <div className="cta-actions">
              <Link href="/#faq" className="btn btn-dark">
                <i className="fa-solid fa-phone-volume"></i>
                {" "}Request a callback
              </Link>
              {" "}
              <Link href="/#programs" className="btn btn-ghost-light">Explore programs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
