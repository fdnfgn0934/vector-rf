"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-black"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
      )}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </Link>
  );
}

export default function AdminNav() {
  return (
    <div className="flex items-center gap-2">
      <nav className="hidden items-center gap-2 md:flex">
        <NavLink href="/admin/leads" label="Лиды" icon="📥" />
        <NavLink href="/admin/users" label="Пользователи" icon="👥" />
        <NavLink href="/admin/settings" label="Настройки" icon="⚙️" />
      </nav>

      <LogoutButton />
    </div>
  );
}
