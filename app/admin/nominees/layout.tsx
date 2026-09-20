import { requireAdminRole } from "@/lib/require-admin-role";

export default async function NomineesLayout({ children }: { children: React.ReactNode }) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  return children;
}
