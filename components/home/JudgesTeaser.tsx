import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";

export default function JudgesTeaser() {
  return (
    <section>
      <SectionContainer>
        <SectionHeading
          eyebrow="Judges & Council"
          title="Meet The Panel Behind The Honors"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white/10" />
            <h3 className="mt-4 text-xl text-white">
              Judge Name
            </h3>
            <p className="mt-2 text-gray-400">
              Panel Member
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white/10" />
            <h3 className="mt-4 text-xl text-white">
              Judge Name
            </h3>
            <p className="mt-2 text-gray-400">
              Panel Member
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white/10" />
            <h3 className="mt-4 text-xl text-white">
              Judge Name
            </h3>
            <p className="mt-2 text-gray-400">
              Panel Member
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}