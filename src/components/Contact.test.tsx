import { describe, expect, test } from "bun:test";
import { Contact } from "@/components/Contact";
import { renderWithI18n } from "@/test/i18n";
import type { Meta } from "@/types/resume";

const meta: Meta = {
  name: "Lucas",
  title: "Senior",
  email: "lvmigotto1@gmail.com",
  phone: "+55 (11) 98315-6100",
  whatsapp: "https://wa.me/5511983156100",
  location: "São Paulo, Brazil",
  github: "https://github.com/lucasvmigotto",
  linkedin: "https://linkedin.com/in/lucasvmigotto",
  instagram: "https://instagram.com/lucasvmigotto",
  facebook: "https://facebook.com/lucasvmigotto",
};

describe("Contact", () => {
  test("renders mailto button and email address", () => {
    const { getByText } = renderWithI18n(<Contact meta={meta} />);
    expect(getByText("Send Email")).toBeTruthy();
    expect(getByText(meta.phone)).toBeTruthy();
  });

  test("renders social links with aria-labels", () => {
    const { getByRole } = renderWithI18n(<Contact meta={meta} />);
    expect(getByRole("link", { name: "GitHub" }).getAttribute("href")).toBe(meta.github);
    expect(getByRole("link", { name: "LinkedIn" }).getAttribute("href")).toBe(meta.linkedin);
  });

  test("whatsapp link target blank", () => {
    const { getByText } = renderWithI18n(<Contact meta={meta} />);
    const phoneAnchor = getByText(meta.phone).closest("a");
    expect(phoneAnchor?.getAttribute("href")).toBe(meta.whatsapp);
    expect(phoneAnchor?.getAttribute("target")).toBe("_blank");
  });
});
