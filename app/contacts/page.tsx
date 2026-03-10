import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/contacts`;
const PHONE_E164 = "+78002225650";
const PHONE_DISPLAY = "8 (800) 222-56-50";
const TELEGRAM = "https://t.me/vector_rf52";
const WHATSAPP = "https://wa.me/78314233929";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты Вектор РФ: телефон, Telegram, WhatsApp и страницы сайта для заявок на междугородние поездки и трансферы.",
  alternates: {
    canonical: "/contacts",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Контакты Вектор РФ",
    description:
      "Телефон, Telegram, WhatsApp и страницы сайта для заявок на междугородние поездки и трансферы.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Контакты Вектор РФ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты Вектор РФ",
    description:
      "Телефон, Telegram, WhatsApp и страницы сайта для заявок на междугородние поездки и трансферы.",
    images: ["/og.jpg"],
  },
};

export default function ContactsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Контакты", item: PAGE_URL },
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Вектор РФ",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
        contactType: "customer service",
        availableLanguage: ["Russian"],
      },
    ],
    sameAs: [TELEGRAM],
  };

  return (
    <>
      <Script
        id="ld-contacts-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-contacts-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Контакты</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
            Контакты
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
            Для заявок на междугородние поездки, трансферы в аэропорт, городские
            и корпоративные маршруты можно использовать телефон, Telegram,
            WhatsApp или форму на главной странице сайта.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <a
              href={`tel:${PHONE_E164}`}
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm hover:bg-zinc-100"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Телефон
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-900">
                {PHONE_DISPLAY}
              </div>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm hover:bg-zinc-100"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Telegram
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-900">
                @vector_rf52
              </div>
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm hover:bg-zinc-100"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                WhatsApp
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-900">
                Написать в WhatsApp
              </div>
            </a>

            <Link
              href="/"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm hover:bg-zinc-100"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Заявка
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-900">
                Перейти к форме
              </div>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Все услуги
            </Link>
            <Link
              href="/requisites"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Реквизиты
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}