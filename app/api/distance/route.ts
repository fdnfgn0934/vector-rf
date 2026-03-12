import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ReqBody = {
  from?: string;
  to?: string;
  fromPlaceId?: string | null;
  toPlaceId?: string | null;
};

type Coords = { lat: number; lon: number };
type DistanceResult = { km: number; seconds: number; source: "google" | "osrm" };
type CacheEntry<T> = { value: T; expiresAt: number };

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const ROUTE_TTL_MS = 12 * HOUR_MS;
const GEO_TTL_MS = 30 * DAY_MS;
const MAX_GEO_CACHE = 500;
const MAX_ROUTE_CACHE = 500;
const UA = "vector-rf.ru distance (admin@vector-rf.ru)";

function okJson(data: unknown, cacheSeconds = 3600) {
  return NextResponse.json(
    { ok: true, ...((data as Record<string, unknown>) ?? {}) },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`,
      },
    }
  );
}

function errJson(error: string, status = 400, details?: string) {
  return NextResponse.json(
    { ok: false, error, ...(details ? { details } : {}) },
    { status }
  );
}

const geoCache = new Map<string, CacheEntry<Coords>>();
const routeCache = new Map<string, CacheEntry<DistanceResult>>();
const inflightGeocode = new Map<string, Promise<Coords | null>>();
const inflightRoute = new Map<string, Promise<DistanceResult | null>>();

function now() {
  return Date.now();
}

function normText(q: string) {
  return q.replace(/\s+/g, " ").trim().toLowerCase();
}

function normPlaceId(v?: string | null) {
  return (v ?? "").trim();
}

function readCache<T>(map: Map<string, CacheEntry<T>>, key: string): T | null {
  const entry = map.get(key);
  if (!entry) return null;

  if (entry.expiresAt <= now()) {
    map.delete(key);
    return null;
  }

  map.delete(key);
  map.set(key, entry);
  return entry.value;
}

function writeCache<T>(
  map: Map<string, CacheEntry<T>>,
  key: string,
  value: T,
  ttlMs: number,
  maxSize: number
) {
  map.set(key, { value, expiresAt: now() + ttlMs });

  while (map.size > maxSize) {
    const oldestKey = map.keys().next().value;
    if (!oldestKey) break;
    map.delete(oldestKey);
  }
}

async function dedupe<T>(
  map: Map<string, Promise<T>>,
  key: string,
  factory: () => Promise<T>
) {
  const current = map.get(key);
  if (current) return current;

  const promise = factory().finally(() => {
    map.delete(key);
  });

  map.set(key, promise);
  return promise;
}

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) return null;
  return res.json().catch(() => null);
}

async function geocodeNominatim(q: string): Promise<Coords | null> {
  const key = normText(q);
  if (!key) return null;

  const cached = readCache(geoCache, key);
  if (cached) return cached;

  return dedupe(inflightGeocode, key, async () => {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=0&q=" +
      encodeURIComponent(q);

    const arr = (await fetchJson(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "ru",
      },
      next: { revalidate: 60 * 60 * 24 * 30 },
    })) as Array<{ lat?: string; lon?: string }> | null;

    if (!arr?.length) return null;

    const lat = Number(arr[0]?.lat);
    const lon = Number(arr[0]?.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

    const coords = { lat, lon };
    writeCache(geoCache, key, coords, GEO_TTL_MS, MAX_GEO_CACHE);
    return coords;
  });
}

async function routeKmSecondsOSRM(from: string, to: string): Promise<DistanceResult | null> {
  const routeKey = `osrm:${normText(from)}=>${normText(to)}`;
  const cached = readCache(routeCache, routeKey);
  if (cached) return cached;

  return dedupe(inflightRoute, routeKey, async () => {
    const [a, b] = await Promise.all([geocodeNominatim(from), geocodeNominatim(to)]);
    if (!a || !b) return null;

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`;

    const data = (await fetchJson(url, {
      headers: { "User-Agent": UA },
      next: { revalidate: 60 * 60 * 12 },
    })) as { routes?: Array<{ distance?: number; duration?: number }> } | null;

    const meters = Number(data?.routes?.[0]?.distance);
    const seconds = Number(data?.routes?.[0]?.duration);

    if (!Number.isFinite(meters) || meters <= 0) return null;

    const value: DistanceResult = {
      km: meters / 1000,
      seconds: Number.isFinite(seconds) ? Math.round(seconds) : 0,
      source: "osrm",
    };

    writeCache(routeCache, routeKey, value, ROUTE_TTL_MS, MAX_ROUTE_CACHE);
    return value;
  });
}

async function routeKmSecondsGoogle(body: ReqBody): Promise<DistanceResult | null> {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!key) return null;

  const from = (body.from ?? "").trim();
  const to = (body.to ?? "").trim();
  const fromPlaceId = normPlaceId(body.fromPlaceId);
  const toPlaceId = normPlaceId(body.toPlaceId);

  const routeKey = `google:${fromPlaceId || normText(from)}=>${toPlaceId || normText(to)}`;
  const cached = readCache(routeCache, routeKey);
  if (cached) return cached;

  const origin = fromPlaceId ? { placeId: fromPlaceId } : from ? { address: from } : null;
  const destination = toPlaceId ? { placeId: toPlaceId } : to ? { address: to } : null;

  if (!origin || !destination) return null;

  return dedupe(inflightRoute, routeKey, async () => {
    const resp = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin,
        destination,
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "ru-RU",
        units: "METRIC",
      }),
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!resp.ok) return null;

    const data = (await resp.json().catch(() => null)) as
      | { routes?: Array<{ distanceMeters?: number; duration?: string }> }
      | null;

    const route = data?.routes?.[0];
    const distanceMeters = Number(route?.distanceMeters ?? 0);
    const durationStr = String(route?.duration ?? "0s");
    const seconds = Number(durationStr.replace("s", "")) || 0;

    if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) return null;

    const value: DistanceResult = {
      km: distanceMeters / 1000,
      seconds,
      source: "google",
    };

    writeCache(routeCache, routeKey, value, ROUTE_TTL_MS, MAX_ROUTE_CACHE);
    return value;
  });
}

function parseBodyFromUrl(req: Request): ReqBody {
  const { searchParams } = new URL(req.url);
  const from = (searchParams.get("from") || "").trim();
  const to = (searchParams.get("to") || "").trim();
  const fromPlaceId = (searchParams.get("fromPlaceId") || "").trim() || null;
  const toPlaceId = (searchParams.get("toPlaceId") || "").trim() || null;

  return { from, to, fromPlaceId, toPlaceId };
}

async function getDistance(body: ReqBody) {
  const from = (body.from ?? "").trim();
  const to = (body.to ?? "").trim();

  if (!from || !to) return null;

  const google = await routeKmSecondsGoogle(body);
  if (google) return google;

  return routeKmSecondsOSRM(from, to);
}

async function handleDistance(body: ReqBody) {
  const from = (body.from ?? "").trim();
  const to = (body.to ?? "").trim();

  if (!from || !to) return errJson("Missing from/to", 400);

  const distance = await getDistance(body);

  if (!distance) {
    return errJson(
      "Не удалось построить маршрут. Уточните адреса, например: Москва, Пулково (LED).",
      422
    );
  }

  return okJson(
    {
      km: Math.round(distance.km),
      seconds: Math.max(0, Math.round(distance.seconds)),
      source: distance.source,
    },
    distance.source === "google" ? 12 * 60 * 60 : 60 * 60
  );
}

export async function GET(req: Request) {
  try {
    const body = parseBodyFromUrl(req);
    return await handleDistance(body);
  } catch (e: unknown) {
    return errJson("server error", 500, String((e as { message?: string })?.message ?? e));
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as ReqBody;
    return await handleDistance(body);
  } catch (e: unknown) {
    return errJson("server error", 500, String((e as { message?: string })?.message ?? e));
  }
}
