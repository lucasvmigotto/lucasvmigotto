import { describe, expect, test } from "bun:test";
import { Experience } from "@/components/Experience";
import { renderWithI18n } from "@/test/i18n";
import type { Experience as ExperienceType } from "@/types/resume";

const singleRole: ExperienceType[] = [
  {
    company: "Acme",
    location: "São Paulo",
    roles: [
      {
        title: "Senior Engineer",
        period: { start: "2024-01", end: null },
        bullets: ["Built thing A", "Built thing B"],
      },
    ],
  },
];

const multiRole: ExperienceType[] = [
  {
    company: "Globex",
    location: "Curitiba",
    roles: [
      {
        title: "Tech Lead",
        period: { start: "2025-01", end: null },
        bullets: ["Led team"],
      },
      {
        title: "Engineer",
        period: { start: "2023-01", end: "2024-12" },
        bullets: ["Shipped features"],
      },
    ],
  },
];

describe("Experience", () => {
  test("single-role company renders company, location, role, and bullets", () => {
    const { getByText } = renderWithI18n(<Experience experience={singleRole} />);
    expect(getByText(/Acme/)).toBeTruthy();
    expect(getByText(/São Paulo/)).toBeTruthy();
    expect(getByText("Senior Engineer")).toBeTruthy();
    expect(getByText("Built thing A")).toBeTruthy();
    expect(getByText("Built thing B")).toBeTruthy();
  });

  test("multi-role company renders both role titles", () => {
    const { getByText } = renderWithI18n(<Experience experience={multiRole} />);
    expect(getByText("Tech Lead")).toBeTruthy();
    expect(getByText("Engineer")).toBeTruthy();
    expect(getByText(/Led team/)).toBeTruthy();
    expect(getByText(/Shipped features/)).toBeTruthy();
  });

  test("multi-role company renders one company header", () => {
    const { container } = renderWithI18n(<Experience experience={multiRole} />);
    const cards = container.querySelectorAll("article");
    expect(cards.length).toBe(1);
  });

  test("renders per-role periods only when multi-role", () => {
    const { getAllByText } = renderWithI18n(<Experience experience={multiRole} />);
    const present = getAllByText(/Present|atualidade/);
    expect(present.length).toBeGreaterThanOrEqual(1);
  });
});
