import { prisma } from "@/lib/prisma";


export async function getHomepageData() {

  const [
    categories,
    nominees,
    judges,
    sponsors,
    news,
    totalVotes,
    totalNominees,
    totalCategories,
  ] = await Promise.all([
    prisma.category.findMany({
      where: {
        active: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.nominee.findMany({
      take: 8,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    [],

    [],

    [],

    prisma.vote.count(),

    prisma.nominee.count(),

    prisma.category.count({
      where: {
        active: true,
      },
    }),
  ]);


  return {
    featuredCategories: categories,

    nomineeSpotlight: nominees,

    judges,

    sponsors,

    news,

    stats: {
      votes: totalVotes,
      nominees: totalNominees,
      categories: totalCategories,
      countries: 0,
    },
  };
}