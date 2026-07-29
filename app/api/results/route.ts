import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    const results = await Promise.all(
      categories.map(async (category) => {
        const nominees = await prisma.nominee.findMany({
          where: {
            categoryId: category.id,
          },
        });

        const votes = await prisma.vote.findMany({
          where: {
            categoryId: category.id,
          },
        });

        const enriched = nominees.map((nominee) => {
          const voteCount = votes.filter(
            (vote) => vote.nomineeId === nominee.id
          ).length;

          return {
            ...nominee,
            votes: voteCount,
          };
        });

        const sortedNominees = enriched.sort(
          (a, b) => b.votes - a.votes
        );

        const winner = sortedNominees[0] || null;

        return {
          category,
          nominees: sortedNominees,
          winner,
        };
      })
    );

    return NextResponse.json(results);

  } catch (error) {
    console.error("RESULTS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load results",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}