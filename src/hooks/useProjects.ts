import { useTranslation } from "react-i18next";
import type { Project } from "@/types/resume";

export function useProjects(): Project[] | null {
  const { i18n } = useTranslation("projects");
  const loaded = i18n.hasResourceBundle(i18n.language, "projects");
  if (!loaded) return null;
  const data = i18n.getDataByLanguage(i18n.language);
  if (!data) return null;
  // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket for index signatures
  return (data["projects"] as { projects: Project[] } | undefined)?.projects ?? null;
}
