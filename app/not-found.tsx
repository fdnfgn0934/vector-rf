import Link from "next/link";
import { PageShell } from "@/app/ui/shared";
import { CORE_SERVICE_LINKS } from "@/lib/internal-links";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-8xl font-black text-blue-100 select-none">404</div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-md text-base text-slate-500">
          Такой страницы не существует или она была перемещена. Воспользуйтесь навигацией ниже.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">
            На главную
          </Link>
          <Link href="/#order" className="btn-ghost inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">
            Заказать поездку
          </Link>
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">Популярные разделы</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CORE_SERVICE_LINKS.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-blue-100/60 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
