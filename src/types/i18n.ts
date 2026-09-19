export interface TranslationJson {
  nav: {
    home: string;
    about: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    ctaPrimary: string;
    ctaGhost: string;
    scrollLabel: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    statYears: string;
    statClouds: string;
    statCerts: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    categoryLanguages: string;
    categoryCloud: string;
    categoryDevops: string;
    categoryData: string;
    certificationsLabel: string;
  };
  education: {
    eyebrow: string;
    heading: string;
    inProgress: string;
    completed: string;
  };
  contact: {
    heading: string;
    body: string;
    ctaEmail: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    featuredLabel: string;
    otherLabel: string;
    viewCode: string;
    viewLive: string;
  };
  footer: {
    copyright: string;
  };
  common: {
    present: string;
    skipToMain: string;
  };
}
