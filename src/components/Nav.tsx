import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavScroll } from "@/hooks/useNavScroll";
import { LangSwitcher } from "./LangSwitcher";

const SECTIONS = [
  { id: "home", labelKey: "home" },
  { id: "about", labelKey: "about" },
  { id: "experience", labelKey: "experience" },
  { id: "skills", labelKey: "skills" },
  { id: "education", labelKey: "education" },
  { id: "contact", labelKey: "contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const scrolled = useNavScroll();

  const handleNavClick = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-100 border-b transition-colors duration-300 ease-out ${
        scrolled
          ? "bg-[rgba(8,12,20,0.85)] backdrop-blur-[16px] border-[var(--color-border)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8 flex items-center justify-between h-16">
        <button
          type="button"
          onClick={() => handleNavClick("hero")}
          className="font-[family-name:var(--font-heading)] font-semibold text-[1rem] text-[var(--color-text-primary)] tracking-[-0.01em] bg-transparent border-none cursor-pointer"
        >
          LVM
        </button>

        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map(({ id, labelKey }) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative font-[family-name:var(--font-body)] text-[0.875rem] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 py-1
                  after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-[var(--color-accent)] after:transition-[width] after:duration-300 after:ease-out
                  hover:after:w-full"
            >
              {t(`nav.${labelKey}`)}
            </a>
          ))}
          <LangSwitcher />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-[2px] bg-[var(--color-text-primary)] transition-transform duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] bg-[var(--color-text-primary)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] bg-[var(--color-text-primary)] transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[rgba(8,12,20,0.95)] backdrop-blur-[16px] border-t border-[var(--color-border)]">
          <div className="flex flex-col px-4 pb-4 pt-2">
            {SECTIONS.map(({ id, labelKey }) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-[family-name:var(--font-body)] text-[0.9375rem] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 py-3 min-h-[44px] flex items-center"
              >
                {t(`nav.${labelKey}`)}
              </a>
            ))}
            <div className="py-3">
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
