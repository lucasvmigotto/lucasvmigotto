import { describe, expect, test } from "bun:test";
import { About } from "@/components/About";
import { renderWithI18n } from "@/test/i18n";
import type { ResumeJson } from "@/types/resume";

const resume: ResumeJson = {
  meta: {
    name: "Lucas Vidor Migotto",
    title: "Senior",
    email: "a@b.com",
    whatsappUsername: "@lucasvmigotto",
    whatsappLink: "https://wa.me/lucasvmigotto",
    location: "SP",
    github: "g",
    linkedin: "l",
    instagram: "i",
    facebook: "f",
  },
  objectiveShort: "Short objective",
  objective: "Full objective text",
  experience: [],
  skills: {
    languages_frameworks: [],
    cloud_infrastructure: [],
    devops_architecture: [],
    data_ai: [],
  },
  certifications: [
    { name: "A", issuer: "AWS", issuerSvg: "/a.svg", date: "2023", url: "u" },
    { name: "B", issuer: "Microsoft", issuerSvg: "/b.svg", date: "2023", url: "u" },
  ],
  education: [],
  languages: [],
};

describe("About", () => {
  test("renders objective short and full objective", () => {
    const { getByText } = renderWithI18n(<About resume={resume} />);
    expect(getByText(/Short objective/)).toBeTruthy();
    expect(getByText("Full objective text")).toBeTruthy();
  });

  test("renders years, clouds, and certification count stats", () => {
    const { container } = renderWithI18n(<About resume={resume} />);
    const years = new Date().getFullYear() - 2018;
    expect(container.textContent).toContain(`${years}+`);
    expect(container.textContent).toContain("3");
    expect(container.textContent).toContain("2+");
  });
});
