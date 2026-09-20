"use client";

import { useCallback, useEffect, useState } from "react";

type ResultNominee = { id: string; name: string; votes: number };
type Result = { category: { id: string; title: string }; winner: ResultNominee | null; nominees: ResultNominee[] };

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/results");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load results.");
      setResults(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load results."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return <div><div className="results-heading"><div><p className="admin-eyebrow">CATEGORY STANDINGS</p><h1>Results</h1><p className="admin-subtitle">Vote totals and current leaders across each category.</p></div><button type="button" onClick={() => void load()} disabled={loading}>Refresh</button></div>
    {error && <p role="alert" className="results-error">{error}</p>}
    {loading ? <div className="results-empty">Loading results…</div> : results.length === 0 ? <div className="results-empty"><strong>No results to show</strong><span>Category standings will appear here once categories are available.</span></div> : <div className="results-grid">{results.map((result) => { const total = result.nominees.reduce((sum, nominee) => sum + nominee.votes, 0); return <section className="result-card" key={result.category.id}><div className="result-card-heading"><div><span>CATEGORY</span><h2>{result.category.title}</h2></div><strong>{total}<small>votes</small></strong></div>{result.winner && result.winner.votes > 0 && <div className="result-leader"><span>Current leader</span><strong>{result.winner.name}</strong></div>}{result.nominees.length ? <ol className="result-list">{result.nominees.map((nominee, index) => <li key={nominee.id}><span className="result-rank">{String(index + 1).padStart(2, "0")}</span><span className="result-name">{nominee.name}{result.winner?.id === nominee.id && nominee.votes > 0 && <small>LEADING</small>}</span><strong>{nominee.votes}<small>{nominee.votes === 1 ? "vote" : "votes"}</small></strong><span className="result-bar"><span style={{ width: total ? `${Math.round((nominee.votes / total) * 100)}%` : "0%" }}/></span></li>)}</ol> : <p className="result-no-nominees">No nominees are listed in this category.</p>}</section>; })}</div>}
    <style>{`.admin-eyebrow{font-size:10px!important;letter-spacing:.16em;color:#92723b!important;font-weight:700;margin:0 0 9px!important}.admin-subtitle{color:#756f66;margin:0}.results-heading{display:flex;justify-content:space-between;align-items:end;gap:16px}.results-heading button{border:1px solid #d8d4ca;background:#fff;border-radius:5px;padding:9px 13px;color:#302c25}.results-heading button:disabled{opacity:.6}.results-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:25px}.result-card{background:white;border:1px solid #e6e3dc;border-radius:8px;padding:19px}.result-card-heading{display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid #efede8;padding-bottom:13px}.result-card-heading span{font-size:9px;letter-spacing:.14em;color:#887c66}.result-card-heading h2{font-size:20px;margin:5px 0 0}.result-card-heading>strong{font:500 23px Georgia,serif;text-align:right}.result-card-heading>strong small{display:block;font:10px Arial,sans-serif;color:#777168}.result-leader{background:#f8f5ee;border-left:2px solid #c8a45d;padding:10px 12px;margin:14px 0}.result-leader span,.result-leader strong{display:block}.result-leader span{font-size:9px;text-transform:uppercase;letter-spacing:.11em;color:#806a42}.result-leader strong{font-size:13px;margin-top:4px}.result-list{list-style:none;margin:0;padding:0}.result-list li{display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:7px 9px;padding:11px 0;border-bottom:1px solid #f0eee9}.result-rank{font-size:10px;color:#918a7e}.result-name{font-size:12px;font-weight:600}.result-name small{margin-left:7px;color:#8d6c2f;font-size:8px;letter-spacing:.08em}.result-list li>strong{font-size:12px}.result-list li>strong small{font-weight:400;color:#80796f;margin-left:4px}.result-bar{grid-column:2/4;display:block;height:3px;background:#f0eee9;border-radius:4px}.result-bar>span{display:block;height:100%;background:#c8a45d;border-radius:4px}.result-no-nominees,.results-empty{color:#716b62;font-size:13px}.results-empty{margin-top:22px;padding:35px;border:1px dashed #d8d4ca;background:#fff;border-radius:8px;text-align:center}.results-empty strong,.results-empty span{display:block}.results-empty span{font-size:12px;margin-top:6px}.results-error{padding:10px;background:#fae8e5;color:#842b20;border-radius:5px}`}</style>
  </div>;
}
