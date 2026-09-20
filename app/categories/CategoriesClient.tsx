"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Category = {
  id: string;
  title: string;
  tier: string;
  access: string;
};

type TierInfo = {
  number: string;
  subtitle: string;
  description: string;
};

const tierInfo: Record<string, TierInfo> = {
  "Track B": {
    number: "01",
    subtitle: "VOTERS GUILD / PRODUCER-VETTED",
    description:
      "Categories vetted and decided by audio and video producers, academy members and industry experts through the PANH voting portal.",
  },
  "Special Honors": {
    number: "02",
    subtitle: "JUDGES & BOARD",
    description:
      "Special honors decided exclusively by the PANH judges and board.",
  },
};

const tierOrder = ["Track B", "Special Honors"];

export default function CategoriesClient({
  categories,
}: {
  categories: Category[];
}) {
  const grouped = tierOrder
    .map((tier) => ({
      tier,
      categories: categories.filter((category) => category.tier === tier),
    }))
    .filter((group) => group.categories.length > 0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/[0.06] blur-[140px]" />
        <div className="absolute right-[-250px] top-[45%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.04] blur-[150px]" />
      </div>

      <section className="relative px-6 pb-24 pt-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-yellow-400">
              PANH Uganda
            </p>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              The Categories
              <span className="block text-white/30">
                shaping the honors.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
              Explore the official PANH categories celebrating artists,
              creators and music professionals across Uganda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <p className="text-3xl font-semibold">{categories.length}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                Award Categories
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">2</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                Voting Tracks
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">Uganda</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                Edition
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-24">
          {grouped.map((group) => {
            const info = tierInfo[group.tier];

            return (
              <motion.section
                key={group.tier}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-8 grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[180px_1fr]">
                  <div>
                    <span className="text-6xl font-light tracking-tighter text-white/10 md:text-7xl">
                      {info.number}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
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

                <div className="grid gap-3 md:grid-cols-2">
                  {group.categories.map((category, index) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </section>

      <section className="relative border-t border-white/10 px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-yellow-400">
            PANH
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Built around credible recognition.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-white/40">
            Voting access and eligibility depend on the category structure and
            PANH governance framework.
          </p>

          <Link
            href="/governance"
            className="mt-10 inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition hover:border-yellow-400/30"
          >
            View Governance
          </Link>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const isJudge = category.access === "JUDGE";

  return (
    <Link href={`/categories/${category.id}`} className="block">
      <motion.div
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
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-yellow-400/[0.08] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <p className="text-lg font-medium leading-7 text-white md:text-xl">
            {category.title}
          </p>

          <div className="mt-4">
            {isJudge ? (
              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-300">
                Judges & Board
              </span>
            ) : (
              <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-yellow-300">
                Voters Guild / Producer-Vetted
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
