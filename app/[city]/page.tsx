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
  return CITY_LANDINGS.slice(0, 80).map((city) => ({
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

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>{city.name}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Такси и трансферы из {city.name}
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Страница {city.name} — это городской хаб для маршрутов и поездок из{" "}
            {city.fromGenitive}. Здесь собраны популярные направления, удобные для
            междугородних поездок, аэропортных трансферов, деловых поездок и
            маршрутов на дальние расстояния. Такой формат помогает быстро перейти
            к нужному направлению и сразу выбрать готовую маршрутную страницу.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Поездки из {city.fromGenitive} можно оформить заранее, выбрав класс
            автомобиля и указав детали маршрута. Это удобно для тех, кому важно
            заранее согласовать условия поездки, стоимость и формат подачи.
            Особенно полезна такая структура для популярных направлений, где
            есть постоянный спрос на трансферы между городами.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Оставить заявку
            </Link>
            <Link
              href="/intercity-taxi"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Междугороднее такси
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">
            Популярные маршруты из {city.name}
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {popular.map((item) => (
              <Link
                key={item.toSlug}
                href={`/${city.slug}/${item.toSlug}`}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                {city.name} — {item.toName}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">
            Поездки из {city.fromGenitive}
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
            <p>
              Поездки из {city.fromGenitive} часто выбирают для деловых встреч,
              поездок к родственникам, трансферов в аэропорт, командировок и
              маршрутов без пересадок. Когда важна удобная логистика и понятные
              условия, маршрутные страницы по конкретным направлениям работают
              лучше всего.
            </p>

            <p>
              Такой городской хаб помогает поисковикам и пользователям лучше
              понимать структуру направлений: сначала выбирается город
              отправления, затем — нужный маршрут. Это усиливает и навигацию по
              сайту, и внутреннюю перелинковку между городами и маршрутами.
            </p>

            <p>{content}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            `Популярные маршруты из ${city.name}`,
            "Междугородние поездки без пересадок",
            "Аэропортные и деловые трансферы",
            "Предварительное согласование условий",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-semibold text-zinc-800">{item}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">Полезные разделы</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Все услуги
            </Link>
            <Link
              href="/airport-transfer"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Трансфер в аэропорт
            </Link>
            <Link
              href="/prices"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Цены
            </Link>
            <Link
              href="/contacts"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Контакты
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item, index) => (
              <div
                key={`${item.question}-${index}`}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="text-sm font-semibold text-zinc-900">
                  {item.question}
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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