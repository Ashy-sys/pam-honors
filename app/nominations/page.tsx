import { prisma } from "@/lib/prisma";

type Nomination = {
  id: number;
  artist: string;
  category: string;
  reason: string;
};

export default async function NominationsPage() {
  const nominations: Nomination[] = await prisma.nomination.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>All Nominations</h1>

      {nominations.length === 0 ? (
        <p>No nominations yet</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {nominations.map((n: Nomination) => (
            <div key={n.id} style={{ border: "1px solid #ddd", padding: 10 }}>
              <h3>{n.artist}</h3>
              <p><b>Category:</b> {n.category}</p>
              <p>{n.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}