import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  PageShell,
} from "@/app/ui/shared";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/city-transfer`;

export const metadata: Metadata = {
  title: "Городские поездки и трансферы — заказать онлайн",
  description:
    "Городские поездки и трансферы с подачей ко времени: поездки по городу, встречи, деловые маршруты, комфорт, бизнес и минивэн.",
  alternates: {
    canonical: "/city-transfer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Городские поездки и трансферы — заказать онлайн",
    description:
      "Подача ко времени, поездки по городу, встречи, деловые маршруты, комфорт, бизнес и минивэн.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Городские поездки и трансферы — заказать онлайн",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Городские поездки и трансферы — заказать онлайн",
    description:
      "Подача ко времени, поездки по городу, встречи, деловые маршруты, комфорт, бизнес и минивэн.",
    images: ["/og.jpg"],
  },
};

const faq = [
  {
    question: "Для каких задач подходит городской трансфер?",
    answer:
      "Он подходит для поездок по городу, деловых встреч, маршрутов по нескольким адресам, трансферов на вокзал и в аэропорт, а также для личных поездок с заранее понятной подачей.",
  },
  {
    question: "Можно ли заказать поездку на конкретное время?",
    answer:
      "Да, заявку можно оформить заранее на нужную дату и время, чтобы автомобиль был подан ко времени.",
  },
  {
    question: "Есть ли выбор класса автомобиля?",
    answer:
      "Да, доступны стандарт, комфорт, бизнес и минивэн, в зависимости от формата поездки и количества пассажиров.",
  },
  {
    question: "Когда удобен именно городской трансфер, а не обычный вызов машины?",
    answer:
      "Когда важны предсказуемые условия поездки, подача ко времени, поездка по нескольким точкам, повышенный комфорт или заранее согласованный формат обслуживания.",
  },
];

export default function CityTransferPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Городские поездки",
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
    name: "Городские поездки и трансферы — заказать онлайн",
    serviceType: "Городской трансфер",
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
      "Городские поездки и трансферы с подачей ко времени и подбором класса автомобиля.",
  };

  return (
    <PageShell>
      <Script
        id="ld-city-transfer-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-city-transfer-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="ld-city-transfer-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="rounded-3xl border border-blue-100/60 bg-white/82 backdrop-blur-md p-6 shadow-sm md:p-8">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Городские поездки</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Городские поездки и трансферы
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
            Городской трансфер подходит для поездок, где важны подача ко времени,
            понятный маршрут и заранее согласованный формат поездки. Это удобно
            для деловых встреч, поездок по нескольким адресам, выездов на вокзал
            или в аэропорт, а также для личных маршрутов, когда не хочется
            зависеть от случайной подачи.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
            Такой формат часто выбирают для рабочих задач, встреч гостей,
            сопровождения важных поездок и случаев, когда нужен более
            предсказуемый сервис. Можно заранее выбрать класс автомобиля и
            указать детали поездки, чтобы маршрут был понятен ещё до подачи.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="btn-primary inline-flex items-center rounded-xl px-5 py-3 text-sm"
            >
              Оставить заявку
            </Link>
            <Link
              href="/services"
              className="btn-ghost inline-flex items-center rounded-xl px-5 py-3 text-sm"
            >
              Все услуги
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Подача ко времени",
            "Поездки по нескольким адресам",
            "Комфорт, бизнес и минивэн",
            "Подходит для личных и деловых задач",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
            >
              <div className="text-sm font-semibold text-slate-800">{item}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-blue-100/60 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">
            Когда городской трансфер удобнее стандартной поездки
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              В первую очередь тогда, когда важно заранее понимать время подачи,
              маршрут и формат автомобиля. Это особенно заметно при рабочих
              встречах, поездках по нескольким адресам, выезде на мероприятия и
              в ситуациях, когда нужно строго соблюдать тайминг.
            </p>
            <p>
              Городские поездки также часто оформляют для сопровождения гостей,
              семейных поездок, выездов на вокзал и в аэропорт. В этих случаях
              удобнее заранее согласовать поездку, чем искать транспорт в
              последний момент.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-100/60 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-blue-100/60 bg-blue-50/50 p-4"
              >
                <div className="text-sm font-bold text-slate-800">
                  {item.question}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-500">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      <section className="mx-auto max-w-6xl px-4 pb-12" id="order">
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 mb-2">Оставить заявку</h2>
          <p className="text-sm text-slate-500 mb-5">Укажите маршрут — мы рассчитаем стоимость и свяжемся с вами</p>
          <a
            href="/#order"
            className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold"
          >
            Рассчитать стоимость
          </a>
        </div>
      </section>
      </main>
    </PageShell>
  );
}
