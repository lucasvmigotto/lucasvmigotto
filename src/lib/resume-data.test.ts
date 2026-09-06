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

describe("resume.json meta and identity", () => {
  for (const locale of ["en", "pt-BR"] as const) {
    test(`${locale} meta is complete`, () => {
      const { meta } = loadResume(locale);
      expect(meta.name.length).toBeGreaterThan(0);
      expect(meta.title.length).toBeGreaterThan(0);
      expect(meta.email).toContain("@");
      expect(meta.location.length).toBeGreaterThan(0);
    });
  }
});

describe("resume.json all sections", () => {
  for (const locale of ["en", "pt-BR"] as const) {
    const resume = loadResume(locale);

    test(`${locale} education is populated and typed`, () => {
      expect(resume.education.length).toBeGreaterThan(0);
      for (const e of resume.education) {
        expect(e.institution.length).toBeGreaterThan(0);
        expect(e.degree.length).toBeGreaterThan(0);
      }
    });

    test(`${locale} certifications are populated`, () => {
      expect(resume.certifications.length).toBeGreaterThan(0);
      for (const c of resume.certifications) {
        expect(c.name.length).toBeGreaterThan(0);
        expect(c.issuer.length).toBeGreaterThan(0);
      }
    });

    test(`${locale} skills expose all four categories`, () => {
      expect(Object.keys(resume.skills).sort()).toEqual(
        ["cloud_infrastructure", "data_ai", "devops_architecture", "languages_frameworks"].sort(),
      );
      for (const items of Object.values(resume.skills)) {
        expect(items.length).toBeGreaterThan(0);
      }
    });

    test(`${locale} languages are populated`, () => {
      expect(resume.languages.length).toBeGreaterThan(0);
      for (const l of resume.languages) {
        expect(l.language.length).toBeGreaterThan(0);
        expect(l.level.length).toBeGreaterThan(0);
      }
    });
  }

  test("en and pt-BR have matching education/certification/language counts", () => {
    const en = loadResume("en");
    const pt = loadResume("pt-BR");
    expect(en.education.length).toBe(pt.education.length);
    expect(en.certifications.length).toBe(pt.certifications.length);
    expect(en.languages.length).toBe(pt.languages.length);
    expect(Object.keys(en.skills).sort()).toEqual(Object.keys(pt.skills).sort());
  });
});
