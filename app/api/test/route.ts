import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.nomination.count();

  return Response.json({
    message: "Database connected",
    totalNominations: count,
  });
}