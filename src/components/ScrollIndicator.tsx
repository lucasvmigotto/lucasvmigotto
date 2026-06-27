import { useTranslation } from "react-i18next";

export function ScrollIndicator() {
  const { t } = useTranslation();
  return (
    <div className="absolute left-8 bottom-8 flex items-center gap-4" aria-hidden="true">
      <span className="font-body font-light text-[0.8125rem] text-text-disabled tracking-[0.02em] -rotate-90 origin-left -translate-y-full">
        {t("hero.scrollLabel")}
      </span>
      <div className="w-[2px] h-8 bg-accent opacity-30 animate-scroll-pulse" />
    </div>
  );
}
