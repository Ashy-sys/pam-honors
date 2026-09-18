import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const { token, setupToken, password } = body;
  const rawToken = token ?? setupToken;

  if (typeof rawToken !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Fields 'token' (or 'setupToken') and 'password' must be strings" },
      { status: 400 }
    );
  }

  const trimmedToken = rawToken.trim();
  if (!trimmedToken) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  const setupTokenHash = crypto
    .createHash("sha256")
    .update(trimmedToken)
    .digest("hex");

  const user = await prisma.user.findUnique({
    where: { setupTokenHash },
  });

  if (!user || !user.setupTokenExpires || user.setupTokenExpires < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired setup token" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      setupTokenHash: null,
      setupTokenExpires: null,
    },
  });

  return NextResponse.json(
    { message: "Password setup successfully" },
    { status: 200 }
  );
}