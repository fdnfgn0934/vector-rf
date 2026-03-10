"use client";

import { useState } from "react";
import LeadForm, { type CarClass, type RouteType } from "../lead-form";

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

export default function CityPageClient() {
  const PHONE_DISPLAY = "8 (800) 222-56-50";
  const PHONE_TEL = "+78002225650";
  const TELEGRAM = "https://t.me/vector_rf52";

  const [carClass, setCarClass] = useState<CarClass>("standard");
  const [routeType, setRouteType] = useState<RouteType>("city");

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/65 backdrop-blur">
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

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Трансферы по городу</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Поездки по городу и встречи: подача авто по согласованию, стоимость заранее. Заявка онлайн 24/7.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <SmallCard title="Стоимость заранее" text="Согласуем цену до подачи автомобиля — без сюрпризов." />
              <SmallCard title="Подача по времени" text="Укажете время/адрес — подстроимся под ваш график." />
              <SmallCard title="Классы авто" text="Стандарт / комфорт / бизнес / минивэн — под задачу." />
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-zinc-200 bg-white/85 shadow-xl backdrop-blur">
              <div className="border-b border-zinc-200 p-5">
                <div className="text-sm font-extrabold text-zinc-900">Заявка на поездку по городу</div>
                <div className="mt-1 text-sm text-zinc-600">Заполните форму — мы свяжемся с вами.</div>
              </div>

              <div className="p-5">
                <LeadForm
                  carClass={carClass}
                  onCarClassChange={setCarClass}
                  routeType={routeType}
                  onRouteTypeChange={setRouteType}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}