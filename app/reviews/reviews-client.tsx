"use client";

import { useMemo, useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  city: string | null;
  createdAt: Date | string;

  // ✅ ответы из админки
  replyText?: string | null;
  replyAuthor?: string | null;
  repliedAt?: string | Date | null;
};

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

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2">
        <div className="text-xs font-semibold text-zinc-700">{label}</div>
        {hint ? <div className="text-[11px] text-zinc-500">{hint}</div> : null}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [items, setItems] = useState<Review[]>(initialReviews || []);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  // 🛡 honeypot
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const avgRating = useMemo(() => {
    const nums = items.map((r) => Math.max(1, Math.min(5, Number(r.rating) || 5)));
    if (!nums.length) return null;
    const a = nums.reduce((s, n) => s + n, 0) / nums.length;
    return Number(a.toFixed(1));
  }, [items]);

  async function refresh() {
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return;
      setItems(data.reviews || []);
    } catch {
      // тихо
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOkMsg(null);

    const n = name.trim();
    const t = text.trim();
    const c = city.trim();

    if (n.length < 2) {
      setErr("Введите имя");
      return;
    }
    if (t.length < 10) {
      setErr("Отзыв слишком короткий");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: n,
          city: c ? c : null,
          rating,
          text: t,
          company,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Ошибка отправки");

      // ✅ ВОТ ТУТ ГЛАВНОЕ
      if (data.isPublic) {
        setOkMsg("Спасибо! Ваш отзыв опубликован.");
      } else {
        setOkMsg("Спасибо! Отзыв отправлен на модерацию.");
      }

      setName("");
      setCity("");
      setRating(5);
      setText("");
      setCompany("");

      await refresh();
    } catch (e: any) {
      setErr(e?.message || "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Имя *" hint="Как вас подписать">
            <input className={ControlBase()} value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван" />
          </Field>

          <Field label="Город" hint="Необязательно">
            <input
              className={ControlBase()}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Нижний Новгород"
            />
          </Field>

          <Field label="Оценка" className="sm:col-span-2">
            <select className={ControlBase()} value={rating} onChange={(e) => setRating(Number(e.target.value) || 5)}>
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★☆ (4)</option>
              <option value={3}>★★★☆☆ (3)</option>
              <option value={2}>★★☆☆☆ (2)</option>
              <option value={1}>★☆☆☆☆ (1)</option>
            </select>
          </Field>

          <Field label="Отзыв *" hint="10+ символов" className="sm:col-span-2">
            <textarea
              className={cn(
                "min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none",
                "shadow-[0_1px_0_rgba(16,24,40,0.04)]",
                "focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              )}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Например: быстро ответили, машина приехала вовремя, водитель вежливый."
            />
          </Field>
        </div>

        {okMsg ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            {okMsg}
          </div>
        ) : null}

        {err ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">{err}</div>
        ) : null}

        <button
          disabled={loading}
          className={cn(
            "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-extrabold text-white shadow-sm transition",
            "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {loading ? "Отправляем…" : "Отправить отзыв"}
        </button>

        {avgRating !== null ? (
          <div className="text-[11px] text-zinc-500">
            Сейчас на странице: <b>{items.length}</b> • Средняя оценка: <b>{avgRating}</b>/5
          </div>
        ) : (
          <div className="text-[11px] text-zinc-500">Отзыв появится на странице после модерации.</div>
        )}
      </form>
    </div>
  );
}