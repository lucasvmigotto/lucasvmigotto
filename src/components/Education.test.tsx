import { describe, expect, test } from "bun:test";
import { Education } from "@/components/Education";
import { renderWithI18n } from "@/test/i18n";
import type { Education as EducationType } from "@/types/resume";

const education: EducationType[] = [
  {
    institution: "USP/ESALQ",
    degree: "MBA Software Engineering",
    period: { start: "2026-10", end: null },
    inProgress: true,
  },
  {
    institution: "FATEC Ipiranga",
    degree: "Systems Analysis",
    period: { start: "2018-01", end: "2021-06" },
    inProgress: false,
  },
];

describe("Education", () => {
  test("renders institution and degree", () => {
    const { getByText } = renderWithI18n(<Education education={education} />);
    expect(getByText("USP/ESALQ")).toBeTruthy();
    expect(getByText("MBA Software Engineering")).toBeTruthy();
  });

  test("renders in-progress pill for open-ended entry", () => {
    const { getByText } = renderWithI18n(<Education education={education} />);
    expect(getByText("In Progress")).toBeTruthy();
  });

  test("renders one card per entry", () => {
    const { getByText } = renderWithI18n(<Education education={education} />);
    expect(getByText("USP/ESALQ")).toBeTruthy();
    expect(getByText("FATEC Ipiranga")).toBeTruthy();
    expect(getByText("Systems Analysis")).toBeTruthy();
  });
});
