export default function Footer() {
  return (
    <footer className="bg-base-surface border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">

        <div>
          <h2 className="font-display text-2xl text-gold">
            PAM Honors
          </h2>
          <p className="mt-3 text-sm text-ink-muted">
            Celebrating excellence, creativity, and achievement.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-gold">
            Explore
          </h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-ink-muted">
            <a href="/categories">Categories</a>
            <a href="/nominees">Nominees</a>
            <a href="/judges">Judges</a>
            <a href="/winners">Winners</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-gold">
            Contact
          </h3>

          <p className="mt-4 text-sm text-ink-muted">
            Official PAM Honors platform
          </p>
        </div>

      </div>

      <div className="mt-10 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} PAM Honors. All rights reserved.
      </div>
    </footer>
  );
}