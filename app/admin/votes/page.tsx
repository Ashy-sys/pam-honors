"use client";

import { useEffect, useState } from "react";

export default function VotesPage() {
  const [votes, setVotes] = useState([]);

  async function fetchVotes() {
    const res = await fetch("/api/votes");
    const data = await res.json().catch(() => []);
    setVotes(data);
  }

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div>
      <h1>Votes</h1>

      <p style={{ marginTop: 10 }}>
        Total Votes: {votes.length}
      </p>

      <hr />

      {votes.map((v: any) => (
        <div
          key={v.id}
          style={{ padding: 10, borderBottom: "1px solid #ddd" }}
        >
          <strong>Category:</strong> {v.category?.title} <br />
          <strong>Nominee:</strong> {v.nominee?.name} <br />
          <strong>User:</strong> {v.user?.email}
        </div>
      ))}
    </div>
  );
}