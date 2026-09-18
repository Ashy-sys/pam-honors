"use client";

import { useEffect, useState } from "react";

export default function NomineesPage() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [reason, setReason] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [nominees, setNominees] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const resCat = await fetch("/api/categories");
      const catData = await resCat.json();
      setCategories(Array.isArray(catData) ? catData : []);

      const resNom = await fetch("/api/nominees");
      const nomData = await resNom.json();
      setNominees(Array.isArray(nomData) ? nomData : []);
    } catch (e) {
      setError("Failed to load data.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function resetForm() {
    setName("");
    setCategoryId("");
    setCountry("");
    setImage("");
    setReason("");
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const url = editingId ? `/api/nominees/${editingId}` : "/api/nominees";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryId, country, image, reason }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save nominee.");
      } else {
        setSuccess(editingId ? "Nominee updated successfully." : "Nominee created successfully.");
        resetForm();
        fetchData();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(n: any) {
    setEditingId(n.id);
    setName(n.name || "");
    setCategoryId(n.categoryId || "");
    setCountry(n.country || "");
    setImage(n.image || "");
    setReason(n.reason || "");
    setError("");
    setSuccess("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this nominee?")) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/nominees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete nominee.");
      } else {
        setSuccess("Nominee deleted successfully.");
        if (editingId === id) {
          resetForm();
        }
        fetchData();
      }
    } catch (e) {
      setError("An unexpected error occurred while deleting.");
    }
  }

  return (
    <div>
      <h1>Nominee Management</h1>
      <p style={{ color: "gray", marginBottom: 20 }}>Create, edit, and manage category nominees.</p>

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

      <form onSubmit={handleSubmit} style={{ maxWidth: 600, background: "#f9f9f9", padding: 20, borderRadius: 8, border: "1px solid #ddd" }}>
        <h3>{editingId ? "Edit Nominee" : "Add New Nominee"}</h3>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Name *</label>
          <input
            type="text"
            placeholder="Nominee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          >
            <option value="">Select Category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.tier} - {c.access})
              </option>
            ))}
          </select>
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Country / Region</label>
          <input
            type="text"
            placeholder="e.g. Uganda"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Reason / Bio</label>
          <textarea
            placeholder="Reason for nomination..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}
          >
            {loading ? "Saving..." : editingId ? "Update Nominee" : "Add Nominee"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{ padding: "10px 16px", background: "#ccc", color: "#333", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Existing Nominees ({nominees.length})</h3>
      {nominees.length === 0 ? (
        <p style={{ color: "gray" }}>No nominees found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
            <thead>
              <tr style={{ background: "#f1f1f1", textAlign: "left" }}>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Category</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Country</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Reason</th>
                <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {nominees.map((n: any) => (
                <tr key={n.id}>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd", fontWeight: 500 }}>{n.name}</td>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd" }}>{n.category?.title || "N/A"}</td>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd" }}>{n.country || "-"}</td>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd", maxWidth: 250, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {n.reason || "-"}
                  </td>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleEdit(n)}
                      style={{ marginRight: 8, padding: "4px 8px", background: "#ffc107", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 500 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      style={{ padding: "4px 8px", background: "#dc3545", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 500 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}