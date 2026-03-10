"use client";

import Script from "next/script";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import LeadForm, { type CarClass, type RouteType } from "./lead-form";
import {
  CORE_SERVICE_LINKS,
  POPULAR_ROUTE_LINKS,
  REGIONAL_ROUTE_GROUPS,
  TRUST_FACTS,
  TRUST_METRICS,
} from "@/lib/internal-links";

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

function NavPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold",
        "text-zinc-700 hover:text-zinc-900",
        "border border-zinc-200 bg-white/70 backdrop-blur shadow-sm",
        "hover:bg-white"
      )}
    >
      {children}
    </a>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{desc}</p>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="text-sm font-extrabold text-zinc-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{text}</div>
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

function ClassCardButton({
  title,
  priceHint,
  features,
  note,
  active,
  onClick,
}: {
  title: string;
  priceHint: string;
  features: string[];
  note?: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border bg-white/80 p-5 text-left shadow-sm backdrop-blur transition",
        "focus:outline-none focus:ring-2 focus:ring-sky-200/80",
        active
          ? "border-sky-300 bg-white ring-2 ring-sky-200/70 shadow-md"
          : "border-zinc-200 hover:border-sky-200/70 hover:bg-white/90"
      )}
      aria-pressed={active ? "true" : "false"}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-zinc-900">{title}</div>
          <div className="mt-1 text-xs text-zinc-600">{priceHint}</div>
        </div>

        <div
          className={cn(
            "grid h-9 w-9 place-items-center rounded-xl ring-1",
            active ? "bg-sky-100 ring-sky-200" : "bg-sky-50 ring-sky-100"
          )}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />
        </div>
      </div>

      <ul className="mt-4 grid gap-2 text-sm text-zinc-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span className="leading-6">{f}</span>
          </li>
        ))}
      </ul>

      {note ? <div className="mt-4 text-xs text-zinc-500">{note}</div> : null}
    </button>
  );
}

export default function HomePage() {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = "+78002225650";
  const TELEGRAM = "https://t.me/vector_rf52";

  const [selectedClass, setSelectedClass] = useState<CarClass>("standard");
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType>("intercity");

  const orderRef = useRef<HTMLDivElement | null>(null);

  const navItemListSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Основные страницы сайта Вектор РФ",
      itemListElement: CORE_SERVICE_LINKS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        url: `https://vector-rf.ru${item.href}`,
      })),
    }),
    []
  );

  const popularRoutesSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Популярные маршруты",
      itemListElement: POPULAR_ROUTE_LINKS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        url: `https://vector-rf.ru${item.href}`,
      })),
    }),
    []
  );

  function scrollToOrder() {
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pickClass(v: CarClass, scrollToForm = true) {
    setSelectedClass(v);
    if (scrollToForm) scrollToOrder();
  }

  function pickRouteType(v: RouteType) {
    setSelectedRouteType(v);
    scrollToOrder();
  }



  const businessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: "Вектор РФ",
      url: "https://vector-rf.ru",
      telephone: PHONE_TEL,
      areaServed: "Россия",
      serviceType: ["Междугороднее такси", "Трансфер в аэропорт", "Поездки по городу"],
      sameAs: [TELEGRAM],
    }),
    []
  );

  const regionalRoutesSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Популярные направления по регионам",
      itemListElement: REGIONAL_ROUTE_GROUPS.flatMap((group) =>
        group.links.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${group.title}: ${item.label}`,
          url: `https://vector-rf.ru${item.href}`,
        }))
      ),
    }),
    []
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Сколько стоит трансфер и как считается цена?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Цена зависит от маршрута и класса авто (Стандарт/Комфорт/Бизнес/Минивэн). После заявки мы подтверждаем стоимость до подачи автомобиля — без сюрпризов.",
          },
        },
        {
          "@type": "Question",
          name: "Как быстро подаётся машина?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "По городу обычно 15–30 минут (зависит от района и времени). В аэропорт/межгород — подача к согласованному времени.",
          },
        },
        {
          "@type": "Question",
          name: "Встречаете в аэропорту с табличкой?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да. Водитель встречает в зоне прилёта с табличкой. Можно указать номер рейса в комментарии к заявке.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли заказать межгород туда-обратно?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, отметьте «Туда-обратно» в форме (или напишите в комментарии) — согласуем детали обратной поездки.",
          },
        },
        {
          "@type": "Question",
          name: "Работаете с компаниями?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да. Корпоративные перевозки для сотрудников и гостей. Работаем по договору, возможен безнал и закрывающие документы.",
          },
        },
      ],
    }),
    []
  );

  const routeButtonBase =
    "rounded-2xl border bg-white/80 p-4 text-left shadow-sm backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-sky-200/80";
  const routeActive = "border-sky-300 ring-2 ring-sky-200/70 bg-white";
  const routeIdle = "border-zinc-200 hover:bg-white";

  return (
    <div className="min-h-screen text-zinc-900">
      <Script
        id="business-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      <Script
        id="nav-item-list-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navItemListSchema) }}
      />

      <Script
        id="popular-routes-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(popularRoutesSchema) }}
      />

      <Script
        id="regional-routes-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionalRoutesSchema) }}
      />

      <Script
        id="faq-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/65 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <LogoMark />
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            <NavPill href="#order">Заявка</NavPill>
            <NavPill href="#classes">Классы</NavPill>
            <NavPill href="/reviews">Отзывы</NavPill>
            <NavPill href="/corporate">Юр лицам</NavPill>
            <NavPill href="/faq">Вопросы</NavPill>
          </nav>

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
              <span className="hidden text-zinc-800 md:inline">{PHONE_DISPLAY}</span>
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

      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-10 pt-4 md:grid-cols-12 md:gap-8 md:py-14">
          <div id="order" ref={orderRef} className="order-1 scroll-mt-24 md:order-2 md:col-span-5">
            <div className="rounded-3xl border border-zinc-200 bg-white/85 shadow-xl backdrop-blur">
              <div className="border-b border-zinc-200 p-4 md:p-5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold",
                      "border border-zinc-200 bg-white/80 shadow-sm hover:bg-white"
                    )}
                    title="Позвонить"
                  >
                    <IconCall className="h-4 w-4 text-sky-700" />
                    Позвонить
                  </a>

                  <a
                    href={TELEGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold",
                      "border border-zinc-200 bg-white/80 shadow-sm hover:bg-white"
                    )}
                    title="Написать в Telegram"
                  >
                    <IconTelegram className="h-4 w-4 text-sky-700" />
                    Telegram
                  </a>
                </div>

                <div className="mt-3 text-sm font-extrabold text-zinc-900">Заполнить заявку</div>
              </div>

              <div className="p-3">
                <LeadForm
                  carClass={selectedClass}
                  onCarClassChange={(v) => pickClass(v, false)}
                  routeType={selectedRouteType}
                  onRouteTypeChange={setSelectedRouteType}
                />
              </div>

              <div className="border-t border-zinc-200 bg-white/70 p-4">
                <div className="text-sm font-extrabold text-zinc-900">Связаться напрямую</div>
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
                </div>

                <div className="mt-4 text-xs text-zinc-500">
                  Нажимая “Отправить заявку”, вы соглашаетесь на обработку персональных данных.
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 md:order-1 md:col-span-7">
            <div className="flex flex-wrap gap-2">
              <Badge>Проверенные водители</Badge>
              <Badge>Фиксация заявки</Badge>
              <Badge>Стоимость заранее</Badge>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Трансфер, которому
              <span className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {" "}
                доверяют
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-700">
              Оставьте заявку за 1 минуту. Мы уточним детали, подтвердим стоимость и организуем подачу автомобиля.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => pickRouteType("intercity")}
                className={cn(routeButtonBase, selectedRouteType === "intercity" ? routeActive : routeIdle)}
              >
                <div className="text-sm font-extrabold text-zinc-900">Межгород</div>
                <div className="mt-1 text-sm text-zinc-600">Трансферы между городами</div>
              </button>

              <button
                type="button"
                onClick={() => pickRouteType("airport")}
                className={cn(routeButtonBase, selectedRouteType === "airport" ? routeActive : routeIdle)}
              >
                <div className="text-sm font-extrabold text-zinc-900">Аэропорты</div>
                <div className="mt-1 text-sm text-zinc-600">Встреча по времени прилёта</div>
              </button>

              <button
                type="button"
                onClick={() => pickRouteType("city")}
                className={cn(routeButtonBase, selectedRouteType === "city" ? routeActive : routeIdle)}
              >
                <div className="text-sm font-extrabold text-zinc-900">Город</div>
                <div className="mt-1 text-sm text-zinc-600">Встреча и поездки по городу</div>
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToOrder}
              className="mt-6 w-full rounded-2xl border border-sky-200/70 bg-white/70 p-4 text-left shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/80"
            >
              <div className="text-sm font-extrabold text-zinc-900">Гарантии</div>
              <div className="mt-2 grid gap-2 text-sm text-zinc-700">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>Стоимость согласуем до подачи автомобиля.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>Заявка фиксируется — ничего не теряется.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>Учитываем пожелания: багаж, кресло, рейс, остановки.</span>
                </div>
              </div>
            </button>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={scrollToOrder}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm",
                  "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                )}
              >
                Оставить заявку
              </button>

              <a
                href="#classes"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                  "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                )}
              >
                Выбрать класс авто
              </a>

              <a
                href="/reviews"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                  "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                )}
              >
                Отзывы
              </a>

              <a
                href="/faq"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                  "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                )}
              >
                Вопросы и ответы
              </a>

              <a
                href="/contacts"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                  "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                )}
              >
                Контакты
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-3 md:grid-cols-3">
          {TRUST_METRICS.map((item) => (
            <div key={item.label} className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="text-3xl font-black tracking-tight text-zinc-900">{item.value}</div>
              <div className="mt-2 text-sm text-zinc-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <SectionTitle
            title="Почему выбирают Вектор РФ"
            desc="Без лишних обещаний: понятная заявка, подтверждение деталей и подбор машины под маршрут."
          />

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {TRUST_FACTS.map((fact) => (
              <div key={fact} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <div className="text-sm font-semibold leading-6 text-zinc-800">{fact}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Card title="Для аэропорта" text="Учитываем время подачи, багаж и особенности рейса. Можно сразу оставить комментарий в заявке." />
            <Card title="Для межгорода" text="Маршруты между городами по России. Уточняем остановки, обратную поездку и класс автомобиля." />
            <Card title="Для компаний" text="Поездки сотрудников и гостей, подача к нужному времени, согласование деталей заранее." />
          </div>
        </div>
      </section>

      <section id="classes" className="mx-auto max-w-6xl px-4 pb-12">
        <SectionTitle title="Классы авто" desc="Нажмите на карточку — класс подставится в форму и подсветится." />
        <div className="grid gap-3 md:grid-cols-2">
          <ClassCardButton
            title="Стандарт"
            priceHint="Оптимально для города"
            features={[
              "Базовый комфорт, аккуратная подача",
              "Подходит для 1–3 пассажиров",
              "Хороший выбор для коротких поездок",
            ]}
            note="Точную стоимость подтверждаем до подачи."
            active={selectedClass === "standard"}
            onClick={() => pickClass("standard", true)}
          />
          <ClassCardButton
            title="Комфорт"
            priceHint="Чаще выбирают для аэропортов"
            features={[
              "Больше пространства и мягче ход",
              "Удобно с багажом",
              "Подходит для деловых и семейных поездок",
            ]}
            note="Можно указать пожелания: детское кресло, остановки."
            active={selectedClass === "comfort"}
            onClick={() => pickClass("comfort", true)}
          />
          <ClassCardButton
            title="Бизнес"
            priceHint="Максимально спокойно и представительно"
            features={[
              "Повышенный комфорт и тишина в салоне",
              "Подходит для встреч и важных поездок",
              "Акцент на сервис и пунктуальность",
            ]}
            note="Уточняем детали заранее и фиксируем заявку."
            active={selectedClass === "business"}
            onClick={() => pickClass("business", true)}
          />
          <ClassCardButton
            title="Минивэн"
            priceHint="Когда нужно больше мест"
            features={[
              "Для семьи/компании и большого багажа",
              "Подходит для 4–7 пассажиров",
              "Удобно на межгород и в аэропорт",
            ]}
            note="Сообщите количество пассажиров и багаж — подберём вариант."
            active={selectedClass === "minivan"}
            onClick={() => pickClass("minivan", true)}
          />
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="md:flex md:items-start md:justify-between md:gap-8">
            <div className="md:max-w-2xl">
              <SectionTitle
                title="Отзывы клиентов"
                desc="Посмотрите реальные отзывы и оставьте свой — это помогает нам становиться лучше."
              />

              <div className="grid gap-3 md:grid-cols-3">
                <Card
                  title="Реальные отзывы"
                  text="Публикуем отзывы после модерации, чтобы сохранять качество и честность."
                />
                <Card title="Оставить отзыв" text="Имя, город и текст — достаточно. Отправка занимает меньше минуты." />
                <Card
                  title="Открытая обратная связь"
                  text="Ваше мнение важно: учитываем пожелания и улучшаем сервис."
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur md:mt-0 md:w-[360px]">
              <div className="text-sm font-extrabold text-zinc-900">Перейти к отзывам</div>
              <div className="mt-3 grid gap-2">
                <a
                  href="/reviews"
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm",
                    "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                  )}
                >
                  Смотреть и оставить отзыв
                </a>

                <button
                  type="button"
                  onClick={scrollToOrder}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                    "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                  )}
                >
                  Оставить заявку
                </button>

                <a
                  href="/faq"
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                    "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                  )}
                >
                  Вопросы и ответы
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <SectionTitle
              title="Основные разделы"
              desc="Нормальная внутренняя перелинковка для людей и поисковиков."
            />
            <div className="flex flex-wrap gap-2">
              {CORE_SERVICE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <SectionTitle
              title="Популярные маршруты"
              desc="Быстрые переходы на важные маршрутные страницы."
            />
            <div className="flex flex-wrap gap-2">
              {POPULAR_ROUTE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <SectionTitle
            title="Популярные направления по регионам"
            desc="Ещё больше быстрых переходов на маршрутные страницы для пользователей и поисковых систем."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {REGIONAL_ROUTE_GROUPS.map((group) => (
              <div key={group.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-extrabold text-zinc-900">{group.title}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:flex md:items-center md:justify-between md:gap-6 md:p-8">
          <div className="max-w-2xl">
            <div className="text-2xl font-extrabold tracking-tight text-zinc-900">Нужен трансфер или межгород?</div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Оставьте заявку на сайте или напишите в Telegram. Уточним маршрут, класс авто и подтвердим детали поездки.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 md:mt-0">
            <button
              type="button"
              onClick={scrollToOrder}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95"
            >
              Оставить заявку
            </button>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>

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
                href="/reviews"
              >
                Отзывы
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/corporate"
              >
                Корпоративным
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/faq"
              >
                Вопросы и ответы
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/requisites"
              >
                Реквизиты компании
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
                href="/prices"
              >
                Цены
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-200/70 pt-5">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-xs font-semibold text-zinc-700">Услуги</div>
                <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                  <a href="/city-transfer" className="hover:text-zinc-900 hover:underline">
                    Поездки по городу
                  </a>
                  <a href="/airport-transfer" className="hover:text-zinc-900 hover:underline">
                    Трансфер в аэропорт
                  </a>
                  <a href="/intercity-taxi" className="hover:text-zinc-900 hover:underline">
                    Междугородние поездки
                  </a>
                  <a href="/minivan-transfer" className="hover:text-zinc-900 hover:underline">
                    Минивэн / групповые поездки
                  </a>
                  <a href="/corporate" className="hover:text-zinc-900 hover:underline">
                    Корпоративные перевозки
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-zinc-700">Навигация</div>
                <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                  <a href="/services" className="hover:text-zinc-900 hover:underline">
                    Наш сервис
                  </a>
                  <a href="/reviews" className="hover:text-zinc-900 hover:underline">
                    Отзывы
                  </a>
                  <a href="/faq" className="hover:text-zinc-900 hover:underline">
                    Вопросы и ответы
                  </a>
                  <a href="/contacts" className="hover:text-zinc-900 hover:underline">
                    Контакты
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-zinc-700">Информация</div>
                <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                  <a href="/prices" className="hover:text-zinc-900 hover:underline">
                    Цены
                  </a>
                  <a href="/requisites" className="hover:text-zinc-900 hover:underline">
                    Реквизиты компании
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} Вектор РФ. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}