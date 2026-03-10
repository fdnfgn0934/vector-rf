import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PlaceMeta = {
  placeId: string;
  name?: string;
  formattedAddress?: string;
  types: string[];
  city?: string | null;
  admin1?: string | null;
  country?: string | null;
};

type CacheEntry<T> = {
  exp: number;
  value: T;
};

const TTL_MS = 1000 * 60 * 60 * 24 * 7;
const MAX_CACHE_SIZE = 500;

const cache = new Map<string, CacheEntry<PlaceMeta>>();
const inflight = new Map<string, Promise<PlaceMeta | null>>();

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

function normalizeText(s?: string | null) {
  const v = (s ?? "").trim();
  return v ? v : null;
}

function normalizeCityKey(s?: string | null) {
  const v = (s ?? "").trim().toLowerCase();
  if (!v) return null;

  return v
    .replace(/ё/g, "е")
    .replace(/[\u2011\u2012\u2013\u2014\u2212]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function pickComponent(
  components: Array<{ long_name?: string; types?: string[] }> | undefined,
  type: string
) {
  return components?.find(
    (c) => Array.isArray(c?.types) && c.types.includes(type)
  ) || null;
}

function readCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (entry.exp <= now) {
    cache.delete(key);
    return null;
  }

  cache.delete(key);
  cache.set(key, entry);
  return entry.value;
}

function writeCache(key: string, value: PlaceMeta) {
  cache.set(key, { exp: Date.now() + TTL_MS, value });

  while (cache.size > MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    if (!oldestKey) break;
    cache.delete(oldestKey);
  }
}

async function dedupe(key: string, factory: () => Promise<PlaceMeta | null>) {
  const current = inflight.get(key);
  if (current) return current;

  const promise = factory().finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, promise);
  return promise;
}

async function fetchPlaceDetails(placeId: string, key: string): Promise<PlaceMeta | null> {
  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=${encodeURIComponent("types,address_component,name,formatted_address")}` +
    `&language=ru&key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) return null;

  const data = (await res.json().catch(() => null)) as
    | {
        result?: {
          name?: string;
          formatted_address?: string;
          types?: string[];
          address_components?: Array<{
            long_name?: string;
            types?: string[];
          }>;
        };
      }
    | null;

  const result = data?.result;
  if (!result) return null;

  const components = result.address_components || [];

  const locality = pickComponent(components, "locality")?.long_name || null;
  const admin2 =
    pickComponent(components, "administrative_area_level_2")?.long_name || null;
  const admin1 =
    pickComponent(components, "administrative_area_level_1")?.long_name || null;
  const country = pickComponent(components, "country")?.long_name || null;

  const city = normalizeCityKey(locality || admin2 || admin1);

  return {
    placeId,
    name: normalizeText(result.name) ?? undefined,
    formattedAddress: normalizeText(result.formatted_address) ?? undefined,
    types: Array.isArray(result.types) ? result.types : [],
    city,
    admin1: normalizeCityKey(admin1),
    country: normalizeCityKey(country),
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const placeId = normalizeText(searchParams.get("placeId"));

    if (!placeId) {
      return errJson("Missing placeId", 400);
    }

    const key = process.env.GOOGLE_MAPS_SERVER_KEY;
    if (!key) {
      return errJson("Missing GOOGLE_MAPS_SERVER_KEY", 500);
    }

    const cached = readCache(placeId);
    if (cached) {
      return okJson({ ...cached, source: "cache" }, 60 * 60 * 24);
    }

    const meta = await dedupe(placeId, () => fetchPlaceDetails(placeId, key));
    if (!meta) {
      return errJson("Place not found", 404);
    }

    writeCache(placeId, meta);

    return okJson({ ...meta, source: "google" }, 60 * 60 * 24);
  } catch (e: unknown) {
    return errJson("server error", 500, String((e as { message?: string })?.message ?? e));
  }
}