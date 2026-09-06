import { describe, expect, mock, test } from "bun:test";
import { fireEvent } from "@testing-library/react";
import { Hero } from "@/components/Hero";
import { renderWithI18n } from "@/test/i18n";
import type { ResumeJson } from "@/types/resume";

const resume: ResumeJson = {
  meta: {
    name: "Lucas Vidor Migotto",
    title: "Senior Software Engineer & Cloud Architect",
    email: "a@b.com",
    whatsappUsername: "@lucasvmigotto",
    whatsappLink: "https://wa.me/lucasvmigotto",
    location: "São Paulo, Brazil",
    github: "g",
    linkedin: "l",
    instagram: "i",
    facebook: "f",
  },
  objectiveShort: "Looking to build things",
  objective: "Long",
  experience: [],
  skills: {
    languages_frameworks: [],
    cloud_infrastructure: [],
    devops_architecture: [],
    data_ai: [],
  },
  certifications: [],
  education: [],
  languages: [],
};

const downloadResumePdf = mock(async () => {});

mock.module("@/lib/pdf/downloadResumePdf", () => ({
  downloadResumePdf,
}));

describe("Hero", () => {
  test("renders split name across two headings", () => {
    const { getAllByRole } = renderWithI18n(<Hero resume={resume} />);
    const headings = getAllByRole("heading", { level: 1 });
    expect(headings.length).toBe(2);
    expect(headings[0]?.textContent).toBe("Lucas");
    expect(headings[1]?.textContent).toBe("Vidor Migotto");
  });

  test("renders title and objective short", () => {
    const { getByText } = renderWithI18n(<Hero resume={resume} />);
    expect(getByText("Senior Software Engineer & Cloud Architect")).toBeTruthy();
    expect(getByText("Looking to build things")).toBeTruthy();
  });

  test("renders primary and ghost CTA", () => {
    const { getByText } = renderWithI18n(<Hero resume={resume} />);
    expect(getByText("Get in Touch")).toBeTruthy();
    expect(getByText("View Resume")).toBeTruthy();
  });

  test("View Resume is a button that triggers downloadResumePdf", () => {
    const { getByRole } = renderWithI18n(<Hero resume={resume} />);
    const btn = getByRole("button", { name: "View Resume" });
    fireEvent.click(btn);
    expect(downloadResumePdf).toHaveBeenCalled();
  });
});
