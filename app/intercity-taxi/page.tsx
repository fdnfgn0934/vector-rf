import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/intercity-taxi`;

export const metadata: Metadata = {
  title: "Междугороднее такси по России",
  description:
    "Междугороднее такси по России без пересадок: поездки между городами, трансферы на дальние расстояния, комфорт, бизнес и минивэн. Стоимость подтверждается заранее.",
  alternates: {
    canonical: "/intercity-taxi",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Междугороднее такси по России",
    description:
      "Поездки между городами без пересадок, подтверждение стоимости заранее, комфорт, бизнес и минивэн.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Междугороднее такси по России",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Междугороднее такси по России",
    description:
      "Поездки между городами без пересадок, подтверждение стоимости заранее, комфорт, бизнес и минивэн.",
    images: ["/og.jpg"],
  },
};

const faq = [
  {
    question: "Что входит в услугу междугороднего такси?",
    answer:
      "Это поездка между городами без пересадок с заранее согласованным маршрутом, временем подачи и классом автомобиля. Формат подходит для частных и деловых поездок, поездок с багажом и трансферов на дальние расстояния.",
  },
  {
    question: "Когда становится известна стоимость поездки?",
    answer:
      "Предварительная стоимость рассчитывается по маршруту, а итоговая подтверждается заранее до поездки. Это позволяет понимать условия ещё до подачи автомобиля.",
  },
  {
    question: "Какие автомобили доступны на междугородние маршруты?",
    answer:
      "Можно выбрать стандарт, комфорт, бизнес или минивэн. Подбор зависит от количества пассажиров, багажа и желаемого уровня комфорта.",
  },
  {
    question: "Можно ли заказать поездку заранее на конкретную дату и время?",
    answer:
      "Да, поездку можно оформить заранее. Это удобно для командировок, аэропортных стыковок, семейных поездок и выездов по расписанию.",
  },
  {
    question: "Подходит ли формат для поездок без пересадок?",
    answer:
      "Да, именно в этом и одно из главных преимуществ: прямой маршрут между городами без пересадок, ожиданий и смены транспорта.",
  },
];

const benefits = [
  "Прямой маршрут между городами",
  "Стоимость подтверждается заранее",
  "Подача ко времени",
  "Стандарт, комфорт, бизнес, минивэн",
  "Подходит для поездок с багажом",
  "Заявки принимаются 24/7",
];

const routeExamples = [
  "Москва — Нижний Новгород",
  "Нижний Новгород — Казань",
  "Казань — Уфа",
  "Москва — Ярославль",
  "Санкт-Петербург — Москва",
  "Самара — Казань",
];

export default function IntercityTaxiPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Междугороднее такси",
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
    name: "Междугороднее такси",
    serviceType: "Междугороднее такси и трансфер",
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
      "Междугородние поездки по России без пересадок с подтверждением стоимости заранее.",
  };

  return (
    <>
      <Script
        id="ld-intercity-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-intercity-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="ld-intercity-service"
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
            <span>Междугороднее такси</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Междугороднее такси по России
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            Междугороднее такси — это удобный формат поездки, когда нужно
            доехать из одного города в другой без пересадок, ожиданий и лишней
            логистики. Такой вариант выбирают для деловых поездок, семейных
            поездок, трансферов на дальние расстояния, выездов с багажом и
            ситуаций, когда важна подача ко времени. Вместо сложной цепочки из
            вокзалов, пересадок и такси на последней миле пользователь получает
            прямой маршрут между городами с заранее понятными условиями.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-700">
            На этапе оформления можно выбрать класс автомобиля, указать детали
            поездки и получить предварительный расчёт. Итоговая стоимость
            подтверждается заранее, поэтому формат хорошо подходит тем, кто
            хочет спланировать поездку без сюрпризов. Сервис удобен как для
            частных клиентов, так и для деловых задач: командировок, встреч,
            трансферов между регионами и поездок по заранее известному
            расписанию.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Оставить заявку
            </Link>
            <Link
              href="/prices"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Перейти к ценам
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item) => (
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
            Когда междугороднее такси особенно удобно
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
            <p>
              Такой формат особенно удобен, когда нужно доехать напрямую без
              стыковок и смены транспорта. Это актуально для поездок на важные
              встречи, в аэропорт, на вокзал, в другой регион, к родственникам
              или по рабочим задачам, где важна предсказуемость маршрута.
            </p>
            <p>
              Междугородняя поездка на автомобиле часто выигрывает у вариантов с
              пересадками, если нужно сэкономить время и избежать сложной
              логистики. Особенно это заметно на направлениях, где прямого
              транспорта мало, расписание неудобно или нужно выезжать рано утром
              либо поздно вечером.
            </p>
            <p>
              Также такой формат подходит для поездок с детьми, большим багажом,
              корпоративных выездов и трансферов, когда важно не только доехать,
              но и сделать это в удобном режиме.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900">
            Популярные форматы поездок
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {routeExamples.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-semibold text-zinc-800"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
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
              href="/city-transfer"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              Городские поездки
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