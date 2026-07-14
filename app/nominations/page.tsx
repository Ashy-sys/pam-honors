"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  title: string;
  active: boolean;
};

export default function NominationsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [artist, setArtist] = useState("");
  const [reason, setReason] = useState("");
  const [categoryId, setCategoryId] = useState("");
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

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/nominations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: artist, categoryId, reason }),
    });

    if (res.ok) {
      setArtist("");
      setReason("");
      setMessage("Nomination submitted!");
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Submit Nomination</h1>

      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p>No active categories available right now.</p>
      ) : (
        <form onSubmit={submitForm}>
          <input
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <br />

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
          <br />

          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </main>
  );
}
