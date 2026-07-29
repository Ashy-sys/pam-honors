import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientBackground from "@/components/ui/GradientBackground";

export default function DesignTestPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <GradientBackground>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Badge variant="gold">
            PAM Honors 2026
          </Badge>

          <SectionHeading
            eyebrow="Awards Platform"
            title="Celebrating excellence and talent"
            description="A premium design preview for the PAM Honors experience."
          />

          <div className="flex gap-4">
            <Button variant="primary">
              Vote Now
            </Button>

            <Button variant="secondary">
              Explore Categories
            </Button>
          </div>

          <div className="mt-12">
            <Card>
              <div className="p-6">
                <p className="text-gold">
                  Best Artist Award
                </p>

                <h3 className="mt-3 font-display text-3xl">
                  Nominee Name
                </h3>

                <p className="mt-3 text-ink-muted">
                  This card tests the new PAM Honors premium surface.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </GradientBackground>
    </main>
  );
}