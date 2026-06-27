import { useTranslation } from "react-i18next";
import type { ResumeJson } from "@/types/resume";
import { SectionWrapper } from "./ui/SectionWrapper";
import { StatItem } from "./ui/StatItem";

interface AboutProps {
  resume: ResumeJson;
}

export function About({ resume }: AboutProps) {
  const { t } = useTranslation();

  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  const cloudCount = 3;
  const certCount = resume.certifications.length;

  return (
    <SectionWrapper
      id="about"
      numeral="01"
      eyebrow={t("about.eyebrow")}
      heading={t("about.heading")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="lg:block hidden" />
        <div>
          <p className="font-body text-[0.9375rem] sm:text-base text-text-secondary leading-relaxed mb-10">
            &ldquo;{resume.objectiveShort}.&rdquo;
          </p>

          <p className="font-body text-[0.9375rem] sm:text-base text-text-secondary leading-relaxed mb-10">
            {resume.objective}
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-8 py-6 border-t border-b border-border">
            <StatItem value={`${years}+`} label={t("about.statYears")} />
            <span className="block w-px h-12 bg-border" aria-hidden="true" />
            <StatItem value={`${cloudCount}`} label={t("about.statClouds")} />
            <span className="block w-px h-12 bg-border" aria-hidden="true" />
            <StatItem value={`${certCount}+`} label={t("about.statCerts")} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
