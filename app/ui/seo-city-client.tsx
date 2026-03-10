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
        d="M7.8 3.9c.6-.5 1.5-.5 2.1 0l2.1 2.1c.6.6.6 1.5 0 2.1l-1 1a1 1 0 0 0-.2 1.1c.8 1.6 2.1 2.9 3.7 3.7a1 1 0 0 0 1.1-.2l1-1c.6-.6 1.5-.6 2.1 0l2.1 2.1c.5.6.5 1.5 0 2.1l-1.2 1.2c-.9.9-2.2 1.2-3.4.8-6.7-2.2-12.1-7.6-14.3-14.3-.4-1.2-.1-2.5.8-3.4L7.8 3.9Z"
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

function SmallCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="text-sm font-extrabold text-zinc-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{text}</div>
    </div>
  );
}

export default function SeoCityClient(props: {
  citySlug: string;
  cityName: string;
  fromGenitive: string;
  content: string;
  faq: FAQItem[];
  popular: Array<{ toSlug: string; toName: string }>;
}) {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = "+78002225650";
  const TELEGRAM = "https://t.me/vector_rf52";

  const [carClass, setCarClass] = useState<CarClass>("standard");
  const [routeType, setRouteType] = useState<RouteType>("intercity");

  const initialFrom = useMemo(() => props.cityName, [props.cityName]);

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/65 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <Wordmark />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold",
                "border border-zinc-200 bg-white/70 shadow-sm backdrop-blur hover:bg-white"
              )}
              title="Позвонить"
            >
              <IconPhone className="h-4 w-4 text-sky-700" />
              <span className="hidden md:inline text-zinc-800">{PHONE_DISPLAY}</span>
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

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="rounded-[28px] border border-zinc-200 bg-white/85 shadow-xl backdrop-blur">
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
                <IconPhone className="h-4 w-4 text-sky-700" />
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

          <div className="p-4 md:p-5">
            <LeadForm
              carClass={carClass}
              onCarClassChange={setCarClass}
              routeType={routeType}
              onRouteTypeChange={setRouteType}
              initialFrom={initialFrom}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          <section>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Междугороднее такси из {props.fromGenitive}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Заказ трансфера: согласуем стоимость заранее, подача по времени, работа 24/7.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <SmallCard title="Цена заранее" text="Стоимость согласуем до поездки — без сюрпризов." />
              <SmallCard title="Подача по времени" text="Укажете адрес и время — подстроимся под график." />
              <SmallCard title="Классы авто" text="Стандарт / комфорт / бизнес / минивэн." />
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {TRUST_METRICS.map((item) => (
              <div key={item.label} className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="text-2xl font-black tracking-tight text-zinc-900">{item.value}</div>
                <div className="mt-2 text-sm text-zinc-600">{item.label}</div>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Почему выбирают Вектор РФ</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {TRUST_FACTS.map((fact) => (
                <div key={fact} className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white/70 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <span className="text-sm leading-6 text-zinc-700">{fact}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">О городе</div>
            <p className="mt-3 text-sm leading-6 text-zinc-700">{props.content}</p>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">
              Популярные маршруты из {props.fromGenitive}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {props.popular.map((p) => (
                <Link
                  key={p.toSlug}
                  href={`/${props.citySlug}/${p.toSlug}`}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {props.cityName} — {p.toName}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Основные разделы сайта</div>
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

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Ещё популярные направления</div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {REGIONAL_ROUTE_GROUPS.map((group) => (
                <div key={group.title} className="rounded-2xl border border-zinc-200 bg-white/70 p-4">
                  <div className="text-sm font-bold text-zinc-900">{group.title}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">Часто задаваемые вопросы</div>
            <div className="mt-4 space-y-4">
              {props.faq.map((f, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-200 bg-white/70 p-4">
                  <div className="text-sm font-semibold text-zinc-900">{f.question}</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-600">{f.answer}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <div className="text-xs font-semibold text-zinc-700">Услуги</div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                {CORE_SERVICE_LINKS.slice(0, 5).map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-zinc-900 hover:underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-zinc-700">Популярные маршруты</div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                {POPULAR_ROUTE_LINKS.slice(0, 6).map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-zinc-900 hover:underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-zinc-700">Контакты</div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                <a href={`tel:${PHONE_TEL}`} className="hover:text-zinc-900 hover:underline">
                  {PHONE_DISPLAY}
                </a>
                <a href={TELEGRAM} target="_blank" rel="noreferrer" className="hover:text-zinc-900 hover:underline">
                  Telegram
                </a>
                <Link href="/contacts" className="hover:text-zinc-900 hover:underline">
                  Контакты и реквизиты
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} Вектор РФ. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}
