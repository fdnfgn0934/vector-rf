import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PageShell, Breadcrumb, GlassPanel, Tag } from "@/app/ui/shared";

const SITE_URL = "https://vector-rf.ru";
const PAGE_URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: "Вопросы и ответы — такси и трансферы по России",
  description:
    "Часто задаваемые вопросы о междугороднем такси, трансфере в аэропорт, стоимости поездок, классах автомобилей и порядке оформления заявки.",
  alternates: {
    canonical: "/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "FAQ — Вектор РФ",
    description:
      "Ответы на частые вопросы о поездках, трансферах, стоимости и оформлении заявки.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ — Вектор РФ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Вектор РФ",
    description:
      "Ответы на частые вопросы о поездках, трансферах, стоимости и оформлении заявки.",
    images: ["/og.jpg"],
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Заказ и оформление",
    items: [
      { question: "Как оформить заявку?", answer: "Оставьте заявку через форму на сайте, по телефону, в Telegram. Оператор перезвонит, уточнит маршрут и подтвердит стоимость." },
      { question: "За сколько времени нужно бронировать?", answer: "Межгород — желательно за 1–2 дня. Трансфер в аэропорт — за 3–6 часов. Городские поездки — за 1–2 часа. Срочные заявки рассматриваем индивидуально." },
      { question: "Можно ли изменить заявку после подтверждения?", answer: "Да, позвоните или напишите нам — скорректируем время, адрес или класс автомобиля. Главное — сообщить заранее, до выезда водителя." },
    ],
  },
  {
    title: "Стоимость и оплата",
    items: [
      { question: "Когда сообщается финальная стоимость?", answer: "Финальная стоимость подтверждается до выезда — после уточнения маршрута, времени подачи и класса автомобиля. Цена не меняется в дороге." },
      { question: "Как оплатить поездку?", answer: "Наличными водителю или по безналу. Для организаций — оплата по счёту после подписания акта. Чек по запросу." },
      { question: "Есть ли скрытые доплаты?", answer: "Нет. Стоимость фиксируется заранее и включает все расходы водителя. Дополнительно оплачиваются только платные парковки и переправы по вашей просьбе." },
    ],
  },
  {
    title: "Автомобили и водители",
    items: [
      { question: "Какие доступны классы автомобилей?", answer: "Стандарт, комфорт, бизнес и минивэн на 6–7 мест. Класс выбирается при оформлении заявки в зависимости от маршрута и числа пассажиров." },
      { question: "Как проверяются водители?", answer: "Все водители работают по договору, имеют водительское удостоверение нужной категории и опыт дальних поездок. Новые водители проходят собеседование." },
      { question: "Можно ли детское кресло?", answer: "Да, укажите возраст ребёнка при оформлении заявки — подберём подходящее кресло или бустер. Услуга по запросу." },
    ],
  },
  {
    title: "Трансфер в аэропорт",
    items: [
      { question: "Что такое «встреча с табличкой»?", answer: "Водитель встречает в зоне прилёта с табличкой с вашим именем. Ждёт в течение 45 минут после посадки рейса." },
      { question: "Что если рейс задерживается?", answer: "Водитель отслеживает рейс онлайн и корректирует время подачи. Дополнительная плата за ожидание задержанного рейса не берётся." },
      { question: "За сколько нужно выезжать в аэропорт?", answer: "Рекомендуем рассчитывать 2,5–3 часа до вылета. Мы учитываем расстояние, пробки и запас времени на регистрацию." },
    ],
  },
  {
    title: "Корпоративным клиентам",
    items: [
      { question: "Есть ли договор для организаций?", answer: "Да, заключаем договор на транспортное обслуживание, выставляем счёт и предоставляем акт выполненных работ и счёт-фактуру." },
      { question: "Можно ли заказать несколько автомобилей?", answer: "Да, организуем несколько автомобилей разных классов для корпоративных поездок и мероприятий. Согласовываем логистику заранее." },
    ],
  },
];

const faq = FAQ_CATEGORIES.flatMap(cat => cat.items);;

export default function FaqPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Вопросы и ответы — такси и трансферы по России", item: PAGE_URL },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question", name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Script id="ld-faq-breadcrumbs" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-faq-page" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageShell>
        <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <Breadcrumb items={[{ name: "Главная", href: "/" }, { name: "Вопросы и ответы — такси и трансферы по России", href: "/faq" }]} />

          <div className="mt-6">
            <Tag>Частые вопросы</Tag>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Вопросы и ответы</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Ответы на основные вопросы о поездках, трансферах, стоимости и оформлении заявки.
            </p>
          </div>

          {FAQ_CATEGORIES.map((category) => (
            <div key={category.title} className="mt-8">
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="inline-block w-1.5 h-5 rounded-full bg-blue-500" />
                {category.title}
              </h2>
              <div className="grid gap-3">
                {category.items.map((item, i) => (
                  <div key={item.question} className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 backdrop-blur-sm shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-bold text-blue-400 shrink-0 w-5 text-center">{i + 1}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{item.question}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-500">{item.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <GlassPanel className="mt-8 p-6">
            <div className="text-sm font-bold text-slate-800 mb-3">Остались вопросы?</div>
            <p className="text-sm text-slate-500 mb-4">Напишите нам или оставьте заявку — уточним все детали.</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/" className="btn-primary inline-flex items-center rounded-xl px-4 py-2.5 text-sm">Оставить заявку</Link>
              <Link href="/contacts" className="btn-ghost inline-flex items-center rounded-xl px-4 py-2.5 text-sm">Контакты</Link>
            </div>
          </GlassPanel>
        </main>
      </PageShell>
    </>
  );
}
