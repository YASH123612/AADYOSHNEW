"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Starts the tools marquee's entrance animation once it scrolls into view. */
export function TechMarqueeShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={"tech-marquee" + (inView ? " tech-in" : "")} id="techMarquee" role="group" aria-label="Tools covered in the curriculum">
      {children}
    </div>
  );
}
