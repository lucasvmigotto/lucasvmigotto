import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-all duration-200 ease-out select-none",
        "font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.01em]",
        "min-h-[44px] min-w-[44px] px-6 py-3",
        variant === "primary" && [
          "bg-[var(--color-accent)] text-white",
          "shadow-[var(--shadow-btn)]",
          "hover:-translate-y-0.5 hover:shadow-[var(--shadow-btn-hover)]",
          "active:translate-y-0",
        ],
        variant === "ghost" && [
          "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)]",
          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
