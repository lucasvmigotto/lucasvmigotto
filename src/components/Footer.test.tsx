import { describe, expect, test } from "bun:test";
import { Footer } from "@/components/Footer";
import { renderWithI18n } from "@/test/i18n";
import type { Meta } from "@/types/resume";

const meta: Meta = {
  name: "Lucas Vidor Migotto",
  title: "Senior",
  email: "a@b.com",
  whatsappUsername: "@lucasvmigotto",
  whatsappLink: "https://wa.me/lucasvmigotto",
  location: "São Paulo, Brazil",
  github: "g",
  linkedin: "l",
  instagram: "i",
  facebook: "f",
};

describe("Footer", () => {
  test("renders copyright with current year", () => {
    const { container } = renderWithI18n(<Footer meta={meta} />);
    expect(container.textContent).toContain("Lucas Vidor Migotto");
    expect(container.textContent).toContain(String(new Date().getFullYear()));
  });

  test("renders app version", () => {
    const { container } = renderWithI18n(<Footer meta={meta} />);
    expect(container.textContent).toContain("vtest");
  });
});
