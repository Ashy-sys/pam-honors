"use client";

import { useEffect, useState } from "react";

export default function NomineesPage() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("");
  const [nominees, setNominees] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchData() {
    const res1 = await fetch("/api/categories");
    const catData = await res1.json();
    setCategories(catData);

    const res2 = await fetch("/api/nominees");
    const nomData = await res2.json();
    setNominees(nomData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreate() {
    await fetch("/api/nominees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        categoryId,
        country,
      }),
    });

    setName("");
    setCountry("");
    fetchData();
  }

  return (
    <div>
      <h1>Nominees</h1>

      <input
        placeholder="Nominee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: 10, padding: 8 }}
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        style={{ display: "block", margin: 10, padding: 8 }}
      >
        <option>Select Category</option>
        {categories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{ display: "block", margin: 10, padding: 8 }}
      />

      <button onClick={handleCreate} style={{ padding: 10 }}>
        Add Nominee
      </button>

      <hr style={{ margin: 20 }} />

      <h3>All Nominees</h3>

      {nominees.map((n: any) => (
        <div key={n.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          <strong>{n.name}</strong> — {n.category?.title} — {n.country}
        </div>
      ))}
    </div>
  );
}