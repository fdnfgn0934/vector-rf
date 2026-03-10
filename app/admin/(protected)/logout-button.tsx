"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setLoading(false);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    >
      {loading ? <Spinner /> : <span aria-hidden>🚪</span>}
      {loading ? "Выходим…" : "Выйти"}
    </button>
  );
}
