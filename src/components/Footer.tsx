import { useTranslation } from "react-i18next";
import type { Meta } from "@/types/resume";

interface FooterProps {
  meta: Meta;
}

export function Footer({ meta }: FooterProps) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-6">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 text-center">
        <p className="font-body font-light text-[0.8125rem] text-text-disabled tracking-[0.02em]">
          {t("footer.copyright", { year, name: meta.name, location: meta.location })}
        </p>
        <p className="font-mono text-[0.75rem] text-text-disabled mt-1">v{__APP_VERSION__}</p>
      </div>
    </footer>
  );
}
