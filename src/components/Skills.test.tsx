import { describe, expect, test } from "bun:test";
import { Skills } from "@/components/Skills";
import { renderWithI18n } from "@/test/i18n";
import type { Certification, SkillCategories } from "@/types/resume";

const skills: SkillCategories = {
  languages_frameworks: ["Java", "TypeScript"],
  cloud_infrastructure: ["AWS", "GCP"],
  devops_architecture: ["CI/CD"],
  data_ai: ["ML/DL"],
};

const emptySkills: SkillCategories = {
  languages_frameworks: [],
  cloud_infrastructure: [],
  devops_architecture: [],
  data_ai: [],
};

const certs: Certification[] = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "AWS",
    issuerSvg: "/a.svg",
    date: "2023-08",
    url: "https://x",
  },
];

describe("Skills", () => {
  test("renders all four category labels and their pills", () => {
    const { getByText } = renderWithI18n(<Skills skills={skills} certifications={certs} />);
    expect(getByText("Languages & Frameworks")).toBeTruthy();
    expect(getByText("Cloud & Infrastructure")).toBeTruthy();
    expect(getByText("DevOps & Architecture")).toBeTruthy();
    expect(getByText("Data & AI")).toBeTruthy();
    expect(getByText("Java")).toBeTruthy();
    expect(getByText("GCP")).toBeTruthy();
  });

  test("omits certifications section when empty", () => {
    const { container } = renderWithI18n(<Skills skills={skills} certifications={[]} />);
    expect(container.textContent).not.toContain("AWS Cloud Practitioner");
  });

  test("renders certification badge when present", () => {
    const { getByText } = renderWithI18n(<Skills skills={emptySkills} certifications={certs} />);
    expect(getByText("AWS Cloud Practitioner")).toBeTruthy();
  });
});
