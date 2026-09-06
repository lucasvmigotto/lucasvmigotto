import type { Experience, ExperienceRole } from "@/types/resume";

export function isCompanyCurrent(exp: Experience): boolean {
  return exp.roles.some((r) => r.period.end === null);
}

export function isRoleCurrent(role: ExperienceRole): boolean {
  return role.period.end === null;
}

export function companyPeriod(exp: Experience): Period {
  const starts = exp.roles.map((r) => r.period.start).sort();
  const hasOpenEnd = exp.roles.some((r) => r.period.end === null);
  const ends = exp.roles
    .map((r) => r.period.end)
    .filter((e): e is string => e !== null)
    .sort();
  return { start: starts[0] ?? "", end: hasOpenEnd ? null : (ends.at(-1) ?? null) };
}

/** Stable, human-readable key for React lists — not stored in the JSON. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Period = { start: string; end: string | null };
