import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Breadcrumb } from "@/app/ui/shared";
import { CITY_LANDINGS } from "@/lib/city-landings";

export const metadata: Metadata = {
  title: "Карта сайта Вектор РФ — все разделы и страницы",
  description: "Полная карта сайта Вектор РФ: услуги трансфера и такси, города, маршруты по России, блог и информационные разделы. Быстрая навигация по сайту.",
  alternates: { canonical: "/sitemap-page" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://vector-rf.ru/sitemap-page",
    title: "Карта сайта Вектор РФ — все разделы",
    description: "Полная карта сайта: услуги, города, маршруты и блог о трансферах по России.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — карта сайта" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Карта сайта Вектор РФ",
    description: "Полная карта сайта: услуги, города, маршруты и блог о трансферах по России.",
    images: ["/og.jpg"],
  },
};

const SECTIONS = [
  {
    title: "Услуги",
    links: [
      { href: "/taxi-mezhgorod", label: "Междугороднее такси" },
      { href: "/transfer-v-aeroport", label: "Трансфер в аэропорт" },
      { href: "/transfer-v-aeroport", label: "Трансфер в аэропорт 24/7" },
      { href: "/transfer-iz-aeroporta", label: "Трансфер из аэропорта" },
      { href: "/city-transfer", label: "Городские поездки" },
      { href: "/minivan-transfer", label: "Минивэн и группа" },
      { href: "/corporate", label: "Корпоративным клиентам" },
      { href: "/corporate-taxi", label: "Корпоративное такси" },
    ],
  },
  {
    title: "Ключевые разделы",
    links: [
      { href: "/taxi-mezhgorod", label: "Такси межгород" },
      { href: "/taxi-mezhgorod", label: "Междугороднее такси" },
      { href: "/prices", label: "Цены и тарифы" },
      { href: "/faq", label: "Вопросы и ответы" },
      { href: "/reviews", label: "Отзывы клиентов" },
      { href: "/blog", label: "Блог" },
      { href: "/city", label: "Все города" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/contacts", label: "Контакты" },
      { href: "/services", label: "Все услуги" },
      { href: "/requisites", label: "Реквизиты" },
      { href: "/privacy", label: "Политика конфиденциальности" },
      { href: "/agreement", label: "Пользовательское соглашение" },
      { href: "/personal-data", label: "Согласие на обработку данных" },
    ],
  },
];

export default async function SitemapPage() {
  const cities = CITY_LANDINGS.slice(0, 30);

  return (
    <PageShell>
      <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <Breadcrumb items={[{ name: "Главная", href: "/" }, { name: "Карта сайта", href: "/sitemap-page" }]} />

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">Карта сайта</h1>
        <p className="mt-2 text-base text-slate-500">Все основные разделы сайта Вектор РФ.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-500 mb-3">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-700 hover:text-blue-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-500 mb-3">Города (первые 30)</h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      
          <div className="mt-8 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">О сайте Вектор РФ</h2>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              Сайт vector-rf.ru — официальный ресурс сервиса межгородских трансферов и такси по России.
              Здесь можно рассчитать стоимость поездки, оставить заявку и узнать подробности об услугах.
            </p>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              На сайте представлены страницы для 261 города России с информацией о маршрутах, ценах и
              особенностях поездок. Маршрутные страницы охватывают более 25 000 направлений между городами.
            </p>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              В блоге — статьи о межгородских поездках, советы пассажирам, сравнения транспорта и
              разборы популярных маршрутов. Информация обновляется при изменении тарифов и условий.
            </p>
          </div>
        </main>
    </PageShell>
  );
}
