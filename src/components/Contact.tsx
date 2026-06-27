import { useTranslation } from "react-i18next";
import type { Meta } from "@/types/resume";
import { Button } from "./ui/Button";
import { Email, GitHub, Instagram, LinkedIn, Phone } from "./ui/icons";

interface ContactProps {
  meta: Meta;
}

export function Contact({ meta }: ContactProps) {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      data-section="contact"
      className="bg-surface border-t border-border py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
          <div>
            <h2 className="font-heading font-semibold text-[1.5rem] lg:text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-4">
              {t("contact.heading")}
            </h2>
            <p className="font-body text-[0.9375rem] sm:text-base text-text-secondary leading-relaxed mb-8">
              {t("contact.body")}
            </p>
            <Button href={`mailto:${meta.email}`}>{t("contact.ctaEmail")}</Button>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <a
              href={`mailto:${meta.email}`}
              className="inline-flex items-center gap-3 font-body text-[0.9375rem] text-text-secondary hover:text-accent transition-colors duration-200 min-h-[44px]"
            >
              <Email />
              {meta.email}
            </a>
            <a
              href={meta.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-[0.9375rem] text-text-secondary hover:text-accent transition-colors duration-200 min-h-[44px]"
            >
              <Phone />
              {meta.phone}
            </a>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary hover:text-accent transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <LinkedIn />
              </a>
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-secondary hover:text-accent transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <GitHub />
              </a>
              <a
                href={meta.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-secondary hover:text-accent transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
