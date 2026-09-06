import { describe, expect, test } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  test("renders an anchor when href is provided", () => {
    render(<Button href="#contact">Contact</Button>);
    const el = screen.getByRole("link", { name: "Contact" });
    expect(el).toBeTruthy();
    expect(el.getAttribute("href")).toBe("#contact");
  });

  test("renders a native button when href is absent", () => {
    render(<Button onClick={() => {}}>Download</Button>);
    const el = screen.getByRole("button", { name: "Download" });
    expect(el).toBeTruthy();
    expect(el.getAttribute("type")).toBe("button");
  });

  test("fires onClick on the button element", () => {
    let called = false;
    render(<Button onClick={() => (called = true)}>Go</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(called).toBe(true);
  });

  test("applies ghost variant classes", () => {
    render(
      <Button variant="ghost" onClick={() => {}}>
        Ghost
      </Button>,
    );
    const el = screen.getByRole("button", { name: "Ghost" });
    expect(el.className).toContain("border");
  });
});
