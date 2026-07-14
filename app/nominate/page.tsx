"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  title: string;
  active: boolean;
};

export default function NominatePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data: Category[] = await res.json();
      const active = data.filter((c) => c.active);
      setCategories(active);
      if (active.length > 0) setCategoryId(active[0].id);
      setLoadingCategories(false);
    }

    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/nominations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, categoryId, reason }),
    });

    if (res.ok) {
      setName("");
      setReason("");
      setMessage("Nomination submitted successfully");
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Nominate an Artist</h1>

      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p>No active categories available for nomination right now.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
          <input
            placeholder="Artist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Why should they be nominated?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
