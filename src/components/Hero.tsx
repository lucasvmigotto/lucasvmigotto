import { useTranslation } from "react-i18next";
import { downloadResumePdf } from "@/lib/pdf/downloadResumePdf";
import type { ResumeJson } from "@/types/resume";
import { AbstractGeometry } from "./AbstractGeometry";
import { ScrollIndicator } from "./ScrollIndicator";
import { Button } from "./ui/Button";

interface HeroProps {
  resume: ResumeJson;
}

export function Hero({ resume }: HeroProps) {
  const { t, i18n } = useTranslation();
  const { meta, objectiveShort } = resume;

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      <AbstractGeometry />

      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 w-full">
        <div className="max-w-3xl">
          <span className="animate-fade-up block font-heading font-medium text-[0.75rem] uppercase tracking-[0.12em] text-accent mb-6 [animation-delay:200ms]">
            {meta.title}
          </span>

          <h1 className="animate-fade-up font-heading font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-text-primary [animation-delay:350ms]">
            {meta.name.split(" ")[0]}
          </h1>

          <h1 className="animate-fade-up font-heading font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-text-primary mb-8 [animation-delay:450ms]">
            {meta.name.split(" ").slice(1).join(" ")}
          </h1>

          <p className="animate-fade-up max-w-xl font-body text-[0.9375rem] sm:text-base text-text-secondary leading-relaxed mb-10 [animation-delay:580ms]">
            {objectiveShort}
          </p>

          <div className="animate-fade-up flex flex-wrap gap-4 [animation-delay:700ms]">
            <Button href="#contact">{t("hero.ctaPrimary")}</Button>
            <Button variant="ghost" onClick={() => downloadResumePdf(resume, i18n.language)}>
              {t("hero.ctaGhost")}
            </Button>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
