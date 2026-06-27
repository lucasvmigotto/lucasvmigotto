import { useTranslation } from "react-i18next";
import { formatPeriod } from "@/lib/formatPeriod";
import type { Experience as ExperienceType } from "@/types/resume";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { ChevronRight } from "./ui/icons";
import { SectionWrapper } from "./ui/SectionWrapper";
import { TimelineDot } from "./ui/TimelineDot";

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      id="experience"
      numeral="02"
      eyebrow={t("experience.eyebrow")}
      heading={t("experience.heading")}
    >
      <div className="relative max-w-[720px] mx-auto">
        <div className="animate-spine-grow absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-0.5 h-full bg-[var(--color-border)]" />

        <div className="flex flex-col gap-8 md:gap-12">
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.period.start}`}
              className={`animate-fade-up relative md:w-1/2 pl-12 md:px-8 ${i % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"}`}
            >
              <TimelineDot
                className={`left-[10px] top-1 md:left-auto ${i % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"}`}
              />

              <Card as="article">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge dotColor={exp.current ? "gold" : undefined}>
                    {formatPeriod(exp.period.start, exp.period.end)}
                  </Badge>
                </div>

                <h3 className="font-[family-name:var(--font-heading)] font-medium text-[1.1rem] sm:text-[1.25rem] leading-[1.3] tracking-[-0.01em] text-[var(--color-text-primary)] mb-1">
                  {exp.role}
                </h3>

                <p className="font-[family-name:var(--font-heading)] text-[0.875rem] sm:text-[0.9rem] uppercase tracking-[0.05em] leading-[1.4] text-[var(--color-text-disabled)] mb-4">
                  {exp.company} &middot; {exp.location}
                </p>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, bi) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static data, never reordered
                      key={bi}
                      className="flex items-start gap-2 font-[family-name:var(--font-body)] text-[0.9375rem] text-[var(--color-text-secondary)] leading-relaxed"
                    >
                      <span className="mt-[0.4em] shrink-0 text-[var(--color-accent)]">
                        <ChevronRight />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
