"use client";

import { useEffect, useState } from "react";

type Invitation = {
  email: string;
  role: string;
  setupUrl: string;
};

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("COUNCIL");
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("Unauthorized: SUPER_ADMIN access required.");
        } else {
          setError("Failed to fetch users.");
        }
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("An error occurred while fetching users.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInvitation(null);
    setCopyState("idle");
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create user.");
      } else {
        if (typeof data.setupUrl !== "string") {
          setError("The invitation was created, but its setup link was not returned. Contact support before inviting this person again.");
          await fetchUsers();
          return;
        }
        setInvitation({ email: data.email, role: data.role, setupUrl: data.setupUrl });
        setName("");
        setEmail("");
        setRole("COUNCIL");
        await fetchUsers();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function copySetupLink() {
    if (!invitation) return;

    try {
      await navigator.clipboard.writeText(invitation.setupUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
    }
  }

  function closeInvitation() {
    setInvitation(null);
    setCopyState("idle");
  }

  useEffect(() => {
    if (!invitation) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeInvitation();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [invitation]);

  return (
    <div>
      <h1>Team / Users</h1>
      <p style={{ color: "gray" }}>Create a passwordless team account and choose its access. Password setup status is tracked below.</p>
      {error && (
        <div style={{ padding: 12, marginBottom: 16, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleCreate} style={{ marginTop: 20, maxWidth: 500, background: "#f9f9f9", color: "#111", padding: 20, borderRadius: 8, border: "1px solid #ddd" }}>
        <h3>Create team account</h3>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box", background: "#fff", color: "#111", border: "1px solid #999", borderRadius: 4 }}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box", background: "#fff", color: "#111", border: "1px solid #999", borderRadius: 4 }}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box", background: "#fff", color: "#111", border: "1px solid #999", borderRadius: 4 }}
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="JUDGE">JUDGE</option>
            <option value="COUNCIL">COUNCIL</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}
        >
            {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Team members</h3>
      {users.length === 0 ? (
        <p style={{ color: "gray" }}>No users found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
            <thead>
              <tr style={{ background: "#f1f1f1", color: "#111", textAlign: "left" }}>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Role</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: 10 }}>{u.name}</td>
                  <td style={{ padding: 10 }}>{u.email}</td>
                  <td style={{ padding: 10 }}>{u.role}</td>
                  <td style={{ padding: 10 }}>
                    {u.isPending ? (
                      <span style={{ background: "#fff3cd", color: "#856404", padding: "2px 6px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                        Setup pending
                      </span>
                    ) : (
                      <span style={{ background: "#d4edda", color: "#155724", padding: "2px 6px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                        Active
                      </span>
                    )}
                  </td>
                  <td style={{ padding: 10 }}>{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {invitation && (
        <div
          role="presentation"
          style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: 20, background: "rgba(12, 15, 20, 0.62)" }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="invitation-title"
            style={{ width: "100%", maxWidth: 520, padding: 24, borderRadius: 10, background: "#fff", color: "#111", border: "1px solid #ddd", boxShadow: "0 18px 60px rgba(0,0,0,.24)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <h2 id="invitation-title" style={{ margin: 0 }}>Team member invited</h2>
                <p style={{ margin: "8px 0 0", color: "#555" }}>Send this private setup link to the invited team member. It expires in 24 hours and will not be shown again.</p>
              </div>
              <button type="button" onClick={closeInvitation} aria-label="Close invitation details" style={{ border: "1px solid #ddd", borderRadius: 6, background: "#fff", color: "#333", padding: "6px 10px", cursor: "pointer" }}>Close</button>
            </div>

            <dl style={{ display: "grid", gridTemplateColumns: "100px minmax(0, 1fr)", gap: "10px 12px", margin: "22px 0" }}>
              <dt style={{ color: "#666" }}>Email</dt><dd style={{ margin: 0, overflowWrap: "anywhere" }}>{invitation.email}</dd>
              <dt style={{ color: "#666" }}>Role</dt><dd style={{ margin: 0 }}>{invitation.role}</dd>
              <dt style={{ color: "#666" }}>Expires</dt><dd style={{ margin: 0 }}>24 hours</dd>
            </dl>

            <label htmlFor="setup-link" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Setup URL</label>
            <input id="setup-link" type="text" readOnly value={invitation.setupUrl} onFocus={(event) => event.currentTarget.select()} style={{ width: "100%", boxSizing: "border-box", padding: 10, border: "1px solid #bbb", borderRadius: 5, background: "#fafafa", color: "#222" }} />
            <button type="button" onClick={copySetupLink} style={{ marginTop: 12, padding: "10px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
              {copyState === "copied" ? "Copied" : "Copy setup link"}
            </button>
            {copyState === "error" && <p role="status" style={{ margin: "10px 0 0", color: "#9b1c1c", fontSize: 14 }}>Could not copy automatically. Select the URL above and copy it manually.</p>}
            {copyState === "copied" && <span role="status" style={{ marginLeft: 10, color: "#25643b", fontSize: 14 }}>Copied to clipboard.</span>}
          </section>
        </div>
      )}
    </div>
  );
}
