import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/corporate-taxi`;

export const metadata: Metadata = {
  title: "Корпоративное такси",
  description:
    "Корпоративное такси для бизнеса: поездки сотрудников, встречи клиентов и партнёров, аэропортные и междугородние маршруты. Подтверждение условий заранее.",
  alternates: {
    canonical: "/corporate-taxi",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Корпоративное такси",
    description:
      "Поездки сотрудников, встречи клиентов, командировки, аэропортные и междугородние маршруты для бизнеса.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Корпоративное такси",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Корпоративное такси",
    description:
      "Поездки сотрудников, встречи клиентов, командировки, аэропортные и междугородние маршруты для бизнеса.",
    images: ["/og.jpg"],
  },
};

const faq = [
  {
    question: "Для каких задач подходит корпоративное такси?",
    answer:
      "Для поездок сотрудников, встреч клиентов и партнёров, командировок, трансферов в аэропорт, междугородних поездок и других деловых маршрутов.",
  },
  {
    question: "Можно ли согласовать регулярные поездки?",
    answer:
      "Да, можно согласовать формат регулярных поездок, типы маршрутов, классы автомобилей и общие условия обслуживания.",
  },
  {
    question: "Какие классы автомобилей подходят для бизнеса?",
    answer:
      "Для корпоративных задач доступны стандарт, комфорт, бизнес и минивэн — в зависимости от уровня поездки и количества пассажиров.",
  },
  {
    question: "Подходит ли услуга для встреч в аэропорту?",
    answer:
      "Да, корпоративный формат часто используют для встречи сотрудников, партнёров и гостей компании в аэропорту.",
  },
];

export default function CorporateTaxiPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Корпоративное такси",
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Корпоративное такси",
    serviceType: "Корпоративный трансфер и поездки для бизнеса",
    provider: {
      "@type": "Organization",
      name: "Вектор РФ",
      url: SITE_URL,
      telephone: "+78002225650",
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    url: PAGE_URL,
    description:
      "Корпоративные поездки, трансферы и маршруты для бизнеса по России.",
  };

  return (
    <>
      <Script
        id="ld-corporate-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-corporate-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="ld-corporate-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Корпоративное такси</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Корпоративное такси
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Корпоративное такси — это удобный формат для бизнеса, когда нужны
            поездки сотрудников, встречи клиентов, трансферы в аэропорт,
            командировки и междугородние маршруты с заранее понятными условиями.
            Такой подход удобен компаниям, которым важно заранее согласовать
            формат поездки, класс автомобиля и базовые условия обслуживания.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Услуга подходит как для разовых поездок, так и для регулярных
            деловых маршрутов. Это может быть поездка сотрудника на встречу,
            трансфер руководителя, сопровождение партнёров, выезд на мероприятие
            или междугородний маршрут для рабочей задачи. Важно то, что поездка
            становится более предсказуемой и удобной в организационном плане.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contacts"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Связаться
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Все услуги
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Поездки сотрудников",
            "Встречи клиентов и партнёров",
            "Аэропортные и междугородние маршруты",
            "Комфорт, бизнес и минивэн",
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
          <h2 className="text-xl font-extrabold text-zinc-900">
            Где корпоративный формат особенно полезен
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
            <p>
              В первую очередь там, где поездка является частью рабочего
              процесса: встречи, командировки, деловые мероприятия, поездки
              между офисами, выезды в аэропорт и междугородние маршруты.
            </p>
            <p>
              Для компаний это удобно тем, что можно заранее согласовать детали,
              выбрать нужный класс автомобиля и использовать единый понятный
              формат организации поездок. Такой подход лучше подходит для
              делового контекста, чем случайный вызов транспорта в последний
              момент.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item) => (
              <div
                key={item.question}
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
    </>
  );
}