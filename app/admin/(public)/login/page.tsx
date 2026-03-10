import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./ui";

export const metadata: Metadata = {
  title: "Вход в админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { reason?: string; next?: string };
}) {
  const reason = searchParams?.reason;

  return (
    <Suspense fallback={<div className="p-4">Загрузка…</div>}>
      <LoginClient reason={reason} />
    </Suspense>
  );
}