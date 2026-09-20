"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <button type="button" onClick={() => void signOut({ callbackUrl: "/login" })}>Logout</button>;
}
