import type { Experience, ResumeJson } from "@/types/resume";

export interface PdfBullet {
  text: string;
}

export interface PdfExperienceSection {
  company: string;
  location: string;
  roles: {
    title: string;
    periodLabel: string;
    current: boolean;
    bullets: string[];
  }[];
}

export interface PdfResumeData {
  name: string;
  title: string;
  email: string;
  whatsappUsername: string;
  location: string;
  github: string;
  linkedin: string;
  objective: string;
  experience: PdfExperienceSection[];
  skills: { category: string; items: string }[];
  certifications: { name: string; issuer: string; date: string }[];
  education: { institution: string; degree: string; periodLabel: string }[];
  languages: { language: string; level: string }[];
}

const SKILL_CATEGORY_LABELS: Record<string, string> = {
  languages_frameworks: "Languages & Frameworks",
  cloud_infrastructure: "Cloud & Infrastructure",
  devops_architecture: "DevOps & Architecture",
  data_ai: "Data & AI",
};

export function buildResumeData(
  resume: ResumeJson,
  formatPeriod: (start: string, end: string | null) => string,
): PdfResumeData {
  const formatExperience = (exp: Experience): PdfExperienceSection => ({
    company: exp.company,
    location: exp.location,
    roles: exp.roles.map((role) => ({
      title: role.title,
      periodLabel: formatPeriod(role.period.start, role.period.end),
      current: role.period.end === null,
      bullets: role.bullets,
    })),
  });

  return {
    name: resume.meta.name,
    title: resume.meta.title,
    email: resume.meta.email,
    whatsappUsername: resume.meta.whatsappUsername,
    location: resume.meta.location,
    github: resume.meta.github,
    linkedin: resume.meta.linkedin,
    objective: resume.objective,
    experience: resume.experience.map(formatExperience),
    skills: Object.entries(resume.skills).map(([category, items]) => ({
      category: SKILL_CATEGORY_LABELS[category] ?? category,
      items: items.join("  ·  "),
    })),
    certifications: resume.certifications.map((c) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.date,
    })),
    education: resume.education.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      periodLabel: formatPeriod(e.period.start, e.period.end),
    })),
    languages: resume.languages.map((l) => ({
      language: l.language,
      level: l.level,
    })),
  };
}
