import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";

const PHONE_DISPLAY = "8 (800) 222-56-50";
const PHONE_TEL = "+78002225650";
const TELEGRAM = "https://t.me/vector_rf52";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export const metadata: Metadata = {
  title: "Пользовательское соглашение и публичная оферта",
  description:
    "Пользовательское соглашение и публичная оферта сервиса «Вектор РФ»: условия оформления заявки на трансфер, порядок согласования стоимости, ответственность сторон.",
  alternates: { canonical: `${SITE_URL}/agreement` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/agreement`,
    title: "Пользовательское соглашение и публичная оферта",
    description:
      "Условия оформления заявки на трансфер, порядок согласования стоимости, ответственность сторон.",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Пользовательское соглашение и публичная оферта",
    description:
      "Условия оформления заявки на трансфер, порядок согласования стоимости, ответственность сторон.",
    images: ["/og.jpg"],
  },
};

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-extrabold tracking-tight text-zinc-900">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm leading-6 text-zinc-700">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-6 text-zinc-700">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
      <span>{children}</span>
    </li>
  );
}

export default function AgreementPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Соглашение и оферта", item: `${SITE_URL}/agreement` },
    ],
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/agreement#webpage`,
    url: `${SITE_URL}/agreement`,
    name: "Пользовательское соглашение и публичная оферта",
    inLanguage: "ru-RU",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    about: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
  };

  return (
    <main className="min-h-screen text-zinc-900">
      <Script
        id="ld-agreement-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-agreement-page"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      {/* фон как на главной */}
      <div className="fixed inset-0 -z-20 bg-[#f3f7ff]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(56,189,248,0.28),transparent_60%),radial-gradient(900px_520px_at_12%_18%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(900px_520px_at_88%_20%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-600">Документы</div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                Пользовательское соглашение и публичная оферта
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                Настоящий документ регулирует порядок оформления заявки на трансфер/перевозку через сайт «Вектор РФ»,
                а также условия оказания услуг после подтверждения заявки диспетчером.
              </p>
              <div className="mt-3 text-xs text-zinc-500">
                Дата публикации: {new Date().toLocaleDateString("ru-RU")}
              </div>
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
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
              >
                На главную
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className={cn("rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur hover:bg-white")}
            >
              <div className="text-xs font-semibold text-zinc-600">Телефон</div>
              <div className="mt-1 text-sm font-extrabold text-zinc-900">{PHONE_DISPLAY}</div>
              <div className="mt-1 text-sm text-zinc-600">Нажмите, чтобы позвонить</div>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className={cn("rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur hover:bg-white")}
            >
              <div className="text-xs font-semibold text-zinc-600">Telegram</div>
              <div className="mt-1 text-sm font-extrabold text-zinc-900">Написать в Telegram</div>
              <div className="mt-1 text-sm text-zinc-600">Ответим быстрее по срочным вопросам</div>
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#terms">
              1. Термины
            </a>
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#order">
              2. Оформление заявки
            </a>
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#price">
              3. Стоимость и оплата
            </a>
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#cancel">
              4. Отмена и изменения
            </a>
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#responsibility">
              5. Ответственность
            </a>
            <a className="text-sm font-semibold text-sky-800 hover:underline" href="#privacy">
              6. Персональные данные
            </a>
          </div>
        </div>

        <article className="mt-8 space-y-8 rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
          <section>
            <H2 id="terms">1. Термины и общие положения</H2>
            <P>
              <b>Сайт</b> — интернет-ресурс «Вектор РФ», доступный по адресу {SITE_URL}. <b>Пользователь</b> — лицо,
              отправившее заявку через формы на сайте. <b>Исполнитель</b> — организация/служба, оказывающая услуги
              перевозки/трансфера под брендом «Вектор РФ». <b>Заявка</b> — запрос Пользователя на организацию поездки.
            </P>
            <P>
              Отправляя заявку, Пользователь подтверждает, что ознакомился с настоящими условиями и принимает их.
              Сама по себе заявка не является подтверждённым заказом до момента подтверждения диспетчером.
            </P>
          </section>

          <section>
            <H2 id="order">2. Оформление заявки и подтверждение</H2>
            <P>
              Для оформления заявки Пользователь указывает контактные данные, маршрут и иные параметры поездки (дата/время,
              класс авто, комментарии).
            </P>
            <ul className="mt-3 grid gap-2">
              <Li>Заявка считается принятой системой после успешной отправки формы.</Li>
              <Li>Подтверждение поездки выполняется диспетчером по телефону или в мессенджере.</Li>
              <Li>Исполнитель вправе запросить уточнения (адрес, рейс, количество пассажиров, багаж, кресло и т.д.).</Li>
            </ul>
          </section>

          <section>
            <H2 id="price">3. Стоимость услуг и оплата</H2>
            <P>
              Итоговая стоимость зависит от маршрута, класса автомобиля, времени подачи, дополнительных условий и
              подтверждается до подачи автомобиля (при согласовании с диспетчером).
            </P>
            <ul className="mt-3 grid gap-2">
              <Li>Указанные на сайте «цены от…» носят справочный характер и не являются публичным обещанием цены.</Li>
              <Li>Оплата производится в согласованной форме (наличная/безналичная) по договорённости сторон.</Li>
              <Li>Для корпоративных клиентов возможны договор, безналичный расчёт и предоставление документов.</Li>
            </ul>
          </section>

          <section>
            <H2 id="cancel">4. Изменение и отмена поездки</H2>
            <P>
              Пользователь вправе изменить параметры заявки или отменить поездку, связавшись с диспетчером как можно раньше.
              Возможность изменения зависит от времени до подачи и текущей организации поездки.
            </P>
            <ul className="mt-3 grid gap-2">
              <Li>При поздней отмене возможны компенсации фактических затрат (подача/ожидание), если они были согласованы.</Li>
              <Li>Если рейс задержан, рекомендуется указать номер рейса — диспетчер согласует условия ожидания.</Li>
            </ul>
          </section>

          <section>
            <H2 id="responsibility">5. Ответственность сторон</H2>
            <P>
              Исполнитель прилагает разумные усилия для своевременной подачи автомобиля и безопасного оказания услуги.
              В отдельных случаях возможны задержки, вызванные обстоятельствами, не зависящими от Исполнителя
              (погодные условия, ДТП, ограничения движения, повышенная нагрузка).
            </P>
            <ul className="mt-3 grid gap-2">
              <Li>Пользователь обязан предоставить корректные контактные данные и адреса подачи/назначения.</Li>
              <Li>Исполнитель не несёт ответственность за последствия предоставления неверных данных Пользователем.</Li>
              <Li>При форс-мажоре стороны освобождаются от ответственности на период действия обстоятельств.</Li>
            </ul>
          </section>

          <section>
            <H2 id="privacy">6. Персональные данные</H2>
            <P>
              Обработка персональных данных осуществляется в соответствии с{" "}
              <Link className="font-semibold text-sky-800 hover:underline" href="/privacy">
                Политикой конфиденциальности
              </Link>
              . Отправляя заявку, Пользователь даёт согласие на обработку данных в целях связи и организации поездки.
            </P>
          </section>

          <section>
            <H2>7. Заключительные положения</H2>
            <P>
              Настоящий документ может обновляться. Новая редакция вступает в силу с момента публикации на сайте.
              По всем вопросам можно связаться по телефону или в Telegram.
            </P>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
              >
                Позвонить
              </a>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
              >
                Telegram
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </section>
        </article>

        <footer className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Вектор РФ. Все права защищены.
        </footer>
      </div>
    </main>
  );
}