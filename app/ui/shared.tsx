"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useState } from "react";

export const PHONE_DISPLAY = "8 (800) 222-56-50";
export const PHONE_TEL = "+78002225650";
export const TELEGRAM = "https://t.me/vector_rf52";
/* ── Icons ── */
export function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.9 5.2 7.7 4c-.5-.5-1.4-.5-1.9 0l-1 1c-.7.7-1 1.7-.8 2.7 1.1 4.9 4.9 8.7 9.8 9.8 1 .2 2-.1 2.7-.8l1-1c.5-.5.5-1.4 0-1.9l-1.2-1.2c-.5-.5-1.2-.6-1.8-.3l-1.3.7c-.5.3-1.1.2-1.5-.2l-2.2-2.2c-.4-.4-.5-1-.2-1.5l.7-1.3c.3-.6.2-1.3-.3-1.8Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.75 5.6 3.9 12.2c-.8.3-.79 1.44.02 1.72l4.2 1.45 1.6 4.93c.26.8 1.27.95 1.74.27l2.4-3.5 4.1 3.01c.63.46 1.51.12 1.7-.66l2.2-13.96c.13-.83-.7-1.46-1.41-1.18Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
      />
      <path d="M8.1 15.4 18.4 7.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ── Logo ── */
export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative grid place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white shadow-md ring-1 ring-white/20 shrink-0"
      aria-hidden
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 6.5l7.5 13 7.5-13" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.7 6.5h10.6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Wordmark() {
  return (
    <div className="leading-tight">
      <div className="text-[15px] font-black tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent">
        Вектор РФ
      </div>
      <div className="text-[11px] text-blue-400/80 font-medium tracking-wide">Трансферы по России</div>
    </div>
  );
}

/* ── Header ── */
const NAV_LINKS = [
  { href: "/#order", label: "Заявка" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/corporate", label: "Бизнесу" },
  { href: "/prices", label: "Цены" },
  { href: "/faq", label: "Вопросы" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      {/* backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-blue-100/60" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <LogoMark size={40} />
          <Wordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50/70 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA strip */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white/90 px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm hover:bg-blue-50 transition-colors"
          >
            <IconPhone className="h-4 w-4 text-blue-600" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl btn-primary px-3 py-2 text-sm"
          >
            <IconTelegram className="h-4 w-4" />
            <span>Telegram</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden rounded-lg p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="relative md:hidden border-t border-blue-100/60 bg-white/95 backdrop-blur-xl px-4 py-4">
          <nav className="grid gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-3 text-sm font-semibold text-blue-800"
            >
              <IconPhone className="h-4 w-4 text-blue-600" />
              Позвонить
            </a>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl btn-primary px-3 py-3 text-sm"
            >
              <IconTelegram className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Footer ── */
const FOOTER_SERVICES = [
  { href: "/city-transfer", label: "Поездки по городу" },
  { href: "/transfer-v-aeroport", label: "Трансфер в аэропорт" },
  { href: "/taxi-mezhgorod", label: "Межгород" },
  { href: "/minivan-transfer", label: "Минивэн" },
  { href: "/corporate", label: "Корпоративным" },
  { href: "/corporate-taxi", label: "Корпоративное такси" },
  { href: "/taxi-mezhgorod", label: "Междугороднее такси" },
];
const FOOTER_INFO = [
  { href: "/services", label: "Наш сервис" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
  { href: "/faq", label: "Вопросы и ответы" },
  { href: "/contacts", label: "Контакты" },
  { href: "/prices", label: "Цены" },
  { href: "/about", label: "О компании" },
  { href: "/city", label: "Все города" },
  { href: "/sitemap-page", label: "Карта сайта" },
  { href: "/requisites", label: "Реквизиты" },
];

export function Footer() {
  return (
    <footer className="relative mt-4 border-t border-blue-100/50">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Top row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <LogoMark size={40} />
            <Wordmark />
          </Link>

          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm hover:bg-blue-50 transition-colors"
            >
              <IconPhone className="h-4 w-4 text-blue-500" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl btn-primary px-3 py-2 text-sm"
            >
              <IconTelegram className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-8 grid gap-6 border-t border-blue-100/60 pt-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Услуги</div>
            <div className="mt-3 grid gap-2">
              {FOOTER_SERVICES.map((l) => (
                <a key={l.href} href={l.href} className="text-xs text-slate-500 hover:text-blue-700 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Информация</div>
            <div className="mt-3 grid gap-2">
              {FOOTER_INFO.map((l) => (
                <a key={l.href} href={l.href} className="text-xs text-slate-500 hover:text-blue-700 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Связаться</div>
            <div className="mt-3 grid gap-2 text-xs text-slate-500">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-blue-700 transition-colors">{PHONE_DISPLAY}</a>
              <a href={TELEGRAM} target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors">Telegram @vector_rf52</a>
            </div>
            <div className="mt-4 grid gap-1 text-xs text-slate-400">
              <a href="/privacy" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</a>
              <a href="/personal-data" className="hover:text-blue-600 transition-colors">Обработка персональных данных</a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100/50 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} Вектор РФ. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ── PageBackground — premium blue mesh ── */
export function PageBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[#eef4ff]" />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 800px 600px at 70% -5%, rgba(147,197,253,0.28) 0%, transparent 65%)",
            "radial-gradient(ellipse 600px 500px at 0% 50%, rgba(96,165,250,0.13) 0%, transparent 60%)",
            "radial-gradient(ellipse 500px 400px at 100% 80%, rgba(37,99,235,0.08) 0%, transparent 60%)",
          ].join(", "),
        }}
      />
    </>
  );
}

/* ── PageShell — wraps every public page ── */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <PageBackground />
      <Header />
      <div className="animate-page">{children}</div>
      <Footer />
    </div>
  );
}

/* ── Breadcrumb ── */
export function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-blue-300/80">
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-1.5">
          {i < items.length - 1 ? (
            <>
              <a href={item.href} className="hover:text-blue-600 transition-colors font-medium">{item.name}</a>
              <span className="text-blue-200">/</span>
            </>
          ) : (
            <span className="text-blue-800/60 font-semibold">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Section heading ── */
export function SectionHeading({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      {desc && <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>}
    </div>
  );
}

/* ── Tag pill ── */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200/70 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </span>
  );
}

/* ── Info card ── */
export function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-blue-100/60 bg-white/80 p-5 backdrop-blur-sm shadow-sm">
      <div className="text-sm font-bold text-slate-800">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-500">{text}</div>
    </div>
  );
}

/* ── Glass panel ── */
export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-blue-100/70 bg-white/82 backdrop-blur-md shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
