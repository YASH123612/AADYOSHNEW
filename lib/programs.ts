import { PROGRAMS, CAT_LABEL, SLUG_OVERRIDES, type Cat, type CatalogProgram } from "./data/programs";

export { PROGRAMS, CAT_LABEL };
export type { Cat, CatalogProgram };

export function slugify(title: string): string {
  if (SLUG_OVERRIDES[title]) return SLUG_OVERRIDES[title];
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const programHref = (title: string) => `/programs/${slugify(title)}`;

export const CATS = Object.keys(PROGRAMS) as Cat[];

export type CatalogEntry = CatalogProgram & { slug: string; cat: Cat; domain: string };

/** Every program in the catalogue with its slug and domain. */
export const ALL_PROGRAMS: CatalogEntry[] = CATS.flatMap((cat) =>
  PROGRAMS[cat].map((p) => ({ ...p, slug: slugify(p.title), cat, domain: CAT_LABEL[cat] })),
);

export const findCatalogEntry = (slug: string) => ALL_PROGRAMS.find((p) => p.slug === slug) ?? null;
