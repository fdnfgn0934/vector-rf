import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminIndexPage() {
  const name = process.env.ADMIN_COOKIE_NAME || "admin_token";
  const cookieStore = await cookies();
  const token = cookieStore.get(name)?.value;

  if (!token) redirect("/admin/login");
  redirect("/admin/leads");
}
