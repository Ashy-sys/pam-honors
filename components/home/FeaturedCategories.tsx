import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedCategories() {
  return (
    <section>
      <SectionContainer>
        <SectionHeading
          eyebrow="Categories"
          title="Recognizing Excellence Across Every Field"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-semibold text-white">
              Artist of the Year
            </h3>
            <p className="mt-2 text-gray-400">
              Celebrating outstanding creative achievement.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-semibold text-white">
              Song of the Year
            </h3>
            <p className="mt-2 text-gray-400">
              Honoring unforgettable musical moments.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-semibold text-white">
              Rising Star
            </h3>
            <p className="mt-2 text-gray-400">
              Highlighting the next generation of talent.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}