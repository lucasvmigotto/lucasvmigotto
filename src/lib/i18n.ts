import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

function setDocumentLang(lng: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
}

await i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt-BR",
    supportedLngs: ["pt-BR", "en"],
    ns: ["translation", "resume", "projects"],
    defaultNS: "translation",
    backend: {
      loadPath: `${import.meta.env["BASE_URL"]}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ["querystring", "path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    returnEmptyString: false,
  });

setDocumentLang(i18next.language);
i18next.on("languageChanged", setDocumentLang);

export default i18next;
