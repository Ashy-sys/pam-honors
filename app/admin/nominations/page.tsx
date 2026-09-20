"use client";

import { useCallback, useEffect, useState } from "react";

type Nomination = { id: string; name: string; categoryId: string; country?: string | null; reason?: string | null; createdAt: string; category?: { title: string } };

export default function NominationsPage() {
  const [items, setItems] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/nominations");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load nominations.");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load nominations."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);
  const filtered = items.filter((item) => `${item.name} ${item.category?.title ?? ""} ${item.country ?? ""}`.toLowerCase().includes(query.toLowerCase()));

  return <div><div className="nomination-heading"><div><p className="admin-eyebrow">NOMINEE REGISTER</p><h1>Nominations</h1><p className="admin-subtitle">Review candidate records from the nominee register.</p><p className="nomination-model-note">Public submissions and managed nominees share the same records, so their source and review status are not distinguished.</p></div><button type="button" onClick={() => void load()} disabled={loading}>Refresh</button></div>
    <div className="nomination-toolbar"><strong>{items.length} {items.length === 1 ? "record" : "records"}</strong><label><span className="sr-only">Search nominations</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by artist or category" /></label></div>
    {error && <p role="alert" className="nomination-error">{error}</p>}
    {loading ? <div className="nomination-empty">Loading nominations…</div> : filtered.length === 0 ? <div className="nomination-empty"><strong>{items.length ? "No matching nominations" : "No nominations yet"}</strong><span>{items.length ? "Try a different search." : "New public submissions will appear here."}</span></div> : <div className="nomination-table-wrap"><table className="nomination-table"><thead><tr><th>Nominee</th><th>Category</th><th>Region</th><th>Submitted</th><th>Reason</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.category?.title ?? "—"}</td><td>{item.country || "—"}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td className="nomination-reason">{item.reason || "No reason provided"}</td></tr>)}</tbody></table></div>}
    <style>{`.admin-eyebrow{font-size:10px!important;letter-spacing:.16em;color:#92723b!important;font-weight:700;margin:0 0 9px!important}.admin-subtitle{color:#756f66;margin:0}.nomination-model-note{font-size:11px;color:#8a6b35;margin:8px 0 0}.nomination-heading{display:flex;justify-content:space-between;align-items:end;gap:16px}.nomination-heading button{border:1px solid #d8d4ca;background:#fff;border-radius:5px;padding:9px 13px;color:#302c25}.nomination-heading button:disabled{opacity:.6}.nomination-toolbar{margin-top:26px;padding:13px 0;border-top:1px solid #e3e0d8;border-bottom:1px solid #e3e0d8;display:flex;justify-content:space-between;gap:12px;align-items:center}.nomination-toolbar strong{font-size:12px}.nomination-toolbar input{width:min(330px,65vw);font-size:12px}.nomination-table-wrap{overflow:auto;background:#fff;border:1px solid #e6e3dc;border-radius:8px;margin-top:15px}.nomination-table{width:100%;border-collapse:collapse;text-align:left;font-size:12px}.nomination-table th{font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#777168;background:#f8f7f4}.nomination-table th,.nomination-table td{padding:13px 15px;border-bottom:1px solid #efede8;vertical-align:top}.nomination-table td strong{font-size:13px}.nomination-reason{min-width:220px;max-width:360px;color:#6e685f}.nomination-empty{margin-top:16px;padding:38px 20px;border:1px dashed #d8d4ca;border-radius:8px;text-align:center;color:#716b62;background:#fff;font-size:13px}.nomination-empty strong,.nomination-empty span{display:block}.nomination-empty span{font-size:12px;margin-top:6px}.nomination-error{color:#842b20;background:#fae8e5;padding:10px;border-radius:5px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
  </div>;
}
