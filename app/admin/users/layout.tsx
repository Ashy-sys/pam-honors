import { requireAdminRole } from "@/lib/require-admin-role";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  await requireAdminRole(["SUPER_ADMIN"]);
  return children;
}
