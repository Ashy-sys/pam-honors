import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [totalCategories, activeCategories, totalNominees, totalVotes, totalUsers] =
    await Promise.all([
      prisma.category.count(),
      prisma.category.count({ where: { active: true } }),
      prisma.nominee.count(),
      prisma.vote.count(),
      prisma.user.count(),
    ]);

  const stats = [
    { label: "Total Categories", value: totalCategories, href: "/admin/categories" },
    { label: "Active Categories", value: activeCategories, href: "/admin/categories" },
    { label: "Nominees", value: totalNominees, href: "/admin/nominees" },
    { label: "Votes Cast", value: totalVotes, href: "/admin/votes" },
    { label: "Registered Users", value: totalUsers, href: "/admin" },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to PAM Honors Admin Panel.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 8,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: "gray", marginTop: 4 }}>{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
