import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import crypto from "crypto";

export async function GET() {
  // Authenticate session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  // Authorize SUPER_ADMIN only
  if (session.user?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true, password: true },
    orderBy: { createdAt: "desc" },
  });

  const sanitizedUsers = users.map(({ password, ...u }) => ({
    ...u,
    isPending: password === null,
  }));

  return NextResponse.json(sanitizedUsers);
}

export async function POST(req: Request) {
  // Authenticate session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  // Authorize SUPER_ADMIN only
  if (session.user?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Parse and validate request body safely
  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    // Malformed JSON
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const { name, email, role } = body;

  // Ensure required fields exist and are strings
  if (
    typeof name !== "string" ||
    typeof email !== "string"
  ) {
    return NextResponse.json(
      { error: "Fields 'name' and 'email' must be strings" },
      { status: 400 }
    );
  }

  // Trim name and email
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  // Reject empty values after trimming
  if (!trimmedName || !trimmedEmail) {
    return NextResponse.json(
      { error: "Name and email must not be empty" },
      { status: 400 }
    );
  }

  // Basic email format validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Validate role if provided – keep allowed set unchanged
  const allowedRoles = ["SUPER_ADMIN", "ADMIN", "JUDGE", "COUNCIL", "VOTER"] as const;
  const finalRole = role ?? "VOTER";
  if (!allowedRoles.includes(finalRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Check duplicate email
  const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  // Generate a secure random 32-byte setup token (hex encoded)
  const setupToken = crypto.randomBytes(32).toString("hex");
  const setupTokenHash = crypto.createHash("sha256").update(setupToken).digest("hex");
  const setupTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  // Create user with password set to null and store setup token hash & expiry
  const user = await prisma.user.create({
    data: {
      name: trimmedName,
      email: trimmedEmail,
      password: null,
      role: finalRole,
      setupTokenHash,
      setupTokenExpires,
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  // Do NOT return the raw token or its hash
  return NextResponse.json(user);
}
