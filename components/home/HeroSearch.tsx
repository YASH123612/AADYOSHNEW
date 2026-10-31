"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModals } from "@/components/modals/ModalProvider";
import { BROWSE_DOMAINS, domainSummary, findPrograms } from "@/lib/search";

/** Hero search: type a program, a domain (Management...), or a tool (Figma, Docker...) and pick a match.
 *  "Get plan" opens the best match when something is typed; with an empty box it opens the roadmap form. */
export function HeroSearch() {
  const router = useRouter();
  const { openRoadmap } = useModals();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const q = query.trim();
  const hits = q ? findPrograms(query) : [];
  const shown = hits.slice(0, 8);
  const domains = BROWSE_DOMAINS.map(domainSummary);
  // options the keyboard can move through
  const optionCount = q ? shown.length : domains.length;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const pickIndex = (i: number) => {
    if (!q) {
      const d = domains[i];
      if (d) { setQuery(d.label); setActive(-1); }
    } else if (shown[i]) {
      router.push(shown[i].href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (!open) setOpen(true); else setActive(optionCount ? (active + 1) % optionCount : -1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(optionCount ? (active <= 0 ? optionCount - 1 : active - 1) : -1); }
    else if (e.key === "Enter") { e.preventDefault(); if (optionCount) pickIndex(active >= 0 ? active : 0); }
    else if (e.key === "Escape") { setOpen(false); setActive(-1); }
  };

  const getPlan = () => {
    if (q && hits[0]) { router.push(hits[0].href); return; }
    openRoadmap(btnRef.current);
  };

  return (
    <div className="search-card" ref={rootRef}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        id="heroSearch"
        placeholder="Search a program or domain (AI, Full Stack, Management...)"
        aria-label="Search programs and domains"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="heroResults"
        aria-activedescendant={active >= 0 ? (q ? `hs-o${active}` : `hs-d${active}`) : undefined}
        autoComplete="off"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setActive(-1); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      <button ref={btnRef} className="btn btn-primary" id="getPlanBtn" onClick={getPlan}>
        Get plan <i className="fa-solid fa-arrow-right"></i>
      </button>

      <ul className="search-results" id="heroResults" role="listbox" aria-label="Matching programs" hidden={!open} onMouseDown={(e) => e.preventDefault()}>
        {!q && (
          <>
            <li className="sr-head" role="presentation">Browse by domain</li>
            {domains.map((d, i) => (
              <li key={d.key} id={`hs-d${i}`} role="option" aria-selected={active === i} className={"sr-opt sr-domain" + (active === i ? " active" : "")} onClick={() => pickIndex(i)}>
                <span className="sr-ic"><i className="fa-solid fa-layer-group" aria-hidden="true"></i></span>
                <span><b>{d.label}</b><small>{d.count} program{d.count > 1 ? "s" : ""}</small></span>
              </li>
            ))}
          </>
        )}
        {q && hits.length > 0 && (
          <>
            <li className="sr-head" role="presentation">{hits.length} match{hits.length > 1 ? "es" : ""}</li>
            {shown.map((h, i) => (
              <li key={h.href} id={`hs-o${i}`} role="option" aria-selected={active === i} className={"sr-opt" + (active === i ? " active" : "")} onClick={() => pickIndex(i)}>
                <span className="sr-ic"><i className={h.icon} aria-hidden="true"></i></span>
                <span><b>{h.title}</b><small>{h.domain}</small></span>
              </li>
            ))}
            {hits.length > 8 && <li className="sr-head" role="presentation">Keep typing to narrow {hits.length - 8} more</li>}
          </>
        )}
        {q && hits.length === 0 && (
          <li className="sr-empty" role="presentation">
            No program matches &quot;{q}&quot;. Try a domain like Management, or{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setOpen(false); openRoadmap(btnRef.current); }}>get a personalised plan</a>.
          </li>
        )}
      </ul>
    </div>
  );
}
