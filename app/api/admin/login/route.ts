import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminJwt } from "@/lib/auth";
import { getRequestIp } from "@/lib/request-ip";
import { writeAudit } from "@/lib/audit";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 10;
const BLOCK_MINUTES = 15;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = body?.email?.toString().trim().toLowerCase();
  const password = body?.password?.toString();

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "email/password required" }, { status: 400 });
  }

  const ip = await getRequestIp();
  const key = `${email}|${ip}`;

  // 1) Rate limit check
  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_MINUTES * 60 * 1000);

  const attempt = await prisma.adminLoginAttempt.upsert({
    where: { key },
    create: { key, email, ip, attempts: 0, firstAttempt: now },
    update: {},
    select: { id: true, attempts: true, firstAttempt: true, blockedUntil: true },
  });

  if (attempt.blockedUntil && attempt.blockedUntil > now) {
    return NextResponse.json(
      { ok: false, error: "too many attempts, try later" },
      { status: 429 }
    );
  }

  // Если окно истекло — сбрасываем счетчик
  if (attempt.firstAttempt < windowStart) {
    await prisma.adminLoginAttempt.update({
      where: { key },
      data: { attempts: 0, firstAttempt: now, blockedUntil: null },
    });
  }

  // 2) Auth
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive || user.role !== "ADMIN") {
    // увеличим попытки
    const updated = await prisma.adminLoginAttempt.update({
      where: { key },
      data: { attempts: { increment: 1 } },
      select: { attempts: true, firstAttempt: true },
    });

    // если превысили — блок
    if (updated.attempts >= MAX_ATTEMPTS) {
      const blockedUntil = new Date(Date.now() + BLOCK_MINUTES * 60 * 1000);
      await prisma.adminLoginAttempt.update({
        where: { key },
        data: { blockedUntil },
      });
    }

    await writeAudit({
      actorId: null,
      actorEmail: email,
      action: "admin.login_failed",
      entity: "User",
      entityId: null,
      details: { reason: "bad_user_or_role_or_inactive" },
    });

    return NextResponse.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const updated = await prisma.adminLoginAttempt.update({
      where: { key },
      data: { attempts: { increment: 1 } },
      select: { attempts: true },
    });

    if (updated.attempts >= MAX_ATTEMPTS) {
      const blockedUntil = new Date(Date.now() + BLOCK_MINUTES * 60 * 1000);
      await prisma.adminLoginAttempt.update({
        where: { key },
        data: { blockedUntil },
      });
    }

    await writeAudit({
      actorId: user.id,
      actorEmail: user.email,
      action: "admin.login_failed",
      entity: "User",
      entityId: user.id,
      details: { reason: "bad_password" },
    });

    return NextResponse.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  }

  // 3) Success: сброс попыток
  await prisma.adminLoginAttempt.update({
    where: { key },
    data: { attempts: 0, firstAttempt: now, blockedUntil: null },
  });

  const token = await signAdminJwt({ sub: String(user.id), email: user.email, role: "ADMIN" });

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: process.env.ADMIN_COOKIE_NAME || "admin_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  await writeAudit({
    actorId: user.id,
    actorEmail: user.email,
    action: "admin.login_success",
    entity: "User",
    entityId: user.id,
    details: {},
  });

  return res;
}
