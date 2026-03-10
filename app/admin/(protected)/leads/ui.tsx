"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "../toast";

type LeadStatus = "new" | "in_progress" | "done" | "canceled";

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "DISPATCHER";
  isActive: boolean;
};

type Lead = {
  id: number;
  name: string;
  phone: string;
  fromText: string;
  toText: string;
  datetime: string | null;
  carClass: string;
  roundTrip: boolean;
  price: number | null;
  comment: string | null;
  status: LeadStatus;
  assignedToId: number | null;
  isDuplicate: boolean;
  duplicateOfId: number | null;
  createdAt: string;
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  done: "Завершён",
  canceled: "Отменён",
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={cn("animate-spin", className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  );
}

function fmt(dt: string) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

function digitsOnly(s: string) {
  return (s || "").replace(/[^\d]/g, "");
}

function telLink(phone: string) {
  return phone ? `tel:${phone}` : null;
}

function waLink(phone: string) {
  const p = digitsOnly(phone);
  return p ? `https://wa.me/${p}` : null;
}

/**
 * Telegram deep link:
 * - tg://resolve works great on mobile/desktop with Telegram installed
 * - t.me works in browser too
 */
function tgDeepLink(phone: string) {
  const p = digitsOnly(phone);
  return p ? `tg://resolve?phone=${p}` : null;
}
function tgWebLink(phone: string) {
  const p = digitsOnly(phone);
  // t.me/+<phone> — часто открывает диалог/поиск контакта в Telegram
  return p ? `https://t.me/+${p}` : null;
}

function StatusPill({ status }: { status: LeadStatus }) {
  const cls =
    status === "new"
      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black"
      : status === "in_progress"
      ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200"
      : status === "done"
      ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200"
      : "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs font-semibold", cls)}>
      {status === "new" ? "●" : status === "in_progress" ? "◐" : status === "done" ? "✓" : "×"} {STATUS_LABEL[status]}
    </span>
  );
}

export default function LeadsClient() {
  const toast = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [q, setQ] = useState("");
  const [onlyDupes, setOnlyDupes] = useState(false);

  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<Record<number, boolean>>({});

  const dispatchers = useMemo(
    () => users.filter((u) => u.role === "DISPATCHER" && u.isActive),
    [users]
  );

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json().catch(() => ({}));
    setUsers(data.users || []);
  }

  async function loadLeads() {
    setLoading(true);
    try {
      const sp = new URLSearchParams();
      if (status !== "all") sp.set("status", status);
      if (q.trim()) sp.set("q", q.trim());

      const res = await fetch(`/api/admin/leads?${sp.toString()}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || "Ошибка загрузки");

      let rows: Lead[] = data.leads || [];
      if (onlyDupes) rows = rows.filter((x) => x.isDuplicate);

      setLeads(rows);
    } catch (e: any) {
      toast.error("Не удалось загрузить лиды", e?.message);
    } finally {
      setLoading(false);
    }
  }

  async function patchLead(id: number, patch: any) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data?.error || "Ошибка");
    return data.lead;
  }

  async function setLeadStatus(id: number, next: LeadStatus) {
    setBusy((p) => ({ ...p, [id]: true }));
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: next } : l)));

    try {
      await patchLead(id, { status: next });
      toast.success("Статус обновлён", STATUS_LABEL[next]);
    } catch (e: any) {
      toast.error("Не удалось обновить статус", e?.message);
      loadLeads();
    } finally {
      setBusy((p) => ({ ...p, [id]: false }));
    }
  }

  async function assignLead(id: number, assignedToId: number | null) {
    setBusy((p) => ({ ...p, [id]: true }));
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, assignedToId } : l)));

    try {
      await patchLead(id, { assignedToId });
      toast.success("Назначение сохранено");
    } catch (e: any) {
      toast.error("Не удалось назначить", e?.message);
      loadLeads();
    } finally {
      setBusy((p) => ({ ...p, [id]: false }));
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const t = setTimeout(loadLeads, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, q, onlyDupes]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Лиды</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Список с быстрыми действиями</p>
        </div>

        <button
          onClick={loadLeads}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          disabled={loading}
        >
          {loading ? <Spinner /> : <span aria-hidden>↻</span>}
          {loading ? "Обновляем…" : "Обновить"}
        </button>
      </div>

      <div className="mb-4 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-12">
        <div className="sm:col-span-3">
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Статус</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <option value="all">Все</option>
            <option value="new">Новые</option>
            <option value="in_progress">В работе</option>
            <option value="done">Завершённые</option>
            <option value="canceled">Отменённые</option>
          </select>
        </div>

        <div className="sm:col-span-6">
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Поиск</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Телефон / имя / откуда / куда"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Фильтры</label>
          <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <input type="checkbox" checked={onlyDupes} onChange={(e) => setOnlyDupes(e.target.checked)} className="h-4 w-4" />
            Только дубликаты
          </label>
        </div>
      </div>

      <div className="grid gap-3">
        {leads.map((l) => {
          const wa = waLink(l.phone);
          const tel = telLink(l.phone);
          const tg = tgDeepLink(l.phone);
          const tgWeb = tgWebLink(l.phone);
          const isBusy = !!busy[l.id];

          return (
            <div
              key={l.id}
              className={cn(
                "rounded-2xl border bg-white p-4 shadow-sm transition",
                "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950",
                l.isDuplicate && "bg-rose-50/30 dark:bg-rose-950/10"
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold">#{l.id}</span>
                    <span className="text-sm font-semibold">{l.name}</span>
                    <StatusPill status={l.status} />
                    {l.isDuplicate && (
                      <span className="rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
                        Дубликат #{l.duplicateOfId ?? "—"}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                    {l.fromText} <span className="opacity-60">→</span> {l.toText}
                  </div>

                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    🗓 {fmt(l.createdAt)}
                    {l.datetime ? ` • 🕒 ${l.datetime}` : ""}
                    {l.price != null ? ` • ${l.price} ₽` : ""}
                  </div>

                  {l.comment && (
                    <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
                      {l.comment}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        navigator.clipboard
                          ?.writeText(l.phone)
                          .then(() => toast.success("Скопировано", "Телефон скопирован"))
                          .catch(() => toast.error("Не удалось скопировать"))
                      }
                      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                    >
                      Телефон: {l.phone}
                    </button>

                    {tel && (
                      <a
                        href={tel}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                      >
                        Позвонить
                      </a>
                    )}

                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-950/50"
                      >
                        WhatsApp
                      </a>
                    )}

                    {/* Telegram: сначала deep link, если не откроется — есть web link */}
                    {(tg || tgWeb) && (
                      <a
                        href={tg || tgWeb!}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-900 hover:bg-sky-100 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-200 dark:hover:bg-sky-950/50"
                        title="Открыть Telegram"
                      >
                        Telegram
                      </a>
                    )}
                  </div>
                </div>

                <div className="w-full shrink-0 sm:w-[360px]">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold">Действия</div>
                      {isBusy && (
                        <div className="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <Spinner className="h-4 w-4" />
                          Сохраняем…
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Диспетчер</label>
                        <select
                          value={l.assignedToId ?? ""}
                          onChange={(e) => {
                            const v = e.target.value === "" ? null : Number(e.target.value);
                            assignLead(l.id, v);
                          }}
                          disabled={isBusy}
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950"
                        >
                          <option value="">— не назначен —</option>
                          {dispatchers.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setLeadStatus(l.id, "in_progress")}
                          disabled={isBusy}
                          className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-60 dark:border-amber-900/30 dark:bg-amber-950/25 dark:text-amber-200 dark:hover:bg-amber-950/40"
                        >
                          В работу
                        </button>

                        <button
                          onClick={() => setLeadStatus(l.id, "done")}
                          disabled={isBusy}
                          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 disabled:opacity-60 dark:border-emerald-900/30 dark:bg-emerald-950/25 dark:text-emerald-200 dark:hover:bg-emerald-950/40"
                        >
                          Завершить
                        </button>

                        <button
                          onClick={() => setLeadStatus(l.id, "canceled")}
                          disabled={isBusy}
                          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-100 disabled:opacity-60 dark:border-rose-900/30 dark:bg-rose-950/25 dark:text-rose-200 dark:hover:bg-rose-950/40"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {!loading && leads.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Лидов нет
          </div>
        )}
      </div>
    </div>
  );
}
