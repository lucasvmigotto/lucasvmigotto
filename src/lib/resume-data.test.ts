import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import type { ResumeJson } from "@/types/resume";

function loadResume(locale: "en" | "pt-BR"): ResumeJson {
  const raw = readFileSync(`public/locales/${locale}/resume.json`, "utf-8");
  return JSON.parse(raw) as ResumeJson;
}

describe("resume.json experience data", () => {
  for (const locale of ["en", "pt-BR"] as const) {
    describe(locale, () => {
      const resume = loadResume(locale);

      test("every company has at least one role", () => {
        for (const exp of resume.experience) {
          expect(exp.roles.length).toBeGreaterThanOrEqual(1);
        }
      });

      test("at most one open-ended role per company", () => {
        for (const exp of resume.experience) {
          const open = exp.roles.filter((r) => r.period.end === null).length;
          expect(open).toBeLessThanOrEqual(1);
        }
      });

      test("no company has empty bullets", () => {
        for (const exp of resume.experience) {
          for (const role of exp.roles) {
            expect(role.bullets.length).toBeGreaterThan(0);
          }
        }
      });
    });
  }

  test("en and pt-BR have matching experience structure", () => {
    const en = loadResume("en");
    const pt = loadResume("pt-BR");
    expect(en.experience.length).toBe(pt.experience.length);
    for (let i = 0; i < en.experience.length; i++) {
      const enEntry = en.experience[i];
      const ptEntry = pt.experience[i];
      expect(enEntry).toBeDefined();
      expect(ptEntry).toBeDefined();
      if (!enEntry || !ptEntry) continue;
      expect(enEntry.company).toBe(ptEntry.company);
      expect(enEntry.roles.length).toBe(ptEntry.roles.length);
    }
  });
});
