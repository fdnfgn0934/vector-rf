import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ServicePage from "@/app/ui/service-page";
import { CORE_SERVICE_LINKS } from "@/lib/internal-links";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { KeywordLandingConfig } from "@/lib/keyword-landings";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export function buildKeywordLandingMetadata(config: KeywordLandingConfig): Metadata {
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: { canonical: config.href },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${config.href}`,
      title: config.metaTitle,
      description: config.metaDescription,
      siteName: SITE_NAME,
      locale: "ru_RU",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — ${config.shortLabel}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: ["/og.jpg"],
    },
  };
}

function LandingBody({ config }: { config: KeywordLandingConfig }) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-wrap gap-2">
            {config.keywords.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-zinc-900">Коммерческий трафик под ключ</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Эта страница усилена под конкретный коммерческий интент и помогает продвигаться по широким запросам без
                жёсткой привязки к одному городу или одному маршруту.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-zinc-900">Связка с основными услугами</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Страница связана с основной услугой, маршрутными страницами и соседними кластерами, чтобы усиливать
                индексируемость и внутреннюю перелинковку сайта.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-zinc-900">Форма заявки прямо на странице</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Пользователь может сразу оставить заявку на поездку, не уходя на другую страницу. Это полезно и для SEO,
                и для конверсии в лиды.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">Поддерживающие разделы</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              Эти ссылки помогают усилить кластер вокруг запроса <b>{config.shortLabel.toLowerCase()}</b> и распределяют
              вес между основными коммерческими страницами.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {config.supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl border border-zinc-200 bg-white/85 px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm",
                    "hover:border-sky-200 hover:bg-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">Полезные разделы сайта</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {CORE_SERVICE_LINKS.slice(0, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">Популярные направления</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Подборка маршрутных страниц, которые поддерживают кластер по запросу «{config.shortLabel.toLowerCase()}».
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {config.routeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm",
                  "hover:border-sky-200/80 hover:bg-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/85 p-5 text-sm leading-6 text-zinc-700 shadow-sm">
            Для усиления коммерческого кластера эта страница также связана с основной услугой:
            {" "}
            <Link href={config.relatedServiceHref} className="font-semibold text-sky-700 hover:text-sky-800 hover:underline">
              {config.relatedServiceLabel}
            </Link>
            . Такая связка помогает одновременно продвигать широкие ключи, сервисные страницы и конкретные маршруты.
          </div>
        </div>
      </section>
    </>
  );
}

export default function KeywordLandingPage({ config }: { config: KeywordLandingConfig }) {
  const canonical = `${SITE_URL}${config.href}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: config.shortLabel,
    serviceType: config.serviceType,
    url: canonical,
    areaServed: { "@type": "Country", name: "Россия" },
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: "+78002225650",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: config.shortLabel, item: canonical },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const routesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Популярные маршруты: ${config.shortLabel}`,
    itemListElement: config.routeLinks.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `${SITE_URL}${item.href}`,
    })),
  };

  const supportJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Поддерживающие разделы: ${config.shortLabel}`,
    itemListElement: config.supportLinks.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <Script id={`${config.slug}-service-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id={`${config.slug}-breadcrumbs-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id={`${config.slug}-faq-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id={`${config.slug}-routes-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(routesJsonLd) }} />
      <Script id={`${config.slug}-support-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supportJsonLd) }} />

      <ServicePage
        breadcrumbs={[
          { name: "Главная", href: "/" },
          { name: config.shortLabel, href: config.href },
        ]}
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        bullets={config.bullets}
        faq={config.faq}
      />

      <LandingBody config={config} />
    </>
  );
}
