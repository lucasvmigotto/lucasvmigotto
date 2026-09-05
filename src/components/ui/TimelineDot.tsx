import { cn } from "@/lib/cn";

interface TimelineDotProps {
  className?: string;
  size?: "md" | "sm";
  dotColor?: "gold" | "accent";
}

const SIZE_CLASSES: Record<NonNullable<TimelineDotProps["size"]>, string> = {
  md: "w-3 h-3",
  sm: "w-2 h-2",
};

const COLOR_CLASSES: Record<NonNullable<TimelineDotProps["dotColor"]>, string> = {
  gold: "bg-gold",
  accent: "bg-accent",
};

export function TimelineDot({ className, size = "md", dotColor = "accent" }: TimelineDotProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full border-2 border-bg z-10",
        SIZE_CLASSES[size],
        COLOR_CLASSES[dotColor],
        className,
      )}
      aria-hidden="true"
    />
  );
}
