"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECT_LIST } from "@/lib/projects";
import { CAT_LABEL, type Cat } from "@/lib/programs";

const PAGE = 12;
/* only these domains get a filter chip (matches the tabs in the Programs section); every project still shows under "All" and in search */
const CHIPS: Array<{ key: "all" | Cat; label: string }> = [{ key: "all", label: "All domains" }, ...(["cs", "mgmt"] as Cat[]).map((k) => ({ key: k, label: CAT_LABEL[k] }))];

/** The full project catalogue: search by skill/tool/title, filter by domain, reveal 12 at a time. */
export function ProjectsExplorer() {
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const q = query.trim().toLowerCase();
  const list = PROJECT_LIST.filter((p) =>
    (cat === "all" || p.cat === cat) &&
    (!q || `${p.title} ${p.desc} ${p.program} ${p.level} ${p.tools.join(" ")}`.toLowerCase().includes(q)));
  const visible = list.slice(0, shown);

  return (
    <>
      <div className="proj-search">
        <i className="fa-solid fa-magnifying-glass" style={{ color: "var(--ink-400)" }}></i>
        <input type="text" id="projSearch" placeholder="Search by skill, tool, tech..." aria-label="Search projects" autoComplete="off" value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} />
        <span className="count" aria-live="polite">{list.length}/{PROJECT_LIST.length}</span>
      </div>
      <div className="proj-filters" role="group" aria-label="Filter projects by domain">
        {CHIPS.map((c) => (
          <button key={c.key} type="button" className={"proj-chip" + (cat === c.key ? " active" : "")} aria-pressed={cat === c.key} onClick={() => { setCat(c.key); setShown(PAGE); }}>{c.label}</button>
        ))}
      </div>
      <div className="proj-grid" id="projGrid">
        {visible.map((p, i) => (
          <Link key={p.slug + p.title} className="proj-card" href={`/programs/${p.slug}#projects`}>
            <div className="proj-top"><div className="num">{String(i + 1).padStart(2, "0")}</div><span className={`proj-level lvl-${p.level.toLowerCase()}`}>{p.level}</span></div>
            <div className="kind">{p.program}</div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
            <div className="proj-tools">{p.tools.map((t) => <span key={t}>{t}</span>)}</div>
          </Link>
        ))}
      </div>
      {list.length === 0 && <p className="proj-empty">No projects match that search. Try a tool name like &quot;Python&quot; or &quot;Figma&quot;.</p>}
      {list.length > shown && (
        <div className="proj-more">
          <button type="button" className="btn btn-outline" onClick={() => setShown((n) => n + PAGE)}>Show more projects ({list.length - shown} left)</button>
        </div>
      )}
    </>
  );
}
