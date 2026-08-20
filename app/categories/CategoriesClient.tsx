"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Category = {
  id: string;
  title: string;
  tier: string;
  access: string;
};

const tierInfo: Record<
  string,
  { number: string; subtitle: string; description: string }
> = {
  "Tier 1": {
    number: "01",
    subtitle: "THE FLAGSHIP HONORS",
    description:
      "The highest-profile awards celebrating the biggest records and musical projects of the year.",
  },
  "Tier 2": {
    number: "02",
    subtitle: "GENRE & PERFORMANCE MASTERY",
    description:
      "Recognizing exceptional artists, performances, genres and musical expression.",
  },
  "Tier 3": {
    number: "03",
    subtitle: "DIGITAL & YOUTH VELOCITY",
    description:
      "Celebrating digital influence, breakthrough talent and the power of the audience.",
  },
  "Tier 4": {
    number: "04",
    subtitle: "BEHIND THE SCENES & VISUALS",
    description:
      "Honoring the producers, engineers, directors and writers behind the music.",
  },
  "Special Categories": {
    number: "05",
    subtitle: "SPECIAL CATEGORIES",
    description:
      "Distinct awards recognizing contribution, purpose, culture and specialist talent.",
  },
  "Judges’ Honors": {
    number: "06",
    subtitle: "JUDGES' HONORS",
    description:
      "Special recognitions selected directly by the PAM Honors judging panel.",
  },
};

const tierOrder = [
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Tier 4",
  "Special Categories",
  "Judges’ Honors",
];

export default function CategoriesClient({
  categories,
}: {
  categories: Category[];
}) {
  const grouped = tierOrder
    .map((tier) => ({
      tier,
      categories: categories.filter((c) => c.tier === tier),
    }))
    .filter((group) => group.categories.length > 0);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/[0.06] blur-[140px]" />
        <div className="absolute top-[45%] right-[-250px] h-[500px] w-[500px] rounded-full bg-purple-500/[0.04] blur-[150px]" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-28 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 text-xs font-semibold tracking-[0.45em] text-yellow-400 uppercase">
              PAM Honors 2026
            </p>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              The Categories
              <span className="block text-white/30">that define 2026.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
              Explore the awards celebrating East African music, the people
              behind it, and the records that shaped the year.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <p className="text-3xl font-semibold">{categories.length}</p>
              <p className="mt-1 text-xs tracking-widest text-white/35 uppercase">
                Award Categories
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">2026</p>
              <p className="mt-1 text-xs tracking-widest text-white/35 uppercase">
                Awards Season
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">East Africa</p>
              <p className="mt-1 text-xs tracking-widest text-white/35 uppercase">
                Region
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative px-6 pb-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-24">
          {grouped.map((group, groupIndex) => {
            const info = tierInfo[group.tier];

            return (
              <motion.section
                key={group.tier}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Tier heading */}
                <div className="mb-8 grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[180px_1fr]">
                  <div>
                    <span className="text-6xl font-light tracking-tighter text-white/10 md:text-7xl">
                      {info.number}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-yellow-400 uppercase">
                      {info.subtitle}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                      {group.tier}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                      {info.description}
                    </p>
                  </div>
                </div>

                {/* Category cards */}
                <div className="grid gap-3 md:grid-cols-2">
                  {group.categories.map((category, index) => {
                    const isPublic = category.access === "PUBLIC";
                    const isJudge = category.access === "JUDGE";

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: Math.min(index * 0.05, 0.3),
                        }}
                        whileHover={{ y: -4 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors duration-300 hover:border-yellow-400/30 hover:bg-white/[0.045] md:p-7"
                      >
                        {/* Hover glow */}
                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-yellow-400/[0.08] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative flex items-start justify-between gap-5">
                          <div>
                            <p className="text-lg font-medium leading-7 text-white md:text-xl">
                              {category.title}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {isPublic && (
                                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-yellow-300 uppercase">
                                  Public Vote
                                </span>
                              )}

                              {isJudge && (
                                <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-purple-300 uppercase">
                                  Judges' Honor
                                </span>
                              )}

                              {!isPublic && !isJudge && (
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                                  PAM Honors Selection
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="mt-1 text-xl text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-400">
                            ?
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </section>

      {/* Vote CTA */}
      <section className="relative border-t border-white/10 px-6 py-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-yellow-400 uppercase">
              Your voice matters
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Ready to make your choice?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-white/40">
              When public voting opens, your vote will help determine the
              winners of the categories decided by the audience.
            </p>

            <Link
              href="/vote"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-yellow-400 px-7 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
            >
              Vote Now
              <span>?</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
