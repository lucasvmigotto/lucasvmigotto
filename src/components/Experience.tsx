import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { companyPeriod, isCompanyCurrent, isRoleCurrent } from "@/lib/experience";
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
  const { ref, isVisible, getChildDelay } = useScrollReveal({ staggerDelay: 100 });

  return (
    <SectionWrapper
      id="experience"
      numeral="02"
      eyebrow={t("experience.eyebrow")}
      heading={t("experience.heading")}
    >
      <div
        ref={ref}
        data-reveal
        className={`relative max-w-[720px] mx-auto ${isVisible ? "is-visible" : ""}`}
      >
        <div
          className={`animate-spine-grow absolute left-4 top-0 w-0.5 h-full bg-border ${isVisible ? "is-visible" : ""}`}
        />

        <div className="flex flex-col gap-8 md:gap-12">
          {experience.map((exp, i) => {
            const overall = companyPeriod(exp);
            const isMultiRole = exp.roles.length > 1;

            return (
              <div
                key={`${exp.company}-${exp.location}`}
                className="animate-fade-up relative pl-12"
                style={{ animationDelay: getChildDelay(i) }}
              >
                <TimelineDot
                  className="left-[10px] top-1"
                  dotColor={isCompanyCurrent(exp) ? "gold" : "accent"}
                />

                <Card as="article">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge dotColor={isCompanyCurrent(exp) ? "gold" : undefined}>
                      {formatPeriod(overall.start, overall.end)}
                    </Badge>
                  </div>

                  <p className="font-heading text-[0.875rem] sm:text-[0.9rem] uppercase tracking-[0.05em] leading-[1.4] text-text-disabled mb-4">
                    {exp.company} &middot; {exp.location}
                  </p>

                  <div className={isMultiRole ? "relative flex flex-col gap-5" : undefined}>
                    {isMultiRole && (
                      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
                    )}

                    {exp.roles.map((role) => (
                      <div
                        key={`${exp.company}-${role.period.start}`}
                        className={isMultiRole ? "relative pl-6" : undefined}
                      >
                        {isMultiRole && (
                          <TimelineDot
                            size="sm"
                            className="left-0 top-1.5"
                            dotColor={isRoleCurrent(role) ? "gold" : "accent"}
                          />
                        )}

                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-heading font-medium text-[1.1rem] sm:text-[1.25rem] leading-[1.3] tracking-[-0.01em] text-text-primary">
                            {role.title}
                          </h3>
                          {isMultiRole && (
                            <span className="font-body text-[0.8rem] text-text-disabled">
                              {formatPeriod(role.period.start, role.period.end)}
                            </span>
                          )}
                        </div>

                        <ul className="space-y-2 mt-2">
                          {role.bullets.map((bullet, bi) => (
                            <li
                              // biome-ignore lint/suspicious/noArrayIndexKey: static data, never reordered
                              key={bi}
                              className="flex items-start gap-2 font-body text-[0.9375rem] text-text-secondary leading-relaxed"
                            >
                              <span className="mt-[0.4em] shrink-0 text-accent">
                                <ChevronRight />
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
