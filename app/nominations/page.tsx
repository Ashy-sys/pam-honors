"use client";

import { useState } from "react";

export default function NominationsPage() {
  const [artist, setArtist] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/nominations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist, reason, category }),
    });

    setArtist("");
    setReason("");
    setCategory("");

    alert("Nomination submitted!");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Submit Nomination</h1>

      <form onSubmit={submitForm}>
        <input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <br />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />

        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}