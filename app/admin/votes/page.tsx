"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Vote = { id: string; createdAt: string; category?: { id: string; title: string }; nominee?: { id: string; name: string } };

export default function VotesPage() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const loadVotes = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/votes");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load voting information.");
      setVotes(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load voting information."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadVotes(); }, [loadVotes]);
  const byCategory = useMemo(() => {
    const groups = new Map<string, { title: string; total: number; nominees: Map<string, number> }>();
    for (const vote of votes) {
      const key = vote.category?.id ?? "unknown";
      const group = groups.get(key) ?? { title: vote.category?.title ?? "Unknown category", total: 0, nominees: new Map<string, number>() };
      group.total += 1;
      const nominee = vote.nominee?.name ?? "Unknown nominee";
      group.nominees.set(nominee, (group.nominees.get(nominee) ?? 0) + 1);
      groups.set(key, group);
    }
    return [...groups.values()].sort((a, b) => b.total - a.total).filter((group) => `${group.title} ${[...group.nominees.keys()].join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  }, [votes, query]);

  return <div><div className="voting-admin-heading"><div><p className="admin-eyebrow">BALLOT ACTIVITY</p><h1>Voting</h1><p className="admin-subtitle">Review recorded votes by award category and nominee.</p></div><button type="button" onClick={() => void loadVotes()} disabled={loading}>Refresh</button></div>
    <section className="voting-total"><span>Total votes recorded</span><strong>{loading ? "—" : votes.length.toLocaleString()}</strong><small>Votes are counted once per voter in each category.</small></section>
    <div className="voting-toolbar"><h2>Category activity</h2><label><span className="sr-only">Search category or nominee</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search category or nominee" /></label></div>
    {error && <p role="alert" className="voting-error">{error}</p>}{loading ? <p className="voting-empty">Loading voting data…</p> : byCategory.length === 0 ? <div className="voting-empty"><strong>{votes.length ? "No matching results" : "No votes recorded yet"}</strong><span>{votes.length ? "Try another search." : "Activity will appear when eligible voters submit ballots."}</span></div> : <div className="voting-grid">{byCategory.map((group) => <section className="voting-card" key={group.title}><div className="voting-card-head"><h3>{group.title}</h3><strong>{group.total}<small> votes</small></strong></div>{[...group.nominees.entries()].sort((a,b) => b[1]-a[1]).map(([name,count]) => <div key={name} className="voting-row"><span>{name}</span><strong>{count}</strong></div>)}</section>)}</div>}
    <style>{`.admin-eyebrow{font-size:10px!important;letter-spacing:.16em;color:#92723b!important;font-weight:700;margin:0 0 9px!important}.admin-subtitle{color:#756f66;margin:0}.voting-admin-heading{display:flex;justify-content:space-between;align-items:end;gap:16px}.voting-admin-heading button{border:1px solid #d8d4ca;background:#fff;border-radius:5px;padding:9px 13px;color:#302c25}.voting-total{display:inline-grid;gap:7px;margin-top:27px;min-width:230px;background:#fff;border:1px solid #e6e3dc;border-radius:8px;padding:17px 21px}.voting-total span,.voting-total small{font-size:11px;color:#756f66}.voting-total strong{font:500 32px Georgia,serif}.voting-toolbar{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-top:28px}.voting-toolbar h2{font-size:19px}.voting-toolbar input{width:min(320px,60vw);font-size:12px}.voting-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:13px;margin-top:12px}.voting-card{background:#fff;border:1px solid #e6e3dc;border-radius:8px;padding:17px}.voting-card-head{display:flex;justify-content:space-between;align-items:start;padding-bottom:13px;border-bottom:1px solid #efede8}.voting-card-head h3{font:500 17px Georgia,serif;margin:0}.voting-card-head strong{font-size:16px}.voting-card-head small{display:block;font-size:9px;font-weight:400;color:#777168}.voting-row{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid #f1efeb;font-size:12px}.voting-row strong{font-size:11px;color:#765c2f}.voting-empty{margin-top:15px;padding:35px;border:1px dashed #d8d4ca;background:white;border-radius:8px;text-align:center;color:#716b62;font-size:13px}.voting-empty strong,.voting-empty span{display:block}.voting-empty span{margin-top:6px;font-size:12px}.voting-error{padding:10px;background:#fae8e5;color:#842b20;border-radius:5px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
  </div>;
}
