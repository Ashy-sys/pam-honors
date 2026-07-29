type CountdownUnitProps = {
  value: number;
  label: string;
};

export default function CountdownUnit({
  value,
  label,
}: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center bg-base-surface border border-gold/20 rounded-2xl px-6 py-5 min-w-[90px]">
      <span className="font-mono text-3xl md:text-4xl text-gold">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-2 text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </span>
    </div>
  );
}