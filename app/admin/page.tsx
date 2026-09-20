import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [session, categories, nominees, nominationRecords, votes, users, activity] = await Promise.all([
    getServerSession(authOptions),
    prisma.category.count(),
    prisma.nominee.count(),
    prisma.nominee.count(),
    prisma.vote.count(),
    prisma.user.count({ where: { role: { in: ["SUPER_ADMIN", "ADMIN", "JUDGE", "COUNCIL"] } } }),
    prisma.auditLog.findMany({ take: 6, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, email: true } } } }),
  ]);
  const role = session?.user?.role ?? "VOTER";
  const canManage = role === "ADMIN" || role === "SUPER_ADMIN";
  const isSuper = role === "SUPER_ADMIN";
  const stats = [
    { label: "Categories", value: categories, href: "/admin/categories" },
    { label: "Nominees", value: nominees, href: "/admin/nominees" },
    { label: "Nominations received", value: nominationRecords, href: "/admin/nominations" },
    { label: "Votes recorded", value: votes, href: "/admin/votes" },
    ...(isSuper ? [{ label: "Team members", value: users, href: "/admin/users" }] : []),
  ];
  const actions = [
    ...(canManage ? [{ label: "Add nominee", href: "/admin/nominees", note: "Create or update a nominee" }, { label: "Manage categories", href: "/admin/categories", note: "Review the awards programme" }] : []),
    ...(isSuper ? [{ label: "Invite team member", href: "/admin/users", note: "Add a PAMH team account" }] : []),
    { label: "View results", href: "/admin/results", note: "Review category standings" },
  ];

  return <div>
    <div style={{ marginBottom: 30 }}><p style={{ margin: "0 0 9px", color: "#8a6b35", fontSize: 11, letterSpacing: ".16em", fontWeight: 700 }}>PAMH WORKSPACE</p><h1>Good to see you, {session?.user?.name?.split(" ")[0] || "team"}</h1><p style={{ color: "#6d6961", margin: 0 }}>Here’s the current picture across the awards programme.</p></div>
    <div className="admin-stat-grid">{stats.map((stat) => <Link key={stat.label} href={stat.href} className="admin-stat"><span>{stat.label}</span><strong>{stat.value.toLocaleString()}</strong><small>Open {stat.label.toLowerCase()} →</small></Link>)}</div>
    <p style={{ color: "#817b71", fontSize: 11, margin: "10px 0 0" }}>Public nominations and managed nominees share the same records in the current system.</p>
    <div className="admin-overview-grid">
      <section className="admin-panel"><div className="admin-panel-head"><div><h2>Quick actions</h2><p>Common tasks for your role</p></div></div><div className="admin-actions">{actions.map((action) => <Link key={action.label} href={action.href}><strong>{action.label}<span aria-hidden="true">↗</span></strong><small>{action.note}</small></Link>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-head"><div><h2>Recent activity</h2><p>Latest recorded team actions</p></div></div>{activity.length ? <ul className="admin-activity">{activity.map((item) => <li key={item.id}><span className="admin-activity-dot"/><div><strong>{item.action}</strong><small>{item.user.name || item.user.email} · {new Date(item.createdAt).toLocaleString()}</small></div></li>)}</ul> : <div className="admin-empty"><strong>No activity recorded yet</strong><span>Team actions will appear here when available.</span></div>}</section>
    </div>
    <style>{`.admin-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:13px}.admin-stat,.admin-panel{background:#fff;border:1px solid #e6e3dc;border-radius:8px}.admin-stat{display:flex;flex-direction:column;padding:17px;text-decoration:none;color:inherit;min-height:126px}.admin-stat span{font-size:12px;color:#777168}.admin-stat strong{font:500 32px Georgia,serif;margin:13px 0 8px}.admin-stat small{font-size:11px;color:#947239}.admin-overview-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:16px;margin-top:20px}.admin-panel{padding:21px}.admin-panel-head h2{font-size:20px;margin:0}.admin-panel-head p{font-size:12px;color:#827d73;margin:5px 0 17px}.admin-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.admin-actions a{padding:14px;border:1px solid #ece9e2;border-radius:6px;text-decoration:none;color:#26231e}.admin-actions a:hover{border-color:#c8a45d}.admin-actions strong{display:flex;justify-content:space-between;font-size:13px}.admin-actions small{display:block;color:#817b71;font-size:11px;margin-top:8px}.admin-activity{list-style:none;padding:0;margin:0}.admin-activity li{display:flex;gap:11px;padding:12px 0;border-top:1px solid #efede8}.admin-activity-dot{margin-top:4px;width:7px;height:7px;border-radius:50%;background:#c8a45d;flex:none}.admin-activity strong,.admin-activity small{display:block}.admin-activity strong{font-size:12px;font-weight:600}.admin-activity small{font-size:10px;color:#817b71;margin-top:5px}.admin-empty{padding:17px 0;color:#6f6a60}.admin-empty strong,.admin-empty span{display:block}.admin-empty span{font-size:12px;margin-top:5px}@media(max-width:850px){.admin-overview-grid{grid-template-columns:1fr}}`}</style>
  </div>;
}
