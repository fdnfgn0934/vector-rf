import type { Metadata } from "next";
import Script from "next/script";
import ServicePage from "../ui/service-page";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const CANONICAL = `${SITE_URL}/minivan-transfer`;
const PHONE_E164 = "+78002225650";

export const metadata: Metadata = {
  title: "Минивэн и групповой трансфер — 4–7 мест",
  description:
    "Минивэн и групповой трансфер: для семьи/компании и большого багажа. В аэропорт, по городу и на межгород. Согласуем стоимость заранее. Онлайн-заявка 24/7.",
  alternates: { canonical: CANONICAL },
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
    </>
  );
}