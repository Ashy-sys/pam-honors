import { requireAdminRole } from "@/lib/require-admin-role";

export default async function ResultsLayout({ children }: { children: React.ReactNode }) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "JUDGE", "COUNCIL"]);
  return children;
}
