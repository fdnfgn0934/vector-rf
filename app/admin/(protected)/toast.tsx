"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastKind = "success" | "error" | "info";

type ToastItem = {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
};

type ToastApi = {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
};

const ToastCtx = createContext<ToastApi | null>(null);

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Icon({ kind }: { kind: ToastKind }) {
  return (
    <div
      className={cn(
        "grid h-9 w-9 place-items-center rounded-xl border",
        kind === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200",
        kind === "error" && "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200",
        kind === "info" && "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-200"
      )}
      aria-hidden
    >
      {kind === "success" ? "✓" : kind === "error" ? "×" : "i"}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((kind: ToastKind, title: string, message?: string) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const t: ToastItem = { id, kind, title, message };
    setItems((prev) => [t, ...prev].slice(0, 4)); // максимум 4

    // авто закрытие
    window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, 2400);
  }, []);

  const api: ToastApi = useMemo(
    () => ({
      success: (title, message) => push("success", title, message),
      error: (title, message) => push("error", title, message),
      info: (title, message) => push("info", title, message),
    }),
    [push]
  );

  return (
    <ToastCtx.Provider value={api}>
      {children}

      {/* toasts */}
      <div className="fixed right-4 top-4 z-50 grid gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "w-[340px] rounded-2xl border p-3 shadow-lg backdrop-blur",
              "border-zinc-200 bg-white/95 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-50"
            )}
          >
            <div className="flex items-start gap-3">
              <Icon kind={t.kind} />
              <div className="min-w-0">
                <div className="text-sm font-extrabold">{t.title}</div>
                {t.message ? <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-300">{t.message}</div> : null}
              </div>

              <button
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
                className="ml-auto rounded-lg px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
