import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PageShell } from "@/app/ui/shared";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog";

const SITE_URL = "https://vector-rf.ru";

export const metadata: Metadata = {
  title: "Блог — советы по трансферам и поездкам по России",
  description:
    "Полезные статьи о межгородских поездках: как заказать такси межгород, выбрать класс авто, сравнить с поездом и правильно спланировать маршрут.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Блог Вектор РФ — советы по трансферам и поездкам",
    description: "Статьи о межгородских поездках, трансферах в аэропорт и выборе такси.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Блог Вектор РФ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог о трансферах и такси — Вектор РФ",
    description: "Советы, сравнения и маршруты: как заказать такси межгород, трансфер в аэропорт и поездки по России.",
    images: ["/og.jpg"],
  },
};

export default function BlogPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог Вектор РФ",
    url: `${SITE_URL}/blog`,
    description: "Советы по межгородским поездкам и трансферам по России",
    publisher: {
      "@type": "Organization",
      name: "Вектор РФ",
      url: SITE_URL,
    },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      description: p.excerpt,
    })),
  };

  const categoryColors: Record<string, string> = {
    sovety: "bg-blue-50 text-blue-700 border-blue-200/60",
    sravneniya: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    marshruty: "bg-sky-50 text-sky-700 border-sky-200/60",
  };

  return (
    <>
      <Script id="ld-blog-breadcrumbs" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script
        id="ld-blog-itemlist"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Блог Вектор РФ — статьи о трансферах и поездках",
            url: `${SITE_URL}/blog`,
            numberOfItems: BLOG_POSTS.length,
            itemListElement: BLOG_POSTS.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}/blog/${post.slug}`,
              name: post.title,
            })),
          })
        }}
      />
      <Script id="ld-blog" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <PageShell>
        <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300/80 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Главная</Link>
            <span className="text-blue-200">/</span>
            <span className="text-blue-800/60 font-semibold">Блог</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {BLOG_CATEGORIES.map((cat) => (
                <span key={cat.slug}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[cat.slug] ?? "bg-blue-50 text-blue-700 border-blue-200/60"}`}>
                  {cat.label}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Блог о поездках и трансферах
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600 max-w-2xl">
              Советы пассажирам, сравнения способов добраться и разборы популярных маршрутов по России.
              Пишем о том, как выгоднее и удобнее заказать такси межгород, трансфер в аэропорт и поездки
              по новым регионам РФ. Разбираем реальные маршруты, цены и лайфхаки для путешественников.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500 max-w-2xl">
              Рассказываем про классы автомобилей, особенности дальних маршрутов, трансфер в аэропорт и советы тем, кто едет впервые. В статьях — только практическая информация: сколько стоит межгород в разных классах, как рассчитать время выезда и чем трансфер отличается от такси.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500 max-w-2xl">
              Все маршруты проверяются на актуальность. Если вы готовитесь к поездке — найдёте здесь ответы на вопросы о стоимости, времени в пути и классах автомобилей. Статьи написаны на основе реального опыта наших водителей и диспетчеров.
            </p>
          </div>

          {/* Articles grid */}
          {BLOG_CATEGORIES.map((cat) => {
            const catPosts = BLOG_POSTS.filter((p) => p.categorySlug === cat.slug);
            if (!catPosts.length) return null;
            return (
              <div key={cat.slug} className="mt-8">
                <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-5 rounded-full bg-blue-500" />
                  {cat.label}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
            {catPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-blue-100/70 bg-white/82 backdrop-blur-md shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all">

                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryColors[post.categorySlug] ?? "bg-blue-50 text-blue-700 border-blue-200/60"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime} мин. чтения</span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-3">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-500 leading-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <time dateTime={post.publishedAt} className="text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </time>
                  <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                    Читать →
                  </span>
                </div>
              </Link>
            ))}
                </div>
              </div>
            );
          })}

          {/* SEO links block */}
          <div className="mt-12 rounded-3xl border border-blue-100/70 bg-white/82 backdrop-blur-md shadow-sm p-6 md:p-8">
            <div className="text-sm font-bold text-slate-800 mb-4">Популярные маршруты</div>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/moskva/nizhniy-novgorod", label: "Москва — Нижний Новгород" },
                { href: "/moskva/kazan", label: "Москва — Казань" },
                { href: "/nizhniy-novgorod/moskva", label: "Нижний Новгород — Москва" },
                { href: "/krasnodar/sochi", label: "Краснодар — Сочи" },
                { href: "/rostov-na-donu/krasnodar", label: "Ростов-на-Дону — Краснодар" },
                { href: "/yekaterinburg/tyumen", label: "Екатеринбург — Тюмень" },
                { href: "/taxi-mezhgorod", label: "Междугороднее такси" },
                { href: "/transfer-v-aeroport", label: "Трансфер в аэропорт" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-blue-100/60 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Темы блога</h2>
            <div className="space-y-3 text-sm leading-6 text-slate-600">
              <p>В блоге «Вектор РФ» — практичные материалы о межгородских поездках и трансферах по России. Как выбрать между такси и поездом, что взять с собой в аэропорт, как рассчитать время выезда — отвечаем на реальные вопросы пассажиров.</p>
              <p>Отдельные статьи посвящены конкретным маршрутам: Нижний Новгород — Москва, Краснодар — Сочи, поездки в новые регионы. Разбираем особенности, цены и советы для каждого направления.</p>
              <p>Рубрика «Сравнения» — разборы: такси против поезда, трансфер против каршеринга, бизнес против комфорта. Без рекламы и навязывания — только факты и расчёты.</p>
              <p>Следите за обновлениями: публикуем новые статьи о трансферах, маршрутах и советы для пассажиров. Если у вас есть вопрос — задайте через форму обратной связи, возможно, ответим отдельной статьёй.</p>
            </div>
          </div>

        </main>
      </PageShell>
    </>
  );
}
