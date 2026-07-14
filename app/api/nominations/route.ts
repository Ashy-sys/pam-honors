import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all public nominations (nominees), most recent first
export async function GET() {
  const nominations = await prisma.nominee.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(nominations);
}

// CREATE a nomination — saves as a Nominee tied to a real Category via categoryId
export async function POST(req: Request) {
  const body = await req.json();
  const { name, categoryId, reason, country } = body;

  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Missing required fields: name and categoryId" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category || !category.active) {
    return NextResponse.json(
      { error: "Selected category is not valid or is no longer active" },
      { status: 400 }
    );
  }

  const nomination = await prisma.nominee.create({
    data: {
      name,
      categoryId,
      reason,
      country,
    },
  });

  return NextResponse.json(nomination);
}
