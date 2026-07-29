interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBackground({
  children,
  className = "",
}: GradientBackgroundProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-hero
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-glow-drift absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-wine blur-3xl" />
        <div className="animate-glow-drift absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gold opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}