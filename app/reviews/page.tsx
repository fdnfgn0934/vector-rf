import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Script from "next/script";
import ReviewsClient from "./reviews-client";
import ReviewsListClient from "./reviews-list-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const CANONICAL = `${SITE_URL}/reviews`;
const PHONE_E164 = "+78002225650";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description:
    "Отзывы клиентов о «Вектор РФ»: трансферы по городу, в аэропорт и межгород. Посмотрите отзывы и оставьте свой.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Отзывы клиентов",
    description:
      "Отзывы клиентов о «Вектор РФ»: посмотрите реальные отзывы и оставьте свой.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Отзывы клиентов",
    description: "Отзывы клиентов о «Вектор РФ». Посмотрите отзывы и оставьте свой — 24/7.",
    images: ["/og.jpg"],
  },
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function LogoMark() {
  return (
    <div
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-2xl",
        "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600",
        "text-white shadow-sm ring-1 ring-white/20"
      )}
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 6.5l7.5 13 7.5-13"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.7 6.5h10.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Wordmark() {
  return (
    <div className="leading-tight">
      <div
        className={cn(
          "text-[15px] font-black tracking-tight",
          "bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent"
        )}
      >
        Вектор РФ
      </div>
      <div className="text-xs text-zinc-600">Трансферы и поездки по России</div>
    </div>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 3.75h5A2.75 2.75 0 0 1 17.25 6.5v11A2.75 2.75 0 0 1 14.5 20.25h-5A2.75 2.75 0 0 1 6.75 17.5v-11A2.75 2.75 0 0 1 9.5 3.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10 17.25h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.9 5.2 7.7 4c-.5-.5-1.4-.5-1.9 0l-1 1c-.7.7-1 1.7-.8 2.7 1.1 4.9 4.9 8.7 9.8 9.8 1 .2 2-.1 2.7-.8l1-1c.5-.5.5-1.4 0-1.9l-1.2-1.2c-.5-.5-1.2-.6-1.8-.3l-1.3.7c-.5.3-1.1.2-1.5-.2l-2.2-2.2c-.4-.4-.5-1-.2-1.5l.7-1.3c.3-.6.2-1.3-.3-1.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.75 5.6 3.9 12.2c-.8.3-.79 1.44.02 1.72l4.2 1.45 1.6 4.93c.26.8 1.27.95 1.74.27l2.4-3.5 4.1 3.01c.63.46 1.51.12 1.7-.66l2.2-13.96c.13-.83-.7-1.46-1.41-1.18Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.1 15.4 18.4 7.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600">{desc}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
      {children}
    </span>
  );
}

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  try {
    const dd = d instanceof Date ? d : new Date(d);
    return dd.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

function avg(nums: number[]) {
  if (!nums.length) return 0;
  const s = nums.reduce((a, b) => a + b, 0);
  return s / nums.length;
}

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

export default async function ReviewsPage() {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = PHONE_E164;
  const TELEGRAM = "https://t.me/vector_rf52";

  const rows = await prisma.review.findMany({
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
    <div className="min-h-screen text-zinc-900">
      {/* JSON-LD */}
      <Script
        id="ld-reviews-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {localBusinessJsonLd ? (
        <Script
          id="ld-reviews-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      ) : null}

      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/65 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <LogoMark />
            <Wordmark />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold",
                "border border-zinc-200 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="Позвонить"
              aria-label="Позвонить"
            >
              <IconCall className="h-4 w-4 text-sky-700" />
              <span className="hidden md:inline text-zinc-800">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold",
                "border border-zinc-200 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="Telegram"
            >
              <IconTelegram className="h-4 w-4 text-sky-700" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-wrap gap-2">
          <Badge>Отзывы клиентов</Badge>
          <Badge>Только реальные отзывы клиентов</Badge>
          {ratingCount > 0 ? <Badge>Всего отзывов: {ratingCount}</Badge> : null}
          {ratingCount > 0 ? <Badge>Средняя оценка: {ratingValue}/5</Badge> : null}
        </div>

        <div className="mt-6">
          <SectionTitle
            title="Отзывы о «Вектор РФ»"
            desc="Здесь можно посмотреть отзывы и оставить свой."
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#leave"
              className={cn(
                "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold",
                "bg-sky-600 text-white shadow-sm hover:bg-sky-700"
              )}
            >
              Оставить отзыв
            </a>
            <div className="text-sm text-zinc-600">
              Мы ценим обратную связь и публикуем отзывы без накруток.
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div id="leave" className="order-1 md:order-2 md:col-span-5 scroll-mt-24">
            <div className="rounded-3xl border border-zinc-200 bg-white/85 p-6 shadow-xl backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-zinc-900">Оставить отзыв</div>
                  <div className="mt-1 text-sm text-zinc-600">Займёт меньше минуты.</div>
                </div>
                <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                  ~ 1 мин
                </div>
              </div>

              <div className="mt-5">
                <ReviewsClient initialReviews={rowsForClient} />
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="text-sm font-extrabold text-zinc-900">Нужен трансфер?</div>
                <div className="mt-3 grid gap-2">
                  <a
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                      "border border-zinc-200 bg-white/80 shadow-sm backdrop-blur hover:bg-white"
                    )}
                    href={`tel:${PHONE_TEL}`}
                  >
                    <IconPhone className="h-4 w-4 text-sky-700" />
                    {PHONE_DISPLAY}
                  </a>

                  <a
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                      "border border-zinc-200 bg-white/80 shadow-sm backdrop-blur hover:bg-white"
                    )}
                    href={TELEGRAM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconTelegram className="h-4 w-4 text-sky-700" />
                    Telegram
                  </a>

                  <a
                    href="/#order"
                    className={cn(
                      "mt-1 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm w-full",
                      "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                    )}
                  >
                    Оставить заявку
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 md:order-1 md:col-span-7">
            <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-zinc-900">Опубликованные отзывы</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    {ratingCount > 0 ? (
                      <>
                        Всего: <b>{ratingCount}</b> • Средняя оценка: <b>{ratingValue}</b>/5
                      </>
                    ) : (
                      "Пока нет опубликованных отзывов."
                    )}
                  </div>
                </div>

                <a
                  href="#leave"
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm",
                    "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                  )}
                >
                  Оставить отзыв
                </a>
              </div>

              <div className="mt-5">
                <ReviewsListClient reviews={rowsForClient} />
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-6xl px-4 pb-2">
          <div className="rounded-3xl border border-zinc-200 bg-white/85 p-6 shadow-xl backdrop-blur md:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
              Отзывы о трансферах «Вектор РФ»
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700">
              <p>
                На этой странице собраны реальные отзывы клиентов сервиса «Вектор РФ» о поездках по городу, трансферах в
                аэропорт и междугородних поездках. Мы показываем оценку, текст отзыва и дату публикации.
              </p>
              <p>
                Если вы уже пользовались нашими услугами — оставьте отзыв. Это помогает другим клиентам выбрать надёжный
                трансфер, а нам — улучшать сервис, скорость подачи и качество поездок.
              </p>
              <p>
                Нужен трансфер прямо сейчас? Оформите заявку на сайте или напишите в Telegram — мы на связи 24/7.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-zinc-200 bg-white/65 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark />
              <Wordmark />
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href={`tel:${PHONE_TEL}`}
              >
                <IconPhone className="h-4 w-4 text-sky-700" />
                {PHONE_DISPLAY}
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer"
              >
                <IconTelegram className="h-4 w-4 text-sky-700" />
                Telegram
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/"
              >
                На главную
              </a>
            </div>
          </div>
          <div className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} Вектор РФ. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}