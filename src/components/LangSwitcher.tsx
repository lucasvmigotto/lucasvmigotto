import { useTranslation } from "react-i18next";

const LOCALE_MAP: Record<string, string> = {
  "pt-BR": "pt-BR",
  pt: "pt-BR",
  en: "en",
};

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] ?? "pt";

  const toggle = () => {
    const next = currentLang === "pt" ? "en" : "pt";
    const full = LOCALE_MAP[next] ?? next;
    void i18n.changeLanguage(full);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="font-body text-[0.875rem] text-text-secondary hover:text-accent transition-colors duration-200 min-w-[44px] min-h-[44px] inline-flex items-center gap-1"
    >
      <span className={currentLang === "pt" ? "text-accent font-medium" : ""}>PT</span>
      <span className="text-text-disabled">|</span>
      <span className={currentLang === "en" ? "text-accent font-medium" : ""}>EN</span>
    </button>
  );
}
