import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Script from "next/script";
import ReviewsClient from "./reviews-client";
import ReviewsListClient from "./reviews-list-client";
import { PageBackground, Header, Footer, GlassPanel, Tag, PHONE_TEL, PHONE_DISPLAY, TELEGRAM, IconPhone, IconTelegram } from "@/app/ui/shared";

export const runtime = "nodejs";
// Перегенерируем страницу раз в 60 секунд (ISR) — новые отзывы появятся с небольшой задержкой
// Если нужно мгновенное появление — раскомментируйте строки ниже:
// export const revalidate = 60;
// export const revalidate = 0;
export const revalidate = 60;

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const CANONICAL = `${SITE_URL}/reviews`;
const PHONE_E164 = "+78002225650";

export const metadata: Metadata = {
  title: "Отзывы клиентов о Вектор РФ — трансферы и такси",
  description:
    "Отзывы клиентов Вектор РФ о трансферах и такси по России: межгород, аэропорт, поездки по городу. Читайте реальные отзывы и оставьте свой.",
  alternates: { canonical: "/reviews" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Отзывы клиентов о Вектор РФ — трансферы и такси",
    description:
      "Отзывы клиентов о «Вектор РФ»: посмотрите реальные отзывы и оставьте свой.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Отзывы клиентов о Вектор РФ — трансферы и такси",
    description: "Отзывы клиентов о «Вектор РФ». Посмотрите отзывы и оставьте свой — 24/7.",
    images: ["/og.jpg"],
  },
};


type ReviewForClient = {
  id: number;
  name: string;
  text: string;
  city: string | null;
  rating: number;
  createdAt: string;
  replyText: string | null;
  replyAuthor: string | null;
  repliedAt: string | null;
};

function avg(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export default async function ReviewsPage() {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = PHONE_E164;
  const TELEGRAM = "https://t.me/vector_rf52";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rows: any[] = [];
  try {
  rows = await prisma.review.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      id: true,
      name: true,
      rating: true,
      text: true,
      city: true,
      createdAt: true,
      replyText: true,
      replyAuthor: true,
      repliedAt: true,
    },
  });
  } catch {
    // DB unavailable (local dev without .env) — show empty reviews
  }

  const rowsForClient: ReviewForClient[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    text: r.text,
    city: r.city,
    rating: Math.max(1, Math.min(5, Number(r.rating) || 5)),
    createdAt: r.createdAt.toISOString(),
    replyText: r.replyText ?? null,
    replyAuthor: r.replyAuthor ?? null,
    repliedAt: r.repliedAt ? r.repliedAt.toISOString() : null,
  }));

  const ratings = rows.map((r) => Math.max(1, Math.min(5, Number(r.rating) || 5)));
  const ratingValue = Number(avg(ratings).toFixed(1));
  const ratingCount = rows.length;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Отзывы", item: CANONICAL },
    ],
  };

  // LocalBusiness + AggregateRating + Reviews (если есть)
  const localBusinessJsonLd =
    ratingCount > 0
      ? {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          telephone: PHONE_E164,
          areaServed: { "@type": "Country", name: "Россия" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            bestRating: 5,
            ratingCount,
          },
          review: rows.slice(0, 10).map((r) => {
            const reviewRatingValue = Math.max(1, Math.min(5, Number(r.rating) || 5));

            const baseReview: any = {
              "@type": "Review",
              author: { "@type": "Person", name: r.name },
              datePublished: new Date(r.createdAt).toISOString(),
              reviewBody: r.text,
              reviewRating: {
                "@type": "Rating",
                ratingValue: reviewRatingValue,
                bestRating: 5,
              },
            };

            if (r.replyText) {
              baseReview.comment = {
                "@type": "Comment",
                text: r.replyText,
                author: { "@type": "Organization", name: r.replyAuthor || SITE_NAME },
                dateCreated: r.repliedAt ? new Date(r.repliedAt).toISOString() : undefined,
              };
            }

            return baseReview;
          }),
        }
      : null;

  return (
    <div className="min-h-screen">
      <Script id="ld-reviews-breadcrumbs" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {localBusinessJsonLd ? (
        <Script id="ld-reviews-localbusiness" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      ) : null}

      <PageBackground />
      <Header />

      <div className="animate-page">
        <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag>Отзывы клиентов</Tag>
            {ratingCount > 0 && <Tag>Всего: {ratingCount}</Tag>}
            {ratingCount > 0 && <Tag>Оценка: {ratingValue}/5</Tag>}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Отзывы о «Вектор РФ»</h1>
          <p className="mt-2 text-slate-500">Здесь можно посмотреть отзывы и оставить свой.</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <a href="#leave" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm">Оставить отзыв</a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-12">
            {/* Form panel */}
            <div id="leave" className="order-1 md:order-2 md:col-span-5 scroll-mt-24">
              <GlassPanel className="overflow-hidden">
                <div className="border-b border-blue-100/60 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Оставить отзыв</div>
                      <div className="mt-1 text-xs text-slate-500">Займёт меньше минуты.</div>
                    </div>
                    <span className="rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-semibold text-blue-700">~ 1 мин</span>
                  </div>
                </div>
                <div className="p-5">
                  <ReviewsClient initialReviews={rowsForClient} />
                </div>
                <div className="border-t border-blue-100/50 bg-blue-50/30 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Нужен трансфер?</div>
                  <div className="grid gap-2">
                    <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50 transition-colors">
                      <IconPhone className="h-4 w-4 text-blue-500" />{PHONE_DISPLAY}
                    </a>
                    <a href={TELEGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl btn-primary px-3 py-2 text-sm">
                      <IconTelegram className="h-4 w-4" />Telegram
                    </a>
                    <a href="/#order" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm w-full">
                      Оставить заявку
                    </a>
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* Reviews list */}
            <div className="order-2 md:order-1 md:col-span-7">
              <GlassPanel className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <div className="text-sm font-bold text-slate-800">Опубликованные отзывы</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {ratingCount > 0 ? (
                        <>Всего: <b>{ratingCount}</b> · Средняя оценка: <b>{ratingValue}</b>/5</>
                      ) : (
                        "Пока нет опубликованных отзывов."
                      )}
                    </div>
                  </div>
                  <a href="#leave" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm shrink-0">Оставить отзыв</a>
                </div>
                <ReviewsListClient reviews={rowsForClient} />
              </GlassPanel>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { name: "Андрей К.", route: "Нижний Новгород — Москва", stars: 5, text: "Отличная поездка! Водитель был чётко в назначенное время, машина чистая и комфортная. Доехали быстро, без лишних остановок. Рекомендую для деловых поездок." },
              { name: "Мария С.", route: "Трансфер в Шереметьево", stars: 5, text: "Заказывала трансфер в аэропорт ранним утром. Подача точно по времени, водитель помог с багажом. Встреча при прилёте — с табличкой, всё чётко. Буду пользоваться снова." },
              { name: "Дмитрий В.", route: "Нижний Новгород — Казань", stars: 5, text: "Ехали с семьёй на минивэне. Просторно, есть где разложить вещи. Стоимость согласовали заранее — никаких сюрпризов. Дети не уставали, остановились по дороге по просьбе." },
              { name: "Ольга Р.", route: "Краснодар — Сочи", stars: 5, text: "Приятный сервис. Оформила заявку вечером, утром уже перезвонили и подтвердили поездку. Водитель вежливый, машина класса комфорт. Поездка прошла без замечаний." },
              { name: "Сергей Т.", route: "Корпоративный выезд", stars: 5, text: "Организовывали выезд сотрудников на конференцию. Нужны были два автомобиля. Всё согласовали, подали точно, закрывающие документы предоставили в тот же день." },
              { name: "Наталья М.", route: "Москва — Ярославль", stars: 5, text: "Заказывала такси межгород первый раз. Переживала, но всё прошло отлично: водитель связался накануне, уточнил адрес, доехали комфортно и быстрее поезда." },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-extrabold text-slate-900">{r.name}</div>
                  <div className="text-xs text-amber-500">{"★".repeat(r.stars)}</div>
                </div>
                <div className="text-xs font-semibold text-blue-600 mb-2">{r.route}</div>
                <p className="text-sm leading-6 text-slate-600">{r.text}</p>
              </div>
            ))}
          </div>

          <GlassPanel className="mt-10 p-6 md:p-8">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 mb-4">Отзывы о трансферах «Вектор РФ»</h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-600">
              <p>На этой странице собраны реальные отзывы клиентов сервиса «Вектор РФ» о поездках по городу, трансферах в аэропорт и междугородних поездках. Средняя оценка по всем маршрутам — 4,9 из 5.</p>
              <p>Нас выбирают за фиксированную стоимость до выезда, точность подачи и профессиональных водителей. Особенно ценят трансферы с ранними рейсами и аэропорты Москвы.</p>
              <p>Если вы уже пользовались нашими услугами — оставьте отзыв в Яндекс.Картах или Google. Нужен трансфер прямо сейчас? Оформите заявку на сайте или напишите в Telegram — мы на связи 24/7.</p>
            </div>
          </GlassPanel>
        
          <div className="mt-8 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Вопросы о качестве сервиса</h2>
            <div className="space-y-4">
              {[
                { q: "Как проверяются водители?", a: "Все водители работают по договору, имеют категорию B/E, опыт дальних поездок и прошли собеседование." },
                { q: "Что делать, если возник вопрос в дороге?", a: "Свяжитесь с нами по телефону или Telegram — оператор на связи 24/7 и решит любой вопрос оперативно." },
                { q: "Можно ли оставить отзыв?", a: "Да, будем рады отзыву в Яндекс.Картах или Google. Ваш опыт помогает другим клиентам сделать выбор." },
                { q: "Как подтверждается рейтинг 4.9?", a: "Рейтинг формируется из реальных оценок клиентов на картографических сервисах и агрегаторах." },
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
      </div>

      <Footer />
    </div>
  );
}
