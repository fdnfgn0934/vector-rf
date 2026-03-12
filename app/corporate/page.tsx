import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const CANONICAL = `${SITE_URL}/corporate`;

export const metadata: Metadata = {
  title: "Корпоративные перевозки и трансферы — Вектор РФ",
  description:
    "Корпоративные трансферы и регулярные поездки для компаний: договор, безнал, единые условия, отчётность. Заключаем договор. Работаем 24/7.",
  alternates: { canonical: "/corporate" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Корпоративные перевозки и трансферы — Вектор РФ",
    description:
      "Корпоративные трансферы и регулярные поездки для компаний: договор, безнал, единые условия, отчётность.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Корпоративные перевозки и трансферы — Вектор РФ",
    description:
      "Корпоративные трансферы и регулярные поездки для компаний: договор, безнал, единые условия, отчётность.",
    images: ["/og.jpg"],
  },
};

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
      <div className="text-xs text-slate-500">Трансферы и поездки по России</div>
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
      {children}
    </span>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="text-sm font-bold text-slate-800">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-500">{text}</div>
    </div>
  );
}

export default function CorporatePage() {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = "+78002225650";
  const TELEGRAM = "https://t.me/vector_rf52";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${CANONICAL}#service`,
    name: "Корпоративные перевозки и трансферы",
    serviceType: [
      "Корпоративное такси",
      "Корпоративные перевозки",
      "Трансфер в аэропорт",
      "Трансфер из аэропорта",
      "Аренда автомобиля с водителем",
    ],
    url: CANONICAL,
    areaServed: { "@type": "Country", name: "Россия" },
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_TEL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Корпоративные перевозки и трансферы — Вектор РФ", item: CANONICAL },
    ],
  };

  // ✅ FAQPage JSON-LD (Яндекс любит, когда FAQ есть и в тексте, и в разметке)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Работаете по договору и безналу?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Да. Работаем по договору, возможна оплата по счёту. Закрывающие документы предоставляем по запросу.",
        },
      },
      {
        "@type": "Question",
        name: "Какие поездки можно организовать для компании?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Регулярные поездки сотрудников по городу, трансферы гостей (аэропорт/вокзал), межгород для командировок, мероприятий и филиалов.",
        },
      },
      {
        "@type": "Question",
        name: "Как быстро можно начать работу?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Напишите или позвоните — уточним задачи и требования, согласуем условия (подача, ожидание, классы авто, отчётность) и запустим работу.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen text-slate-900">
      <Script
        id="ld-corporate-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="ld-corporate-breadcrumbs"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-corporate-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-blue-100/60/70 bg-white/65 backdrop-blur">
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
                "border border-blue-100/60 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="Позвонить"
              aria-label="Позвонить"
            >
              <IconCall className="h-4 w-4 text-sky-700" />
              <span className="hidden md:inline text-slate-800">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold",
                "border border-blue-100/60 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="Telegram"
            >
              <IconTelegram className="h-4 w-4 text-sky-700" />
              <span className="hidden sm:inline">Telegram</span>
            </a>

            <a
              href="/"
              className={cn(
                "hidden items-center justify-center rounded-full px-3 py-2 text-sm font-semibold md:inline-flex",
                "border border-blue-100/60 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="На главную"
            >
              На главную
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="flex flex-wrap gap-2">
          <Badge>Договор и безнал</Badge>
          <Badge>Регулярные поездки</Badge>
          <Badge>Отчётность</Badge>
        </div>

        <div className="mt-6">
          <SectionTitle
            title="Корпоративные перевозки и трансферы — Вектор РФ"
            desc="Организуем регулярные поездки для сотрудников и гостей: быстрое согласование, единые правила, удобная отчётность."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="grid gap-3 md:grid-cols-2">
              <Card
                title="Договор и закрывающие"
                text="Работаем на основании договора. Возможна оплата по счёту. Закрывающие документы — по запросу."
              />
              <Card
                title="Единые условия"
                text="Фиксируем правила подачи, ожидания, маршруты и требования к автомобилю. Понятно всем участникам процесса."
              />
              <Card
                title="Отчётность и контроль"
                text="Собираем заявки в одном формате: кто, куда, когда. Удобно для бухгалтерии и администрирования."
              />
              <Card
                title="Сервис и пунктуальность"
                text="Проверенные водители, аккуратная подача, связь и контроль исполнения. Стоимость согласуем заранее."
              />
            </div>

            <div className="mt-6 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-7">
              <div className="text-sm font-bold text-slate-800">Как начать</div>
              <div className="mt-3 grid gap-2 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Напишите или позвоните — уточним формат поездок и требования.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Согласуем условия: подача, ожидание, классы авто, отчётность.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Подпишем договор и запустим работу.</span>
                </div>
              </div>
            </div>

            {/* FAQ блок (контент + соответствует JSON-LD) */}
            <section className="mt-6 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-7">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Вопросы и ответы</h2>
              <div className="mt-4 space-y-3">
                {[
                  {
                    q: "Работаете по договору и безналу?",
                    a: "Да. Работаем по договору, возможна оплата по счёту. Закрывающие документы предоставляем по запросу.",
                  },
                  {
                    q: "Какие поездки можно организовать для компании?",
                    a: "Регулярные поездки сотрудников по городу, трансферы гостей (аэропорт/вокзал), межгород для командировок, мероприятий и филиалов.",
                  },
                  {
                    q: "Как быстро можно начать работу?",
                    a: "Напишите или позвоните — уточним задачи и требования, согласуем условия и запустим работу.",
                  },
                ].map((it) => (
                  <details
                    key={it.q}
                    className="group rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="text-sm font-bold text-slate-800">{it.q}</span>
                      <span className="select-none rounded-full border border-blue-100/60 bg-white/70 px-3 py-1 text-sm text-slate-600 group-open:hidden">
                        +
                      </span>
                      <span className="select-none rounded-full border border-blue-100/60 bg-white/70 px-3 py-1 text-sm text-slate-600 hidden group-open:inline">
                        —
                      </span>
                    </summary>
                    <div className="mt-3 text-sm leading-6 text-slate-500">{it.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-3xl border border-blue-100/60 bg-white/85 p-6 shadow-xl backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    Связаться по корпоративным поездкам
                  </div>
                  <div className="mt-1 text-sm text-slate-500">Ответим и предложим условия под ваши задачи.</div>
                </div>
                <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                  быстро
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                <a
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                    "border border-blue-100/60 bg-white/80 shadow-sm backdrop-blur hover:bg-white"
                  )}
                  href={`tel:${PHONE_TEL}`}
                >
                  <IconPhone className="h-4 w-4 text-sky-700" />
                  {PHONE_DISPLAY}
                </a>

                <a
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                    "border border-blue-100/60 bg-white/80 shadow-sm backdrop-blur hover:bg-white"
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

              <div className="mt-4 text-xs text-slate-400">
                Нажимая “Оставить заявку”, вы соглашаетесь на обработку персональных данных.
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-7">
              <div className="text-sm font-bold text-slate-800">Что можно организовать</div>
              <div className="mt-3 grid gap-2 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Встречи в аэропорту/на вокзале и трансферы гостей.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Регулярные поездки сотрудников по городу.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Межгород: командировки, филиалы, мероприятия.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-blue-100/60 bg-white/65 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark />
              <Wordmark />
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-blue-100/60 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href={`tel:${PHONE_TEL}`}
              >
                <IconPhone className="h-4 w-4 text-sky-700" />
                {PHONE_DISPLAY}
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-blue-100/60 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer"
              >
                <IconTelegram className="h-4 w-4 text-sky-700" />
                Telegram
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-blue-100/60 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/"
              >
                На главную
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} Вектор РФ. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
