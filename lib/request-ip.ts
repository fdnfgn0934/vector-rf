import { headers } from "next/headers";

export async function getRequestIp() {
  const h = await headers();

  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const xri = h.get("x-real-ip");
  if (xri) return xri.trim();

  return "unknown";
}
