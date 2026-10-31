"use client";

import { useState } from "react";
import { FEATURED, MORE_TESTIMONIALS, TESTIMONIALS, type Testimonial } from "@/lib/content";

/** Rotating featured review with dot navigation. */
export function FeaturedReview() {
  const [i, setI] = useState(0);
  const r = FEATURED[i];
  return (
    <>
      <div id="featuredWrap">
        <div className="featured-review">
          <div className="stars">{"★".repeat(5)}</div>
          <p className="quote">&quot;{r.quote}&quot;</p>
          <div className="who">
            <div><div className="name">{r.name}</div><div className="role">{r.role}</div></div>
            <div className="company">{r.company}</div>
          </div>
        </div>
      </div>
      <div className="featured-dots" id="featuredDots">
        {FEATURED.map((_, n) => (
          <button key={n} className={n === i ? "active" : ""} aria-label={`Show featured review ${n + 1}`} onClick={() => setI(n)}></button>
        ))}
      </div>
    </>
  );
}

const Card = ({ r }: { r: Testimonial }) => (
  <div className="t-card">
    <div className="top-row"><div><div style={{ fontWeight: 800, fontSize: 14.5 }}>{r.name}</div><div style={{ fontSize: 12, color: "var(--ink-500)" }}>{r.role}</div></div><div className="company-tag">{r.company}</div></div>
    <div className="stars">{"★".repeat(5)}</div>
    <p className="quote">&quot;{r.quote}&quot;</p>
    <span className="outcome">{r.outcome}</span>
  </div>
);

/** Six reviews, plus three more behind "View all reviews". */
export function TestimonialGrids() {
  const [more, setMore] = useState(false);
  return (
    <>
      <div className="tgrid" id="tgrid">{TESTIMONIALS.map((r) => <Card key={r.name} r={r} />)}</div>
      <div className={"tgrid reviews-loadmore" + (more ? " show" : "")} id="tgridMore">{MORE_TESTIMONIALS.map((r) => <Card key={r.name} r={r} />)}</div>
      {!more && (
        <div style={{ textAlign: "center", marginTop: 34 }}>
          <button className="btn btn-outline" onClick={() => setMore(true)}>View all reviews <i className="fa-solid fa-chevron-down"></i></button>
        </div>
      )}
    </>
  );
}
