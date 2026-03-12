import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import SeoCityClient from "@/app/ui/seo-city-client";
import {
  CITY_BY_SLUG,
  CITY_LANDINGS,
  prettyCityNameFromSlug,
} from "@/lib/city-landings";
import {
  buildBreadcrumbJsonLd,
  buildCityMetadata,
  buildFaqJsonLd,
} from "@/lib/seo";
import { CITY_CONTENT } from "@/lib/city-content";
import { CITY_FAQ } from "@/lib/city-faq";

function normalizeSlug(input: string) {
  const raw = (input ?? "").trim();
  let s = raw;

  try {
    s = decodeURIComponent(raw);
  } catch {}

  return s
    .trim()
    .toLowerCase()
    .replace(/[—–-−]/g, "-")
    .replace(/-+/g, "-");
}

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return CITY_LANDINGS.slice(0, 200).map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }> | { city: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params as any);
  const slug = normalizeSlug(resolved.city);
  const city = CITY_BY_SLUG.get(slug);

  if (!city) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildCityMetadata({
    slug: city.slug,
    cityName: city.name,
    fromGenitive: city.fromGenitive,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }> | { city: string };
}) {
  const resolved = await Promise.resolve(params as any);
  const slug = normalizeSlug(resolved.city);
  const city = CITY_BY_SLUG.get(slug);

  if (!city) {
    return notFound();
  }

  const content =
    CITY_CONTENT[city.slug] ??
    `Страница маршрутов из ${city.fromGenitive}. Здесь собраны междугородние поездки, трансферы и популярные направления с возможностью заранее согласовать маршрут, класс автомобиля и условия поездки. Такой формат удобен для частных поездок, командировок, семейных маршрутов и трансферов на дальние расстояния.`;

  const faq =
    CITY_FAQ[city.slug] ?? [
      {
        question: `Сколько стоит поездка из ${city.fromGenitive}?`,
        answer:
          "Стоимость зависит от направления, расстояния, класса автомобиля и условий поездки. Итоговая цена подтверждается заранее до выезда.",
      },
      {
        question: `Можно ли заранее заказать такси из ${city.fromGenitive}?`,
        answer:
          "Да, поездку можно оформить заранее на нужную дату и время. Это особенно удобно для дальних маршрутов, аэропортных трансферов и деловых поездок.",
      },
      {
        question: `Какие направления из ${city.fromGenitive} доступны?`,
        answer:
          "На странице собраны популярные маршруты по разным направлениям. Также можно оформить индивидуальную поездку по нужному маршруту.",
      },
      {
        question: "Работаете ли вы круглосуточно?",
        answer: "Да, заявки принимаются 24/7.",
      },
    ];

  const popular = city.popularTo.slice(0, 18).map((toSlug) => ({
    toSlug,
    toName: prettyCityNameFromSlug(toSlug),
  }));

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: city.name, path: `/${city.slug}` },
  ]);

  const faqJsonLd = buildFaqJsonLd(faq);

  const popularRoutesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Популярные маршруты из ${city.name}`,
    itemListElement: popular.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.name} — ${item.toName}`,
      url: `https://vector-rf.ru/${city.slug}/${item.toSlug}`,
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Междугородние поездки из ${city.name}`,
    serviceType: "Междугороднее такси и трансфер",
    provider: {
      "@type": "LocalBusiness",
      name: "Вектор РФ",
      telephone: "+78002225650",
      areaServed: "Россия",
      url: `https://vector-rf.ru/${city.slug}`,
    },
    areaServed: city.name,
    description:
      `Маршруты и поездки из ${city.fromGenitive}: междугородние направления, трансферы и предварительное согласование условий поездки.`,
  };

  return (
    <>
      <Script
        id={`ld-city-breadcrumbs-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd),
        }}
      />
      <Script
        id={`ld-city-faq-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Script
        id={`ld-city-routes-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(popularRoutesJsonLd),
        }}
      />
      <Script
        id={`ld-city-service-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />

      <SeoCityClient
        citySlug={city.slug}
        cityName={city.name}
        fromGenitive={city.fromGenitive}
        content={content}
        faq={faq}
        popular={popular}
      />
    </>
  );
}
