import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all nominations
export async function GET() {
  try {
    const nominations = await prisma.nomination.findMany();
    return Response.json(nominations);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch nominations" },
      { status: 500 }
    );
  }
}

// CREATE nomination
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nomination = await prisma.nomination.create({
      data: body,
    });

    return Response.json(nomination);
  } catch (error) {
    return Response.json(
      { error: "Failed to create nomination" },
      { status: 500 }
    );
  }
}