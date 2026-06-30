import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET nominees
export async function GET() {
  const nominees = await prisma.nominee.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(nominees);
}

// CREATE nominee
export async function POST(req: Request) {
  const body = await req.json();

  const { name, categoryId, country, image } = body;

  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const nominee = await prisma.nominee.create({
    data: {
      name,
      categoryId,
      country,
      image,
    },
  });

  return NextResponse.json(nominee);
}