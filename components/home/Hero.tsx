import GradientBackground from "@/components/ui/GradientBackground";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

      <GradientBackground>
        <div />
      </GradientBackground>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">

        <p className="uppercase tracking-[0.5em] text-sm text-gold mb-8">
          PAM HONORS 2026
        </p>

        <h1 className="font-display text-5xl md:text-8xl font-bold text-white max-w-5xl leading-tight">
          Celebrating
          <br />
          Excellence,
          <br />
          Creativity &
          <br />
          Achievement
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
          A prestigious celebration recognizing outstanding talent,
          innovation, and impact across entertainment and culture.
        </p>


        <div className="mt-10 flex flex-wrap gap-5">

          <Button variant="primary">
            Vote Now
          </Button>

          <Button variant="secondary">
            Explore Categories
          </Button>

        </div>

      </div>

    </section>
  );
}