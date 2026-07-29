import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutTeaser() {
  return (
    <section>
      <SectionContainer>
        <SectionHeading
          eyebrow="About PAM Honors"
          title="Celebrating Excellence, Creativity and Impact"
        />

        <p className="mt-6 max-w-3xl text-gray-400">
          PAM Honors celebrates outstanding talent, creativity and
          contribution by recognizing individuals who continue to shape
          culture and inspire communities.
        </p>
      </SectionContainer>
    </section>
  );
}