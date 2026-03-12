"use client";

import Script from "next/script";
import { cn } from "@/lib/cn";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { CarClass, RouteType } from "./lead-form";

// Lazy load: форма заявки — 27KB, не нужна при первой отрисовке
const LeadForm = dynamic(() => import("./lead-form"), {
  ssr: false,
  loading: () => (
    <div className="h-32 animate-pulse rounded-3xl bg-blue-50/60" />
  ),
});
import {
  CORE_SERVICE_LINKS,
  POPULAR_ROUTE_LINKS,
  REGIONAL_ROUTE_GROUPS,
  TRUST_FACTS,
  TRUST_METRICS,
} from "@/lib/internal-links";
import {
  PageBackground,
  Header,
  Footer,
  IconPhone,
  IconTelegram,
  Tag,
  GlassPanel,
  SectionHeading,
  InfoCard,
  PHONE_DISPLAY,
  PHONE_TEL,
  TELEGRAM,
} from "@/app/ui/shared";


function RouteTypeCard({ title, desc, active, onClick }: { title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cn("rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        active ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-200/60"
               : "border-blue-100/60 bg-white/70 backdrop-blur-sm hover:border-blue-300 hover:bg-white/90")}>
      <div className={cn("text-sm font-bold", active ? "text-white" : "text-slate-800")}>{title}</div>
      <div className={cn("mt-1 text-xs leading-5", active ? "text-blue-100" : "text-slate-500")}>{desc}</div>
    </button>
  );
}

function CarClassCard({ title, priceHint, features, note, active, onClick }: { title: string; priceHint: string; features: string[]; note?: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cn("w-full rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        active ? "border-blue-400 bg-white shadow-lg shadow-blue-100/60 ring-2 ring-blue-200/50"
               : "border-blue-100/50 bg-white/75 backdrop-blur-sm hover:bg-white hover:border-blue-200")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-slate-800">{title}</div>
          <div className="mt-0.5 text-xs text-slate-500">{priceHint}</div>
        </div>
        <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-colors", active ? "bg-blue-100" : "bg-blue-50")}>
          <span className={cn("h-2.5 w-2.5 rounded-full transition-colors", active ? "bg-blue-600" : "bg-blue-300")} />
        </div>
      </div>
      <ul className="mt-4 grid gap-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
            <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", active ? "bg-blue-500" : "bg-blue-300")} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-[11px] text-slate-400">{note}</p>}
    </button>
  );
}

export default function HomePage() {
  const [selectedClass, setSelectedClass] = useState<CarClass>("standard");
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType>("intercity");
  const orderRef = useRef<HTMLDivElement | null>(null);

  const businessSchema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "TaxiService",
    name: "Вектор РФ", url: "https://vector-rf.ru", telephone: PHONE_TEL,
    areaServed: "Россия",
    serviceType: ["Междугороднее такси", "Трансфер в аэропорт", "Поездки по городу"],
    sameAs: [TELEGRAM],
  }), []);

  const navItemListSchema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Основные страницы сайта Вектор РФ",
    itemListElement: CORE_SERVICE_LINKS.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.label, url: `https://vector-rf.ru${item.href}`,
    })),
  }), []);

  const popularRoutesSchema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Популярные маршруты",
    itemListElement: POPULAR_ROUTE_LINKS.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.label, url: `https://vector-rf.ru${item.href}`,
    })),
  }), []);

  const regionalRoutesSchema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Популярные направления по регионам",
    itemListElement: REGIONAL_ROUTE_GROUPS.flatMap((group) =>
      group.links.map((item, index) => ({
        "@type": "ListItem", position: index + 1,
        name: `${group.title}: ${item.label}`, url: `https://vector-rf.ru${item.href}`,
      }))
    ),
  }), []);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Сколько стоит трансфер?",
        acceptedAnswer: { "@type": "Answer", text: "Цена зависит от маршрута и класса авто. После заявки подтверждаем стоимость до подачи." } },
      { "@type": "Question", name: "Как быстро подаётся машина?",
        acceptedAnswer: { "@type": "Answer", text: "По городу обычно 15–30 минут. В аэропорт/межгород — к согласованному времени." } },
      { "@type": "Question", name: "Встречаете в аэропорту с табличкой?",
        acceptedAnswer: { "@type": "Answer", text: "Да, водитель встречает в зоне прилёта с табличкой. Укажите номер рейса в комментарии." } },
    ],
  }), []);

  function scrollToOrder() {
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function pickClass(v: CarClass, scroll = true) { setSelectedClass(v); if (scroll) scrollToOrder(); }
  function pickRouteType(v: RouteType) { setSelectedRouteType(v); scrollToOrder(); }

  return (
    <div className="min-h-screen">
      <Script id="schema-business" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <Script id="schema-nav" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(navItemListSchema) }} />
      <Script id="schema-routes" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(popularRoutesSchema) }} />
      <Script id="schema-regional" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(regionalRoutesSchema) }} />
      <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageBackground />
      <Header />

      <div className="animate-page">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-8 pb-10 md:pt-12 md:pb-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-10 lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <Tag>Проверенные водители</Tag>
                <Tag>Фиксация заявки</Tag>
                <Tag>Стоимость заранее</Tag>
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl lg:text-[52px]">
                Такси и трансферы{" "}
                <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                  по России 24/7
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                Заказать междугороднее такси, трансфер в аэропорт или поездку по городу — оставьте заявку за 1 минуту. Уточним детали, подтвердим стоимость и организуем подачу автомобиля к нужному времени.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <RouteTypeCard title="Межгород" desc="Трансферы между городами" active={selectedRouteType === "intercity"} onClick={() => pickRouteType("intercity")} />
                <RouteTypeCard title="Аэропорт" desc="Встреча по времени рейса" active={selectedRouteType === "airport"} onClick={() => pickRouteType("airport")} />
                <RouteTypeCard title="Город" desc="Поездки по городу" active={selectedRouteType === "city"} onClick={() => pickRouteType("city")} />
              </div>
              <div className="mt-5 rounded-2xl border border-blue-100/60 bg-white/70 backdrop-blur-sm p-5 shadow-sm">
                <div className="text-sm font-bold text-slate-800 mb-3">Наши гарантии</div>
                <div className="grid gap-2">
                  {["Стоимость согласуем до подачи автомобиля", "Заявка фиксируется — ничего не теряется", "Учитываем пожелания: багаж, кресло, рейс, остановки"].map((g) => (
                    <div key={g} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />{g}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={scrollToOrder} className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">
                  Оставить заявку
                </button>
                <a href="#classes" className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">Выбрать класс авто</a>
                <a href="/reviews" className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">Отзывы</a>
                <a href="/faq" className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">FAQ</a>
              </div>
            </div>

            {/* Form */}
            <div id="order" ref={orderRef} className="scroll-mt-24">
              <GlassPanel className="overflow-hidden">
                <div className="border-b border-blue-100/60 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white/80 px-3 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50 transition-colors">
                      <IconPhone className="h-4 w-4 text-blue-500" />Позвонить
                    </a>
                    <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm">
                      <IconTelegram className="h-4 w-4" />Telegram
                    </a>
                  </div>
                  <div className="mt-3 text-sm font-bold text-slate-800">Заполнить заявку</div>
                </div>
                <div className="p-3">
                  <LeadForm carClass={selectedClass} onCarClassChange={(v) => pickClass(v, false)} routeType={selectedRouteType} onRouteTypeChange={setSelectedRouteType} />
                </div>
                <div className="border-t border-blue-100/50 bg-blue-50/40 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Связаться напрямую</div>
                  <div className="grid gap-2">
                    <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50 transition-colors">
                      <IconPhone className="h-4 w-4 text-blue-500" />{PHONE_DISPLAY}
                    </a>
                    <a href={TELEGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl btn-primary px-3 py-2 text-sm">
                      <IconTelegram className="h-4 w-4" />Написать в Telegram
                    </a>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-400">Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.</p>
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <SectionHeading title="Почему нам доверяют" desc="Работаем по всей России: межгород, аэропорт, корпоративные поездки" />
          <div className="grid gap-3 md:grid-cols-3">
            {TRUST_METRICS.map((item) => (
              <div key={item.label} className="rounded-3xl border border-blue-100/60 bg-white/80 p-6 backdrop-blur-sm shadow-sm">
                <div className="text-3xl font-black tracking-tight text-blue-700">{item.value}</div>
                <div className="mt-1.5 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <GlassPanel className="p-6 md:p-8">
            <SectionHeading title="Почему выбирают Вектор РФ" desc="Понятная заявка, подтверждение деталей, подбор машины под маршрут." />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {TRUST_FACTS.map((fact) => (
                <div key={fact} className="flex items-start gap-3 rounded-2xl border border-blue-100/50 bg-white/80 p-4 backdrop-blur-sm shadow-sm">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-slate-700">{fact}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <InfoCard title="Для аэропорта" text="Учитываем время подачи, багаж и особенности рейса. Оставьте комментарий в заявке." />
              <InfoCard title="Для межгорода" text="Маршруты между городами по России. Уточняем остановки, обратную поездку и класс авто." />
              <InfoCard title="Для компаний" text="Поездки сотрудников и гостей, подача к нужному времени, согласование деталей заранее." />
            </div>
          </GlassPanel>
        </section>

        {/* CAR CLASSES */}
        <section id="classes" className="mx-auto max-w-6xl px-4 pb-12">
          <SectionHeading title="Классы авто" desc="Нажмите на карточку — класс подставится в форму заявки." />
          <div className="grid gap-3 md:grid-cols-2">
            <CarClassCard title="Стандарт" priceHint="Оптимально для города"
              features={["Базовый комфорт, аккуратная подача", "Подходит для 1–3 пассажиров", "Хороший выбор для коротких поездок"]}
              note="Точную стоимость подтверждаем до подачи." active={selectedClass === "standard"} onClick={() => pickClass("standard")} />
            <CarClassCard title="Комфорт" priceHint="Чаще выбирают для аэропортов"
              features={["Больше пространства и мягче ход", "Удобно с багажом", "Подходит для деловых и семейных поездок"]}
              note="Можно указать пожелания: детское кресло, остановки." active={selectedClass === "comfort"} onClick={() => pickClass("comfort")} />
            <CarClassCard title="Бизнес" priceHint="Максимально спокойно и представительно"
              features={["Повышенный комфорт и тишина в салоне", "Подходит для встреч и важных поездок", "Акцент на сервис и пунктуальность"]}
              note="Уточняем детали заранее и фиксируем заявку." active={selectedClass === "business"} onClick={() => pickClass("business")} />
            <CarClassCard title="Минивэн" priceHint="Когда нужно больше мест"
              features={["Для семьи/компании и большого багажа", "Подходит для 4–7 пассажиров", "Удобно на межгород и в аэропорт"]}
              note="Сообщите количество пассажиров и багаж — подберём вариант." active={selectedClass === "minivan"} onClick={() => pickClass("minivan")} />
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <GlassPanel className="p-6 md:p-8">
            <div className="md:flex md:items-start md:justify-between md:gap-10">
              <div className="md:max-w-xl">
                <SectionHeading title="Отзывы клиентов" desc="Реальные отзывы после модерации. Оставьте свой — это помогает нам становиться лучше." />
                <div className="grid gap-3 md:grid-cols-3">
                  <InfoCard title="Реальные отзывы" text="Публикуем после модерации — честно и без накруток." />
                  <InfoCard title="Оставить отзыв" text="Имя, город и текст. Меньше минуты." />
                  <InfoCard title="Обратная связь" text="Ваше мнение — основа для улучшений." />
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:w-64 shrink-0">
                <div className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                  <div className="text-sm font-bold text-slate-800 mb-3">Перейти к отзывам</div>
                  <div className="grid gap-2">
                    <a href="/reviews" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm">Смотреть и оставить отзыв</a>
                    <button type="button" onClick={scrollToOrder} className="btn-ghost inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm">Оставить заявку</button>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* LINKS */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassPanel className="p-6">
              <SectionHeading title="Основные разделы" />
              <div className="flex flex-wrap gap-2">
                {CORE_SERVICE_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-200/60 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel className="p-6">
              <SectionHeading title="Популярные маршруты" />
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTE_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-200/60 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* REGIONAL ROUTES */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <GlassPanel className="p-6 md:p-8">
            <SectionHeading title="Популярные направления по регионам" desc="Маршрутные страницы для быстрого перехода." />
            <div className="grid gap-4 lg:grid-cols-2">
              {REGIONAL_ROUTE_GROUPS.map((group) => (
                <div key={group.title} className="rounded-2xl border border-blue-100/50 bg-white/70 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-3">{group.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.links.map((item) => (
                      <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>

        {/* CTA BANNER */}
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
            <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-white">Нужен трансфер или межгород?</div>
                <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100">Оставьте заявку на сайте или напишите в Telegram. Уточним маршрут, класс авто и подтвердим детали поездки.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button type="button" onClick={scrollToOrder} className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm hover:bg-blue-50 transition-colors">
                  Оставить заявку
                </button>
                <a href={TELEGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
                  <IconTelegram className="h-4 w-4" />Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
