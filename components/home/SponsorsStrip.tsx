import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SponsorsStrip() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="Partners"
        title="Our sponsors"
        description="Supporting creativity, talent, and recognition."
      />

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-8 text-center">
        <p className="text-white/60">
          Sponsor logos will appear here.
        </p>
      </div>
    </SectionContainer>
  );
}