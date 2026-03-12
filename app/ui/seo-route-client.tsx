"use client";

import { useState } from "react";
import Link from "next/link";
import LeadForm, { type CarClass, type RouteType } from "../lead-form";
import type { FAQItem } from "@/lib/city-faq";
import {
  CORE_SERVICE_LINKS,
  POPULAR_ROUTE_LINKS,
  REGIONAL_ROUTE_GROUPS,
  TRUST_FACTS,
  BLOG_LINKS,
} from "@/lib/internal-links";
import {
  PageBackground, Header, Footer,
  GlassPanel, Tag, SectionHeading,
  IconPhone, IconTelegram,
  PHONE_DISPLAY, PHONE_TEL, TELEGRAM,
} from "@/app/ui/shared";

export default function SeoRouteClient(props: {
  fromSlug: string;
  toSlug: string;
  fromName: string;
  toName: string;
  heading: string;
  subtitle: string;
  routeFacts: string[];
  cityBackHref: string;
  cityBackLabel: string;
  content: string;
  keywordText?: string[];
  faq: FAQItem[];
  moreFromCity: Array<{ toSlug: string; toName: string }>;
  reverseRoute?: { href: string; label: string };
}) {
  const [carClass, setCarClass] = useState<CarClass>("standard");
  const [routeType, setRouteType] = useState<RouteType>("intercity");

  const keywordBadges = [
    `такси ${props.fromName} — ${props.toName}`,
    `трансфер ${props.fromName} — ${props.toName}`,
    `межгород ${props.fromName} — ${props.toName}`,
  ];

  return (
    <div className="min-h-screen">
      <PageBackground />
      <Header />

      <div className="animate-page">
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">

          {/* Hero + Form */}
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10 lg:items-start">
            <section>
              {/* Breadcrumb mini */}
              <div className="text-xs text-blue-400/80 mb-4">
                <Link href="/" className="hover:text-blue-600 transition-colors">Главная</Link>
                <span className="mx-2">/</span>
                <Link href={props.cityBackHref} className="hover:text-blue-600 transition-colors">{props.cityBackLabel}</Link>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Tag>Межгород</Tag>
                <Tag>Без пересадок</Tag>
                <Tag>Стоимость заранее</Tag>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{props.heading}</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">{props.subtitle}</p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {props.routeFacts.map((fact) => (
                  <div key={fact} className="flex items-start gap-2.5 rounded-2xl border border-blue-100/60 bg-white/75 p-3.5 backdrop-blur-sm shadow-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm text-slate-700">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {keywordBadges.map((b) => (
                  <span key={b} className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-semibold text-blue-700">{b}</span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#order" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">Оставить заявку</a>
                <a href={`tel:${PHONE_TEL}`} className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">{PHONE_DISPLAY}</a>
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
                    initialFrom={props.fromName}
                    initialTo={props.toName}
                  />
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* Trust facts */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TRUST_FACTS.map((fact) => (
              <div key={fact} className="flex items-start gap-2.5 rounded-2xl border border-blue-100/50 bg-white/75 p-4 shadow-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-700">{fact}</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <GlassPanel className="mt-6 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-800 mb-4">Описание маршрута</div>
            <div className="space-y-4">
              {props.content.split(/\n\n+/).map((part) => part.trim()).filter(Boolean).map((part, i) => (
                <p key={i} className="text-sm leading-6 text-slate-600">{part}</p>
              ))}
            </div>
          </GlassPanel>

          {/* Context cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: `Такси ${props.fromName} — ${props.toName}`, text: `Маршрут без пересадок. Удобно для командировок, семейных выездов и поездок с багажом.`, href: "/taxi-mezhgorod", label: "Межгород" },
              { title: `Маршруты из ${props.fromName}`, text: `Все направления из города ${props.fromName} с подбором класса авто и согласованием стоимости.`, href: props.cityBackHref, label: `Все маршруты из ${props.fromName}` },
              { title: "Трансфер в аэропорт", text: "Отдельная услуга — трансфер в аэропорт или из него. Встреча с табличкой, учёт рейса.", href: "/transfer-v-aeroport", label: "Аэропорт" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 backdrop-blur-sm shadow-sm">
                <div className="text-sm font-bold text-slate-800 mb-2">{c.title}</div>
                <p className="text-sm text-slate-600 mb-4">{c.text}</p>
                <Link href={c.href} className="inline-flex items-center rounded-full border border-blue-200/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{c.label}</Link>
              </div>
            ))}
          </div>

          {/* Keyword text */}
          <GlassPanel className="mt-6 p-6">
            <div className="space-y-3">
              {(props.keywordText?.length ? props.keywordText : [
                `Такси ${props.fromName} — ${props.toName} доступно для поездок между городами без пересадок.`,
                `Маршрут ${props.fromName} — ${props.toName} можно заранее оформить как междугороднее такси с подачей ко времени.`,
                `Трансфер ${props.fromName} — ${props.toName} подойдёт для деловых поездок, семейных выездов и поездок с багажом.`,
              ]).map((text, i) => (
                <p key={i} className="text-sm leading-6 text-slate-600">{text}</p>
              ))}
            </div>
          </GlassPanel>

          {/* Reverse route & navigation */}
          {props.reverseRoute && (
            <GlassPanel className="mt-6 p-6">
              <div className="text-sm font-bold text-slate-800 mb-4">Обратный маршрут и полезные переходы</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: props.reverseRoute.href, label: props.reverseRoute.label },
                  { href: `/${props.fromSlug}`, label: `Все маршруты из ${props.fromName}` },
                  { href: `/${props.toSlug}`, label: `Все маршруты в ${props.toName}` },
                  { href: "/taxi-mezhgorod", label: "Междугороднее такси" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">{l.label}</Link>
                ))}
              </div>
            </GlassPanel>
          )}

          {/* More from city */}
          <GlassPanel className="mt-6 p-6">
            <div className="text-sm font-bold text-slate-800 mb-4">Ещё маршруты из {props.fromName}</div>
            <div className="flex flex-wrap gap-2">
              {props.moreFromCity.map((p) => (
                <Link key={p.toSlug} href={`/${props.fromSlug}/${p.toSlug}`} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {props.fromName} — {p.toName}
                </Link>
              ))}
            </div>
          </GlassPanel>

          {/* Regional routes */}
          <GlassPanel className="mt-6 p-6">
            <div className="text-sm font-bold text-slate-800 mb-4">Популярные направления по регионам</div>
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
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Полезные разделы</div>
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
              <Link href="/blog" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">Весь блог →</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {BLOG_LINKS.slice(0, 5).map((item) => (
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
