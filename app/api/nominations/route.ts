import { prisma } from "@/lib/prisma";

export async function GET() {
  const nominations = await prisma.nomination.findMany({
    orderBy: { id: "desc" },
  });

  return Response.json(nominations);
}

export async function POST(req: Request) {
  const body = await req.json();

  const nomination = await prisma.nomination.create({
    data: {
      artist: body.artist,
      reason: body.reason,
      category: body.category,
    },
  });

  return Response.json(nomination);
}