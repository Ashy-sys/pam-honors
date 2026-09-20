import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all votes (used by admin dashboard)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to view vote administration." }, { status: 403 });
  }
  const votes = await prisma.vote.findMany({
    include: { category: true, nominee: true },
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

  // Never trust role supplied by browser session/token â€” fetch fresh from database
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 401 }
    );
  }

  // ADMIN and SUPER_ADMIN cannot vote
  if (dbUser.role === "ADMIN" || dbUser.role === "SUPER_ADMIN") {
    return NextResponse.json(
      { error: "Administrators cannot vote" },
      { status: 403 }
    );
  }

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

  // BASIC ROLE RULES â€” matches role to category access
  if (
    (dbUser.role === "VOTER" && category.access !== "PUBLIC") ||
    (dbUser.role === "COUNCIL" && category.access !== "COUNCIL") ||
    (dbUser.role === "JUDGE" && category.access !== "JUDGE")
  ) {
    return NextResponse.json(
      { error: `Your role (${dbUser.role}) cannot vote in this category` },
      { status: 403 }
    );
  }

  // Validate nominee exists and matches categoryId
  const nominee = await prisma.nominee.findUnique({
    where: { id: nomineeId },
  });

  if (!nominee) {
    return NextResponse.json(
      { error: "Nominee not found" },
      { status: 404 }
    );
  }

  if (nominee.categoryId !== categoryId) {
    return NextResponse.json(
      { error: "Nominee does not belong to this category" },
      { status: 400 }
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

  try {
    const vote = await prisma.vote.create({
      data: {
        userId: user.id,
        nomineeId,
        categoryId,
      },
    });

    return NextResponse.json(vote);
  } catch (error: any) {
    // Gracefully handle unique-constraint conflict (Prisma P2002)
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Already voted in this category" },
        { status: 400 }
      );
    }
    throw error;
  }
}
