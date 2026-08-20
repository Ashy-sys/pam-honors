import { PrismaClient, CategoryAccess } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  // TIER 1
  {
    title: "Song of the Year — East Africa",
    tier: "Tier 1",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Album / EP of the Year — East Africa",
    tier: "Tier 1",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Cross-Border Collaboration",
    tier: "Tier 1",
    access: CategoryAccess.COUNCIL,
  },

  // TIER 2
  {
    title: "Best Male Artist — Afro-Pop & Bongo Flava",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Female Artist — Afro-Pop & Bongo Flava",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Contemporary Artist — East Africa",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Contemporary Song of the Year",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Live Act / Performance of the Year",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Afro-R&B / Soul Release",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Cultural / Indigenous Fusion Record",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Hip-Hop / Rap Release — East Africa",
    tier: "Tier 2",
    access: CategoryAccess.COUNCIL,
  },

  // TIER 3
  {
    title: "Most Viral Song of the Year — East Africa",
    tier: "Tier 3",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Best Breakthrough Artist — East Africa",
    tier: "Tier 3",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Next-Gen Digital Artist of the Year",
    tier: "Tier 3",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Fans’ Choice / Most Globally Exported Track",
    tier: "Tier 3",
    access: CategoryAccess.PUBLIC,
  },

  // TIER 4
  {
    title: "Audio Producer of the Year — East Africa",
    tier: "Tier 4",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Sound Engineer of the Year — Mixing & Mastering",
    tier: "Tier 4",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Video Director & Visual Concept of the Year",
    tier: "Tier 4",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Songwriter of the Year — East Africa",
    tier: "Tier 4",
    access: CategoryAccess.COUNCIL,
  },

  // SPECIAL CATEGORIES
  {
    title: "Inspirational Song of the Year",
    tier: "Special Categories",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Edutainment Song of the Year",
    tier: "Special Categories",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "DJ of the Year — Male",
    tier: "Special Categories",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "DJ of the Year — Female",
    tier: "Special Categories",
    access: CategoryAccess.COUNCIL,
  },
  {
    title: "Diaspora Artist of the Year",
    tier: "Special Categories",
    access: CategoryAccess.COUNCIL,
  },

  // JUDGES' HONORS
  {
    title: "Artist of the Year — East Africa",
    tier: "Judges’ Honors",
    access: CategoryAccess.JUDGE,
  },
  {
    title: "Honorary Award",
    tier: "Judges’ Honors",
    access: CategoryAccess.JUDGE,
  },
];

async function main() {
  console.log("Adding PAM Honors 2026 categories...");

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
        data: category,
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