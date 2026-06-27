import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  numeral: string | null;
  eyebrow: string;
  heading?: string;
  children: ReactNode;
}

export function SectionWrapper({ id, numeral, eyebrow, heading, children }: SectionWrapperProps) {
  return (
    <section id={id} data-section={id} className="relative py-16 lg:py-24 overflow-x-hidden">
      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-8">
        {numeral && (
          <span
            className="absolute -left-4 lg:-left-12 top-0 font-heading font-bold text-[8rem] leading-none text-text-primary opacity-[0.06] select-none pointer-events-none hidden lg:block"
            aria-hidden="true"
          >
            {numeral}
          </span>
        )}
        <span className="block font-heading font-medium text-[0.75rem] uppercase tracking-[0.12em] text-accent mb-3 animate-letter-space">
          {eyebrow}
        </span>
        {heading && (
          <h2 className="font-heading font-semibold text-[1.5rem] lg:text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-12">
            {heading}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
