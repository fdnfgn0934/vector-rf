"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 12 }}>Admin</div>
        <nav style={{ display: "grid", gap: 8 }}>
          <Link href="/admin/leads">Leads</Link>
          <Link href="/admin/settings">Settings</Link>
          <Link href="/admin/users">Users</Link>

        </nav>

        <button
          onClick={logout}
          style={{ marginTop: 16, padding: 10, borderRadius: 8, border: "1px solid #ddd", cursor: "pointer" }}
        >
          Logout
        </button>
      </aside>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
<Link href="/admin/audit">Audit</Link>
