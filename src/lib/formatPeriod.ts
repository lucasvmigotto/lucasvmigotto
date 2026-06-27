import i18next from "i18next";

export function formatPeriod(start: string, end: string | null, locale?: string): string {
  const lng = locale ?? i18next.language;
  const localeMap: Record<string, string> = { "pt-BR": "pt-BR", en: "en-US" };
  const fmt = new Intl.DateTimeFormat(localeMap[lng] ?? "en-US", {
    year: "numeric",
    month: "short",
  });
  const startStr = fmt.format(new Date(`${start}-01`));
  if (!end) {
    const presentLabel = i18next.t("common.present", { ns: "translation" });
    return `${startStr} — ${presentLabel}`;
  }
  const endStr = fmt.format(new Date(`${end}-01`));
  return `${startStr} — ${endStr}`;
}
