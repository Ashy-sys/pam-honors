"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";

export default function NominatePage() {
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/nominations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artist, category, reason }),
    });

    if (res.ok) {
      setArtist("");
      setReason("");
      setMessage("Nomination submitted successfully");
    } else {
      setMessage("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Nominate an Artist</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input
          placeholder="Artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
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

      {message && <p>{message}</p>}
    </div>
  );
}