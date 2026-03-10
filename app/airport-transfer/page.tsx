import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/airport-transfer`;

export const metadata: Metadata = {
  title: "Трансфер в аэропорт и из аэропорта",
  description:
    "Трансфер в аэропорт и из аэропорта: подача ко времени, поездки с багажом, комфорт, бизнес и минивэн. Подходит для городских и междугородних маршрутов.",
  alternates: {
    canonical: "/airport-transfer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Трансфер в аэропорт и из аэропорта",
    description:
      "Подача ко времени, поездки с багажом, комфорт, бизнес и минивэн, прямой маршрут без лишней логистики.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Трансфер в аэропорт и из аэропорта",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Трансфер в аэропорт и из аэропорта",
    description:
      "Подача ко времени, поездки с багажом, комфорт, бизнес и минивэн, прямой маршрут без лишней логистики.",
    images: ["/og.jpg"],
  },
};

const faq = [
  {
    question: "Можно ли заказать трансфер под конкретный рейс?",
    answer:
      "Да, поездка может быть оформлена под нужное время выезда или прилёта. Это удобно, когда важно прибыть к рейсу заранее или организовать встречу после прилёта.",
  },
  {
    question: "Подходит ли услуга для поездок с багажом?",
    answer:
      "Да, можно подобрать автомобиль под количество пассажиров и багаж. При необходимости подойдёт минивэн или более вместительный формат.",
  },
  {
    question: "Возможны ли ночные и ранние подачи?",
    answer:
      "Да, заявки принимаются круглосуточно, поэтому трансфер можно оформить и на ранний выезд, и на поздний прилёт.",
  },
  {
    question: "Можно ли ехать из аэропорта сразу в другой город?",
    answer:
      "Да, трансфер может быть как городским, так и междугородним. Это удобно для прямой поездки из аэропорта без пересадок.",
  },
  {
    question: "Когда подтверждается стоимость?",
    answer:
      "Итоговая стоимость подтверждается заранее после уточнения маршрута, времени и деталей поездки.",
  },
];

export default function AirportTransferPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Трансфер в аэропорт",
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
    name: "Трансфер в аэропорт и из аэропорта",
    serviceType: "Аэропортный трансфер",
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
      "Трансфер в аэропорт и из аэропорта с подачей ко времени и подбором класса автомобиля.",
  };

  return (
    <>
      <Script
        id="ld-airport-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-airport-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="ld-airport-service"
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
            <span>Трансфер в аэропорт</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Трансфер в аэропорт и из аэропорта
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Трансфер в аэропорт нужен там, где важны точное время подачи,
            понятный маршрут и отсутствие лишней логистики. Такой формат
            подходит для вылета, прилёта, встречи пассажиров, поездок с багажом,
            семейных маршрутов и деловых поездок. Вместо нескольких этапов
            дороги пользователь получает прямую поездку с заранее понятными
            условиями.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Аэропортный трансфер может быть как городским, так и междугородним.
            Это удобно, если после прилёта нужно сразу ехать в другой город или,
            наоборот, заранее добраться до терминала из соседнего региона.
            Подходящий класс автомобиля подбирается под задачу: стандарт,
            комфорт, бизнес или минивэн.
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

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Подача ко времени",
            "Поездки с багажом",
            "Городские и междугородние маршруты",
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
            Когда аэропортный трансфер особенно удобен
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
            <p>
              Такой формат удобен при ранних вылетах, поздних прилётах, поездках
              с чемоданами, семейных поездках и командировках. Также он подходит
              для встречи гостей, сотрудников и партнёров, когда важна
              организованная подача без ожиданий и лишних пересадок.
            </p>
            <p>
              Если маршрут включает другой город, трансфер из аэропорта может
              сразу перейти в междугороднюю поездку. Это особенно удобно, когда
              после прилёта нужно быстро продолжить дорогу без пересадок и
              повторного поиска транспорта.
            </p>
            <p>
              Для многих клиентов это более спокойный и предсказуемый формат по
              сравнению с поездкой на нескольких видах транспорта, особенно если
              важны время, багаж и комфорт.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">Полезные разделы</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/transfer-v-aeroport"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Трансфер в аэропорт
            </Link>
            <Link
              href="/transfer-iz-aeroporta"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Трансфер из аэропорта
            </Link>
            <Link
              href="/prices"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Цены
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Все услуги
            </Link>
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