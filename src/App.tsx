import { useTranslation } from "react-i18next";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { CursorFollower } from "./components/ui/CursorFollower";
import { SkipLink } from "./components/ui/SkipLink";
import { Toast } from "./components/ui/Toast";
import { useResume } from "./hooks/useResume";

export function App() {
  const { ready } = useTranslation();
  const resume = useResume();

  if (!ready || !resume) return null;

  return (
    <>
      <SkipLink />
      <CursorFollower />
      <Nav />
      <main id="main-content">
        <Hero resume={resume} />
        <About resume={resume} />
        <Experience experience={resume.experience} />
        <Skills skills={resume.skills} certifications={resume.certifications} />
        <Projects projects={resume.projects} />
        <Education education={resume.education} />
        <Contact meta={resume.meta} />
      </main>
      <Footer meta={resume.meta} />
      <Toast />
    </>
  );
}
