import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Заявка отправлена | Вектор РФ",
  description: "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/thanks",
  },
};

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Заявка отправлена
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          Спасибо за обращение. Мы получили вашу заявку и свяжемся с вами для
          подтверждения деталей поездки.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            На главную
          </Link>
          <Link
            href="/intercity-taxi"
            className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Междугороднее такси
          </Link>
        </div>
      </div>
    </main>
  );
}