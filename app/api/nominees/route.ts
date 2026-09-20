import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  const nominees = await prisma.nominee.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(nominees);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to add nominees." }, { status: 403 });
  }

  const body = await req.json();
  const { name, categoryId, country, image, reason } = body;

  if (!name || typeof name !== "string" || !categoryId || typeof categoryId !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid required fields (name, categoryId)" },
      { status: 400 }
    );
  }

  const nominee = await prisma.nominee.create({
    data: {
      name: name.trim(),
      categoryId,
      country: country ? country.trim() : null,
      image: image ? image.trim() : null,
      reason: reason ? reason.trim() : null,
    },
    include: { category: true },
  });

  return NextResponse.json(nominee);
}
