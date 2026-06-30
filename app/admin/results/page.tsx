"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/results");
      const data = await res.json();
      setResults(data);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Results Dashboard</h1>

      {results.map((r) => (
        <div
          key={r.category.id}
          style={{ marginBottom: 30, borderBottom: "1px solid #ddd" }}
        >
          <h2>{r.category.title}</h2>

          <h4>Winner:</h4>
          <p>
            <strong>{r.winner?.name}</strong> ({r.winner?.votes} votes)
          </p>

          <h4>All Nominees</h4>
          {r.nominees.map((n: any) => (
            <p key={n.id}>
              {n.name} - {n.votes} votes
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}