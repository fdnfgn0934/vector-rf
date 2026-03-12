import type { Metadata } from "next";
import {
  PageShell,
} from "@/app/ui/shared";
import { cn } from "@/lib/cn";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Спасибо за заявку",
  robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "8 (800) 222-56-50";
const PHONE_TEL = "+78002225650";
const TELEGRAM_URL = "https://t.me/vector_rf52";

export default function ThanksPage() {
  return (
    <PageShell>
    <main className="relative min-h-screen overflow-hidden bg-[#f3f7ff] text-slate-900">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.30),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6 md:py-16">
        <div className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Заявка успешно отправлена
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              Спасибо за обращение
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Мы получили вашу заявку и скоро свяжемся с вами для подтверждения
              маршрута, времени подачи и финальных деталей поездки.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100/60 bg-white/90 p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wide text-sky-600">
                  Шаг 1
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">
                  Проверим заявку
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Уточним маршрут, адреса и формат поездки.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100/60 bg-white/90 p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wide text-sky-600">
                  Шаг 2
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">
                  Свяжемся с вами
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Подтвердим детали и ответим на вопросы.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100/60 bg-white/90 p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wide text-sky-600">
                  Шаг 3
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">
                  Подберём поездку
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Согласуем подачу автомобиля и стоимость заранее.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-sm",
                  "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95"
                )}
              >
                На главную
              </Link>

              <Link
                href="/taxi-mezhgorod"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold",
                  "border border-blue-100/60 bg-white/90 text-slate-900 shadow-sm hover:bg-white"
                )}
              >
                Междугороднее такси
              </Link>

              <Link
                href="/contacts"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold",
                  "border border-blue-100/60 bg-white/90 text-slate-900 shadow-sm hover:bg-white"
                )}
              >
                Контакты
              </Link>
            </div>
          </section>

          <aside className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur md:p-8">
            <div className="text-sm font-extrabold uppercase tracking-wide text-slate-400">
              Связь
            </div>

            <div className="mt-4 rounded-3xl border border-blue-100/60 bg-white/90 p-5 shadow-sm">
              <div className="text-sm font-bold text-slate-900">
                Если нужно срочно
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Вы можете связаться с нами напрямую, не дожидаясь обратного звонка.
              </p>

              <div className="mt-5 grid gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold",
                    "border border-blue-100/60 bg-white text-slate-900 shadow-sm hover:bg-blue-50/50"
                  )}
                >
                  Позвонить: {PHONE_DISPLAY}
                </a>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold",
                    "border border-blue-100/60 bg-white text-slate-900 shadow-sm hover:bg-blue-50/50"
                  )}
                >
                  Написать в Telegram
                </a>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-blue-100/60 bg-gradient-to-br from-sky-50 to-indigo-50 p-5">
              <div className="text-sm font-bold text-slate-900">
                Что можно сделать дальше
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>• Вернуться на главную и посмотреть другие услуги</li>
                <li>• Открыть раздел междугородних поездок</li>
                <li>• Перейти в контакты для быстрого звонка</li>
              </ul>
            </div>

            <div className="mt-5 text-xs leading-5 text-slate-400">
              Обычно мы отвечаем максимально быстро в рабочее время.
            </div>
          </aside>
        </div>
      </div>
    </main>
    </PageShell>
  );
}
