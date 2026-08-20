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
        min-h-full
        overflow-hidden
        bg-hero
        ${className}
      `}
    >

      {/* Fine grain texture */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          opacity-[0.055]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.65'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Deep atmospheric light */}
      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            -left-40
            -top-40
            h-[650px]
            w-[650px]
            rounded-full
            bg-wine/25
            blur-[150px]
            animate-glow-drift
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[20%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-gold/10
            blur-[160px]
            animate-glow-drift
          "
          style={{ animationDelay: "-8s" }}
        />

        <div
          className="
            absolute
            bottom-[-300px]
            left-[25%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-wine/15
            blur-[180px]
            animate-glow-drift
          "
          style={{ animationDelay: "-14s" }}
        />

      </div>

      {/* Fine grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.65)_100%)]
        "
      />

      <div className="relative z-30">
        {children}
      </div>

    </div>
  );
}
