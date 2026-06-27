import { useTranslation } from "react-i18next";
import type { Meta } from "@/types/resume";
import { AbstractGeometry } from "./AbstractGeometry";
import { ScrollIndicator } from "./ScrollIndicator";
import { Button } from "./ui/Button";

interface HeroProps {
  meta: Meta;
  objectiveShort: string;
}

export function Hero({ meta, objectiveShort }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      <AbstractGeometry />

      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 w-full">
        <div className="max-w-3xl">
          <span className="animate-fade-up block font-[family-name:var(--font-heading)] font-medium text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-accent)] mb-6 [animation-delay:200ms]">
            {meta.title}
          </span>

          <h1 className="animate-fade-up font-[family-name:var(--font-heading)] font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-[var(--color-text-primary)] [animation-delay:350ms]">
            {meta.name.split(" ")[0]}
          </h1>

          <h1 className="animate-fade-up font-[family-name:var(--font-heading)] font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-[var(--color-text-primary)] mb-8 [animation-delay:450ms]">
            {meta.name.split(" ").slice(1).join(" ")}
          </h1>

          <p className="animate-fade-up max-w-xl font-[family-name:var(--font-body)] text-[0.9375rem] sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-10 [animation-delay:580ms]">
            {objectiveShort}
          </p>

          <div className="animate-fade-up flex flex-wrap gap-4 [animation-delay:700ms]">
            <Button href="#contact">{t("hero.ctaPrimary")}</Button>
            {meta.pdfUrl && (
              <Button variant="ghost" href={meta.pdfUrl} target="_blank" rel="noopener noreferrer">
                {t("hero.ctaGhost")}
              </Button>
            )}
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
