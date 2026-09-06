import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { StatItem } from "@/components/ui/StatItem";

describe("StatItem", () => {
  test("renders value and label", () => {
    const { container } = render(<StatItem value="8+" label="Years" />);
    expect(container.textContent).toContain("8+");
    expect(container.textContent).toContain("Years");
  });
});
