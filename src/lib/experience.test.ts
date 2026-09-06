import { describe, expect, test } from "bun:test";
import { companyPeriod, isCompanyCurrent, isRoleCurrent, slugify } from "@/lib/experience";
import type { Experience } from "@/types/resume";

const openRole = {
  title: "Senior",
  period: { start: "2024-01", end: null },
  bullets: [],
};

const closedRole = {
  title: "Junior",
  period: { start: "2022-01", end: "2023-12" },
  bullets: [],
};

describe("isRoleCurrent", () => {
  test("true when period.end is null", () => {
    expect(isRoleCurrent(openRole)).toBe(true);
  });

  test("false when period.end is set", () => {
    expect(isRoleCurrent(closedRole)).toBe(false);
  });
});

describe("isCompanyCurrent", () => {
  test("true when any role is open-ended", () => {
    const exp: Experience = {
      company: "Acme",
      location: "SP",
      roles: [closedRole, openRole],
    };
    expect(isCompanyCurrent(exp)).toBe(true);
  });

  test("false when all roles are closed", () => {
    const exp: Experience = {
      company: "Acme",
      location: "SP",
      roles: [closedRole],
    };
    expect(isCompanyCurrent(exp)).toBe(false);
  });
});

describe("companyPeriod", () => {
  test("single role passthrough", () => {
    const exp: Experience = {
      company: "Acme",
      location: "SP",
      roles: [openRole],
    };
    expect(companyPeriod(exp)).toEqual({ start: "2024-01", end: null });
  });

  test("multiple roles, most-recent open-ended", () => {
    const exp: Experience = {
      company: "Acme",
      location: "SP",
      roles: [openRole, closedRole],
    };
    expect(companyPeriod(exp)).toEqual({ start: "2022-01", end: null });
  });

  test("all-closed returns earliest start and latest end", () => {
    const roleA = { title: "A", period: { start: "2021-01", end: "2022-06" }, bullets: [] };
    const roleB = { title: "B", period: { start: "2022-07", end: "2023-12" }, bullets: [] };
    const exp: Experience = { company: "Acme", location: "SP", roles: [roleB, roleA] };
    expect(companyPeriod(exp)).toEqual({ start: "2021-01", end: "2023-12" });
  });
});

describe("slugify", () => {
  test("strips accents and produces ascii lowercase slugs", () => {
    expect(slugify("AMIX Serviços de Informática")).toBe("amix-servicos-de-informatica");
    expect(slugify("São Paulo")).toBe("sao-paulo");
    expect(slugify("SESC-SP")).toBe("sesc-sp");
  });
});
