import { buildRoutePageMetadata, createRoutePage } from "@/lib/route-page";
import { getPriorityRoutePairs } from "@/lib/priority-routes";

export const revalidate = 86400;
export const dynamicParams = true;
export const generateMetadata = buildRoutePageMetadata("main");

export function generateStaticParams() {
  return getPriorityRoutePairs(180).map((route) => ({
    city: route.from,
    to: route.to,
  }));
}

export default createRoutePage("main");
