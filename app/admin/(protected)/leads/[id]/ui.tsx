"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Dispatcher = { id: number; name: string; email: string };

type Lead = {
  id: number;
  createdAt: string;
  updatedAt: string;

  name: string;
  phone: string;

  fromText: string;
  toText: string;

  pickupAddress: string | null;
  dropoffAddress: string | null;
  datetime: string | null;

  carClass: string;
  roundTrip: boolean;
  price: number | null;

  comment: string | null;

  status: string;

  assignedToId: number | null;
  assignedTo: Dispatcher | null;

  isDuplicate: boolean;
  duplicateOfId: number | null;

  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export default function LeadClient() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [lead, setLead] = useState<Lead | null>(null);
  const [dispatchers, setDispatchers] = useState<Dispatcher[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const [lRes, dRes] = await Promise.all([
      fetch(`/api/admin/leads/${id}/get`, { cache: "no-store" }),
      fetch(`/api/admin/dispatchers`, { cache: "no-store" }),
    ]);

    const lData = await lRes.json().catch(() => ({}));
    const dData = await dRes.json().catch(() => ({}));

    if (lData?.ok) setLead(lData.lead);
    if (dData?.ok) setDispatchers(dData.users || []);

    setLoading(false);
  }

  useEffect(() => {
    if (!Number.isFinite(id)) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function patch(body: any) {
    if (!lead) return;

    // оптимистично
    setLead({ ...lead, ...body });

    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      alert(data?.error || "Update failed");
      load();
      return;
    }

    setLead((prev) => (prev ? { ...prev, ...data.lead } : prev));
    router.refresh();
  }

  if (!Number.isFinite(id)) return <div>Bad id</div>;
  if (loading) return <div>Loading...</div>;
  if (!lead) return <div>Not found</div>;

  const dt = (s: string) => new Date(s).toLocaleString("ru-RU");

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            Lead #{lead.id} — {lead.name}
          </h1>
          <div style={{ opacity: 0.75 }}>
            created: {dt(lead.createdAt)} • updated: {dt(lead.updatedAt)}
          </div>
        </div>

        <button
          onClick={() => router.push("/admin/leads")}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", cursor: "pointer", height: 40 }}
        >
          ← Back to leads
        </button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <Section title="Client">
          <Row label="Name" value={lead.name} />
          <Row label="Phone" value={lead.phone} />
        </Section>

        <Section title="Route">
          <Row label="From → To" value={`${lead.fromText} → ${lead.toText}`} />
          <Row label="Pickup address" value={lead.pickupAddress || "—"} />
          <Row label="Dropoff address" value={lead.dropoffAddress || "—"} />
          <Row label="Datetime" value={lead.datetime || "—"} />
        </Section>

        <Section title="Order">
          <Row label="Car class" value={lead.carClass} />
          <Row label="Round trip" value={lead.roundTrip ? "Yes" : "No"} />
          <Row label="Price" value={lead.price ?? "—"} />
          <Row label="Comment" value={lead.comment || "—"} />
        </Section>

        <Section title="Actions">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Status</span>
              <select
                value={lead.status}
                onChange={(e) => patch({ status: e.target.value })}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
              >
                <option value="new">new</option>
                <option value="in_progress">in_progress</option>
                <option value="done">done</option>
                <option value="canceled">canceled</option>
              </select>
            </label>

            <label style={{ display: "grid", gap: 6, minWidth: 280 }}>
              <span>Assigned dispatcher</span>
              <select
                value={lead.assignedToId ?? ""}
                onChange={(e) => patch({ assignedToId: e.target.value ? Number(e.target.value) : null })}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
              >
                <option value="">— unassigned —</option>
                {dispatchers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.email})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={lead.isDuplicate}
                onChange={(e) => patch({ isDuplicate: e.target.checked, duplicateOfId: e.target.checked ? lead.duplicateOfId : null })}
              />
              Duplicate
            </label>

            {lead.isDuplicate && (
              <div style={{ marginTop: 8 }}>
                <input
                  placeholder="duplicateOfId"
                  defaultValue={lead.duplicateOfId ?? ""}
                  onBlur={(e) => {
                    const v = e.target.value.trim();
                    patch({ duplicateOfId: v ? Number(v) : null });
                  }}
                  style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", width: 220 }}
                />
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                  Впиши ID оригинала и выйди из поля
                </div>
              </div>
            )}
          </div>
        </Section>

        <Section title="UTM">
          <Row label="utm_source" value={lead.utmSource || "—"} />
          <Row label="utm_medium" value={lead.utmMedium || "—"} />
          <Row label="utm_campaign" value={lead.utmCampaign || "—"} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "grid", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 10 }}>
      <div style={{ opacity: 0.7 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{String(value)}</div>
    </div>
  );
}
