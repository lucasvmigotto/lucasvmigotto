import { useTranslation } from "react-i18next";
import type { Meta } from "@/types/resume";

interface FooterProps {
  meta: Meta;
}

export function Footer({ meta }: FooterProps) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-6">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 text-center">
        <p className="font-[family-name:var(--font-body)] font-light text-[0.8125rem] text-[var(--color-text-disabled)] tracking-[0.02em]">
          {t("footer.copyright", { year, name: meta.name, location: meta.location })}
        </p>
      </div>
    </footer>
  );
}
