"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function VotePage() {
  const { data: session } = useSession();

  const [categories, setCategories] = useState<any[]>([]);
  const [nominees, setNominees] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [voted, setVoted] = useState("");

  // Load data
  useEffect(() => {
    async function loadData() {
      const c = await fetch("/api/categories").then((r) => r.json());
      const n = await fetch("/api/nominees").then((r) => r.json());

      setCategories(c);
      setNominees(n);
    }

    loadData();
  }, []);

  // Vote handler
  async function handleVote(nomineeId: string) {
    if (!session?.user) {
      alert("You must be logged in to vote");
      return;
    }

    if (!selectedCategory) {
      alert("Select a category first");
      return;
    }

    const res = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    alert("Vote submitted successfully");
  }

  const filteredNominees = nominees.filter(
    (n: any) => n.categoryId === selectedCategory
  );

  const role = (session?.user as any)?.role;

  // Only show active categories, and if the user has a role, only ones they can vote in
  const visibleCategories = categories.filter((c: any) => {
    if (!c.active) return false;
    if (role === "COUNCIL" || role === "JUDGE") return c.access === role;
    return true;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Vote</h1>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <option value="">Choose category</option>

        {visibleCategories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      <h3>Nominees</h3>

      {selectedCategory === "" ? (
        <p>Select a category</p>
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