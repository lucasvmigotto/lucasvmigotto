import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type ButtonAsAnchor = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium cursor-pointer transition-all duration-200 ease-out select-none font-heading text-[0.9375rem] tracking-[-0.01em] min-h-[44px] min-w-[44px] px-6 py-3";

const VARIANT_CLASSES: Record<ButtonVariant, string[]> = {
  primary: [
    "bg-accent text-white",
    "shadow-btn",
    "hover:-translate-y-0.5 hover:shadow-btn-hover",
    "active:translate-y-0",
  ],
  ghost: [
    "bg-transparent border border-border text-text-primary",
    "hover:border-accent hover:text-accent",
  ],
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
