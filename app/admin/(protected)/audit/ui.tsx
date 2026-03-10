"use client";

import { useEffect, useMemo, useState } from "react";

type Row = {
  id: number;
  createdAt: string;
  ip: string | null;
  action: string;
  entity: string | null;
  entityId: number | null;
  actorId: number | null;
  actorEmail: string | null;
  details: any;
};

type Meta = { page: number; pageSize: number; total: number; pages: number };

export default function AuditClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [meta, setMeta] = useState<Meta>({ page: 1, pageSize: 50, total: 0, pages: 1 });

  const [action, setAction] = useState("");
  const [entity, setEntity] = useState("");
  const [actorEmail, setActorEmail] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);

  // сброс на первую страницу при изменении фильтров
  useEffect(() => {
    setPage(1);
  }, [action, entity, actorEmail, pageSize]);

  const qs = useMemo(() => {
    const sp = new URLSearchParams();
    if (action.trim()) sp.set("action", action.trim());
    if (entity.trim()) sp.set("entity", entity.trim());
    if (actorEmail.trim()) sp.set("actorEmail", actorEmail.trim());
    sp.set("page", String(page));
    sp.set("pageSize", String(pageSize));
    return sp.toString();
  }, [action, entity, actorEmail, page, pageSize]);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/audit?${qs}`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (data?.ok) {
      setRows(data.rows || []);
      setMeta(data.meta || meta);
    } else {
      alert(data?.error || "Failed to load audit");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.pages;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Audit log</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        <input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="action contains..."
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 220 }}
        />
        <input
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
          placeholder="entity = Lead/User/SiteSettings..."
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 220 }}
        />
        <input
          value={actorEmail}
          onChange={(e) => setActorEmail(e.target.value)}
          placeholder="actor email contains..."
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 240 }}
        />

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>Page size:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
          >
            {[25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <button
          onClick={load}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Reload"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <button
          disabled={!canPrev}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", cursor: canPrev ? "pointer" : "not-allowed" }}
        >
          Prev
        </button>

        <div style={{ opacity: 0.8 }}>
          Page <b>{meta.page}</b> / {meta.pages} — Total: {meta.total}
        </div>

        <button
          disabled={!canNext}
          onClick={() => setPage((p) => p + 1)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", cursor: canNext ? "pointer" : "not-allowed" }}
        >
          Next
        </button>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Time", "Action", "Entity", "Actor", "IP", "Details"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3", whiteSpace: "nowrap" }}>
                  {new Date(r.createdAt).toLocaleString("ru-RU")}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{r.action}</td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>
                  {r.entity ? `${r.entity}${r.entityId ? ` #${r.entityId}` : ""}` : "—"}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>
                  {r.actorEmail || (r.actorId ? `id:${r.actorId}` : "—")}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{r.ip || "—"}</td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>
                  <details>
                    <summary style={{ cursor: "pointer" }}>view</summary>
                    <pre style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(r.details, null, 2)}
                    </pre>
                  </details>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 12 }}>
                  No audit logs
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
