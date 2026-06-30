import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(categories);
}

// CREATE category
export async function POST(req: Request) {
  const body = await req.json();

  const { title, tier, access } = body;

  if (!title || !tier || !access) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: {
      title,
      tier,
      access,
    },
  });

  return NextResponse.json(category);
}