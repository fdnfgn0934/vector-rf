import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PageShell, Breadcrumb, GlassPanel, Tag } from "@/app/ui/shared";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "О сервисе — трансферы и поездки по России",
  description: "«Вектор РФ» — сервис трансферов и поездок по России. Заказать такси межгород, трансфер в аэропорт или корпоративную поездку онлайн 24/7.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: PAGE_URL, title: "О компании Вектор РФ", description: "Сервис поездок и трансферов по России.", siteName: "Вектор РФ", locale: "ru_RU", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "О компании Вектор РФ" }] },
  twitter: { card: "summary_large_image", title: "О компании Вектор РФ", description: "Сервис поездок и трансферов по России.", images: ["/og.jpg"] },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "О сервисе — трансферы и поездки по России", item: PAGE_URL },
    ],
  };

  return (
    <>
      <Script id="ld-about-breadcrumbs" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PageShell>
        <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <Breadcrumb items={[{ name: "Главная", href: "/" }, { name: "О сервисе — трансферы и поездки по России", href: "/about" }]} />

          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-5">
              <Tag>Трансферы по России</Tag>
              <Tag>С 2024 года</Tag>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">О компании</h1>
          </div>

          <GlassPanel className="mt-8 p-6 md:p-8">
            <div className="space-y-5 text-base leading-7 text-slate-600">
              <p>
                «Вектор РФ» — сервис междугородних трансферов и такси по России. Работаем с 2024 года, головной офис в Нижнем Новгороде. Выполняем поездки по всей стране: от Калининграда до Владивостока, от Мурманска до Краснодара.
              </p>
              <p>
                Основные направления: такси межгород, трансфер в аэропорт и из аэропорта, городские поездки и корпоративные маршруты. На каждом этапе — понятная логистика: маршрут, стоимость и класс автомобиля согласовываются заранее. Никаких сюрпризов в дороге.
              </p>
              <p>
                В парке — автомобили классов стандарт, комфорт, бизнес и минивэн на 6–7 мест. Водители проходят проверку и работают по договору. Заявки принимаем 24/7, включая праздники и выходные.
              </p>
              <p>
                Для юридических лиц — договор, счёт, закрывающие документы и безналичная оплата. Для частных клиентов — простое оформление через сайт, телефон или Telegram.
              </p>
              <p>
                Нижний Новгород — наш базовый регион, откуда стартует большинство межгородских маршрутов в центральной России: Москва, Казань, Ярославль, Владимир, Иваново, Чебоксары и другие города Поволжья. Отдельно работаем по южным маршрутам: Краснодар, Сочи, Ростов-на-Дону, Анапа.
              </p>
              <p>
                Такси межгород с нами — это прямой маршрут без пересадок, отслеживание рейса при заказе трансфера из аэропорта, именная табличка при встрече и фиксированная стоимость, которую подтверждаем до выезда. Звоните или оставляйте заявку онлайн.
              </p>
            </div>

            <h2 className="mt-8 text-xl font-extrabold text-slate-900">В цифрах</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { value: "500+", label: "маршрутов по России" },
                { value: "24/7", label: "приём заявок" },
                { value: "4 класса", label: "автомобилей" },
                { value: "с 2024", label: "года работаем" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-blue-100/60 bg-blue-50/40 p-4 text-center">
                  <div className="text-2xl font-black text-blue-700">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-xl font-extrabold text-slate-900">Наши принципы</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Фиксированная стоимость", text: "Цену подтверждаем до выезда. Счётчик не крутится, итоговая сумма не меняется." },
                { title: "Точность подачи", text: "Водитель приезжает к нужному времени и адресу. При трансфере из аэропорта отслеживает рейс." },
                { title: "Проверенные водители", text: "Все водители работают по договору, имеют лицензию и опыт дальних поездок." },
                { title: "Поддержка 24/7", text: "Заявки принимаем круглосуточно. Оператор перезвонит и уточнит детали маршрута." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-blue-100/60 bg-blue-50/40 p-4">
                  <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-xl font-extrabold text-slate-900">Что мы делаем</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Три ключевых направления: межгород, аэропорт и корпоративные поездки. Каждый класс авто — под свою задачу: стандарт для бюджетных поездок, комфорт для длинных маршрутов, бизнес для деловых встреч, минивэн для групп и большого багажа.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { title: "Межгород", text: "Прямые поездки между городами без пересадок. Уточняем остановки и обратную дорогу." },
                { title: "Аэропорт", text: "Встреча с табличкой, учёт времени рейса, помощь с багажом." },
                { title: "Корпоративным", text: "Поездки сотрудников и гостей, договор, закрывающие документы, безнал." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-blue-100/60 bg-blue-50/40 p-5">
                  <div className="text-sm font-bold text-blue-800 mb-2">{c.title}</div>
                  <div className="text-sm leading-6 text-slate-600">{c.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn-primary inline-flex items-center rounded-xl px-5 py-3 text-sm">Все услуги</Link>
              <Link href="/contacts" className="btn-ghost inline-flex items-center rounded-xl px-5 py-3 text-sm">Контакты</Link>
              <Link href="/" className="btn-ghost inline-flex items-center rounded-xl px-5 py-3 text-sm">Оставить заявку</Link>
            </div>
          </GlassPanel>
        
          <div className="mt-8 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Частые вопросы о компании</h2>
            <div className="space-y-4">
              {[
                { q: "Где находится Вектор РФ?", a: "Головной офис в Нижнем Новгороде. Работаем по всей России — принимаем заявки онлайн и по телефону." },
                { q: "С какого года работаете?", a: "С 2024 года. За это время выполнили сотни поездок по маршрутам России." },
                { q: "Есть ли договор для юрлиц?", a: "Да, для организаций заключаем договор, выставляем счёт и предоставляем закрывающие документы (акт, счёт-фактура)." },
                { q: "Какие классы автомобилей доступны?", a: "Стандарт, комфорт, бизнес и минивэн на 6–7 мест. Класс выбирается при оформлении заявки." },
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
    </>
  );
}
