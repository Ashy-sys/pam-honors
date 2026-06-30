import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { nomineeId, categoryId } = body;

  if (!nomineeId || !categoryId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const user = session.user as any;

  // ROLE CHECK (core logic)
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  // BASIC ROLE RULES
  if (user.role === "COUNCIL" && category.type !== "COUNCIL") {
    return NextResponse.json(
      { error: "Council can only vote in Council categories" },
      { status: 403 }
    );
  }

  if (user.role === "JUDGE" && category.type !== "JUDGES") {
    return NextResponse.json(
      { error: "Judges can only vote in Judge categories" },
      { status: 403 }
    );
  }

  // prevent duplicate voting
  const existingVote = await prisma.vote.findFirst({
    where: {
      userId: user.id,
      categoryId,
    },
  });

  if (existingVote) {
    return NextResponse.json(
      { error: "Already voted in this category" },
      { status: 400 }
    );
  }

  const vote = await prisma.vote.create({
    data: {
      userId: user.id,
      nomineeId,
      categoryId,
    },
  });

  return NextResponse.json(vote);
}