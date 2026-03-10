import type { Metadata } from "next";

import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  title: "Вектор РФ — трансферы и поездки по России",
  description:
    "Междугороднее такси, трансфер в аэропорт и поездки по России. Комфорт, бизнес, минивэн. Заявки 24/7, стоимость согласуем заранее.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://vector-rf.ru/",
    title: "Вектор РФ — трансферы и поездки по России",
    description:
      "Междугороднее такси, трансфер в аэропорт и поездки по России. Комфорт, бизнес, минивэн. Заявки 24/7, стоимость согласуем заранее.",
    siteName: "Вектор РФ",
    locale: "ru_RU",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Вектор РФ — трансферы и поездки по России" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Вектор РФ — трансферы и поездки по России",
    description:
      "Междугороднее такси, трансфер в аэропорт и поездки по России. Комфорт, бизнес, минивэн. Заявки 24/7, стоимость согласуем заранее.",
    images: ["/og.jpg"],
  },
};

export default function Page() {
  return <HomePageClient />;
}