import { PROJECT_ROWS } from "./data/project-rows";
import { ALL_PROGRAMS, type Cat } from "./programs";

export type Level = "Minor" | "Major" | "Capstone";
export type Project = { slug: string; program: string; cat: Cat | ""; level: Level; title: string; desc: string; tools: string[] };

/** Flattened list of every project: one per row of lib/data/project-rows.ts. */
export const PROJECT_LIST: Project[] = Object.keys(PROJECT_ROWS).flatMap((slug) => {
  const entry = ALL_PROGRAMS.find((p) => p.slug === slug);
  return PROJECT_ROWS[slug].map((row) => {
    const [level, title, desc, tools] = row.split(" | ").map((s) => s.trim());
    return {
      slug,
      program: entry?.title ?? slug,
      cat: entry?.cat ?? "",
      level: level as Level,
      title,
      desc,
      tools: tools.split(",").map((t) => t.trim()).filter(Boolean),
    };
  });
});

export const projectsFor = (slug: string) => PROJECT_LIST.filter((p) => p.slug === slug);
