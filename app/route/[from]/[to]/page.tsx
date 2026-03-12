import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const revalidate = 86400;
export const dynamicParams = true;

export default async function Page({
  params,
}: {
  params: Promise<{ from: string; to: string }> | { from: string; to: string };
}) {
  const resolved = await Promise.resolve(params as any);
  permanentRedirect(`/${resolved.from}/${resolved.to}`);
}
