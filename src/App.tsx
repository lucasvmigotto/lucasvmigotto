import { useTranslation } from "react-i18next";
import { useResume } from "./hooks/useResume";

export function App() {
  const { ready } = useTranslation();
  const resume = useResume();

  if (!ready || !resume) return null;

  return (
    <>
      <nav>Nav placeholder</nav>
      <main>
        <section id="hero">Hero</section>
        <section id="about">About</section>
        <section id="experience">Experience</section>
        <section id="skills">Skills</section>
        <section id="education">Education</section>
        <section id="contact">Contact</section>
      </main>
      <footer>Footer</footer>
    </>
  );
}
