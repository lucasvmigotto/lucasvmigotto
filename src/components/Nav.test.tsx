import { describe, expect, test } from "bun:test";
import { fireEvent } from "@testing-library/react";
import { Nav } from "@/components/Nav";
import { renderWithI18n } from "@/test/i18n";

describe("Nav", () => {
  test("renders all section links", () => {
    const { getByText } = renderWithI18n(<Nav />);
    for (const label of ["Home", "About", "Experience", "Skills", "Education", "Contact"]) {
      expect(getByText(label)).toBeTruthy();
    }
  });

  test("renders LVM brand button", () => {
    const { getByText } = renderWithI18n(<Nav />);
    expect(getByText("LVM")).toBeTruthy();
  });

  test("hamburger toggles aria-expanded", () => {
    const { getByLabelText } = renderWithI18n(<Nav />);
    const burger = getByLabelText("Open menu");
    expect(burger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(burger);
    expect(burger.getAttribute("aria-expanded")).toBe("true");
  });
});
