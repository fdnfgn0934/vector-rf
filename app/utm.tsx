"use client";

import { useEffect } from "react";

function setCookie(name: string, value: string, days = 30) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export default function UTMCollector() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      const utm_source = (url.searchParams.get("utm_source") || "").trim();
      const utm_medium = (url.searchParams.get("utm_medium") || "").trim();
      const utm_campaign = (url.searchParams.get("utm_campaign") || "").trim();
      const utm_term = (url.searchParams.get("utm_term") || "").trim();
      const utm_content = (url.searchParams.get("utm_content") || "").trim();

      // сохраняем landing/ref всегда
      setCookie("vrf_landing", url.pathname + url.search, 30);
      if (document.referrer) setCookie("vrf_ref", document.referrer, 30);

      // сохраняем utm если есть
      if (utm_source) setCookie("vrf_utm_source", utm_source, 30);
      if (utm_medium) setCookie("vrf_utm_medium", utm_medium, 30);
      if (utm_campaign) setCookie("vrf_utm_campaign", utm_campaign, 30);
      if (utm_term) setCookie("vrf_utm_term", utm_term, 30);
      if (utm_content) setCookie("vrf_utm_content", utm_content, 30);
    } catch {
      // ignore
    }
  }, []);

  return null;
}
