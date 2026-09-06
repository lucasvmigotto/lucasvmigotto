export interface Period {
  start: string;
  end: string | null;
}

export interface ExperienceRole {
  title: string;
  period: Period;
  bullets: string[];
}

export interface Experience {
  company: string;
  location: string;
  roles: ExperienceRole[]; // ordered most-recent-first
}

export interface SkillCategories {
  languages_frameworks: string[];
  cloud_infrastructure: string[];
  devops_architecture: string[];
  data_ai: string[];
}

export interface Certification {
  name: string;
  issuer: "Microsoft" | "AWS";
  issuerSvg: string;
  date: string;
  url: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: Period;
  inProgress: boolean;
}

export interface Language {
  language: string;
  level: string;
}

export interface SpecializedCourse {
  provider: string;
  name: string;
  date: string;
}

export interface CredlyBadge {
  name: string;
  url: string;
}

export interface Meta {
  name: string;
  title: string;
  email: string;
  whatsappUsername: string;
  whatsappLink: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface ResumeJson {
  meta: Meta;
  objectiveShort: string;
  objective: string;
  experience: Experience[];
  skills: SkillCategories;
  certifications: Certification[];
  education: Education[];
  languages: Language[];
}
