import { useTranslation } from "react-i18next";
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

  return (
    <SectionWrapper
      id="education"
      numeral="04"
      eyebrow={t("education.eyebrow")}
      heading={t("education.heading")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {education.map((edu) => (
          <Card
            key={`${edu.institution}-${edu.period.start}`}
            className="border-t-2 border-t-[var(--color-accent)]"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-[family-name:var(--font-heading)] font-medium text-[0.9rem] leading-[1.3] text-[var(--color-text-primary)]">
                {edu.institution}
              </h3>
            </div>

            <p className="font-[family-name:var(--font-body)] text-[0.9rem] text-[var(--color-text-secondary)] mb-3">
              {edu.degree}
            </p>

            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-body)] font-light text-[0.8rem] text-[var(--color-text-disabled)] tracking-[0.02em]">
                {formatPeriod(edu.period.start, edu.period.end)}
              </span>
              {edu.inProgress && <Pill variant="success">{t("education.inProgress")}</Pill>}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
