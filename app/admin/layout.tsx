import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard", roles: ["SUPER_ADMIN", "ADMIN", "JUDGE", "COUNCIL"] },
  { href: "/admin/categories", label: "Categories", roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/nominees", label: "Nominees", roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/nominations", label: "Nominations", roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/votes", label: "Voting", roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/results", label: "Results", roles: ["SUPER_ADMIN", "ADMIN", "JUDGE", "COUNCIL"] },
  { href: "/admin/users", label: "Team / Users", roles: ["SUPER_ADMIN"] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role || role === "VOTER") redirect("/login");
  const allowedLinks = links.filter((link) => link.roles.includes(role));

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand"><span className="admin-brand-mark">P</span><span><strong>PANH</strong><small>Administration</small></span></Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav aria-label="Admin navigation" className="admin-nav">
          {allowedLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-role">{role.replace("_", " ")}</span>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
      <style>{`
        .admin-shell{min-height:100vh;background:#f5f4f1;color:#211f1c;display:flex;font-family:Arial,sans-serif}
        .admin-sidebar{width:236px;background:#171615;color:#f6f3ed;padding:26px 18px;display:flex;flex-direction:column;flex-shrink:0}
        .admin-brand{display:flex;align-items:center;gap:11px;color:inherit;text-decoration:none;padding:4px 8px 30px}
        .admin-brand-mark{width:36px;height:36px;display:grid;place-items:center;background:#c8a45d;color:#171615;border-radius:50%;font-family:Georgia,serif;font-size:21px;font-weight:bold}
        .admin-brand strong{display:block;letter-spacing:.14em;font-size:14px}.admin-brand small{display:block;color:#aaa49a;margin-top:4px;font-size:11px}
        .admin-nav-label{font-size:10px;letter-spacing:.16em;color:#89847d;padding:0 10px;margin:0 0 10px}
        .admin-nav{display:grid;gap:4px}.admin-nav a{padding:11px 10px;border-radius:6px;color:#d6d1c8;text-decoration:none;font-size:14px}.admin-nav a:hover,.admin-nav a:focus-visible{background:#302e2a;color:white;outline:none}
        .admin-sidebar-bottom{margin-top:auto;display:grid;gap:12px;padding:18px 10px 4px;border-top:1px solid #383632}.admin-sidebar-bottom button{width:max-content;background:transparent;border:0;padding:0;color:#eee9df;text-decoration:none;font-size:13px;text-align:left}.admin-role{color:#aaa49a;font-size:10px;letter-spacing:.1em}
        .admin-main{width:100%;max-width:1500px;margin:0 auto;padding:42px clamp(20px,4vw,58px);min-width:0}
        .admin-main h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(28px,3vw,38px);margin:0 0 8px;color:#201e1a}.admin-main h2{font-family:Georgia,serif;font-weight:500}.admin-main p{line-height:1.55}
        .admin-main input,.admin-main select,.admin-main textarea{background:#fff;color:#211f1c;border:1px solid #d3d0c8;border-radius:5px;padding:10px;font:inherit}.admin-main button{font:inherit;cursor:pointer}
        @media(max-width:760px){.admin-shell{display:block}.admin-sidebar{width:auto;padding:14px 16px}.admin-brand{padding-bottom:14px}.admin-nav{display:flex;overflow-x:auto}.admin-nav a{white-space:nowrap}.admin-nav-label{display:none}.admin-sidebar-bottom{display:flex;justify-content:space-between;padding:12px 8px 0;margin-top:12px}.admin-main{padding:28px 18px}}
      `}</style>
    </div>
  );
}
