import { readFileSync } from "node:fs";
import { render } from "@testing-library/react";
import i18next from "i18next";
import type { ReactElement } from "react";
import { initReactI18next } from "react-i18next";

let initialized = false;

export function initTestI18n(lng: "en" | "pt-BR" = "en"): void {
  if (!initialized) {
    void i18next.use(initReactI18next).init({
      lng,
      fallbackLng: "en",
      ns: ["translation", "resume"],
      defaultNS: "translation",
      resources: {
        en: {
          translation: JSON.parse(readFileSync("public/locales/en/translation.json", "utf-8")),
          resume: JSON.parse(readFileSync("public/locales/en/resume.json", "utf-8")),
        },
        "pt-BR": {
          translation: JSON.parse(readFileSync("public/locales/pt-BR/translation.json", "utf-8")),
          resume: JSON.parse(readFileSync("public/locales/pt-BR/resume.json", "utf-8")),
        },
      },
      interpolation: { escapeValue: false },
      returnNull: false,
      returnEmptyString: false,
    });
    initialized = true;
  } else {
    void i18next.changeLanguage(lng);
  }
}

export function renderWithI18n(ui: ReactElement, lng: "en" | "pt-BR" = "en") {
  initTestI18n(lng);
  return render(ui);
}
