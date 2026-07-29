interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gold">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-3xl font-semibold text-ink md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl font-body text-base text-ink-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}