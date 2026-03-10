"use client";

import { useState } from "react";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [datetime, setDatetime] = useState("");
  const [comment, setComment] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [carClass, setCarClass] = useState<"standard" | "comfort" | "business" | "minivan">("standard");
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setLoading(true);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        fromText,
        toText,
        datetime: datetime || null,
        comment: comment || null,
        roundTrip,
        carClass,
      }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok || !data?.ok) {
      alert(data?.error || "Ошибка отправки");
      return;
    }

    setOkMsg(`Заявка отправлена! №${data.lead.id}${data.lead.isDuplicate ? " (дубликат)" : ""}`);
    setName("");
    setPhone("");
    setFromText("");
    setToText("");
    setDatetime("");
    setComment("");
    setRoundTrip(false);
    setCarClass("standard");
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-800";

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Имя *</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Телефон *</label>
          <input
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 999 123-45-67"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Откуда *</label>
          <input
            className={inputClass}
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            placeholder="Москва"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Куда *</label>
          <input className={inputClass} value={toText} onChange={(e) => setToText(e.target.value)} placeholder="Тверь" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Дата/время</label>
          <input
            className={inputClass}
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            placeholder="20.01 14:00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Класс авто</label>
          <select className={inputClass} value={carClass} onChange={(e) => setCarClass(e.target.value as any)}>
            <option value="standard">Стандарт</option>
            <option value="comfort">Комфорт</option>
            <option value="business">Бизнес</option>
            <option value="minivan">Минивэн</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input
          type="checkbox"
          checked={roundTrip}
          onChange={(e) => setRoundTrip(e.target.checked)}
          className="h-4 w-4"
        />
        Туда-обратно
      </label>

      <div>
        <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Комментарий</label>
        <textarea
          className={`${inputClass} min-h-[96px]`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Детали поездки, багаж, детское кресло и т.п."
        />
      </div>

      <button
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Отправляем..." : "Отправить заявку"}
      </button>

      {okMsg && (
        <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200">
          {okMsg}
        </div>
      )}
    </form>
  );
}
