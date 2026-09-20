import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all public nominations (nominees), most recent first
export async function GET() {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth-options");
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to view nominations." }, { status: 403 });
  }

  const nominations = await prisma.nominee.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(nominations);
}

// Public nomination submission — saved through the existing nominee model.
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
