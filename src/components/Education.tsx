import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatPeriod } from "@/lib/formatPeriod";
import type { Education as EducationType } from "@/types/resume";
import { Card } from "./ui/Card";
import { Pill } from "./ui/Pill";
import { SectionWrapper } from "./ui/SectionWrapper";

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  const { t } = useTranslation();
  const { ref, isVisible, getChildDelay } = useScrollReveal({ staggerDelay: 80 });

  return (
    <SectionWrapper
      id="education"
      numeral="04"
      eyebrow={t("education.eyebrow")}
      heading={t("education.heading")}
    >
      <div
        ref={ref}
        data-reveal
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isVisible ? "is-visible" : ""}`}
      >
        {education.map((edu, i) => (
          <div
            key={`${edu.institution}-${edu.period.start}`}
            className="animate-fade-up"
            style={{ animationDelay: getChildDelay(i) }}
          >
            <Card className="border-t-2 border-t-accent">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-medium text-[0.9rem] leading-[1.3] text-text-primary">
                  {edu.institution}
                </h3>
              </div>

              <p className="font-body text-[0.9rem] text-text-secondary mb-3">{edu.degree}</p>

              <div className="flex items-center gap-2">
                <span className="font-body font-light text-[0.8rem] text-text-disabled tracking-[0.02em]">
                  {formatPeriod(edu.period.start, edu.period.end)}
                </span>
                {edu.inProgress && <Pill variant="success">{t("education.inProgress")}</Pill>}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
