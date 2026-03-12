import {
  buildXmlResponse,
  getCoreSitemapItems,
  renderUrlSet,
} from "@/lib/sitemap-data";

export const revalidate = 86400;

export async function GET() {
  return buildXmlResponse(renderUrlSet(getCoreSitemapItems()));
}
