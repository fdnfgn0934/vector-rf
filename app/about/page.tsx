import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Вектор РФ — сервис поездок и трансферов по России: междугородние маршруты, аэропортные поездки, городские и корпоративные заказы.",
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "О компании Вектор РФ",
    description:
      "Сервис поездок и трансферов по России: междугородние маршруты, аэропортные поездки, городские и корпоративные заказы.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "О компании Вектор РФ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании Вектор РФ",
    description:
      "Сервис поездок и трансферов по России: междугородние маршруты, аэропортные поездки, городские и корпоративные заказы.",
    images: ["/og.jpg"],
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "О компании", item: PAGE_URL },
    ],
  };

  return (
    <>
      <Script
        id="ld-about-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>О компании</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            О компании
          </h1>

          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700">
            <p>
              Вектор РФ — сервис поездок и трансферов по России. Основные
              направления работы — междугородние маршруты, трансфер в аэропорт,
              городские поездки и корпоративные заказы.
            </p>
            <p>
              Мы делаем акцент на понятной логистике: заранее согласовываем
              маршрут, формат поездки и класс автомобиля. На сайте собраны как
              основные коммерческие страницы, так и посадочные по городам и
              маршрутам.
            </p>
            <p>
              Сервис подходит для частных поездок, деловых маршрутов, поездок с
              багажом, семейных выездов и трансферов под конкретное время.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Все услуги
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Контакты
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}