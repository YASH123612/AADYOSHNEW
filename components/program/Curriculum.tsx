"use client";

import { useRef, useState } from "react";
import type { Module } from "@/lib/data/program-meta";

/** The curriculum block: toolbar, module search and the expandable module list. */
export function Curriculum({ modules }: { modules: Module[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<string>>(() => new Set(modules[0] ? [modules[0].code] : []));
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const f = query.trim().toLowerCase();
  const filtered = modules.filter((m) => !f || m.title.toLowerCase().includes(f) || m.items.some((i) => i.toLowerCase().includes(f)));
  const allOpen = filtered.length > 0 && filtered.every((m) => open.has(m.code));
  const topics = modules.reduce((a, m) => a + m.topics, 0);

  const toggle = (code: string) => setOpen((prev) => { const n = new Set(prev); if (n.has(code)) n.delete(code); else n.add(code); return n; });
  const go = (from: string, to: Module | undefined) => {
    if (!to) return;
    setOpen((prev) => { const n = new Set(prev); n.delete(from); n.add(to.code); return n; });
    setTimeout(() => refs.current[to.code]?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  const onSearch = (v: string) => {
    setQuery(v);
    const first = modules.find((m) => { const q = v.trim().toLowerCase(); return !q || m.title.toLowerCase().includes(q) || m.items.some((i) => i.toLowerCase().includes(q)); });
    setOpen(new Set(first ? [first.code] : []));   // like before: the first match starts open
  };

  return (
    <div className="container">
      <div className="curric-toolbar">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <h2 style={{ margin: "14px 0 6px" }}>Specialized <span className="highlight">Domain Curriculum</span></h2>
          <p>A clean progression from fundamentals to advanced — expand a module to see what you&apos;ll master, plus the deliverables you&apos;ll submit.</p>
        </div>
        <div className="curric-actions">
          <span className="curric-badge">{modules.length} modules · {topics} topics</span>
          <button type="button" className="curric-expand" hidden={!filtered.length} onClick={() => setOpen(allOpen ? new Set() : new Set(filtered.map((m) => m.code)))}>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </div>

      <div className="proj-search" style={{ margin: "0 0 30px", maxWidth: "100%" }}>
        <i className="fa-solid fa-magnifying-glass" style={{ color: "var(--ink-400)" }}></i>
        <input type="text" placeholder="Search modules or topics..." aria-label="Search modules or topics" value={query} onChange={(e) => onSearch(e.target.value)} />
      </div>

      <div id="moduleList">
        {filtered.length === 0 && <p style={{ color: "var(--ink-500)", fontSize: 14 }}>No topics match your search.</p>}
        {filtered.map((m, i) => {
          const isOpen = open.has(m.code);
          return (
            <div key={m.code} className={"module-item" + (isOpen ? " open" : "")} ref={(el) => { refs.current[m.code] = el; }}>
              <div
                className="module-head"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggle(m.code)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(m.code); } }}
              >
                <div>
                  <div className="tags"><span>{m.code}</span><span>{m.topics} topics</span><span className="badge">Mentor-led</span></div>
                  <h4>{m.title}</h4>
                </div>
                <button className="module-toggle" tabIndex={-1} aria-hidden="true"><i className="fa-solid fa-chevron-down"></i></button>
              </div>
              <div className="module-body">
                <div>
                  <h5>Topics covered</h5>
                  <ul>{m.items.map((t) => <li key={t}><i className="fa-solid fa-circle-check" aria-hidden="true"></i>{t}</li>)}</ul>
                </div>
                <div>
                  <h5>Deliverables</h5>
                  {m.deliverables.map((d) => <span key={d} className="deliv-chip">{d}</span>)}
                  <p style={{ fontSize: 12.5, color: "var(--ink-400)", marginTop: 10 }}>Deliverables are reviewed with mentor feedback.</p>
                </div>
                <div className="module-nav">
                  <button type="button" className="btn btn-outline" disabled={i === 0} onClick={() => go(m.code, filtered[i - 1])}><i className="fa-solid fa-chevron-left" aria-hidden="true"></i> Previous</button>
                  <button type="button" className="btn btn-outline" disabled={i === filtered.length - 1} onClick={() => go(m.code, filtered[i + 1])}>Next module <i className="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
