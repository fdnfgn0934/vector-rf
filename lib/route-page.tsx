import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import SeoRouteClient from "@/app/ui/seo-route-client";
import {
  CITY_BY_SLUG,
  CITY_LANDINGS,
  isValidRouteSlugs,
  prettyCityNameFromSlug,
} from "@/lib/city-landings";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRouteMetadata,
} from "@/lib/seo";
import { buildRouteSeoData } from "@/lib/route-seo";
import { type RouteVariantKey } from "@/lib/route-variants";

const SITE_PHONE = "+78314233929";

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

function getCity(slug: string) {
  return CITY_BY_SLUG.get(slug) ?? null;
}

export function buildRoutePageMetadata(_variantKey: RouteVariantKey) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ city: string; to: string }> | { city: string; to: string };
  }): Promise<Metadata> {
    const resolved = await Promise.resolve(params as { city: string; to: string });
    const fromSlug = normalizeSlug(resolved.city);
    const toSlug = normalizeSlug(resolved.to);

    const fromCity = getCity(fromSlug);
    const toCity = getCity(toSlug);

    if (!fromCity || !toCity || !isValidRouteSlugs(fromSlug, toSlug)) {
      return {
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const seoData = buildRouteSeoData({
      fromSlug: fromCity.slug,
      fromName: fromCity.name,
      fromGenitive: fromCity.fromGenitive,
      toSlug: toCity.slug,
      toName: toCity.name,
      variantKey: "main",
    });

    return buildRouteMetadata({
      fromSlug: fromCity.slug,
      fromName: fromCity.name,
      toSlug: toCity.slug,
      toName: toCity.name,
      title: seoData.metadataTitle,
      description: seoData.metadataDescription,
      keywords: seoData.metadataKeywords,
      canonicalPath: `/${fromCity.slug}/${toCity.slug}`,
      indexable: true,
    });
  };
}

export function createRoutePage(variantKey: RouteVariantKey) {
  return async function RoutePage({
    params,
  }: {
    params: Promise<{ city: string; to: string }> | { city: string; to: string };
  }) {
    const resolved = await Promise.resolve(params as { city: string; to: string });
    const fromSlug = normalizeSlug(resolved.city);
    const toSlug = normalizeSlug(resolved.to);

    const fromCity = getCity(fromSlug);
    const toCity = getCity(toSlug);

    if (!fromCity || !toCity || !isValidRouteSlugs(fromSlug, toSlug)) {
      return notFound();
    }

    const seoData = buildRouteSeoData({
      fromSlug: fromCity.slug,
      fromName: fromCity.name,
      fromGenitive: fromCity.fromGenitive,
      toSlug: toCity.slug,
      toName: toCity.name,
      variantKey,
    });

    const reverseRoute = {
      href: `/${toCity.slug}/${fromCity.slug}`,
      label: `${toCity.name} — ${fromCity.name}`,
    };

    const moreFromCity = CITY_LANDINGS.filter(
      (item) => item.slug !== fromCity.slug && item.slug !== toCity.slug
    )
      .slice(0, 10)
      .map((item) => ({
        toSlug: item.slug,
        toName: prettyCityNameFromSlug(item.slug),
      }));

    const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
      { name: "Главная", path: "/" },
      { name: fromCity.name, path: `/${fromCity.slug}` },
      {
        name: `${fromCity.name} — ${toCity.name}`,
        path: `/${fromCity.slug}/${toCity.slug}`,
      },
    ]);

    const faqJsonLd = buildFaqJsonLd(seoData.faq);

    const moreRoutesJsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Ещё маршруты из ${fromCity.name}`,
      itemListElement: moreFromCity.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${fromCity.name} — ${item.toName}`,
        url: `https://vector-rf.ru/${fromCity.slug}/${item.toSlug}`,
      })),
    };

    const serviceJsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${fromCity.name} — ${toCity.name}`,
      serviceType: "Междугороднее такси и трансфер",
      provider: {
        "@type": "LocalBusiness",
        name: "Вектор РФ",
        telephone: SITE_PHONE,
        areaServed: "Россия",
        url: `https://vector-rf.ru/${fromCity.slug}/${toCity.slug}`,
      },
      areaServed: [fromCity.name, toCity.name],
      description: seoData.metadataDescription,
    };

    const offerJsonLd = {
      "@context": "https://schema.org",
      "@type": "Offer",
      url: `https://vector-rf.ru/${fromCity.slug}/${toCity.slug}`,
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "RUB",
        valueAddedTaxIncluded: false,
        description: "Итоговая стоимость подтверждается заранее до поездки",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: {
        "@type": "Country",
        name: "Россия",
      },
      seller: {
        "@type": "Organization",
        name: "Вектор РФ",
        url: "https://vector-rf.ru",
      },
    };

    return (
      <>
        <Script
          id={`ld-route-breadcrumbs-${fromCity.slug}-${toCity.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbsJsonLd),
          }}
        />
        <Script
          id={`ld-route-faq-${fromCity.slug}-${toCity.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
        <Script
          id={`ld-route-more-${fromCity.slug}-${toCity.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(moreRoutesJsonLd),
          }}
        />
        <Script
          id={`ld-route-service-${fromCity.slug}-${toCity.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd),
          }}
        />
        <Script
          id={`ld-route-offer-${fromCity.slug}-${toCity.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(offerJsonLd),
          }}
        />

        <SeoRouteClient
          fromSlug={fromCity.slug}
          cityBackHref={`/${fromCity.slug}`}
          cityBackLabel={`← Из ${fromCity.fromGenitive}`}
          fromName={fromCity.name}
          toSlug={toCity.slug}
          toName={toCity.name}
          heading={seoData.h1 || `${fromCity.name} — ${toCity.name}`}
          subtitle={seoData.subtitle}
          routeFacts={seoData.routeFacts}
          content={seoData.content}
          keywordText={seoData.keywordText}
          faq={seoData.faq}
          moreFromCity={moreFromCity}
          reverseRoute={reverseRoute}
        />
      </>
    );
  };
}