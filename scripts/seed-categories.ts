import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "Best Male Artist – Uganda",
  "Best Female Artist – Uganda",
  "Best Male Artist – Tanzania",
  "Best Female Artist – Tanzania",
  "Best Male Artist – Kenya",
  "Best Female Artist – Kenya",
  "Best Male Artist – Rwanda",
  "Best Female Artist – Rwanda",
  "Best Male Artist – Burundi",
  "Best Female Artist – Burundi",
  "Best Male Artist – South Sudan",
  "Best Female Artist – South Sudan",
  "East African Artist of the Year",
  "East African Song of the Year",
  "East African Album of the Year",
  "Best Collaboration – East Africa",
  "Audio Producer of the Year – East Africa",
  "Songwriter of the Year – East Africa",
  "Video Director of the Year – East Africa",
  "Best Music Video – East Africa",
];

async function main() {
  // Remove old placeholder/test categories that have no nominees or votes attached
  const existing = await prisma.category.findMany({
    include: { _count: { select: { nominees: true, votes: true } } },
  });

  for (const cat of existing) {
    const isRealCategory = categories.includes(cat.title);
    const isEmpty = cat._count.nominees === 0 && cat._count.votes === 0;
    if (!isRealCategory && isEmpty) {
      await prisma.category.delete({ where: { id: cat.id } });
      console.log(`Removed placeholder category: ${cat.title}`);
    }
  }

  for (const title of categories) {
    const found = await prisma.category.findFirst({ where: { title } });
    if (found) {
      console.log(`Already exists, skipping: ${title}`);
      continue;
    }
    await prisma.category.create({
      data: {
        title,
        tier: "Tier 1",
        access: "JUDGE",
        active: true,
      },
    });
    console.log(`Created: ${title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
