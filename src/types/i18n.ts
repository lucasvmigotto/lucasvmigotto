export interface TranslationJson {
  nav: {
    home: string;
    about: string;
    experience: string;
    skills: string;
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
    ctaPhone: string;
  };
  footer: {
    copyright: string;
  };
  common: {
    present: string;
  };
}
