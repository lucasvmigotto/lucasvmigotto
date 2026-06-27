import { useEffect, useRef, useState } from "react";

export function useActiveSection() {
  const [activeId, setActiveId] = useState("home");
  const sectionsRef = useRef(new Map<string, IntersectionObserverEntry>());

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sectionsRef.current.set(entry.target.id, entry);
        }

        let topId = "";
        let minTop = Infinity;

        for (const entry of sectionsRef.current.values()) {
          const rect = entry.boundingClientRect;
          if (rect.top < minTop && rect.top > -300) {
            minTop = rect.top;
            topId = entry.target.id;
          }
        }

        if (topId) setActiveId(topId);
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return activeId;
}
