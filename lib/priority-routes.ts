const PRIORITY_HUB_SLUGS = [
  "moskva",
  "sankt-peterburg",
  "nizhniy-novgorod",
  "kazan",
  "yekaterinburg",
  "krasnodar",
  "rostov-na-donu",
  "sochi",
  "simferopol",
  "samara",
  "ufa",
  "voronezh",
  "volgograd",
  "chelyabinsk",
] as const;

export type PriorityHubSlug = (typeof PRIORITY_HUB_SLUGS)[number];

const PRIORITY_HUB_SET = new Set<string>(PRIORITY_HUB_SLUGS);

export function getPriorityRoutePairs(limit = 180) {
  const pairs: Array<{ from: string; to: string }> = [];

  for (const from of PRIORITY_HUB_SLUGS) {
    for (const to of PRIORITY_HUB_SLUGS) {
      if (from === to) continue;
      pairs.push({ from, to });
      if (pairs.length >= limit) return pairs;
    }
  }

  return pairs;
}

export function isPriorityRoute(fromSlug: string, toSlug: string) {
  return PRIORITY_HUB_SET.has(fromSlug) && PRIORITY_HUB_SET.has(toSlug) && fromSlug !== toSlug;
}

export function getPriorityDestinationsForCity(fromSlug: string, currentToSlug?: string, limit = 10) {
  if (!PRIORITY_HUB_SET.has(fromSlug)) return [];

  return PRIORITY_HUB_SLUGS.filter((slug) => slug !== fromSlug && slug !== currentToSlug)
    .slice(0, limit)
    .map((to) => ({ from: fromSlug, to }));
}
