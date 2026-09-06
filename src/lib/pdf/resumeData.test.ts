import { describe, expect, test } from "bun:test";
import { buildResumeData } from "@/lib/pdf/resumeData";
import type { ResumeJson } from "@/types/resume";

const fixture: ResumeJson = {
  meta: {
    name: "Lucas Vidor Migotto",
    title: "Senior Software Engineer",
    email: "a@b.com",
    whatsappUsername: "@lucasvmigotto",
    whatsappLink: "https://wa.me/lucasvmigotto",
    location: "São Paulo, Brazil",
    github: "https://github.com/x",
    linkedin: "https://linkedin.com/x",
    instagram: "https://instagram.com/x",
    facebook: "https://facebook.com/x",
  },
  objectiveShort: "Short",
  objective: "Long objective",
  experience: [
    {
      company: "Acme",
      location: "SP",
      roles: [
        { title: "Senior", period: { start: "2024-01", end: null }, bullets: ["a", "b"] },
        { title: "Junior", period: { start: "2022-01", end: "2023-12" }, bullets: ["c"] },
      ],
    },
  ],
  skills: {
    languages_frameworks: ["TypeScript"],
    cloud_infrastructure: ["AWS"],
    devops_architecture: ["CI/CD"],
    data_ai: ["ML/DL"],
  },
  certifications: [
    { name: "AWS CP", issuer: "AWS", issuerSvg: "/x.svg", date: "2023-08", url: "https://x" },
  ],
  education: [
    {
      institution: "USP",
      degree: "MBA",
      period: { start: "2024-03", end: null },
      inProgress: true,
    },
  ],
  languages: [{ language: "Portuguese", level: "Native" }],
};

const fmt = (start: string, end: string | null) => (end ? `${start}–${end}` : `${start}–now`);

describe("buildResumeData", () => {
  const data = buildResumeData(fixture, fmt);

  test("maps meta fields directly", () => {
    expect(data.name).toBe("Lucas Vidor Migotto");
    expect(data.title).toBe("Senior Software Engineer");
    expect(data.email).toBe("a@b.com");
    expect(data.whatsappUsername).toBe("@lucasvmigotto");
  });

  test("maps experience into grouped sections with current flag", () => {
    expect(data.experience).toHaveLength(1);
    const sec = data.experience[0];
    expect(sec?.company).toBe("Acme");
    expect(sec?.roles).toHaveLength(2);
    expect(sec?.roles[0]).toEqual({
      title: "Senior",
      periodLabel: "2024-01–now",
      current: true,
      bullets: ["a", "b"],
    });
    expect(sec?.roles[1]?.current).toBe(false);
    expect(sec?.roles[1]?.periodLabel).toBe("2022-01–2023-12");
  });

  test("maps skills with human category labels and joined items", () => {
    expect(data.skills).toHaveLength(4);
    const langs = data.skills.find((s) => s.category === "Languages & Frameworks");
    expect(langs?.items).toBe("TypeScript");
  });

  test("maps certifications, education, languages", () => {
    expect(data.certifications[0]?.name).toBe("AWS CP");
    expect(data.education[0]?.periodLabel).toBe("2024-03–now");
    expect(data.languages[0]).toEqual({ language: "Portuguese", level: "Native" });
  });
});
