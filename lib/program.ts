import { SYLLABUS } from "./data/syllabus";
import { PROGRAM_DATA, PROGRAM_META, type FullProgram, type Module } from "./data/program-meta";
import { findCatalogEntry } from "./programs";

/** "Title | topic; topic | deliverable; deliverable" -> module object (see lib/data/syllabus.ts) */
export function parseSyllabus(rows: string[]): Module[] {
  const split = (s = "") => s.split(";").map((x) => x.trim()).filter(Boolean);
  return rows.map((row, i) => {
    const [title, items, deliverables] = row.split("|").map((x) => x.trim());
    const list = split(items);
    return { code: "M" + String(i + 1).padStart(2, "0"), topics: list.length, title, items: list, deliverables: split(deliverables) };
  });
}

const DEFAULT_ORBIT = ["fa-solid fa-code", "fa-solid fa-cloud", "fa-solid fa-chart-line", "fa-solid fa-diagram-project", "fa-solid fa-shield-halved", "fa-solid fa-gears", "fa-solid fa-lightbulb"];

const FALLBACK_MODULES: Module[] = [
  { code: "M01", topics: 4, title: "Foundations & Core Ideas", items: ["Field overview and key milestones", "Where these skills are applied today", "Ethics and responsible use", "Environment setup"], deliverables: ["Skill checkpoint", "Setup + onboarding"] },
  { code: "M02", topics: 3, title: "Core Toolkit", items: ["Essential tools and libraries", "Hands-on practice drills", "Common workflow patterns"], deliverables: ["Guided exercise", "Peer review"] },
  { code: "M03", topics: 4, title: "Applied Practice", items: ["Working with real datasets / cases", "Debugging and iteration", "Performance considerations", "Documentation habits"], deliverables: ["Project milestone", "Mentor checkpoint"] },
  { code: "M04", topics: 3, title: "Real-World Application", items: ["Ethics in practice", "Deploying your solution (overview)", "Presenting your work"], deliverables: ["Project milestone", "Certificate-ready review"] },
];

function genericProgram(slug: string): FullProgram {
  const meta = PROGRAM_META[slug];
  const cat = findCatalogEntry(slug);
  const title = meta ? meta.title : cat ? cat.title : slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    badge: "Program",
    icon: meta ? meta.icon : cat ? cat.icon : "fa-solid fa-layer-group",
    desc: meta
      ? meta.desc
      : cat
        ? `${cat.desc} — a mentor-led, project-based track with a structured module roadmap, reviewed deliverables and a verified certificate.`
        : `A mentor-led, project-based track in ${title}, with a structured module roadmap and reviewed deliverables.`,
    tiles: [
      { lbl: "Duration", val: "6–8 weeks", ic: "fa-regular fa-clock" },
      { lbl: "Format", val: "Mentor-led + LMS", ic: "fa-solid fa-chalkboard-user" },
      { lbl: "Projects", val: "Internship + projects", ic: "fa-solid fa-diagram-project" },
      { lbl: "Certificate", val: "Verified certificate", ic: "fa-solid fa-award" },
    ],
    modules: SYLLABUS[slug] ? parseSyllabus(SYLLABUS[slug]) : FALLBACK_MODULES,
    projects: [
      { title: "Portfolio Project 1", desc: "A guided build that demonstrates your core skills end-to-end." },
      { title: "Portfolio Project 2", desc: "A more advanced build reviewed by a working mentor." },
    ],
    faqs: [
      { q: "Is this beginner friendly?", a: "Yes. You start fundamentals-first, then move into structured projects with checkpoints." },
      { q: "Do you provide a certificate?", a: "Yes — issued after your deliverables pass mentor review." },
    ],
    orbitIcons: meta ? meta.orbitIcons : DEFAULT_ORBIT,
    stats: { enrolled: "600+", rating: "4.7/5", reviews: "140 reviews", seats: "Limited seats" },
  };
}

export const getProgram = (slug: string): FullProgram => PROGRAM_DATA[slug] ?? genericProgram(slug);
