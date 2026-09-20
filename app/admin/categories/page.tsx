"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Category = { id: string; title: string; tier: string; access: string; active: boolean; nominees?: { id: string; name: string; country?: string | null }[]; _count?: { nominees: number } };

export default function CategoriesPage() {
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("Tier 1");
  const [access, setAccess] = useState("COUNCIL");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load categories.");
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load categories."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void fetchCategories(); }, [fetchCategories]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault(); setError(""); setSuccess(""); setSaving(true);
    try {
      const res = await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, tier, access }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create category.");
      setTitle(""); setSuccess("Category created."); await fetchCategories();
    } catch (e) { setError(e instanceof Error ? e.message : "Could not create category."); }
    finally { setSaving(false); }
  }

  const selected = categories.find((category) => category.id === selectedId);

  return <div>
    <div style={{ marginBottom: 26 }}><p className="admin-eyebrow">AWARDS PROGRAMME</p><h1>Categories</h1><p className="admin-subtitle">Organise the award areas and review the nominees in each category.</p></div>
    {error && <p role="alert" className="admin-notice admin-error">{error}</p>}{success && <p role="status" className="admin-notice admin-success">{success}</p>}
    <div className="category-layout">
      <section className="category-list-panel"><div className="category-list-heading"><div><h2>All categories</h2><span>{categories.length} total</span></div></div>
        {loading ? <p className="category-empty">Loading categories…</p> : categories.length === 0 ? <div className="category-empty"><strong>No categories yet</strong><span>Create the first category using the form.</span></div> : <div className="category-list">{categories.map((category) => <button type="button" key={category.id} onClick={() => setSelectedId(category.id)} className={`category-row ${selectedId === category.id ? "is-selected" : ""}`} aria-pressed={selectedId === category.id}><span className="category-row-title">{category.title}<small>{category.tier} · {category.access}</small></span><span className="category-row-count">{category._count?.nominees ?? category.nominees?.length ?? 0}<small>nominees</small></span></button>)}</div>}
      </section>
      <div className="category-side">
        <section className="category-detail-panel">{selected ? <><p className="admin-eyebrow">CATEGORY DETAIL</p><h2>{selected.title}</h2><p>{selected.tier} · {selected.access} · {selected.active ? "Active" : "Inactive"}</p><h3>Nominees</h3>{selected.nominees?.length ? <ul>{selected.nominees.map((nominee) => <li key={nominee.id}><strong>{nominee.name}</strong>{nominee.country && <span>{nominee.country}</span>}</li>)}</ul> : <div className="category-empty"><strong>No nominees yet</strong><span>Nominees assigned to this category will appear here.</span></div>}<Link className="category-text-link" href={`/admin/nominees?categoryId=${selected.id}`}>Manage nominees in this category →</Link></> : <div className="category-empty"><strong>Select a category</strong><span>Choose a category to see its nominees and details.</span></div>}</section>
        <section className="category-create-panel"><p className="admin-eyebrow">SET UP</p><h2>Create a category</h2><form onSubmit={handleCreate}><label>Category name<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Song of the Year" required /></label><div className="category-form-row"><label>Programme tier<select value={tier} onChange={(e) => setTier(e.target.value)}><option>Tier 1</option><option>Tier 2</option><option>Tier 3</option><option>Tier 4</option></select></label><label>Voting group<select value={access} onChange={(e) => setAccess(e.target.value)}><option value="PUBLIC">Public</option><option value="COUNCIL">Council</option><option value="JUDGE">Judge</option></select></label></div><button type="submit" disabled={saving}>{saving ? "Creating…" : "Create category"}</button></form></section>
      </div>
    </div>
    <style>{`.admin-eyebrow{font-size:10px!important;letter-spacing:.16em;color:#92723b!important;font-weight:700;margin:0 0 9px!important}.admin-subtitle{color:#756f66;margin:0}.admin-notice{padding:11px 13px;border-radius:5px;font-size:13px}.admin-error{background:#fae8e5;color:#842b20}.admin-success{background:#eaf2e8;color:#315c35}.category-layout{display:grid;grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr);gap:16px;align-items:start}.category-list-panel,.category-detail-panel,.category-create-panel{background:#fff;border:1px solid #e6e3dc;border-radius:8px;padding:19px}.category-list-heading{display:flex;justify-content:space-between;border-bottom:1px solid #eeece6;padding-bottom:14px}.category-list-heading h2,.category-create-panel h2,.category-detail-panel h2{margin:0;font-size:20px}.category-list-heading span{display:block;color:#817a6f;font-size:11px;margin-top:4px}.category-list{display:grid}.category-row{background:white;border:0;border-bottom:1px solid #efede8;text-align:left;display:flex;justify-content:space-between;align-items:center;padding:14px 8px;cursor:pointer;color:#27241f}.category-row:hover,.category-row.is-selected{background:#f8f5ee}.category-row-title{font-size:13px;font-weight:600}.category-row-title small,.category-row-count small{display:block;color:#827c72;font-weight:400;font-size:10px;margin-top:5px}.category-row-count{text-align:right;font-size:14px}.category-side{display:grid;gap:14px}.category-detail-panel>p:not(.admin-eyebrow){font-size:12px;color:#716b62}.category-detail-panel h3{font-size:13px;margin-top:23px}.category-detail-panel ul{list-style:none;padding:0}.category-detail-panel li{display:flex;justify-content:space-between;border-top:1px solid #efede8;padding:10px 0;font-size:12px}.category-detail-panel li span{color:#807a71}.category-text-link{font-size:12px;color:#80622c;text-decoration:none}.category-create-panel form{display:grid;gap:12px;margin-top:15px}.category-create-panel label{display:grid;gap:6px;font-size:11px;color:#6f695f}.category-create-panel input,.category-create-panel select{width:100%;font-size:13px}.category-form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.category-create-panel button{justify-self:start;border:0;border-radius:5px;background:#211f1b;color:white;padding:10px 14px;font-size:12px}.category-create-panel button:disabled{opacity:.6}.category-empty{padding:20px 5px;color:#736d63;font-size:12px}.category-empty strong,.category-empty span{display:block}.category-empty span{margin-top:5px}.category-detail-panel>.category-empty{padding-top:40px;padding-bottom:40px}@media(max-width:760px){.category-layout{grid-template-columns:1fr}.category-form-row{grid-template-columns:1fr}}`}</style>
  </div>;
}
