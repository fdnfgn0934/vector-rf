"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "DISPATCHER";
  isActive: boolean;
  createdAt: string;
};

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // форма создания диспетчера
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json().catch(() => ({}));
    setUsers(data.users || []);
    setLoading(false);
  }

  async function createDispatcher(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, name, password, isActive: true }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось создать пользователя");
      return;
    }

    setEmail("");
    setName("");
    setPassword("");
    load();
  }

  async function toggleActive(id: number, isActive: boolean) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isActive }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      alert(data?.error || "Не удалось обновить пользователя");
      return;
    }
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Пользователи</h1>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, background: "#fff" }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, marginBottom: 10 }}>
          Создать диспетчера
        </h2>

        <form onSubmit={createDispatcher} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <input
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />

          <button style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}>
            Создать
          </button>
        </form>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <div>Загрузка…</div>}

        <div style={{ display: "grid", gap: 10 }}>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12,
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>
                  {u.name} — {u.role === "ADMIN" ? "Администратор" : "Диспетчер"}
                </div>
                <div style={{ opacity: 0.8 }}>{u.email}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>Создан: {new Date(u.createdAt).toLocaleString()}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: 8 }}>
                  Статус: <b>{u.isActive ? "Активен" : "Отключён"}</b>
                </div>
                {u.role !== "ADMIN" && (
                  <button
                    onClick={() => toggleActive(u.id, !u.isActive)}
                    style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
                  >
                    {u.isActive ? "Отключить" : "Включить"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {!loading && users.length === 0 && <div>Пользователей нет</div>}
        </div>
      </div>
    </div>
  );
}
