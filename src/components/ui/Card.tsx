import type { HTMLAttributes, ReactNode } from "react";
import { createElement, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article";
  variant?: "default" | "glass";
  children: ReactNode;
}

export const Card = forwardRef<HTMLElement, CardProps>(
  ({ as = "div", variant = "default", className, children, ...props }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: cn(
          "rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 transition-all duration-250 ease-out",
          "shadow-[var(--shadow-card)]",
          "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[rgba(91,110,245,0.3)]",
          variant === "default" && "bg-[var(--color-surface)]",
          variant === "glass" && "glass",
          className,
        ),
        ...props,
      },
      children,
    );
  },
);

Card.displayName = "Card";
