"use client";

import { useEffect, useState } from "react";

type Settings = {
  brandName: string;
  brandTagline: string;
  phone: string | null;
  whatsapp: string | null;
  telegram: string | null;
  email: string | null;
  workHours: string | null;
  regionNote: string | null;
  companyName: string | null;
  inn: string | null;
  ogrn: string | null;
  address: string | null;
  notes: string | null;
};

type WebhookInfo = {
  url?: string;
  has_custom_certificate?: boolean;
  pending_update_count?: number;
  ip_address?: string;
  last_error_date?: number;
  last_error_message?: string;
  last_synchronization_error_date?: number;
  max_connections?: number;
  allowed_updates?: string[];
};

const empty: Settings = {
  brandName: "Вектор РФ",
  brandTagline: "трансферы и поездки по России",
  phone: null,
  whatsapp: null,
  telegram: null,
  email: null,
  workHours: null,
  regionNote: null,
  companyName: null,
  inn: null,
  ogrn: null,
  address: null,
  notes: null,
};

export default function SettingsClient() {
  const [s, setS] = useState<Settings>(empty);
  const [loading, setLoading] = useState(false);

  const [tgLoading, setTgLoading] = useState(false);
  const [tg, setTg] = useState<{
    webhookUrlExpected?: string;
    secretExpected?: boolean;
    webhookInfo?: WebhookInfo;
  } | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/settings");
    const data = await res.json().catch(() => ({}));
    setS(data.settings || empty);
    setLoading(false);
  }

  async function save() {
    setLoading(true);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось сохранить");
      return;
    }
    alert("Сохранено ✅");
    load();
  }

  async function loadTg() {
    setTgLoading(true);
    const res = await fetch("/api/admin/telegram/webhook");
    const data = await res.json().catch(() => ({}));
    setTgLoading(false);

    if (!res.ok || !data.ok) {
      setTg(null);
      alert(data?.error || "Не удалось получить статус Telegram webhook");
      return;
    }

    setTg({
      webhookUrlExpected: data.webhookUrlExpected,
      secretExpected: data.secretExpected,
      webhookInfo: data.webhookInfo,
    });
  }

  async function setTgWebhook() {
    setTgLoading(true);
    const res = await fetch("/api/admin/telegram/webhook", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setTgLoading(false);

    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось установить Telegram webhook");
      return;
    }

    alert("Webhook установлен ✅");
    loadTg();
  }

  async function deleteTgWebhook() {
    if (!confirm("Удалить webhook? Кнопки в Telegram перестанут работать.")) return;

    setTgLoading(true);
    const res = await fetch("/api/admin/telegram/webhook", { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    setTgLoading(false);

    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось удалить Telegram webhook");
      return;
    }

    alert("Webhook удалён ✅");
    loadTg();
  }

  useEffect(() => {
    load();
    loadTg();
  }, []);

  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
  };

  const Field = (props: { label: string; value: any; onChange: (v: string) => void; placeholder?: string }) => (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 13, opacity: 0.8 }}>{props.label}</div>
      <input
        style={inputStyle}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );

  const TextArea = (props: { label: string; value: any; onChange: (v: string) => void; placeholder?: string }) => (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 13, opacity: 0.8 }}>{props.label}</div>
      <textarea
        style={{ ...inputStyle, minHeight: 90 }}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );

  const webhookUrl = tg?.webhookInfo?.url || "(не установлен)";
  const webhookOk = !!tg?.webhookInfo?.url;

  const lastErr = tg?.webhookInfo?.last_error_message
    ? `${tg.webhookInfo.last_error_message}${
        tg.webhookInfo.last_error_date
          ? ` (дата: ${new Date(tg.webhookInfo.last_error_date * 1000).toLocaleString()})`
          : ""
      }`
    : null;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Настройки сайта</h1>

      <div style={{ display: "grid", gap: 12, background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
        <Field label="Название бренда" value={s.brandName} onChange={(v) => setS((p) => ({ ...p, brandName: v }))} />
        <Field label="Слоган" value={s.brandTagline} onChange={(v) => setS((p) => ({ ...p, brandTagline: v }))} />

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <Field label="Телефон" value={s.phone} onChange={(v) => setS((p) => ({ ...p, phone: v || null }))} />
          <Field label="Email" value={s.email} onChange={(v) => setS((p) => ({ ...p, email: v || null }))} />
          <Field label="WhatsApp" value={s.whatsapp} onChange={(v) => setS((p) => ({ ...p, whatsapp: v || null }))} />
          <Field label="Telegram" value={s.telegram} onChange={(v) => setS((p) => ({ ...p, telegram: v || null }))} />
        </div>

        <Field label="Часы работы" value={s.workHours} onChange={(v) => setS((p) => ({ ...p, workHours: v || null }))} />
        <Field label="Примечание по регионам" value={s.regionNote} onChange={(v) => setS((p) => ({ ...p, regionNote: v || null }))} />

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, marginTop: 6 }}>Реквизиты</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <Field label="Компания" value={s.companyName} onChange={(v) => setS((p) => ({ ...p, companyName: v || null }))} />
          <Field label="ИНН" value={s.inn} onChange={(v) => setS((p) => ({ ...p, inn: v || null }))} />
          <Field label="ОГРН" value={s.ogrn} onChange={(v) => setS((p) => ({ ...p, ogrn: v || null }))} />
          <Field label="Адрес" value={s.address} onChange={(v) => setS((p) => ({ ...p, address: v || null }))} />
        </div>

        <TextArea label="Примечания" value={s.notes} onChange={(v) => setS((p) => ({ ...p, notes: v || null }))} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={save} disabled={loading} style={buttonStyle}>
            {loading ? "Сохраняем…" : "Сохранить"}
          </button>
          <button onClick={load} disabled={loading} style={buttonStyle}>
            Обновить
          </button>
        </div>

        <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "8px 0" }} />

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Telegram: webhook для кнопок</h2>
        <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.4 }}>
          <div>
            Текущий webhook: <b>{webhookUrl}</b> {webhookOk ? "✅" : "❌"}
          </div>
          {tg?.webhookUrlExpected ? (
            <div>
              Ожидаемый (из env): <b>{tg.webhookUrlExpected}</b>
            </div>
          ) : null}
          {typeof tg?.webhookInfo?.pending_update_count === "number" ? (
            <div>Pending updates: {tg.webhookInfo.pending_update_count}</div>
          ) : null}
          {lastErr ? (
            <div style={{ color: "#b00020" }}>
              Последняя ошибка Telegram: <b>{lastErr}</b>
            </div>
          ) : null}
          {tg?.webhookInfo?.allowed_updates?.length ? (
            <div>allowed_updates: {tg.webhookInfo.allowed_updates.join(", ")}</div>
          ) : null}
          {typeof tg?.secretExpected === "boolean" ? (
            <div>Secret-token включён: {tg.secretExpected ? "да" : "нет"}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <button onClick={loadTg} disabled={tgLoading} style={buttonStyle}>
            {tgLoading ? "Проверяем…" : "Проверить webhook"}
          </button>
          <button onClick={setTgWebhook} disabled={tgLoading} style={buttonStyle}>
            {tgLoading ? "Устанавливаем…" : "Установить webhook"}
          </button>
          <button onClick={deleteTgWebhook} disabled={tgLoading} style={buttonStyle}>
            Удалить webhook
          </button>
        </div>

        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 8 }}>
          Если кнопки в Telegram нажимаются, но статус не меняется — в 99% случаев webhook не установлен или установлен на другой URL.
        </div>
      </div>
    </div>
  );
}