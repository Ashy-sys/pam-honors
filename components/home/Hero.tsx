import GradientBackground from "@/components/ui/GradientBackground";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
     <GradientBackground>
  <div />
</GradientBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">

        <p className="uppercase tracking-[0.3em] text-sm text-gold mb-6">
          PAM HONORS 2026
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink max-w-4xl leading-tight">
          Celebrating Excellence,
          <br />
          Creativity & Achievement
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-ink-muted leading-relaxed">
          A prestigious celebration recognizing outstanding talent,
          innovation, and impact across entertainment and culture.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

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