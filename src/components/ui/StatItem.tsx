interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <span className="text-center">
      <span className="block font-[family-name:var(--font-heading)] font-semibold text-[2rem] text-[var(--color-accent)]">
        {value}
      </span>
      <span className="block text-[0.8125rem] font-light text-[var(--color-text-secondary)] font-[family-name:var(--font-body)] tracking-[0.02em] mt-1">
        {label}
      </span>
    </span>
  );
}
