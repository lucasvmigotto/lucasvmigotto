import { describe, expect, test } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react";
import { LangSwitcher } from "@/components/LangSwitcher";
import { initTestI18n } from "@/test/i18n";

describe("LangSwitcher", () => {
  test("marks PT active by default (pt-BR language)", () => {
    initTestI18n("pt-BR");
    const { getByText } = render(<LangSwitcher />);
    const pt = getByText("PT");
    const en = getByText("EN");
    expect(pt.className).toContain("text-accent");
    expect(en.className).not.toContain("text-accent");
  });

  test("toggles to EN on click", () => {
    initTestI18n("pt-BR");
    const { getByText } = render(<LangSwitcher />);
    const button = getByText("PT").closest("button");
    act(() => {
      fireEvent.click(button as HTMLButtonElement);
    });
    const en = getByText("EN");
    expect(en.className).toContain("text-accent");
  });
});
