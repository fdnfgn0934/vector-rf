import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  PageShell,
} from "@/app/ui/shared";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: "Услуги — такси межгород, трансфер в аэропорт, минивэн",
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
    href: "/taxi-mezhgorod",
  },
  {
    title: "Трансфер в аэропорт",
    text:
      "Поездки в аэропорт и из аэропорта с подачей ко времени. Удобно для рейсов, встреч пассажиров, поездок с багажом и стыковок с дальнейшим маршрутом.",
    href: "/transfer-v-aeroport",
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
      { "@type": "ListItem", position: 2, name: "Услуги — такси межгород, трансфер в аэропорт, минивэн", item: PAGE_URL },
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
    <PageShell>
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

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="rounded-3xl border border-blue-100/60 bg-white/82 backdrop-blur-md p-6 shadow-sm md:p-8">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Услуги</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Услуги
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
            На сайте собраны основные направления сервиса: междугородние поездки,
            аэропортные трансферы, городские маршруты, корпоративные поездки и
            варианты с минивэном. Для каждой задачи можно подобрать подходящий
            формат поездки и класс автомобиля, а условия маршрута согласовать
            заранее.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
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
              className="rounded-3xl border border-blue-100/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <h2 className="text-lg font-extrabold text-slate-800">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center rounded-full border border-blue-100/60 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50/50"
              >
                Перейти
              </Link>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-extrabold text-slate-900">Как мы работаем</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <p>
              «Вектор РФ» выполняет поездки и трансферы по всей России: межгород, аэропорты, города и корпоративные маршруты. Все автомобили — с проверенными водителями, работающими по договору. Доступны классы стандарт, комфорт, бизнес и минивэн.
            </p>
            <p>
              Для каждой поездки стоимость фиксируется заранее. Оператор уточняет детали маршрута, время подачи и класс авто — после этого цена не меняется. Оплата наличными или по безналу, для организаций — договор и закрывающие документы.
            </p>
            <p>
              Заявки принимаем круглосуточно через форму на сайте, по телефону или в Telegram. Рекомендуем бронировать заранее: за 1–2 дня для межгорода, за несколько часов для городских поездок и трансферов в аэропорт.
            </p>
            <p>
              По всем вопросам — звоните или пишите. Подберём оптимальный вариант по вашему маршруту и бюджету.
            </p>
          </div>
        </section>
      
          <div className="mt-8 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Вопросы об услугах</h2>
            <div className="space-y-4">
              {[
                { q: "Какую услугу выбрать для межгорода?", a: "Если едете один или вдвоём — стандарт или комфорт. Для группы от 4 человек — минивэн. Для деловой поездки — бизнес-класс." },
                { q: "Чем отличается трансфер от такси?", a: "Трансфер — заранее согласованная поездка с фиксированной стоимостью, часто в аэропорт. Такси межгород — аналогично, но акцент на дальних маршрутах между городами." },
                { q: "Можно ли заказать несколько автомобилей?", a: "Да, для корпоративных клиентов и групп организуем несколько машин. Свяжитесь с нами для согласования." },
                { q: "Как оплатить поездку?", a: "Наличными водителю или по безналу. Для организаций — оплата по счёту после получения документов." },
              ].map((item) => (
                <details key={item.q} className="group rounded-2xl border border-blue-100/60 bg-white/80 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900 list-none flex justify-between">
                    {item.q}
                    <span className="text-blue-400 ml-2">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </main>
    </PageShell>
  );
}
