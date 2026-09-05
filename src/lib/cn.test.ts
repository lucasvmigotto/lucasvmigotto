import { describe, expect, test } from "bun:test";
import { cn } from "@/lib/cn";

describe("cn", () => {
  test("joins multiple strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  test("flattens nested arrays and drops falsy values", () => {
    expect(cn("a", [false, "b", null, undefined, "c"], 0, "")).toBe("a b c");
  });

  test("tailwind-merge dedupes conflicting utilities", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  test("merges conditional object-style values", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});
