import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export async function requireAdminRole(allowedRoles: string[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
    redirect("/admin");
  }
}
