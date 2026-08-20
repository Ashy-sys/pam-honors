import Link from "next/link";

export default function JudgesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero px-6 py-32 text-white">

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative mx-auto max-w-4xl text-center">

        <p className="text-xs uppercase tracking-[0.45em] text-gold">
          PAM Honors 2026
        </p>

        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          Judges
        </h1>

        <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-black/30 p-10 backdrop-blur-xl md:p-16">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-3xl text-gold">
            P
          </div>

          <h2 className="mt-8 font-display text-3xl">
            Coming Soon
          </h2>

          <p className="mt-4 leading-7 text-white/40">
            The official PAM Honors judging panel will be announced
            soon. Check back for the full panel announcement.
          </p>

        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-white/40 transition hover:text-gold"
        >
          ? Back to PAM Honors
        </Link>

      </div>

    </main>
  );
}
