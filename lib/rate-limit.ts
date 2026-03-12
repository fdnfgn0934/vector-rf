/**
 * Rate limiter с поддержкой Upstash Redis (продакшн) и in-memory fallback (dev/CI).
 *
 * На Vercel serverless in-memory Map() не работает — каждый вызов новый инстанс.
 * Upstash Redis работает через REST API и не требует постоянного соединения.
 *
 * Подключение:
 *   1. upstash.com → New Database → Redis → скопировать UPSTASH_REDIS_REST_URL и TOKEN
 *   2. Добавить в Vercel → Settings → Environment Variables:
 *      UPSTASH_REDIS_REST_URL=https://...
 *      UPSTASH_REDIS_REST_TOKEN=...
 */

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

// ── In-memory fallback (dev / если Upstash не настроен) ──────────────────────
interface WindowEntry { count: number; resetAt: number; }
const memStore = new Map<string, WindowEntry>();
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, e] of memStore) if (e.resetAt <= now) memStore.delete(k);
  }, 5 * 60 * 1000);
}

function checkMemory(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + windowMs;
    memStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }
  if (entry.count >= limit) return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// ── Upstash Redis (продакшн) ─────────────────────────────────────────────────
async function checkUpstash(key: string, { limit, windowMs }: RateLimitOptions): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const windowSec = Math.ceil(windowMs / 1000);
  const now = Date.now();

  // Используем sliding window через INCR + EXPIRE
  const incrRes = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const incrData = await incrRes.json();
  const count = Number(incrData.result ?? 1);

  // Устанавливаем TTL только при первом инкременте
  if (count === 1) {
    await fetch(`${url}/expire/${encodeURIComponent(key)}/${windowSec}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Получаем оставшийся TTL для resetAt
  const ttlRes = await fetch(`${url}/ttl/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const ttlData = await ttlRes.json();
  const ttl = Number(ttlData.result ?? windowSec);
  const resetAt = now + ttl * 1000;

  if (count > limit) {
    return { allowed: false, remaining: 0, resetAt };
  }
  return { allowed: true, remaining: Math.max(0, limit - count), resetAt };
}

// ── Публичный API ────────────────────────────────────────────────────────────
export async function checkRateLimit(key: string, opts: RateLimitOptions): Promise<RateLimitResult> {
  const hasUpstash =
    typeof process.env.UPSTASH_REDIS_REST_URL === "string" &&
    process.env.UPSTASH_REDIS_REST_URL.startsWith("https://") &&
    typeof process.env.UPSTASH_REDIS_REST_TOKEN === "string" &&
    process.env.UPSTASH_REDIS_REST_TOKEN.length > 10;

  if (hasUpstash) {
    try {
      return await checkUpstash(key, opts);
    } catch (e) {
      console.error("[rate-limit] Upstash error, falling back to memory:", e);
    }
  }

  return checkMemory(key, opts);
}
