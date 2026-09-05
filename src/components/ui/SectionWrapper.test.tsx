import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

describe("SectionWrapper", () => {
  test("renders section with id and data-section", () => {
    const { container } = render(
      <SectionWrapper id="about" numeral={null} eyebrow="Eyebrow">
        <p>Body</p>
      </SectionWrapper>,
    );
    const section = container.querySelector("section");
    expect(section?.getAttribute("id")).toBe("about");
    expect(section?.getAttribute("data-section")).toBe("about");
  });

  test("renders eyebrow text", () => {
    render(
      <SectionWrapper id="about" numeral={null} eyebrow="About me">
        <p>Body</p>
      </SectionWrapper>,
    );
    expect(screen.getByText("About me")).toBeTruthy();
  });

  test("renders heading when provided", () => {
    render(
      <SectionWrapper id="about" numeral={null} eyebrow="About" heading="Big Title">
        <p>Body</p>
      </SectionWrapper>,
    );
    expect(screen.getByRole("heading", { name: "Big Title" })).toBeTruthy();
  });

  test("omits numeral when null", () => {
    const { container } = render(
      <SectionWrapper id="about" numeral={null} eyebrow="About">
        <p>Body</p>
      </SectionWrapper>,
    );
    expect(container.textContent).not.toContain("01");
  });

  test("renders numeral when provided", () => {
    const { container } = render(
      <SectionWrapper id="about" numeral="01" eyebrow="About">
        <p>Body</p>
      </SectionWrapper>,
    );
    expect(container.textContent).toContain("01");
  });
});
