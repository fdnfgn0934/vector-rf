import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { PageShell } from "@/app/ui/shared";
import { BLOG_BY_SLUG, BLOG_POSTS } from "@/lib/blog";

const SITE_URL = "https://vector-rf.ru";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params as { slug: string });
  const post = BLOG_BY_SLUG.get(resolved.slug);
  if (!post) return { robots: { index: false, follow: false } };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.metaTitle,
      description: post.metaDescription,
      siteName: "Вектор РФ",
      locale: "ru_RU",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["/og.jpg"],
    },
  };
}

function renderContent(content: string) {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-extrabold tracking-tight text-slate-900 mt-8 mb-3">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("— ")) {
      const items = block.split("\n").filter((l) => l.startsWith("— "));
      return (
        <ul key={i} className="mt-3 mb-3 space-y-2">
          {items.map((item, j) => {
            const text = item.replace("— ", "");
            // Handle bold **text**
            const parts = text.split(/\*\*([^*]+)\*\*/g);
            return (
              <li key={j} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="font-bold text-slate-800">{p}</strong> : p)}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    // Normal paragraph — handle **bold**
    const parts = block.split(/\*\*([^*]+)\*\*/g);
    return (
      <p key={i} className="text-sm leading-7 text-slate-600 mt-4">
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className="font-bold text-slate-800">{part}</strong>
            : part
        )}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params as { slug: string });
  const post = BLOG_BY_SLUG.get(resolved.slug);
  if (!post) notFound();

  const related = post.relatedPosts
    ?.map((s) => BLOG_BY_SLUG.get(s))
    .filter(Boolean) ?? [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Вектор РФ",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Вектор РФ",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const categoryColors: Record<string, string> = {
    sovety: "bg-blue-50 text-blue-700 border-blue-200/60",
    sravneniya: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    marshruty: "bg-sky-50 text-sky-700 border-sky-200/60",
  };

  return (
    <>
      <Script id="ld-article" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="ld-breadcrumbs" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <PageShell>
        <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300/80 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Главная</Link>
            <span className="text-blue-200">/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Блог</Link>
            <span className="text-blue-200">/</span>
            <span className="text-blue-800/60 font-semibold line-clamp-1">{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[post.categorySlug] ?? "bg-blue-50 text-blue-700 border-blue-200/60"}`}>
                {post.category}
              </span>
              <span className="text-xs text-slate-400">{post.readTime} мин. чтения</span>
              <time dateTime={post.publishedAt} className="text-xs text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="text-xs text-slate-400">
                  (обновлено {new Date(post.updatedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })})
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-500 max-w-2xl">
              {post.excerpt}
            </p>
          </header>

          {/* Article body */}
          <article className="rounded-3xl border border-blue-100/70 bg-white/82 backdrop-blur-md shadow-sm p-7 md:p-10">
            {renderContent(post.content)}
          </article>

          {/* CTA */}
          <div className="mt-8 rounded-3xl border border-blue-200/60 bg-blue-600 p-7 text-white">
            <div className="text-lg font-extrabold mb-2">Заказать трансфер прямо сейчас</div>
            <p className="text-sm text-blue-100 mb-5">
              Оставьте заявку — согласуем маршрут, стоимость и время подачи. Работаем 24/7.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#order"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                Оставить заявку
              </Link>
              <Link href="/contacts"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
                Контакты
              </Link>
            </div>
          </div>

          {/* Related routes */}
          {post.relatedRoutes && post.relatedRoutes.length > 0 && (
            <div className="mt-6 rounded-3xl border border-blue-100/70 bg-white/82 backdrop-blur-md shadow-sm p-6">
              <div className="text-sm font-bold text-slate-800 mb-4">Популярные маршруты</div>
              <div className="flex flex-wrap gap-2">
                {post.relatedRoutes.map((r) => (
                  <Link key={r.href} href={r.href}
                    className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-bold text-slate-800 mb-4">Читайте также</div>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((rel) => rel && (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}
                    className="group rounded-2xl border border-blue-100/60 bg-white/80 p-5 hover:shadow-md hover:border-blue-200 transition-all">
                    <div className="text-xs text-slate-400 mb-2">{rel.category}</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {rel.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              ← Все статьи блога
            </Link>
          </div>

        </main>
      </PageShell>
    </>
  );
}
