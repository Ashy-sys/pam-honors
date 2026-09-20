import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { nominees: { select: { id: true, name: true, country: true } }, _count: { select: { nominees: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(categories);
}

// CREATE category
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to create categories." }, { status: 403 });
  }

  const body = await req.json();

  const { title, tier, access } = body;

  if (typeof title !== "string" || !title.trim() || typeof tier !== "string" || !["PUBLIC", "COUNCIL", "JUDGE"].includes(access)) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: {
      title: title.trim(),
      tier,
      access,
    },
  });

  return NextResponse.json(category);
}
