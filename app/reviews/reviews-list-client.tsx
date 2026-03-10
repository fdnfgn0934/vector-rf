"use client";

import { useMemo, useState } from "react";

type Review = {
  id: number;
  name: string;
  text: string;
  city: string | null;
  rating: number;
  createdAt: string;
  replyText: string | null;
  replyAuthor: string | null;
  repliedAt: string | null;
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatDate(d: string | null | undefined) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default function ReviewsListClient({ reviews }: { reviews: Review[] }) {
  const safe = useMemo(() => (Array.isArray(reviews) ? reviews : []), [reviews]);

  // По задаче: показываем последние 3, далее — по 5
  const [visible, setVisible] = useState(3);
  const shown = safe.slice(0, Math.max(0, visible));
  const canMore = visible < safe.length;

  return (
    <div>
      <div className="grid gap-3">
        {shown.map((r) => {
          const stars = Math.max(1, Math.min(5, Number(r.rating) || 5));

          return (
            <div key={r.id} className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-extrabold text-zinc-900">{r.name}</div>
                {r.city ? <div className="text-sm text-zinc-500">• {r.city}</div> : null}
                <div className="text-xs text-zinc-400">• {formatDate(r.createdAt)}</div>
              </div>

              <div className="mt-1 text-sm text-zinc-700">
                {"★".repeat(stars)} <span className="text-zinc-400">({stars}/5)</span>
              </div>

              <div className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-700">{r.text}</div>

              {r.replyText ? (
                <div className="mt-4 rounded-2xl border border-zinc-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-zinc-700">
                    Ответ {r.replyAuthor ? `— ${r.replyAuthor}` : "администрации"}
                    {r.repliedAt ? <span className="text-zinc-400"> • {formatDate(r.repliedAt)}</span> : null}
                  </div>
                  <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-700">{r.replyText}</div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {canMore ? (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(safe.length, v + 5))}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-extrabold text-white shadow-sm transition",
              "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
            )}
          >
            Показать еще 5
          </button>
          <div className="mt-2 text-center text-[11px] text-zinc-500">
            Показано: <b>{shown.length}</b> из <b>{safe.length}</b>
          </div>
        </div>
      ) : null}
    </div>
  );
}
