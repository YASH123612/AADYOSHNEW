"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Page-level motion: scroll-reveal for pages wrapped in .anim-page, and the count-up on .stat-card numbers.
   Runs after every navigation. Respects prefers-reduced-motion. */
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- scroll reveal ---- */
    if (!reduced && document.querySelector(".anim-page")) {
      const revealEls = new Set(document.querySelectorAll<HTMLElement>(".anim-page .section-head, .anim-page .cta-box, .anim-page .legal-doc > *:not(.form-success), .anim-page .eco-grid > *"));
      document.querySelectorAll(".eco-grid").forEach((grid) => [...grid.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--d", Math.min(i, 5) * 0.09 + "s")));

      /* Reveal everything at or above the fold line. A scroll check (not an IntersectionObserver) so blocks skipped by
         a fast jump - End key, scrollbar drag, anchor link - still appear instead of staying invisible. */
      const pending = new Set(revealEls);
      let ticking = false;
      const reveal = (el: HTMLElement) => {
        el.classList.add("rv-go", "rv-in");
        const wait = 800 + parseFloat(el.style.getPropertyValue("--d") || "0") * 1000;
        setTimeout(() => el.classList.remove("rv-go"), wait);
      };
      const check = () => {
        ticking = false;
        const line = window.innerHeight - 40;
        pending.forEach((el) => { if (el.getBoundingClientRect().top < line) { pending.delete(el); reveal(el); } });
        if (!pending.size) { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); }
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      check();
      cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });
    }

    /* ---- stat cards: reveal + count-up ---- */
    const statCards = document.querySelectorAll<HTMLElement>(".stat-card");
    if (statCards.length) {
      const animateCount = (el: HTMLElement) => {
        const raw = (el.textContent ?? "").trim();
        const match = raw.match(/^([\d,]+)(.*)$/);
        if (!match || reduced) return;
        const target = parseInt(match[1].replace(/,/g, ""), 10);
        const suffix = match[2];
        if (isNaN(target)) return;
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick); else el.textContent = raw;
        };
        requestAnimationFrame(tick);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          const numEl = entry.target.querySelector<HTMLElement>(".num");
          if (numEl) animateCount(numEl);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.35 });
      statCards.forEach((card) => observer.observe(card));
      cleanups.push(() => observer.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
