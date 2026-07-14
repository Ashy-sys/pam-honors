"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function JudgePage() {
  const { data: session } = useSession();

  const [categories, setCategories] = useState<any[]>([]);
  const [nominees, setNominees] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [voted, setVoted] = useState("");

  useEffect(() => {
    async function loadData() {
      const c = await fetch("/api/categories").then((r) => r.json());
      const n = await fetch("/api/nominees").then((r) => r.json());

      setCategories(c);
      setNominees(n);
    }

    loadData();
  }, []);

  async function handleVote(nomineeId: string) {
    if (!session?.user) {
      alert("You must be logged in");
      return;
    }

    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomineeId,
        categoryId: selectedCategory,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Vote failed");
      return;
    }

    setVoted(nomineeId);
    alert("Vote submitted");
  }

  // ONLY JUDGE categories that are currently active
  const judgeCategories = categories.filter(
    (c: any) => c.access === "JUDGE" && c.active
  );

  const filteredNominees = nominees.filter(
    (n: any) => n.categoryId === selectedCategory
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Judge Voting Panel</h1>

      <p style={{ color: "gray" }}>
        Welcome {session?.user?.name}
      </p>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <option value="">Select Judge Category</option>

        {judgeCategories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      <h3>Nominees</h3>

      {selectedCategory === "" ? (
        <p>Select category</p>
      ) : filteredNominees.length === 0 ? (
        <p>No nominees found</p>
      ) : (
        filteredNominees.map((n: any) => (
          <div
            key={n.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
            }}
          >
            <strong>{n.name}</strong>
            <p>{n.country}</p>

            <button
              onClick={() => handleVote(n.id)}
              disabled={voted === n.id}
            >
              {voted === n.id ? "Voted" : "Vote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}