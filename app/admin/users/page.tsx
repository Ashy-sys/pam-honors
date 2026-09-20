"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("COUNCIL");
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
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
        setSuccess("Account created. Password setup is pending.");
        setName("");
        setEmail("");
        setRole("COUNCIL");
        fetchUsers();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Team / Users</h1>
      <p style={{ color: "gray" }}>Create a passwordless team account and choose its access. Password setup status is tracked below.</p>
      <p style={{ color: "#8a6b35", fontSize: 12 }}>The app creates a 24-hour setup token, but it does not currently send an invite email or show a setup link.</p>

      {error && (
        <div style={{ padding: 12, marginBottom: 16, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ padding: 12, marginBottom: 16, backgroundColor: "#d4edda", color: "#155724", borderRadius: 4 }}>
          {success}
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
    </div>
  );
}
