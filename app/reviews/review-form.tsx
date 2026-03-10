"use client";

import { useState } from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function ControlBase(className?: string) {
  return cn(
    "h-11 w-full rounded-xl border border-zinc-200 bg-white/90 px-3 text-sm outline-none",
    "shadow-[0_1px_0_rgba(16,24,40,0.04)]",
    "focus:border-sky-300 focus:ring-2 focus:ring-sky-100",
    className
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-zinc-700">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState<string>("5");
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = name.trim().length >= 2 && text.trim().length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    if (!canSubmit) {
      setErr("Заполните имя и текст отзыва.");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        text: text.trim(),
      };

      const cityTrim = city.trim();
      if (cityTrim) payload.city = cityTrim;

      // rating можно не отправлять, но если выбрали — отправим
      const ratingNum = Number(rating);
      if (Number.isFinite(ratingNum)) payload.rating = ratingNum;

      // honeypot
      payload.company = "";

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Ошибка отправки");

      setOk(true);
      setName("");
      setCity("");
      setRating("5");
      setText("");
    } catch (e: any) {
      setErr(e?.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight text-zinc-900">Оставить отзыв</div>
          <div className="mt-1 text-sm text-zinc-600">Отзыв появится на странице после модерации.</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Имя *">
          <input
            className={ControlBase()}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
          />
        </Field>

        <Field label="Город">
          <input
            className={ControlBase()}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Нижний Новгород"
          />
        </Field>

        <Field label="Оценка" >
          <select className={ControlBase()} value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">5 — отлично</option>
            <option value="4">4 — хорошо</option>
            <option value="3">3 — нормально</option>
            <option value="2">2 — плохо</option>
            <option value="1">1 — очень плохо</option>
          </select>
        </Field>

        <Field label="Отзыв *">
          <textarea
            className={cn(
              "min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none",
              "shadow-[0_1px_0_rgba(16,24,40,0.04)]",
              "focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
            )}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Например: всё вовремя, водитель вежливый, машина чистая."
          />
        </Field>

        {/* honeypot (скрыто) */}
        <input
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value=""
          onChange={() => {}}
          name="company"
        />
      </div>

      {ok ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Спасибо! Отзыв отправлен.
        </div>
      ) : null}

      {err ? (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {err}
        </div>
      ) : null}

      <button
        disabled={loading || !canSubmit}
        className={cn(
          "mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-extrabold text-white shadow-sm transition",
          "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {loading ? "Отправляем…" : "Отправить отзыв"}
      </button>
    </form>
  );
}
