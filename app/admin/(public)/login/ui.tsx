"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function LoginClient({ reason }: { reason?: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin/leads";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось войти");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
              ⚡
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">Вектор РФ</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Вход в админ-панель</div>
            </div>
          </div>

          {reason === "expired" && (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
              Сессия истекла. Пожалуйста, войдите снова.
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-800"
                placeholder="admin@vectorrf.ru"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Пароль</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-800"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? <Spinner /> : <span aria-hidden>🔐</span>}
              {loading ? "Входим…" : "Войти"}
            </button>

            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              Подсказка: если не пускает — проверь переменные окружения ADMIN_* в Vercel.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}