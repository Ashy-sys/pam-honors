"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("Tier 1");
  const [access, setAccess] = useState("COUNCIL");
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreate() {
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, tier, access }),
    });

    setTitle("");
    fetchCategories();
  }

  return (
    <div>
      <h1>Categories</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Category title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: 8 }}
        />

        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: 8 }}
        >
          <option>Tier 1</option>
          <option>Tier 2</option>
          <option>Tier 3</option>
          <option>Tier 4</option>
        </select>

        <select
          value={access}
          onChange={(e) => setAccess(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: 8 }}
        >
          <option value="COUNCIL">Council</option>
          <option value="JUDGE">Judge</option>
        </select>

        <button onClick={handleCreate} style={{ padding: 10 }}>
          Create Category
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Existing Categories</h3>

      {categories.map((c: any) => (
        <div key={c.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          <strong>{c.title}</strong> — {c.tier} — {c.access}
        </div>
      ))}
    </div>
  );
}