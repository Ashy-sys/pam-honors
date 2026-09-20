import { PrismaClient, CategoryAccess } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  // TRACK B: VOTERS GUILD / PRODUCER-VETTED
  {
    title: "Best Male Artist (New Gen)",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Female Artist (New Gen)",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Contemporary Artist",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Hip-Hop Artist",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Breakthrough Artist of the Year",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Inspirational Song of the Year",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Diaspora Artist of the Year",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "DJ of the Year (Male & Female)",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Audio Producer of the Year",
    tier: "Special Honors",
    access: CategoryAccess.JUDGE,
  },
  {
    title: "Songwriter of the Year",
    tier: "Track B",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Video Director of the Year",
    tier: "Special Honors",
    access: CategoryAccess.JUDGE,
  },

  // SPECIAL HONORS: JUDGES & BOARD
  {
    title: "Artist of the Year",
    tier: "Special Honors",
    access: CategoryAccess.JUDGE,
  },
  {
    title: "Lifetime Achievement / Honorary Awards",
    tier: "Special Honors",
    access: CategoryAccess.JUDGE,
  },
];

async function main() {
  console.log("Seeding PANH final categories...");

  for (const category of categories) {
    const existing = await prisma.category.findFirst({
      where: {
        title: category.title,
      },
    });

    if (existing) {
      await prisma.category.update({
        where: {
          id: existing.id,
        },
        data: {
          tier: category.tier,
          access: category.access,
          active: true,
        },
      });

      console.log(`Updated: ${category.title}`);
    } else {
      await prisma.category.create({
        data: {
          ...category,
          active: true,
        },
      });

      console.log(`Created: ${category.title}`);
    }
  }

  console.log("");
  console.log(`Done. Processed ${categories.length} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
