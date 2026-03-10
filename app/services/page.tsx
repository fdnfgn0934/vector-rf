import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Услуги Вектор РФ: междугороднее такси, трансфер в аэропорт, городские поездки, корпоративное такси и минивэн. Подбор формата поездки под задачу.",
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Услуги Вектор РФ",
    description:
      "Междугороднее такси, трансфер в аэропорт, городские поездки, корпоративное такси и минивэн.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Услуги Вектор РФ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Услуги Вектор РФ",
    description:
      "Междугороднее такси, трансфер в аэропорт, городские поездки, корпоративное такси и минивэн.",
    images: ["/og.jpg"],
  },
};

const services = [
  {
    title: "Междугороднее такси",
    text:
      "Прямые поездки между городами без пересадок. Подходит для частных, семейных и деловых маршрутов, когда важны время и понятные условия поездки.",
    href: "/intercity-taxi",
  },
  {
    title: "Трансфер в аэропорт",
    text:
      "Поездки в аэропорт и из аэропорта с подачей ко времени. Удобно для рейсов, встреч пассажиров, поездок с багажом и стыковок с дальнейшим маршрутом.",
    href: "/airport-transfer",
  },
  {
    title: "Городские поездки",
    text:
      "Формат для поездок по городу, деловых встреч, маршрутов по нескольким адресам и ситуаций, где нужна заранее согласованная подача.",
    href: "/city-transfer",
  },
  {
    title: "Минивэн",
    text:
      "Подходит для семейных поездок, маршрутов с багажом, небольших групп пассажиров и поездок, где нужен более вместительный автомобиль.",
    href: "/minivan-transfer",
  },
  {
    title: "Корпоративное такси",
    text:
      "Поездки сотрудников, встречи клиентов и партнёров, аэропортные и междугородние маршруты для бизнеса с заранее согласованными условиями.",
    href: "/corporate-taxi",
  },
  {
    title: "Цены и расчёт",
    text:
      "Информация о стоимости, расчёте маршрутов, классах автомобилей и порядке подтверждения итоговой цены до поездки.",
    href: "/prices",
  },
];

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Услуги", item: PAGE_URL },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Услуги Вектор РФ",
    itemListElement: services.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <Script
        id="ld-services-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-services-list"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Услуги</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Услуги
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            На сайте собраны основные направления сервиса: междугородние поездки,
            аэропортные трансферы, городские маршруты, корпоративные поездки и
            варианты с минивэном. Для каждой задачи можно подобрать подходящий
            формат поездки и класс автомобиля, а условия маршрута согласовать
            заранее.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Такой подход удобен для частных клиентов, семейных поездок, поездок
            с багажом, деловых задач и трансферов под конкретное время. Страницы
            услуг помогают быстро выбрать подходящий формат и перейти к расчёту
            или заявке.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.href}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-extrabold text-zinc-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-700">{item.text}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Перейти
              </Link>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}