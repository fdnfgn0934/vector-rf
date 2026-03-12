import { CITY_LANDINGS } from "@/lib/city-landings";
import { BLOG_POSTS } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { buildSeoRoutes } from "@/lib/seo-routes";

export type SitemapItem = {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

const STATIC_PATHS = [
  "/",
  "/services",
  "/city",
  "/city-transfer",
  "/minivan-transfer",
  "/corporate-taxi",
  "/corporate",
  "/about",
  "/sitemap-page",
  "/contacts",
  "/reviews",
  "/faq",
  "/prices",
  "/requisites",
  "/privacy",
  "/personal-data",
  "/agreement",
  "/taxi-mezhgorod",
  "/transfer-v-aeroport",
  "/transfer-iz-aeroporta",
] as const;

const STATIC_PRIORITIES: Partial<Record<(typeof STATIC_PATHS)[number], number>> = {
  "/": 1.0,
  "/services": 0.82,
  "/taxi-mezhgorod": 0.88,
  "/transfer-v-aeroport": 0.88,
  "/transfer-iz-aeroporta": 0.88,
  "/city": 0.78,
  "/prices": 0.75,
  "/city-transfer": 0.74,
  "/corporate-taxi": 0.74,
  "/minivan-transfer": 0.72,
  "/reviews": 0.65,
  "/faq": 0.62,
  "/contacts": 0.58,
  "/about": 0.5,
  "/corporate": 0.68,
  "/requisites": 0.25,
  "/privacy": 0.2,
  "/personal-data": 0.2,
  "/agreement": 0.2,
  "/sitemap-page": 0.3,
};

export const MAX_ROUTE_URLS = 25000;
export const ROUTES_PER_SITEMAP = 5000;

function dedupe<T extends { url: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

const CORE_LAST_MODIFIED = new Date(process.env.SITE_CORE_LAST_MODIFIED ?? process.env.SITE_LAST_MODIFIED ?? "2026-03-12T00:00:00.000Z");
const CITY_LAST_MODIFIED = new Date(process.env.SITE_CITY_LAST_MODIFIED ?? process.env.SITE_LAST_MODIFIED ?? "2026-03-12T00:00:00.000Z");
const ROUTES_LAST_MODIFIED = new Date(process.env.SITE_ROUTES_LAST_MODIFIED ?? process.env.SITE_LAST_MODIFIED ?? "2026-03-12T00:00:00.000Z");

export function getLastModified(kind: "core" | "city" | "routes" = "core"): Date {
  if (kind === "city") return CITY_LAST_MODIFIED;
  if (kind === "routes") return ROUTES_LAST_MODIFIED;
  return CORE_LAST_MODIFIED;
}

export function getCoreSitemapItems(): SitemapItem[] {
  const coreLastModified = getLastModified("core");
  const cityLastModified = getLastModified("city");

  const staticEntries: SitemapItem[] = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: coreLastModified,
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.5,
  }));

  const blogEntries: SitemapItem[] = [
    {
      url: absoluteUrl("/blog"),
      lastModified: coreLastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...BLOG_POSTS.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  ];

  const cityEntries: SitemapItem[] = CITY_LANDINGS.map((city) => ({
    url: absoluteUrl(`/${city.slug}`),
    lastModified: cityLastModified,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return dedupe([...staticEntries, ...blogEntries, ...cityEntries]);
}

export function getRouteSitemapItems(pageNumber: number): SitemapItem[] {
  const lastModified = getLastModified("routes");
  const routes = buildSeoRoutes(MAX_ROUTE_URLS).map((route) => ({
    url: absoluteUrl(`/${route.from}/${route.to}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.64,
  }));

  const start = (pageNumber - 1) * ROUTES_PER_SITEMAP;
  const end = start + ROUTES_PER_SITEMAP;

  return dedupe(routes.slice(start, end));
}

export function getSitemapIndexEntries() {
  const totalRouteSitemaps = Math.max(1, Math.ceil(MAX_ROUTE_URLS / ROUTES_PER_SITEMAP));

  return [
    { loc: absoluteUrl("/sitemap/core.xml"), lastmod: getLastModified() },
    ...Array.from({ length: totalRouteSitemaps }, (_, index) => ({
      loc: absoluteUrl(`/sitemap/routes-${index + 1}.xml`),
      lastmod: getLastModified(),
    })),
  ];
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderUrlSet(items: SitemapItem[]) {
  const body = items
    .map((item) => {
      const parts = [
        `<url>`,
        `<loc>${escapeXml(item.url)}</loc>`,
        item.lastModified ? `<lastmod>${item.lastModified.toISOString()}</lastmod>` : "",
        item.changeFrequency ? `<changefreq>${item.changeFrequency}</changefreq>` : "",
        typeof item.priority === "number" ? `<priority>${item.priority.toFixed(2)}</priority>` : "",
        `</url>`,
      ]
        .filter(Boolean)
        .join("");

      return parts;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndex(entries: Array<{ loc: string; lastmod?: Date }>) {
  const body = entries
    .map((entry) => {
      const parts = [
        `<sitemap>`,
        `<loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `<lastmod>${entry.lastmod.toISOString()}</lastmod>` : "",
        `</sitemap>`,
      ]
        .filter(Boolean)
        .join("");

      return parts;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

export function buildXmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
