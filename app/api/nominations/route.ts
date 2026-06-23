import { prisma } from "@/lib/prisma";

export async function GET() {
  const nominations = await prisma.nomination.findMany();
  return Response.json(nominations);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newNomination = await prisma.nomination.create({
    data: {
      artist: body.artist,
      category: body.category,
      reason: body.reason,
    },
  });

  return Response.json(newNomination);
}