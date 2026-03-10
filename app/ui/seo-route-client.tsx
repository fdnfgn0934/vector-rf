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
} from "@/lib/internal-links";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function SmallBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5",
        "text-xs font-semibold text-zinc-800 shadow-sm"
      )}
    >
      {children}
    </span>
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
      <path
        d="M8.1 15.4 18.4 7.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IntentCard({
  title,
  text,
  href,
  hrefLabel,
}: {
  title: string;
  text: string;
  href: string;
  hrefLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="text-sm font-extrabold text-zinc-900">{title}</div>
      <p className="mt-3 text-sm leading-6 text-zinc-700">{text}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
      >
        {hrefLabel}
      </Link>
    </div>
  );
}

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
  const PHONE_TEL = "+78002225650";
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const TELEGRAM = "https://t.me/vector_rf52";

  const [carClass, setCarClass] = useState<CarClass>("standard");
  const [routeType, setRouteType] = useState<RouteType>("intercity");

  const keywordBadges = [
    `такси ${props.fromName} — ${props.toName}`,
    `междугороднее такси ${props.fromName} — ${props.toName}`,
    `такси межгород ${props.fromName} — ${props.toName}`,
    `трансфер ${props.fromName} — ${props.toName}`,
  ];

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/65 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="text-sm font-extrabold text-zinc-900 hover:opacity-90"
          >
            Вектор РФ
          </Link>
          <Link
            href={props.cityBackHref}
            className="text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            {props.cityBackLabel}
          </Link>
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

            <div className="mt-3 text-sm font-extrabold text-zinc-900">
              Заполнить заявку
            </div>
          </div>

          <div className="p-4 md:p-5">
            <LeadForm
              carClass={carClass}
              onCarClassChange={setCarClass}
              routeType={routeType}
              onRouteTypeChange={setRouteType}
              initialFrom={props.fromName}
              initialTo={props.toName}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          <section>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              {props.heading}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">{props.subtitle}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <SmallBadge>Подтверждение цены до поездки</SmallBadge>
              <SmallBadge>Комфорт / бизнес / минивэн</SmallBadge>
              <SmallBadge>Заявка онлайн</SmallBadge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {keywordBadges.map((item) => (
                <SmallBadge key={item}>{item}</SmallBadge>
              ))}
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {props.routeFacts.map((fact) => (
              <div
                key={fact}
                className="rounded-3xl border border-sky-100 bg-sky-50/70 p-4 shadow-sm"
              >
                <div className="text-sm font-semibold text-zinc-800">{fact}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {TRUST_FACTS.map((fact) => (
              <div
                key={fact}
                className="rounded-3xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <div className="text-sm leading-6 text-zinc-700">{fact}</div>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">
              Описание маршрута
            </div>
            <div className="mt-3 space-y-4">
              {props.content
                .split(/\n\n+/)
                .map((part) => part.trim())
                .filter(Boolean)
                .map((part, index) => (
                  <p key={index} className="text-sm leading-6 text-zinc-700">
                    {part}
                  </p>
                ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <IntentCard
              title={`Междугороднее такси ${props.fromName} — ${props.toName}`}
              text={`Маршрут ${props.fromName} — ${props.toName} подходит для поездок между городами без пересадок. Это удобный вариант, когда нужно заранее заказать машину на конкретное время.`}
              href="/intercity-taxi"
              hrefLabel="Подробнее о междугороднем такси"
            />
            <IntentCard
              title={`Такси межгород ${props.fromName} — ${props.toName}`}
              text={`Такси межгород по направлению ${props.fromName} — ${props.toName} выбирают для командировок, семейных поездок, поездок с багажом и встреч без ожиданий на вокзалах и пересадках.`}
              href={`/${props.fromSlug}`}
              hrefLabel={`Все маршруты из ${props.fromName}`}
            />
            <IntentCard
              title="Трансфер в аэропорт и обратно"
              text={`Если кроме маршрута ${props.fromName} — ${props.toName} нужен трансфер в аэропорт или из аэропорта, его можно оформить отдельно. Подберём класс авто и время подачи под рейс.`}
              href="/airport-transfer"
              hrefLabel="Перейти к аэропортному трансферу"
            />
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">
              Текст по ключевым запросам
            </div>
            <div className="mt-4 space-y-4">
              {(props.keywordText && props.keywordText.length > 0
                ? props.keywordText
                : [
                    `Такси ${props.fromName} — ${props.toName} доступно для поездок между городами без пересадок и ожиданий.`,
                    `Маршрут ${props.fromName} — ${props.toName} можно заранее оформить как междугороднее такси с подачей ко времени.`,
                    `Трансфер ${props.fromName} — ${props.toName} подойдёт для деловых поездок, семейных выездов и поездок с багажом.`,
                  ]
              ).map((text, index) => (
                <p key={index} className="text-sm leading-6 text-zinc-700">
                  {text}
                </p>
              ))}
            </div>
          </section>

          {props.reverseRoute ? (
            <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="text-sm font-extrabold text-zinc-900">
                Обратный маршрут и полезные переходы
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Для маршрута {props.fromName} — {props.toName} также может быть
                полезен обратный путь, страница города отправления и основные
                коммерческие разделы сайта.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={props.reverseRoute.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {props.reverseRoute.label}
                </Link>
                <Link
                  href={`/${props.fromSlug}`}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  Все маршруты из {props.fromName}
                </Link>
                <Link
                  href={`/${props.toSlug}`}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  Все маршруты в {props.toName}
                </Link>
                <Link
                  href="/intercity-taxi"
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  Междугороднее такси
                </Link>
              </div>
            </section>
          ) : null}

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">
              Ещё маршруты из {props.fromName}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {props.moreFromCity.map((p) => (
                <Link
                  key={p.toSlug}
                  href={`/${props.fromSlug}/${p.toSlug}`}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:bg-zinc-50"
                >
                  {props.fromName} — {p.toName}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-900">
              Полезные разделы
            </div>
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
            <div className="text-sm font-extrabold text-zinc-900">
              Популярные маршруты по регионам
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {REGIONAL_ROUTE_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-4"
                >
                  <div className="text-sm font-bold text-zinc-900">
                    {group.title}
                  </div>
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
            <div className="text-sm font-extrabold text-zinc-900">FAQ</div>
            <div className="mt-4 space-y-4">
              {props.faq.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 bg-white/70 p-4"
                >
                  <div className="text-sm font-semibold text-zinc-900">
                    {f.question}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-zinc-600">
                    {f.answer}
                  </div>
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
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-zinc-900 hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-zinc-700">
                Популярные маршруты
              </div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                {POPULAR_ROUTE_LINKS.slice(0, 6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-zinc-900 hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-zinc-700">Контакты</div>
              <div className="mt-3 grid gap-2 text-xs text-zinc-600">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="hover:text-zinc-900 hover:underline"
                >
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 hover:underline"
                >
                  Telegram
                </a>
                <Link
                  href="/contacts"
                  className="hover:text-zinc-900 hover:underline"
                >
                  Контакты и реквизиты
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} Вектор РФ. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}