import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Script from "next/script";
import {
  PageShell,
} from "@/app/ui/shared";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";

const PHONE_DISPLAY = "8 (800) 222-56-50";
const PHONE_TEL = "+78002225650";
const TELEGRAM = "https://t.me/vector_rf52";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Вектор РФ 2025",
  description:
    "Политика конфиденциальности сервиса «Вектор РФ»: обработка персональных данных, цели, сроки хранения, меры защиты, права пользователя.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy`,
    title: "Политика конфиденциальности — Вектор РФ 2025",
    description:
      "Как «Вектор РФ» обрабатывает персональные данные: цели, состав, сроки хранения, защита, права пользователя.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Политика конфиденциальности — Вектор РФ 2025",
    description:
      "Обработка персональных данных в «Вектор РФ»: цели, состав, сроки хранения, защита, права пользователя.",
    images: ["/og.jpg"],
  },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Политика конфиденциальности — Вектор РФ", item: `${SITE_URL}/privacy` },
    ],
  };

  return (
    <PageShell>
    <main className="min-h-screen text-slate-900">
      <Script
        id="ld-privacy-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* фон как на главной */}
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.28),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <header className="rounded-3xl border border-blue-100/60 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">Документы</div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Политика конфиденциальности</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Здесь описано, какие данные мы получаем через сайт, зачем они нужны, как мы их защищаем и какие права
                есть у пользователя.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/#order"
                className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95"
              >
                Оставить заявку
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-blue-100/60 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-blue-50/50"
              >
                На главную
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className={cn("rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur hover:bg-white")}
            >
              <div className="text-xs font-semibold text-slate-500">Телефон</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">{PHONE_DISPLAY}</div>
              <div className="mt-1 text-sm text-slate-500">Нажмите, чтобы позвонить</div>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className={cn("rounded-2xl border border-blue-100/60 bg-white/80 p-5 shadow-sm backdrop-blur hover:bg-white")}
            >
              <div className="text-xs font-semibold text-slate-500">Telegram</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">Написать в Telegram</div>
              <div className="mt-1 text-sm text-slate-500">Ответим быстрее по срочным вопросам</div>
            </a>
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-blue-100/60 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="prose max-w-none prose-slate">
            <h2>1. Общие положения</h2>
            <p>
              Настоящая политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных
              данных пользователей сайта {SITE_URL} (далее — «Сайт») сервисом «{SITE_NAME}».
            </p>

            <h2>2. Какие данные мы можем получать</h2>
            <p>При использовании Сайта пользователь может предоставить:</p>
            <ul>
              <li>контактные данные (например, имя и номер телефона);</li>
              <li>данные по заявке (маршрут, дата/время, комментарии, выбранный класс авто);</li>
              <li>технические данные: cookies, UTM-метки и иные параметры, необходимые для работы сайта и аналитики.</li>
            </ul>

            <h2>3. Цели обработки</h2>
            <ul>
              <li>принятие и обработка заявок, обратная связь с пользователем;</li>
              <li>уточнение деталей поездки и согласование условий/стоимости;</li>
              <li>улучшение качества сервиса и работы сайта;</li>
              <li>аналитика обращений и эффективности рекламных кампаний (UTM).</li>
            </ul>

            <h2>4. Правовые основания</h2>
            <p>
              Обработка осуществляется на основании согласия пользователя, а также в пределах, необходимых для исполнения
              запроса/заявки пользователя.
            </p>

            <h2>5. Сроки хранения</h2>
            <p>
              Персональные данные хранятся не дольше, чем это требуется для целей обработки, либо до момента отзыва
              согласия пользователем, если иное не требуется законодательством.
            </p>

            <h2>6. Передача третьим лицам</h2>
            <p>
              Мы не продаём персональные данные. Передача может осуществляться только в случаях, необходимых для
              выполнения заявки и функционирования сервиса (например, технические сервисы уведомлений), либо по требованию
              закона.
            </p>

            <h2>7. Меры защиты</h2>
            <p>
              Мы применяем организационные и технические меры для защиты данных от неправомерного доступа, изменения,
              раскрытия или уничтожения.
            </p>

            <h2>8. Права пользователя</h2>
            <p>Пользователь вправе:</p>
            <ul>
              <li>запросить сведения об обработке своих данных;</li>
              <li>требовать уточнения, блокирования или удаления данных при наличии оснований;</li>
              <li>отозвать согласие на обработку персональных данных.</li>
            </ul>

            <h2>9. Как связаться</h2>
            <p>
              По вопросам обработки персональных данных вы можете связаться с нами по телефону <b>{PHONE_DISPLAY}</b> или в
              Telegram.
            </p>

            <h2>10. Изменения политики</h2>
            <p>Мы можем обновлять Политику. Актуальная версия публикуется на этой странице.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/agreement"
              className="inline-flex items-center justify-center rounded-xl border border-blue-100/60 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-blue-50/50"
            >
              Соглашение / оферта
            </Link>

            <Link
              href="/#order"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95"
            >
              Оставить заявку
            </Link>
          </div>
        </section>

        <footer className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} Вектор РФ. Все права защищены.</footer>
      </div>
    </main>
    </PageShell>
  );
}
