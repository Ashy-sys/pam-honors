import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NomineeSpotlight() {
  return (
    <section>
      <SectionContainer>
        <SectionHeading
          eyebrow="Nominees"
          title="Meet The People Behind The Excellence"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
            <div className="h-48 bg-white/5" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">
                Featured Nominee
              </h3>
              <p className="mt-2 text-gray-400">
                Nominee profile will appear here.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
            <div className="h-48 bg-white/5" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">
                Featured Nominee
              </h3>
              <p className="mt-2 text-gray-400">
                Nominee profile will appear here.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
            <div className="h-48 bg-white/5" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">
                Featured Nominee
              </h3>
              <p className="mt-2 text-gray-400">
                Nominee profile will appear here.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}