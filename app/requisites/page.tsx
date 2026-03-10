import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/requisites`;

export const metadata: Metadata = {
  title: "Реквизиты",
  description:
    "Реквизиты и служебная информация Вектор РФ. Контакты, страницы услуг и информация для связи по вопросам поездок и сотрудничества.",
  alternates: {
    canonical: "/requisites",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RequisitesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Реквизиты", item: PAGE_URL },
    ],
  };

  return (
    <>
      <Script
        id="ld-requisites-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-12">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">Главная</Link>
            <span className="mx-2">/</span>
            <span>Реквизиты</span>
          </nav>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900">
            Реквизиты
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-700">
            На этой странице размещается реквизитная и служебная информация.
            При необходимости актуальные данные можно уточнить через страницу
            контактов.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-7 text-zinc-700">
            <p>Заполни здесь свои актуальные реквизиты, если они используются на сайте.</p>
            <p className="mt-3">
              Если страница нужна только как обязательная служебная, достаточно
              поддерживать её в аккуратном и актуальном состоянии.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contacts"
              className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Контакты
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}