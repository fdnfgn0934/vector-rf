"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { CORE_SERVICE_LINKS, POPULAR_ROUTE_LINKS } from "@/lib/internal-links";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

// ВАЖНО: не импортируем LeadForm обычным import — чтобы не пытаться SSR
const LeadForm = dynamic(() => import("@/app/lead-form"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm">
      <div className="text-sm font-extrabold text-zinc-900">Форма заявки</div>
      <div className="mt-2 text-sm text-zinc-600">
        Загружаем форму… Если не загрузится — нажмите «Оставить заявку» и заполните на главной.
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href="/#order"
          className={cn(
            "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm",
            "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
          )}
        >
          Оставить заявку
        </Link>
        <Link
          href="/"
          className={cn(
            "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
            "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
          )}
        >
          На главную
        </Link>
      </div>
    </div>
  ),
});

// Типы не импортируем из lead-form, чтобы снова не подтянуть модуль на сервер
type CarClass = "standard" | "comfort" | "business" | "minivan";
type RouteType = "city" | "airport" | "intercity";

type Breadcrumb = { name: string; href: string };

type FAQItem = { q: string; a: string };

export default function ServicePage({
  breadcrumbs,
  title,
  subtitle,
  bullets,
  faq,
}: {
  breadcrumbs: Breadcrumb[];
  title: string;
  subtitle: string;
  bullets: string[];
  faq: FAQItem[];
}) {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = "+78002225650";
  const TELEGRAM = "https://t.me/vector_rf52";

  // Пробуем определить routeType по крошкам (не критично)
  const routeType: RouteType = useMemo(() => {
    const last = breadcrumbs?.[breadcrumbs.length - 1]?.href ?? "";
    if (last.includes("airport")) return "airport";
    if (last.includes("intercity")) return "intercity";
    return "city";
  }, [breadcrumbs]);

  const defaultClass: CarClass = "standard";

  return (
    <main className="min-h-screen text-zinc-900">
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Breadcrumbs */}
        <nav className="text-sm text-zinc-600">
          <ol className="flex flex-wrap gap-2">
            {breadcrumbs.map((b, idx) => (
              <li key={b.href} className="flex items-center gap-2">
                <Link className="hover:text-zinc-900 hover:underline" href={b.href}>
                  {b.name}
                </Link>
                {idx !== breadcrumbs.length - 1 ? <span className="text-zinc-400">/</span> : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-12">
          {/* Left */}
          <section className="md:col-span-7">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-4 text-base leading-7 text-zinc-700">{subtitle}</p>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="text-sm font-extrabold text-zinc-900">Преимущества</div>
              <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span className="leading-6">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {/* ✅ На сервисной странице логичнее скроллить к форме справа */}
                <a
                  href="#order"
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-sm",
                    "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                  )}
                >
                  Оставить заявку
                </a>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                    "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                  )}
                >
                  Позвонить: {PHONE_DISPLAY}
                </a>

                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold",
                    "border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                  )}
                >
                  Telegram
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="text-sm font-extrabold text-zinc-900">Вопросы</div>
              <div className="mt-4 grid gap-4">
                {faq.map((x) => (
                  <div key={x.q} className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm">
                    <div className="text-sm font-extrabold text-zinc-900">{x.q}</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-700">{x.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right */}
          {/* ✅ Якорь для /...#order */}
          <aside id="order" className="md:col-span-5 scroll-mt-24">
            <div className="rounded-3xl border border-zinc-200 bg-white/85 shadow-xl backdrop-blur">
              <div className="border-b border-zinc-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-zinc-900">Заявка на трансфер</div>
                    <div className="mt-1 text-sm text-zinc-600">Заполните форму — мы свяжемся с вами.</div>
                  </div>
                  <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                    ~ 1 мин
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* LeadForm рендерится ТОЛЬКО на клиенте */}
                <LeadForm
                  carClass={defaultClass}
                  routeType={routeType}
                  // эти колбэки нужны типам, но нам на SEO-странице менять не обязательно
                  onCarClassChange={() => {}}
                  onRouteTypeChange={() => {}}
                />
              </div>

              <div className="border-t border-zinc-200 bg-white/70 p-5">
                <div className="text-sm font-extrabold text-zinc-900">Связаться напрямую</div>
                <div className="mt-3 grid gap-2">
                  <a
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                      "border border-zinc-200 bg-white/80 shadow-sm backdrop-blur hover:bg-white"
                    )}
                    href={`tel:${PHONE_TEL}`}
                  >
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
                    Telegram
                  </a>
                </div>

                <div className="mt-4 text-xs text-zinc-500">
                  Нажимая “Отправить заявку”, вы соглашаетесь на обработку персональных данных.
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Полезные разделы</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {CORE_SERVICE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Популярные маршруты</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_ROUTE_LINKS.slice(0, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}