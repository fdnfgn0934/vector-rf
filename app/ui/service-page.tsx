"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { CORE_SERVICE_LINKS, POPULAR_ROUTE_LINKS } from "@/lib/internal-links";
import {
  PageShell, PageBackground, Header, Footer,
  Breadcrumb, GlassPanel, Tag, SectionHeading,
  IconPhone, IconTelegram,
  PHONE_DISPLAY, PHONE_TEL, TELEGRAM,
} from "@/app/ui/shared";

const LeadForm = dynamic(() => import("@/app/lead-form"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-blue-100/60 bg-white/80 p-5">
      <div className="text-sm font-bold text-slate-800">Загружаем форму...</div>
      <div className="mt-2 text-sm text-slate-500">Если не загрузится — вернитесь на главную.</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/#order" className="btn-primary inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm">Оставить заявку</Link>
        <Link href="/" className="btn-ghost inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm">На главную</Link>
      </div>
    </div>
  ),
});

type CarClass = "standard" | "comfort" | "business" | "minivan";
type RouteType = "city" | "airport" | "intercity";
type BreadcrumbItem = { name: string; href: string };
type FAQItem = { q: string; a: string };

export default function ServicePage({
  breadcrumbs,
  title,
  subtitle,
  bullets,
  faq,
}: {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  bullets: string[];
  faq: FAQItem[];
}) {
  const routeType: RouteType = useMemo(() => {
    const last = breadcrumbs?.[breadcrumbs.length - 1]?.href ?? "";
    if (last.includes("airport")) return "airport";
    if (last.includes("intercity")) return "intercity";
    return "city";
  }, [breadcrumbs]);

  return (
    <div className="min-h-screen">
      <PageBackground />
      <Header />

      <div className="animate-page">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10 lg:items-start">

            {/* Content */}
            <section>
              <Breadcrumb items={breadcrumbs} />

              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>Проверенные водители</Tag>
                <Tag>Фиксация заявки</Tag>
                <Tag>Стоимость заранее</Tag>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{title}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{subtitle}</p>

              {/* Feature pills */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {bullets.slice(0, 3).map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100/60 bg-white/80 p-4 backdrop-blur-sm shadow-sm">
                    <div className="text-sm font-bold text-slate-800">{item}</div>
                  </div>
                ))}
              </div>

              {/* All bullets */}
              <div className="mt-4 rounded-2xl border border-blue-100/60 bg-white/70 p-5 backdrop-blur-sm">
                <div className="text-sm font-bold text-slate-800 mb-3">Преимущества</div>
                <ul className="grid gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="#order" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">Оставить заявку</a>
                <a href={`tel:${PHONE_TEL}`} className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm">{PHONE_DISPLAY}</a>
                <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm">
                  <IconTelegram className="h-4 w-4 text-blue-600" />Telegram
                </a>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/reviews" className="btn-ghost inline-flex items-center rounded-xl px-4 py-2.5 text-sm">Отзывы</Link>
                <Link href="/faq" className="btn-ghost inline-flex items-center rounded-xl px-4 py-2.5 text-sm">Вопросы</Link>
                <Link href="/contacts" className="btn-ghost inline-flex items-center rounded-xl px-4 py-2.5 text-sm">Контакты</Link>
              </div>
            </section>

            {/* Form */}
            <aside id="order" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
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
                  <LeadForm carClass={"standard" as CarClass} routeType={routeType} onCarClassChange={() => {}} onRouteTypeChange={() => {}} />
                </div>
              </GlassPanel>
            </aside>
          </div>

          {/* FAQ */}
          <section className="mt-10">
            <GlassPanel className="p-6 md:p-8">
              <SectionHeading title="Вопросы и ответы" />
              <div className="grid gap-3">
                {faq.map((x, i) => (
                  <div key={x.q} className="rounded-2xl border border-blue-100/50 bg-white/80 p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-bold text-blue-400 shrink-0 w-5 text-center">{i + 1}</span>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{x.q}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{x.a}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </section>

          {/* Links */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <GlassPanel className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">Полезные разделы</div>
              <div className="flex flex-wrap gap-2">
                {CORE_SERVICE_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">Популярные маршруты</div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTE_LINKS.slice(0, 8).map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
