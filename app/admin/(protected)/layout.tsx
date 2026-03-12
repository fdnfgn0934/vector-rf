import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";
import ThemeToggle from "./theme-toggle";
import { ToastProvider } from "./toast";
import { requireAdmin } from "@/lib/admin-api";

// Админку не индексируем.
export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const auth = await requireAdmin();

  if (!auth.ok) {
    redirect("/admin/login?reason=expired");
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/admin/leads" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-black">
                V
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight">Вектор РФ</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Админ-панель</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <Link className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900/40" href="/admin/leads">
                Лиды
              </Link>
              <Link className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900/40" href="/admin/users">
                Пользователи
              </Link>
              <Link className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900/40" href="/admin/reviews">
                Отзывы
              </Link>
              <Link className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900/40" href="/admin/settings">
                Настройки
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </div>
    </ToastProvider>
  );
}
