import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "success" | "gold";
  children: ReactNode;
}

export function Pill({ variant = "accent", className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.8125rem] font-medium transition-colors duration-200 ease-out",
        "font-[family-name:var(--font-body)]",
        variant === "accent" && [
          "bg-[rgba(91,110,245,0.1)] border border-[rgba(91,110,245,0.25)] text-[var(--color-accent)]",
          "hover:bg-[rgba(91,110,245,0.2)] hover:border-[rgba(91,110,245,0.5)]",
        ],
        variant === "success" && [
          "bg-[rgba(61,201,144,0.1)] border border-[rgba(61,201,144,0.25)] text-[var(--color-success)]",
        ],
        variant === "gold" && [
          "bg-[rgba(212,168,67,0.1)] border border-[rgba(212,168,67,0.25)] text-[var(--color-gold)]",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
