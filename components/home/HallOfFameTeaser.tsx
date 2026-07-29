import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HallOfFameTeaser() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="Hall of Fame"
        title="Celebrating past winners"
        description="A collection of legends who have made their mark."
      />

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-8 text-center">
        <p className="text-white/60">
          Winners will appear here after the first PAM Honors celebration.
        </p>
      </div>
    </SectionContainer>
  );
}