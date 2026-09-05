import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { TimelineDot } from "@/components/ui/TimelineDot";

describe("TimelineDot", () => {
  test("default is md accent dot", () => {
    const { container } = render(<TimelineDot />);
    const el = container.firstElementChild;
    expect(el?.className).toContain("w-3 h-3");
    expect(el?.className).toContain("bg-accent");
  });

  test("size sm renders a smaller dot", () => {
    const { container } = render(<TimelineDot size="sm" />);
    expect(container.firstElementChild?.className).toContain("w-2 h-2");
  });

  test("dotColor gold renders gold dot", () => {
    const { container } = render(<TimelineDot dotColor="gold" />);
    expect(container.firstElementChild?.className).toContain("bg-gold");
  });

  test("is aria-hidden", () => {
    const { container } = render(<TimelineDot />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
});
