"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function prettifySegment(seg: string) {
  const map: Record<string, string> = {
    // основные страницы
    about: "О компании",
    services: "Наш сервис",
    reviews: "Отзывы",
    faq: "Вопросы и ответы",
    contacts: "Контакты",
    corporate: "Корпоративным",
    prices: "Цены",
    requisites: "Реквизиты компании",

    // услуги (если есть такие роуты)
    "intercity-taxi": "Междугородние поездки",
    "airport-transfer": "Трансфер в аэропорт",
    "city-transfer": "Поездки по городу",
    "minivan-transfer": "Минивэн / групповые поездки",
  };

  if (map[seg]) return map[seg];

  // fallback: из "my-page" -> "My page"
  const t = decodeURIComponent(seg).replace(/[-_]+/g, " ").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : seg;
}

export default function BreadcrumbsJsonLd({
  siteUrl,
}: {
  siteUrl: string;
}) {
  const pathname = usePathname() || "/";

  const jsonLd = useMemo(() => {
    const clean = pathname.split("?")[0].split("#")[0];
    const parts = clean.split("/").filter(Boolean);

    const itemListElement: Array<any> = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${siteUrl}/`,
      },
    ];

    let accPath = "";
    parts.forEach((p, idx) => {
      accPath += `/${p}`;
      itemListElement.push({
        "@type": "ListItem",
        position: idx + 2,
        name: prettifySegment(p),
        item: `${siteUrl}${accPath}`,
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    };
  }, [pathname, siteUrl]);

  return (
    <Script
      id="ld-breadcrumbs"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}