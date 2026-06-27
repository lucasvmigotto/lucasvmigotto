import { cn } from "@/lib/cn";

export function TimelineDot({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute w-3 h-3 rounded-full bg-accent border-2 border-bg z-10", className)}
      aria-hidden="true"
    />
  );
}
