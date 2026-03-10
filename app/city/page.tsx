import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { CITY_LANDINGS, prettyCityNameFromSlug } from "@/lib/city-landings";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";

const ROUTES = CITY_LANDINGS.flatMap((city) =>
  city.popularTo.map((to) => ({ from: city.slug, to }))
);

export const metadata: Metadata = {
  title: "Каталог маршрутов по России — города и направления",
  description:
    "Каталог популярных направлений и городов: междугородние поездки по России. Выберите маршрут и оставьте заявку онлайн — 24/7. Стоимость согласуем заранее.",
  alternates: { canonical: `${SITE_URL}/city` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/city`,
    title: "Каталог маршрутов по России — города и направления",
    description:
      "Каталог популярных направлений: выбирайте маршрут и оставляйте заявку. Комфорт, бизнес, минивэн. 24/7.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог направлений",
    description: "Популярные маршруты и города по России. Заявка онлайн 24/7.",
    images: ["/og.jpg"],
  },
};

function take<T>(arr: T[], n: number) {
  return arr.length > n ? arr.slice(0, n) : arr;
}

function buildSections() {
  return CITY_LANDINGS.map((city) => ({
    from: city.slug,
    routes: city.popularTo.map((to) => ({ from: city.slug, to })),
  }));
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
    >
      {children}
    </Link>
  );
}

export default function Page() {
  const routesForCatalog = ROUTES.slice(0, 1500);
  const sections = buildSections();
  const quick = take(routesForCatalog, 36);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Каталог маршрутов", item: `${SITE_URL}/city` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог маршрутов — Вектор РФ",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: routesForCatalog.length,
    itemListElement: routesForCatalog.slice(0, 200).map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/${r.from}/${r.to}`,
      name: `${prettyCityNameFromSlug(r.from)} — ${prettyCityNameFromSlug(r.to)}`,
    })),
  };

  return (
    <main className="min-h-screen text-zinc-900">
      <Script id="ld-city-breadcrumbs" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-city-itemlist" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-600">Каталог маршрутов</div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Города и направления по России</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                Выберите направление и оставьте заявку. Мы согласуем стоимость до подачи автомобиля.
                Классы: Стандарт / Комфорт / Бизнес / Минивэн. Работаем 24/7.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/intercity-taxi" className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95">Межгород (услуга)</Link>
              <Link href="/#order" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50">Оставить заявку</Link>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 md:p-5">
            <div className="text-sm font-semibold text-zinc-800">Популярные направления</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {quick.map((r) => (
                <PillLink key={`${r.from}-${r.to}`} href={`/${r.from}/${r.to}`}>
                  {prettyCityNameFromSlug(r.from)} — {prettyCityNameFromSlug(r.to)}
                </PillLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <section key={section.from} className="rounded-3xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Из города</div>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900">{prettyCityNameFromSlug(section.from)}</h2>
                </div>
                <Link href={`/${section.from}`} className="text-sm font-semibold text-sky-700 hover:text-sky-800">Страница города</Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {section.routes.map((route) => (
                  <PillLink key={`${route.from}-${route.to}`} href={`/${route.from}/${route.to}`}>
                    {prettyCityNameFromSlug(route.to)}
                  </PillLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
