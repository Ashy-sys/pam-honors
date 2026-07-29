import SectionContainer from "@/components/ui/SectionContainer";
import AnimatedNumber from "@/components/shared/AnimatedNumber";

export default function StatsStrip() {
  return (
    <section>
      <SectionContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <AnimatedNumber value={0} />
            <p className="text-sm text-gray-400 mt-2">
              Votes Cast
            </p>
          </div>

          <div>
            <AnimatedNumber value={20} />
            <p className="text-sm text-gray-400 mt-2">
              Categories
            </p>
          </div>

          <div>
            <AnimatedNumber value={0} />
            <p className="text-sm text-gray-400 mt-2">
              Nominees
            </p>
          </div>

          <div>
            <AnimatedNumber value={1} />
            <p className="text-sm text-gray-400 mt-2">
              Countries
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}