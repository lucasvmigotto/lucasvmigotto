import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dotColor?: "gold" | "accent";
  children: ReactNode;
}

export function Badge({ dotColor, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8rem] font-light",
        "bg-[var(--color-surface-raised)] text-[var(--color-text-disabled)]",
        "font-[family-name:var(--font-body)] tracking-[0.02em]",
        className,
      )}
      {...props}
    >
      {dotColor && (
        <span
          className={cn(
            "inline-block w-2 h-2 rounded-full",
            dotColor === "gold" && "bg-[var(--color-gold)]",
            dotColor === "accent" && "bg-[var(--color-accent)]",
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
