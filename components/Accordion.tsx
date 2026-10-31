"use client";

import { useId, useState } from "react";

export type AccordionItem = { icon: string; q: string; a: string; tag?: string };

/** FAQ accordion. `single` keeps one item open at a time; otherwise each toggles on its own. First item starts open. */
export function Accordion({ items, single = false, miniLinks = false, id }: { items: AccordionItem[]; single?: boolean; miniLinks?: boolean; id?: string }) {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => setOpen((prev) => {
    const wasOpen = prev.has(i);
    const next = single ? new Set<number>() : new Set(prev);
    if (wasOpen) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div id={id}>
      {items.map((f, i) => {
        const isOpen = open.has(i);
        const qid = `${uid}-q-${i}`, aid = `${uid}-a-${i}`;
        return (
          <div key={f.q} className={"faq-item" + (isOpen ? " open" : "")}>
            <div
              className="faq-q"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              id={qid}
              aria-controls={aid}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}
            >
              <div className="ic"><i className={f.icon} aria-hidden="true"></i></div>
              <div>{f.tag && <span className="tag">{f.tag}</span>}<h4>{f.q}</h4></div>
              <button className="toggle-btn" tabIndex={-1} aria-hidden="true"><i className="fa-solid fa-chevron-down"></i></button>
            </div>
            <div className="faq-a" id={aid} role="region" aria-labelledby={qid}>
              <p>{f.a}</p>
              {miniLinks && <div className="mini-links"><span>Pricing</span><span>Reviews</span><span>Support</span></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
