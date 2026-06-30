import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  // If trying to access admin without login
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and trying to go back to login
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};