import type { Certification } from "@/types/resume";
import { ArrowUpRight } from "./ui/icons";

interface CertBadgeProps {
  cert: Certification;
}

export function CertBadge({ cert }: CertBadgeProps) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group shrink-0 w-[280px] flex items-center gap-4 p-4 rounded-md bg-surface border border-border snap-start hover:scale-[1.02] transition-transform duration-200 ease-out"
    >
      <img
        src={`${import.meta.env["BASE_URL"] !== "/" ? import.meta.env["BASE_URL"] : ""}${cert.issuerSvg}`}
        alt={`${cert.issuer} logo`}
        className="w-12 h-12 object-contain shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="font-heading font-medium text-[0.875rem] text-text-primary">{cert.name}</p>
        <p className="font-body text-[0.75rem] text-text-disabled">{cert.issuer}</p>
      </div>
      <span className="text-text-disabled group-hover:text-accent transition-colors duration-200">
        <ArrowUpRight />
      </span>
    </a>
  );
}
