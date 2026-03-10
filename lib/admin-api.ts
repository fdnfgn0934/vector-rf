import { cookies } from "next/headers";
import { verifyAdminJwt, type AdminJwtPayload } from "@/lib/auth";

export type RequireAdminResult =
  | { ok: true; payload: AdminJwtPayload }
  | { ok: false; error: "UNAUTHORIZED" };

/**
 * Мягкая проверка — не кидает исключение.
 * Удобно для layout.tsx (там можно сделать redirect).
 */
export async function requireAdmin(): Promise<RequireAdminResult> {
  const name = process.env.ADMIN_COOKIE_NAME || "admin_token";
  const cookieStore = await cookies();
  const token = cookieStore.get(name)?.value;

  if (!token) return { ok: false, error: "UNAUTHORIZED" };

  try {
    const payload = await verifyAdminJwt(token);
    return { ok: true, payload };
  } catch {
    return { ok: false, error: "UNAUTHORIZED" };
  }
}

/**
 * Жёсткая проверка — кидает Error("UNAUTHORIZED").
 * Используем во всех app/api/admin/** — чтобы нельзя было “забыть проверить ok”.
 */
export async function requireAdminOrThrow(): Promise<AdminJwtPayload> {
  const res = await requireAdmin();
  if (!res.ok) throw new Error("UNAUTHORIZED");
  return res.payload;
}