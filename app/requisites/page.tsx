import type { Metadata } from "next";
import {
  PageShell,
} from "@/app/ui/shared";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import RequisitesClient from "./requisites-client";
import { prisma } from "@/lib/prisma";

// Кэшируем страницу на 6 часов — данные меняются редко
export const revalidate = 21600;

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/requisites`;

export const metadata: Metadata = {
  title: "Реквизиты компании Вектор РФ — ИНН, ОГРН, адрес",
  description:
    "Реквизиты компании «Вектор РФ»: полное наименование, ИНН, ОГРН, юридический и фактический адрес, банковские реквизиты и контактная информация.",
  alternates: {
    canonical: "/requisites",
  },
  openGraph: {
    type: "website",
    url: "https://vector-rf.ru/requisites",
    title: "Реквизиты Вектор РФ",
    description: "ИНН, ОГРН, расчётный счёт и реквизиты для оплаты услуг «Вектор РФ».",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — реквизиты" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Реквизиты Вектор РФ",
    description: "ИНН, ОГРН, расчётный счёт и реквизиты для оплаты услуг «Вектор РФ».",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function row(label: string, value?: string | null) {
  return {
    label,
    value: value?.trim() || "Уточняйте у менеджера",
  };
}

export default async function RequisitesPage() {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = null;
  try {
  settings = await prisma.siteSettings.findFirst({
    orderBy: { id: "asc" },
  });
  } catch {
    // DB unavailable (local dev) — use default values
  }

  const phone = settings?.phone?.trim() || "8 (800) 222-56-50";
  const telegram = settings?.telegram?.trim() || "https://t.me/vector_rf52";
  const email = settings?.email?.trim() || "Уточняйте у менеджера";

  const rows = [
    row("Наименование", settings?.companyName || settings?.brandName || "Вектор РФ"),
    row("ИНН", settings?.inn),
    row("ОГРН", settings?.ogrn),
    row("Адрес", settings?.address),
    row("Телефон", phone),
    row("Email", email),
    row("Режим работы", settings?.workHours),
    row("Дополнительно", settings?.notes),
  ];

  const plainText = rows
    .map((item) => `${item.label}: ${item.value}`)
    .join("\n");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Реквизиты компании Вектор РФ", item: PAGE_URL },
    ],
  };

  return (
    <PageShell>
      <Script
        id="ld-requisites-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-blue-100/60 bg-white/82 backdrop-blur-md p-6 shadow-sm md:p-8">
            <nav className="text-sm text-slate-400">
              <Link href="/" className="hover:text-slate-900">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <span>Реквизиты компании</span>
            </nav>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Реквизиты компании
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              На этой странице размещена реквизитная и контактная информация по сервису
              «Вектор РФ». Если вам нужны уточнения по документам, оплате или сотрудничеству,
              свяжитесь с нами удобным способом.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl border border-blue-100/60">
              <div className="grid grid-cols-1 divide-y divide-blue-100/60">
                {rows.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 bg-white px-5 py-4 md:grid-cols-[220px_1fr] md:gap-4"
                  >
                    <div className="text-sm font-bold text-slate-400">{item.label}</div>
                    <div className="text-sm leading-7 text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <RequisitesClient plainText={plainText} />

              <Link
                href="/contacts"
                className="inline-flex items-center rounded-xl border border-blue-100/60 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-blue-50/50"
              >
                Контакты
              </Link>

              <a
                href={telegram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-blue-100/60 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-blue-50/50"
              >
                Telegram
              </a>
            </div>
          </section>

          <aside className="rounded-3xl border border-blue-100/60 bg-white/82 backdrop-blur-md p-6 shadow-sm md:p-8">
            <div className="text-sm font-bold text-slate-800">Контактная информация</div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-blue-100/60 bg-blue-50/50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Телефон
                </div>
                <div className="mt-2 text-base font-extrabold text-slate-900">{phone}</div>
              </div>

              <div className="rounded-2xl border border-blue-100/60 bg-blue-50/50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Telegram
                </div>
                <div className="mt-2 break-all text-sm font-semibold text-slate-900">
                  {telegram}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100/60 bg-blue-50/50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Email
                </div>
                <div className="mt-2 break-all text-sm font-semibold text-slate-900">
                  {email}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-blue-100/60 bg-white p-4">
              <div className="text-sm font-bold text-slate-800">QR для реквизитов</div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100/60 bg-white p-3">
                <Image
                  src="/requisites-qr.png"
                  alt="QR-код реквизитов"
                  width={560}
                  height={560}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </PageShell>
  );
}
