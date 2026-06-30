import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    const results = await Promise.all(
      categories.map(async (category) => {
        const nominees = await prisma.nominee.findMany({
          where: { categoryId: category.id },
        });

        const votes = await prisma.vote.findMany({
          where: { categoryId: category.id },
        });

        const enriched = nominees.map((nominee) => {
          const count = votes.filter(
            (v) => v.nomineeId === nominee.id
          ).length;

          return {
            ...nominee,
            votes: count,
          };
        });

        const winner = enriched.sort(
          (a, b) => b.votes - a.votes
        )[0];

        return {
          category,
          nominees: enriched,
          winner,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load results" },
      { status: 500 }
    );
  }
}