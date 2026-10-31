"use client";

import { useEffect, useState } from "react";
import { FEATURED, MORE_TESTIMONIALS, TESTIMONIALS, type Testimonial } from "@/lib/content";

/** Rotating featured review with back / next buttons, dot navigation, and keyboard arrows. */
export function FeaturedReview() {
  const [i, setI] = useState(0);
  const r = FEATURED[i];

  const handlePrev = () => {
    setI((curr) => (curr === 0 ? FEATURED.length - 1 : curr - 1));
  };

  const handleNext = () => {
    setI((curr) => (curr === FEATURED.length - 1 ? 0 : curr + 1));
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div>
      <div className="featured-carousel-wrap">
        {/* Left / Back button */}
        <button
          type="button"
          className="featured-nav-btn"
          onClick={handlePrev}
          aria-label="Previous review"
          title="Previous review"
        >
          <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
        </button>

        {/* Featured Review Card */}
        <div className="featured-review-container">
          <div className="featured-review" key={i}>
            <div className="stars">{"★".repeat(5)}</div>
            <p className="quote">&quot;{r.quote}&quot;</p>
            <div className="who">
              <div>
                <div className="name">{r.name}</div>
                <div className="role">{r.role}</div>
              </div>
              <div className="company">{r.company}</div>
            </div>
          </div>
        </div>

        {/* Right / Next button */}
        <button
          type="button"
          className="featured-nav-btn"
          onClick={handleNext}
          aria-label="Next review"
          title="Next review"
        >
          <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>

      {/* Dots and Prev/Next step buttons below */}
      <div className="featured-nav-row" id="featuredDots">
        <button
          type="button"
          className="featured-step-btn"
          onClick={handlePrev}
          aria-label="Previous review"
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
          <span>Back</span>
        </button>

        <div className="featured-dots">
          {FEATURED.map((_, n) => (
            <button
              key={n}
              className={n === i ? "active" : ""}
              aria-label={`Show featured review ${n + 1}`}
              onClick={() => setI(n)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="featured-step-btn"
          onClick={handleNext}
          aria-label="Next review"
        >
          <span>Next</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

/** Reusable marquee & static review card */
const MCard = ({ r }: { r: Testimonial }) => (
  <div className="review-card-m">
    <div className="rcm-top">
      <div>
        <div className="rcm-name">{r.name}</div>
        <div className="rcm-role">{r.role}</div>
      </div>
      <div className="rcm-company">{r.company}</div>
    </div>
    <div className="rcm-stars">{"★".repeat(5)}</div>
    <p className="rcm-quote">&quot;{r.quote}&quot;</p>
    <span className="rcm-outcome">{r.outcome}</span>
  </div>
);

/**
 * Reviews Showcase:
 * 1. Two-row opposite infinite moving marquee
 * 2. "View all reviews" option to browse all reviews in a static grid without moving
 */
export function TestimonialGrids() {
  const [viewMode, setViewMode] = useState<"marquee" | "static">("marquee");

  // Row 1: 6 cards from TESTIMONIALS
  // Row 2: all 9 shuffled for variety (MORE_TESTIMONIALS + first 6)
  const row1 = TESTIMONIALS;                                       // 6 cards
  const row2 = [...MORE_TESTIMONIALS, ...TESTIMONIALS.slice(0, 3)]; // 6 cards

  // Duplicate each row ×4 so the seamless -50% translateX loop works perfectly
  const track1 = [...row1, ...row1, ...row1, ...row1];
  const track2 = [...row2, ...row2, ...row2, ...row2];

  const allReviews = [...TESTIMONIALS, ...MORE_TESTIMONIALS];

  return (
    <div>
      {viewMode === "marquee" ? (
        <>
          {/* Two-row moving marquee */}
          <div className="review-marquee" aria-label="Learner testimonials moving marquee">
            {/* Row 1 — scrolls left */}
            <div className="rmq-row">
              <div className="rmq-track rmq-ltr">
                {track1.map((r, i) => (
                  <MCard key={`ltr-${i}`} r={r} />
                ))}
              </div>
            </div>
            {/* Row 2 — scrolls right */}
            <div className="rmq-row">
              <div className="rmq-track rmq-rtl">
                {track2.map((r, i) => (
                  <MCard key={`rtl-${i}`} r={r} />
                ))}
              </div>
            </div>
          </div>

          {/* Option to view all reviews statically */}
          <div className="container" style={{ textAlign: "center", marginTop: 36 }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setViewMode("static")}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 26px" }}
            >
              <span>View all reviews without moving ({allReviews.length})</span>
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </button>
          </div>
        </>
      ) : (
        /* Static Grid View — all reviews without moving */
        <div className="container static-reviews-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 26,
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "var(--ink-900)" }}>
                All Cohort Reviews ({allReviews.length})
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-500)", margin: "4px 0 0" }}>
                Static view — all reviews displayed without motion.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setViewMode("marquee")}
              style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <i className="fa-solid fa-arrows-left-right" aria-hidden="true"></i>
              <span>Back to moving showcase</span>
            </button>
          </div>

          <div className="tgrid">
            {allReviews.map((r, i) => (
              <MCard key={`static-${r.name}-${i}`} r={r} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setViewMode("marquee")}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 26px" }}
            >
              <i className="fa-solid fa-arrows-left-right" aria-hidden="true"></i>
              <span>Back to moving showcase</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

