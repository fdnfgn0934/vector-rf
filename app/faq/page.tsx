import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Часто задаваемые вопросы о междугороднем такси, трансфере в аэропорт, стоимости поездок, классах автомобилей и порядке оформления заявки.",
  alternates: {
    canonical: "/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "FAQ — Вектор РФ",
    description:
      "Ответы на частые вопросы о поездках, трансферах, стоимости и оформлении заявки.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ — Вектор РФ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Вектор РФ",
    description:
      "Ответы на частые вопросы о поездках, трансферах, стоимости и оформлении заявки.",
    images: ["/og.jpg"],
  },
};

const faq = [
  {
    question: "Как оформить заявку?",
    answer:
      "Можно оставить заявку через форму на сайте, а также связаться по телефону, в Telegram или WhatsApp.",
  },
  {
    question: "Когда сообщается финальная стоимость?",
    answer:
      "Финальная стоимость подтверждается заранее, после уточнения маршрута, времени подачи и класса автомобиля.",
  },
  {
    question: "Какие доступны классы автомобилей?",
    answer:
      "Обычно доступны стандарт, комфорт, бизнес и минивэн. Вариант подбирается под задачу и количество пассажиров.",
  },
  {
    question: "Можно ли заказать поездку заранее?",
    answer:
      "Да, поездку можно оформить заранее на нужную дату и время.",
  },
  {
    question: "Работаете ли вы ночью и рано утром?",
    answer:
      "Да, заявки принимаются круглосуточно.",
  },
  {
    question: "Можно ли заказать междугороднюю поездку без пересадок?",
    answer:
      "Да, основной формат сервиса — прямые поездки между городами без пересадок.",
  },
];

export default function FaqPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
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

  return (
    <>
      <Script
        id="ld-faq-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-faq-page"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">Главная</Link>
            <span className="mx-2">/</span>
            <span>FAQ</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Часто задаваемые вопросы
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
            Здесь собраны ответы на основные вопросы о междугородних поездках,
            трансферах в аэропорт, стоимости, классах автомобилей и порядке
            оформления заявки.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
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