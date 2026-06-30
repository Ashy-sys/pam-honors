import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>PAM Admin</h2>

        <nav style={{ marginTop: 20 }}>
          <p><Link href="/admin">Dashboard</Link></p>
          <p><Link href="/admin/categories">Categories</Link></p>
          <p><Link href="/admin/nominees">Nominees</Link></p>
          <p><Link href="/admin/votes">Votes</Link></p>
          <p><Link href="/admin/results">Results</Link></p>
          <p><Link href="/vote">Public Vote</Link></p>
          <p><Link href="/council">Council Panel</Link></p>
          <p><Link href="/judge">Judge Panel</Link></p>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
}