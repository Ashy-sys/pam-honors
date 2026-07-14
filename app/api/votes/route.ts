import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all votes (used by admin dashboard)
export async function GET() {
  const votes = await prisma.vote.findMany({
    include: { category: true, nominee: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(votes);
}

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

  if (!category.active) {
    return NextResponse.json(
      { error: "This category is not currently open for voting" },
      { status: 403 }
    );
  }

  // BASIC ROLE RULES — uses the schema's actual "access" field
  if (
    (user.role === "COUNCIL" && category.access !== "COUNCIL") ||
    (user.role === "JUDGE" && category.access !== "JUDGE")
  ) {
    return NextResponse.json(
      { error: `Your role (${user.role}) cannot vote in this category` },
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
