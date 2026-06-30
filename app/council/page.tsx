"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function CouncilPage() {
  const { data: session } = useSession();

  const [categories, setCategories] = useState<any[]>([]);
  const [nominees, setNominees] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [voted, setVoted] = useState("");

  // Load data
  useEffect(() => {
    async function loadData() {
      const categoriesRes = await fetch("/api/categories");
      const categoriesData = await categoriesRes.json();

      const nomineesRes = await fetch("/api/nominees");
      const nomineesData = await nomineesRes.json();

      setCategories(categoriesData);
      setNominees(nomineesData);
    }

    loadData();
  }, []);

  // Vote function
  async function handleVote(nomineeId: string) {
    if (!session?.user) {
      alert("You must be logged in");
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

  // Filter ONLY council categories
  const councilCategories = categories.filter(
    (c: any) => c.type === "COUNCIL"
  );

  const filteredNominees = nominees.filter(
    (n: any) => n.categoryId === selectedCategory
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Council Voting Panel</h1>

      <p style={{ color: "gray" }}>
        Welcome {session?.user?.name || "User"}
      </p>

      {/* Category selector */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: 10, marginBottom: 15 }}
      >
        <option value="">Select Council Category</option>

        {councilCategories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Helper text */}
      {selectedCategory === "" && (
        <p style={{ color: "gray" }}>
          Select a category to load nominees
        </p>
      )}

      {/* Nominees */}
      <h3>Nominees</h3>

      {selectedCategory === "" ? (
        <p style={{ color: "gray" }}>
          No category selected yet
        </p>
      ) : filteredNominees.length === 0 ? (
        <p>No nominees available for this category</p>
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
              style={{ padding: 6 }}
            >
              {voted === n.id ? "Voted" : "Vote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}