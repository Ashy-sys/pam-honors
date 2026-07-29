import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function VotingHowItWorks() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="Voting"
        title="Your voice shapes the winners"
        description="Support your favourite nominees through a simple and transparent voting process."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h3 className="text-xl font-semibold text-white">
            1. Choose
          </h3>
          <p className="mt-3 text-white/60">
            Explore nominees across different award categories.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h3 className="text-xl font-semibold text-white">
            2. Vote
          </h3>
          <p className="mt-3 text-white/60">
            Cast your vote and support the talent you believe deserves recognition.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h3 className="text-xl font-semibold text-white">
            3. Celebrate
          </h3>
          <p className="mt-3 text-white/60">
            Winners are revealed during the PAM Honors celebration.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}