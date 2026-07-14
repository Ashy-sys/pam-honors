import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { title: "asc" },
  });

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-yellow-400 mb-10">
        Award Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {categories.map((c) => (
            <div
              key={c.id}
              className="border border-gray-800 p-5 rounded-xl hover:border-yellow-400 transition"
            >
              <p className="text-lg font-semibold text-white">{c.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                {c.tier} · {c.access === "COUNCIL" ? "Council Vote" : "Judge Vote"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
