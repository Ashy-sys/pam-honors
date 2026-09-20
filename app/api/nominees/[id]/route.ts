import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to update nominees." }, { status: 403 });
  }

  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  if (!id) {
    return NextResponse.json({ error: "Missing nominee ID" }, { status: 400 });
  }

  const body = await req.json();
  const { name, categoryId, country, image, reason } = body;

  if (!name || typeof name !== "string" || !categoryId || typeof categoryId !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid required fields (name, categoryId)" },
      { status: 400 }
    );
  }

  try {
    const nominee = await prisma.nominee.update({
      where: { id },
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
  } catch (error) {
    return NextResponse.json({ error: "Nominee not found or failed to update" }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role ?? "")) {
    return NextResponse.json({ error: "You do not have permission to remove nominees." }, { status: 403 });
  }

  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  if (!id) {
    return NextResponse.json({ error: "Missing nominee ID" }, { status: 400 });
  }

  try {
    await prisma.nominee.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Nominee not found or failed to delete" }, { status: 404 });
  }
}
