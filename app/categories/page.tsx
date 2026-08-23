import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 py-24">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,31,43,0.18),transparent_55%)]" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-7 w-7 text-gold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold">
            PAM Honors 2027
          </p>

          <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Categories
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-gold/50" />

          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
            We&apos;re currently updating the PAM Honors categories. Please
            check back shortly.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Back Home
            </Link>

            <Link
              href="/nominees"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition hover:border-gold/40 hover:bg-white/10"
            >
              View Nominees
            </Link>
          </div>

          <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/30">
            PAM Honors • 14 February 2027
          </p>
        </div>
      </section>
    </main>
  );
}