import type { Metadata } from "next";
import Script from "next/script";
import ServicePage from "../ui/service-page";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const CANONICAL = `${SITE_URL}/minivan-transfer`;
const PHONE_E164 = "+78002225650";

export const metadata: Metadata = {
  title: "Минивэн и групповой трансфер — до 7 мест 24/7",
  description:
    "Минивэн и групповой трансфер: для семьи/компании и большого багажа. В аэропорт, по городу и на межгород. Согласуем стоимость заранее. Онлайн-заявка 24/7.",
  alternates: { canonical: "/minivan-transfer" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Минивэн / групповой трансфер",
    description:
      "Групповые поездки и трансферы на минивэне: больше мест и багажа. Согласуем стоимость до подачи. 24/7.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Минивэн / групповой трансфер",
    description: "Групповые поездки и трансферы на минивэне: больше мест и багажа. 24/7.",
    images: ["/og.jpg"],
  },
};

export default function Page() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${CANONICAL}#service`,
    name: "Минивэн и групповой трансфер",
    description:
      "Трансфер на минивэне для 4–7 пассажиров и большого багажа: по городу, в аэропорт и на межгород. Стоимость согласуем до подачи автомобиля. 24/7.",
    url: CANONICAL,
    areaServed: { "@type": "Country", name: "Россия" },
    serviceType: [
      "Минивэн",
      "Групповой трансфер",
      "Трансфер с багажом",
      "Трансфер в аэропорт",
      "Междугородний трансфер",
    ],
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_E164,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Минивэн / групповой трансфер", item: CANONICAL },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько мест в минивэне?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Обычно 4–7 мест. Напишите количество пассажиров и багаж — подберём оптимальный вариант.",
        },
      },
      {
        "@type": "Question",
        name: "Подходит для аэропорта с багажом?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, это один из самых частых кейсов: чемоданы, коляски, спортивный инвентарь.",
        },
      },
      {
        "@type": "Question",
        name: "Можно заказать заранее на конкретное время?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. Укажите дату/время — заявка фиксируется, подтверждаем подачу.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-minivan-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="ld-minivan-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-minivan-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ServicePage
        breadcrumbs={[
          { name: "Главная", href: "/" },
          { name: "Минивэн / групповой трансфер", href: "/minivan-transfer" },
        ]}
        title="Минивэн / групповой трансфер"
        subtitle="Когда нужно больше мест и багаж: поездки по городу, в аэропорт и на межгород. Подбор авто под количество пассажиров. 24/7."
        bullets={[
          "Для 4–7 пассажиров (семья/компания)",
          "Удобно с большим багажом",
          "Подходит для аэропорта и межгорода",
          "Согласуем стоимость до подачи автомобиля",
          "Можно указать детское кресло и остановки",
        ]}
        faq={[
          {
            q: "Сколько мест в минивэне?",
            a: "Обычно 4–7 мест. Напишите количество пассажиров и багаж — подберём оптимальный вариант.",
          },
          {
            q: "Подходит для аэропорта с багажом?",
            a: "Да, это один из самых частых кейсов: чемоданы, коляски, спортивный инвентарь.",
          },
          {
            q: "Можно заказать заранее на конкретное время?",
            a: "Да. Укажите дату/время — заявка фиксируется, подтверждаем подачу.",
          },
        ]}
      />

      {/* Дополнительный контент для SEO */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Минивэн для трансфера и межгорода
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>
              Минивэн вмещает от 4 до 7 пассажиров и подходит там, где обычный седан уже не справляется: семья с детьми и колясками, команда с оборудованием, группа коллег на деловую поездку. Весь багаж — в одном автомобиле, без пересадок.
            </p>
            <p>
              Особенно востребован трансфер на минивэне в аэропорт: несколько чемоданов, ручная кладь, спортивный инвентарь — всё размещается комфортно. Водитель помогает с погрузкой, отслеживает рейс при встрече из аэропорта.
            </p>
            <p>
              Межгородские поездки на минивэне выгоднее, чем несколько такси: одна стоимость на всю группу, фиксируется до выезда. Маршрут — прямой, без пересадок, с остановками по договорённости.
            </p>
            <p>
              Детские кресла — по запросу. Рекомендуем указать возраст детей при оформлении заявки. Работаем 24/7, принимаем заявки онлайн, по телефону и в Telegram.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Семейные поездки", text: "Дети, коляски, чемоданы — всё в одном авто" },
              { title: "Трансфер в аэропорт", text: "Большой багаж, встреча с табличкой" },
              { title: "Корпоративные выезды", text: "Команда едет вместе, стоимость одна" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-blue-100/60 bg-blue-50/40 p-4">
                <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA секция */}
      <section className="mx-auto max-w-6xl px-4 pb-12" id="order">
        <div className="rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 mb-2">Заказать минивэн</h2>
          <p className="text-sm text-slate-500 mb-5">Укажите маршрут и количество пассажиров — рассчитаем стоимость и подтвердим заявку</p>
          <a
            href="/#order"
            className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold"
          >
            Рассчитать стоимость
          </a>
        </div>
      </section>
    </>
  );
}
