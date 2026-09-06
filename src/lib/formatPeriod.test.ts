import { describe, expect, test } from "bun:test";
import i18next from "i18next";
import { formatPeriod } from "@/lib/formatPeriod";

function init(lng: string) {
  void i18next.init({
    lng,
    fallbackLng: "en",
    resources: {
      en: { translation: { common: { present: "Present" } } },
      "pt-BR": { translation: { common: { present: "atualidade" } } },
    },
    interpolation: { escapeValue: false },
  });
}

describe("formatPeriod", () => {
  test("renders a closed range holding both endpoints", () => {
    init("en");
    const out = formatPeriod("2023-05", "2026-08", "en");
    expect(out).toContain("2023");
    expect(out).toContain("2026");
    expect(out).toContain("—");
  });

  test("appends present label for open-ended period (en)", () => {
    init("en");
    expect(formatPeriod("2026-09", null, "en")).toContain("Present");
  });

  test("appends localized present label for pt-BR", () => {
    init("pt-BR");
    expect(formatPeriod("2026-09", null, "pt-BR")).toContain("atualidade");
  });

  test("matches non-empty start always", () => {
    init("en");
    const out = formatPeriod("2020-01", "2020-12", "en");
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain("2020");
  });
});
