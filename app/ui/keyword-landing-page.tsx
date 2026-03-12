import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Script from "next/script";
import ServicePage from "@/app/ui/service-page";
import { CORE_SERVICE_LINKS, KEYWORD_PAGE_LINKS } from "@/lib/internal-links";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { KeywordLandingConfig } from "@/lib/keyword-landings";

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
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {config.shortLabel} — как это работает
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {config.shortLabel} по России: прямые поездки между городами без пересадок.
            Оформите заявку через форму на сайте, по телефону или в Telegram — оператор перезвонит,
            уточнит маршрут и подтвердит стоимость. В день поездки водитель подаётся к указанному адресу.
            Для каждого маршрута доступны классы авто: стандарт, комфорт, бизнес и минивэн.
            Рассчитываемся наличными или по безналу.
          </p>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Оставьте заявку", text: "На сайте, по телефону или в Telegram. Займёт 2 минуты." },
              { step: "2", title: "Подтвердим стоимость", text: "Оператор уточнит детали и назовёт итоговую цену до выезда." },
              { step: "3", title: "Водитель подаётся", text: "В нужное время по указанному адресу. Без опозданий." },
              { step: "4", title: "Доедете с комфортом", text: "Прямой маршрут без пересадок до нужного адреса." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-blue-100/60 bg-white/85 p-5 shadow-sm">
                <div className="text-2xl font-black text-blue-600">{item.step}</div>
                <div className="mt-2 text-sm font-extrabold text-slate-900">{item.title}</div>
                <p className="mt-1 text-sm leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Полезные направления</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Эти ссылки помогают дополнить  вокруг запроса <b>{config.shortLabel.toLowerCase()}</b> и помогут найти нужную информацию о поездках.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {config.supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl border border-blue-100/60 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm",
                    "hover:border-sky-200 hover:bg-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Полезные разделы сайта</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {CORE_SERVICE_LINKS.slice(0, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-blue-50/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 mb-4">Что ещё часто заказывают</h2>
          <div className="flex flex-wrap gap-2">
            {KEYWORD_PAGE_LINKS.map((item) => (
              <a key={item.href} href={item.href}
                className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-blue-50/50">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Популярные маршруты</h2>
          <p className="mt-2 text-sm text-slate-600">
            Популярные маршруты по данному направлению — выберите нужный и узнайте стоимость.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {config.routeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl border border-blue-100/60 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm",
                  "hover:border-sky-200/80 hover:bg-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100/60 bg-white/85 p-5 text-sm leading-6 text-slate-700 shadow-sm">
            Также смотрите основную страницу услуги:{" "}
            <Link href={config.relatedServiceHref} className="font-semibold text-sky-700 hover:text-sky-800 hover:underline">
              {config.relatedServiceLabel}
            </Link>
            .
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
    name: `Маршруты: ${config.shortLabel}`,
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
    name: `Полезные направления: ${config.shortLabel}`,
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
