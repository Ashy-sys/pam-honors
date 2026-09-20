import { requireAdminRole } from "@/lib/require-admin-role";

export default async function VotesLayout({ children }: { children: React.ReactNode }) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  return children;
}
