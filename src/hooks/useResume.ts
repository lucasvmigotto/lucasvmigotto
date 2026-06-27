import { useTranslation } from "react-i18next";
import type { ResumeJson } from "@/types/resume";

export function useResume(): ResumeJson | null {
  const { i18n } = useTranslation("resume");
  const loaded = i18n.hasResourceBundle(i18n.language, "resume");
  if (!loaded) return null;
  const data = i18n.getDataByLanguage(i18n.language);
  if (!data) return null;
  // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket for index signatures
  return data["resume"] as unknown as ResumeJson;
}
