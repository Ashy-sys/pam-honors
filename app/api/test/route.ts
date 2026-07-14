import { prisma } from "@/lib/prisma";

export async function GET() {
  const [categories, nominees, votes] = await Promise.all([
    prisma.category.count(),
    prisma.nominee.count(),
    prisma.vote.count(),
  ]);

  return Response.json({
    message: "Database connected",
    categories,
    nominees,
    votes,
  });
}
