import { notFound, permanentRedirect } from "next/navigation";

import { isValidCitySlug } from "@/lib/city-landings";

function normalizeSlug(input: string) {
  const raw = (input ?? "").trim();
  let s = raw;
  try {
    s = decodeURIComponent(raw);
  } catch {}
  return s.trim().toLowerCase().replace(/[—–-−]/g, "-").replace(/-+/g, "-");
}

// Старый URL /route/{from} -> /{from}; технический мусор не редиректим.
export default async function Page({ params }: { params: Promise<{ from: string }> | { from: string } }) {
  const resolved = await Promise.resolve(params as any);
  const from = normalizeSlug(resolved.from);

  if (!isValidCitySlug(from)) {
    notFound();
  }

  permanentRedirect(`/${encodeURIComponent(from)}`);
}
