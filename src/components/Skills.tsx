import { useTranslation } from "react-i18next";
import type { Certification, SkillCategories } from "@/types/resume";
import { CertBadge } from "./CertBadge";
import { Card } from "./ui/Card";
import { Beaker, Cloud, Gear, Hexagon } from "./ui/icons";
import { Pill } from "./ui/Pill";
import { SectionWrapper } from "./ui/SectionWrapper";

interface SkillsProps {
  skills: SkillCategories;
  certifications: Certification[];
}

const CATEGORIES = [
  { key: "languages_frameworks" as const, icon: Hexagon, labelKey: "categoryLanguages" },
  { key: "cloud_infrastructure" as const, icon: Cloud, labelKey: "categoryCloud" },
  { key: "devops_architecture" as const, icon: Gear, labelKey: "categoryDevops" },
  { key: "data_ai" as const, icon: Beaker, labelKey: "categoryData" },
];

export function Skills({ skills, certifications }: SkillsProps) {
  const { t } = useTranslation();
  const tk = t as (key: string) => string;

  return (
    <SectionWrapper
      id="skills"
      numeral="03"
      eyebrow={t("skills.eyebrow")}
      heading={t("skills.heading")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map(({ key, icon: Icon, labelKey }) => (
          <Card key={key} variant="glass">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--color-accent)]">
                <Icon />
              </span>
              <span className="font-[family-name:var(--font-heading)] font-medium text-[0.75rem] uppercase tracking-[0.08em] text-[var(--color-text-primary)]">
                {tk(`skills.${labelKey}`)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills[key].map((skill) => (
                <Pill key={skill}>{skill}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {certifications.length > 0 && (
        <div className="mt-12">
          <span className="block font-[family-name:var(--font-heading)] font-medium text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            {t("skills.certificationsLabel")}
          </span>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-snap-x-mandatory pb-2">
            {certifications.map((cert) => (
              <CertBadge key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
