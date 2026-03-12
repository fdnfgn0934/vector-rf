"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LeadForm, { type CarClass, type RouteType } from "../lead-form";
import type { FAQItem } from "@/lib/city-faq";
import {
  CORE_SERVICE_LINKS,
  POPULAR_ROUTE_LINKS,
  REGIONAL_ROUTE_GROUPS,
  TRUST_FACTS,
  TRUST_METRICS,
  BLOG_LINKS,
  NEW_TERRITORIES_LINKS,
} from "@/lib/internal-links";
import {
  PageBackground, Header, Footer,
  GlassPanel, Tag, SectionHeading,
  IconPhone, IconTelegram,
  PHONE_DISPLAY, PHONE_TEL, TELEGRAM,
} from "@/app/ui/shared";

export default function SeoCityClient(props: {
  citySlug: string;
  cityName: string;
  fromGenitive: string;
  content: string;
  faq: FAQItem[];
  popular: Array<{ toSlug: string; toName: string }>;
}) {
  const [carClass, setCarClass] = useState<CarClass>("standard");
  const [routeType, setRouteType] = useState<RouteType>("intercity");
  const initialFrom = useMemo(() => props.cityName, [props.cityName]);

  return (
    <div className="min-h-screen">
      <PageBackground />
      <Header />

      <div className="animate-page">
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">

          {/* Hero + Form */}
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10 lg:items-start">
            <section>
              <div className="text-xs text-blue-400/80 mb-4">
                <Link href="/" className="hover:text-blue-600 transition-colors">Главная</Link>
                <span className="mx-2">/</span>
                <span className="text-blue-800/60 font-semibold">{props.cityName}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Tag>Межгород</Tag>
                <Tag>Аэропорт</Tag>
                <Tag>Стоимость заранее</Tag>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Междугороднее такси из {props.fromGenitive} — трансфер 24/7
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Заказать такси из {props.fromGenitive}: межгород, трансфер в аэропорт, поездки по городу. Стоимость подтверждаем заранее до выезда.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#order" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">Оставить заявку</a>
                <a href={`tel:${PHONE_TEL}`} className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">{PHONE_DISPLAY}</a>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {TRUST_METRICS.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-blue-100/60 bg-white/80 p-4 backdrop-blur-sm shadow-sm">
                    <div className="text-xl font-black tracking-tight text-blue-700">{item.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Form */}
            <div id="order" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
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
                  <LeadForm
                    carClass={carClass}
                    onCarClassChange={setCarClass}
                    routeType={routeType}
                    onRouteTypeChange={setRouteType}
                    initialFrom={initialFrom}
                  />
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* Popular routes */}
          <GlassPanel className="mt-8 p-6">
            <div className="text-sm font-bold text-slate-800 mb-4">Популярные направления из {props.cityName}</div>
            <div className="flex flex-wrap gap-2">
              {props.popular.map((p) => (
                <Link key={p.toSlug} href={`/${props.citySlug}/${p.toSlug}`}
                  className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {props.cityName} — {p.toName}
                </Link>
              ))}
            </div>
          </GlassPanel>

          {/* Trust facts */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TRUST_FACTS.map((fact) => (
              <div key={fact} className="flex items-start gap-2.5 rounded-2xl border border-blue-100/50 bg-white/75 p-4 shadow-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-700">{fact}</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <GlassPanel className="mt-6 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-800 mb-4">О городе и направлениях</div>
            <div className="space-y-4">
              {props.content.split(/\n\n+/).map((part) => part.trim()).filter(Boolean).map((part, i) => (
                <p key={i} className="text-sm leading-6 text-slate-600">{part}</p>
              ))}
            </div>
          </GlassPanel>

          {/* Service type cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: `Межгород из ${props.cityName}`, text: "Прямые поездки до нужного города без пересадок. Согласуем маршрут и класс авто.", href: "/taxi-mezhgorod", label: "Межгород" },
              { title: "Трансфер в аэропорт", text: "Встреча с табличкой, учёт времени рейса, помощь с багажом.", href: "/transfer-v-aeroport", label: "Аэропорт" },
              { title: "Корпоративным", text: "Поездки сотрудников и гостей по договору, безнал, закрывающие документы.", href: "/corporate", label: "Для бизнеса" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 backdrop-blur-sm shadow-sm">
                <div className="text-sm font-bold text-slate-800 mb-2">{c.title}</div>
                <p className="text-sm text-slate-600 mb-4">{c.text}</p>
                <Link href={c.href} className="inline-flex items-center rounded-full border border-blue-200/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{c.label}</Link>
              </div>
            ))}
          </div>

          {/* Regional routes */}
          <GlassPanel className="mt-6 p-6 md:p-8">
            <SectionHeading title="Ещё популярные направления" />
            <div className="grid gap-4 lg:grid-cols-2">
              {REGIONAL_ROUTE_GROUPS.map((group) => (
                <div key={group.title} className="rounded-2xl border border-blue-100/50 bg-white/70 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-3">{group.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-2.5 py-1 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">{link.label}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* FAQ */}
          <GlassPanel className="mt-6 p-6 md:p-8">
            <SectionHeading title="Вопросы и ответы" />
            <div className="grid gap-3">
              {props.faq.map((f, idx) => (
                <div key={idx} className="rounded-2xl border border-blue-100/50 bg-white/80 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-xs font-bold text-blue-400 shrink-0 w-5 text-center">{idx + 1}</span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{f.question}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{f.answer}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Service links */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <GlassPanel className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Основные разделы сайта</div>
              <div className="flex flex-wrap gap-2">
                {CORE_SERVICE_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{item.label}</Link>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Популярные маршруты</div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTE_LINKS.slice(0, 8).map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{item.label}</Link>
                ))}
              </div>
            </GlassPanel>
          </div>

          {/* Blog links */}
          <GlassPanel className="mt-6 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-slate-800">Полезные статьи о поездках</div>
              <Link href="/blog" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">Все статьи →</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {BLOG_LINKS.slice(0, 5).map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{item.label}</Link>
              ))}
            </div>
          </GlassPanel>

          {/* New territories */}
          <GlassPanel className="mt-4 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Новые регионы РФ</div>
            <div className="flex flex-wrap gap-2">
              {NEW_TERRITORIES_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{item.label}</Link>
              ))}
            </div>
          </GlassPanel>
        </main>
      </div>

      <Footer />
    </div>
  );
}
