import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { Pill } from "@/components/ui/Pill";

describe("Pill", () => {
  test("renders children", () => {
    const { container } = render(<Pill>Java</Pill>);
    expect(container.textContent).toContain("Java");
  });

  test("default variant uses accent styling", () => {
    const { container } = render(<Pill>Java</Pill>);
    expect(container.firstElementChild?.className).toContain("text-accent");
  });

  test("success variant uses success styling", () => {
    const { container } = render(<Pill variant="success">Done</Pill>);
    expect(container.firstElementChild?.className).toContain("text-success");
  });

  test("gold variant uses gold styling", () => {
    const { container } = render(<Pill variant="gold">Gold</Pill>);
    expect(container.firstElementChild?.className).toContain("text-gold");
  });
});
