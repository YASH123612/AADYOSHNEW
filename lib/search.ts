import { ALL_PROGRAMS, CAT_LABEL, PROGRAMS, programHref, type Cat } from "./programs";
import { PROJECT_LIST } from "./projects";

/* Hero search: match a program, a domain (Management...), or a tool (Figma, Docker...). */

const ALIASES: Record<Cat, string> = {
  cs: "computer science engineering software it tech coding programming developer",
  ee: "electrical electronics ece eee hardware circuits",
  mech: "mechanical manufacturing automobile machines",
  civil: "civil construction structures buildings",
  mgmt: "management business mba commerce marketing",
  health: "healthcare medical life sciences clinical pharma",
};

/** Domains offered in the empty-box "Browse by domain" list (typing still finds every program). */
export const BROWSE_DOMAINS: Cat[] = ["cs", "mgmt"];

export const domainSummary = (k: Cat) => ({ key: k, label: CAT_LABEL[k], count: PROGRAMS[k].length });

const norm = (s: string) => " " + String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const toolsBySlug: Record<string, string[]> = {};
PROJECT_LIST.forEach((p) => { (toolsBySlug[p.slug] ||= []).push(p.tools.join(" "), p.title); });

type Entry = { title: string; icon: string; domain: string; href: string; t: string; hay: string };
const ENTRIES: Entry[] = ALL_PROGRAMS.map((p) => ({
  title: p.title,
  icon: p.icon,
  domain: p.domain,
  href: programHref(p.title),
  t: norm(p.title),
  hay: norm([p.title, p.desc, p.domain, ALIASES[p.cat], (toolsBySlug[p.slug] || []).join(" ")].join(" ")),
}));

export type SearchHit = Pick<Entry, "title" | "icon" | "domain" | "href">;

export function findPrograms(q: string): SearchHit[] {
  const tokens = norm(q).split(" ").filter(Boolean);
  if (!tokens.length) return [];
  return ENTRIES.map((e) => {
    if (!tokens.every((t) => e.hay.includes(" " + t))) return null;   // every word must start a word somewhere
    let s = 0;
    tokens.forEach((t) => { s += e.t.startsWith(" " + t) ? 4 : e.t.includes(" " + t) ? 3 : norm(e.domain).includes(" " + t) ? 2 : 1; });
    return { e, s };
  })
    .filter((x): x is { e: Entry; s: number } => x !== null)
    .sort((a, b) => b.s - a.s || a.e.title.localeCompare(b.e.title))
    .map((x) => x.e);
}
