import { useTranslation } from "react-i18next";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Skills } from "./components/Skills";
import { CursorFollower } from "./components/ui/CursorFollower";
import { useResume } from "./hooks/useResume";

export function App() {
  const { ready } = useTranslation();
  const resume = useResume();

  if (!ready || !resume) return null;

  return (
    <>
      <CursorFollower />
      <Nav />
      <main>
        <Hero resume={resume} />
        <About resume={resume} />
        <Experience experience={resume.experience} />
        <Skills skills={resume.skills} certifications={resume.certifications} />
        <Education education={resume.education} />
        <Contact meta={resume.meta} />
      </main>
      <Footer meta={resume.meta} />
    </>
  );
}
