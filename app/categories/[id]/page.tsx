import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      nominees: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category || !category.active) {
    notFound();
  }

  const isJudge = category.access === "JUDGE";

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link
            href="/categories"
            className="text-xs uppercase tracking-widest text-yellow-400 hover:underline"
          >
            ← Back to Categories
          </Link>
        </div>
        <div className="border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
              {category.tier}
            </span>
            <span>•</span>
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
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {category.title}
          </h1>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Nominees</h2>
          {category.nominees.length === 0 ? (
            <p className="text-white/40">No nominees announced for this category yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {category.nominees.map((nominee) => (
                <div
                  key={nominee.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {nominee.name}
                      </h3>
                      {nominee.country && (
                        <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
                          {nominee.country}
                        </p>
                      )}
                    </div>
                  </div>
                  {nominee.reason && (
                    <p className="mt-4 text-sm leading-6 text-white/60">
                      {nominee.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}