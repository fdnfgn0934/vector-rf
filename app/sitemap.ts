import type { MetadataRoute } from "next";

import { CITY_LANDINGS } from "@/lib/city-landings";
import { absoluteUrl } from "@/lib/seo";
import { buildSeoRoutes } from "@/lib/seo-routes";

const STATIC_PATHS = [
  "/",
  "/services",
  "/city",
  "/intercity-taxi",
  "/airport-transfer",
  "/city-transfer",
  "/minivan-transfer",
  "/corporate-taxi",
  "/corporate",
  "/about",
  "/contacts",
  "/reviews",
  "/faq",
  "/prices",
  "/requisites",
  "/privacy",
  "/personal-data",
  "/agreement",
] as const;

const STATIC_PRIORITIES: Partial<Record<(typeof STATIC_PATHS)[number], number>> = {
  "/": 1,
  "/services": 0.82,
  "/intercity-taxi": 0.92,
  "/airport-transfer": 0.9,
  "/city": 0.78,
  "/city-transfer": 0.74,
  "/minivan-transfer": 0.72,
  "/corporate-taxi": 0.74,
  "/corporate": 0.68,
  "/about": 0.5,
  "/contacts": 0.58,
  "/reviews": 0.58,
  "/faq": 0.52,
  "/prices": 0.66,
  "/requisites": 0.25,
  "/privacy": 0.2,
  "/personal-data": 0.2,
  "/agreement": 0.2,
};

const MAX_ROUTE_URLS = 45000;
const ROUTES_PER_SITEMAP = 10000;

function dedupe<T extends { url: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function buildStaticEntries(lastModified: Date): MetadataRoute.Sitemap {
  return STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.5,
  }));
}

function buildCityEntries(lastModified: Date): MetadataRoute.Sitemap {
  return CITY_LANDINGS.map((city) => ({
    url: absoluteUrl(`/${city.slug}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.72,
  }));
}

function buildRouteEntries(lastModified: Date): MetadataRoute.Sitemap {
  return buildSeoRoutes(MAX_ROUTE_URLS).map((route) => ({
    url: absoluteUrl(`/${route.from}/${route.to}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.64,
  }));
}

export async function generateSitemaps() {
  const totalRouteSitemaps = Math.max(
    1,
    Math.ceil(MAX_ROUTE_URLS / ROUTES_PER_SITEMAP)
  );

  return [
    { id: "core" },
    ...Array.from({ length: totalRouteSitemaps }, (_, index) => ({
      id: `routes-${index + 1}`,
    })),
  ];
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const lastModified = new Date();

  if (id === "core") {
    const coreEntries = [
      ...buildStaticEntries(lastModified),
      ...buildCityEntries(lastModified),
    ];

    return dedupe(coreEntries);
  }

  if (id.startsWith("routes-")) {
    const pageNumber = Number(id.replace("routes-", ""));
    const pageIndex =
      Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber - 1 : 0;

    const allRoutes = buildRouteEntries(lastModified);
    const start = pageIndex * ROUTES_PER_SITEMAP;
    const end = start + ROUTES_PER_SITEMAP;

    return dedupe(allRoutes.slice(start, end));
  }

  return [];
}