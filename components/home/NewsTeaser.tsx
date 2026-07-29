import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NewsTeaser() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow="News"
        title="Latest updates"
        description="Stay informed with the latest PAM Honors announcements."
      />

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-8 text-center">
        <p className="text-white/60">
          News articles will appear here.
        </p>
      </div>
    </SectionContainer>
  );
}