import type { TranslationJson } from "@/types/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    ns: "translation" | "resume" | "projects";
    resources: {
      translation: TranslationJson;
      resume: Record<string, unknown>;
      projects: Record<string, unknown>;
    };
  }
}
