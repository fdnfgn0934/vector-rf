import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import UTMCollector from "./utm";

const SITE_URL = "https://vector-rf.ru";
const SITE_NAME = "Вектор РФ";
const YM_ID = 106629239;
const PHONE_E164 = "+78002225650";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eef4ff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ru-RU": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  title: {
    default: "Вектор РФ — трансферы и поездки по России",
    template: "%s | Вектор РФ",
  },
  description:
    "Междугороднее такси, трансфер в аэропорт, городские и корпоративные поездки по России. Комфорт, бизнес, минивэн. Онлайн-заявка 24/7.",
  keywords: [
    "междугороднее такси",
    "такси межгород",
    "трансфер в аэропорт",
    "трансфер из аэропорта",
    "междугородний трансфер",
    "такси по россии",
    "корпоративное такси",
    "аренда авто с водителем",
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    yandex: "2e7dc3a65216d356",
  },
    openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    title: "Вектор РФ — трансферы и поездки по России",
    description:
      "Междугороднее такси, трансфер в аэропорт, городские и корпоративные поездки по России. Комфорт, бизнес, минивэн. Онлайн-заявка 24/7.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Вектор РФ — трансферы и поездки по России",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Вектор РФ — трансферы и поездки по России",
    description:
      "Междугороднее такси, трансфер в аэропорт, городские и корпоративные поездки по России. Комфорт, бизнес, минивэн. Онлайн-заявка 24/7.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE_E164,
            contactType: "customer service",
            availableLanguage: ["Russian"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "ru-RU",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Трансферы и междугородние поездки",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Россия",
        },
        serviceType: [
          "Междугороднее такси",
          "Междугородний трансфер",
          "Трансфер в аэропорт",
          "Трансфер из аэропорта",
          "Корпоративное такси",
        ],
      },
      {
        "@type": ["LocalBusiness", "TaxiService"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        alternateName: "Вектор РФ трансферы",
        url: SITE_URL,
        telephone: PHONE_E164,
        email: "info@vector-rf.ru",
        address: {
          "@type": "PostalAddress",
          addressCountry: "RU",
          addressRegion: "Нижегородская область",
          addressLocality: "Нижний Новгород",
        },
        // Координаты головного офиса (Нижний Новгород) — федеральный сервис по всей России
        geo: {
          "@type": "GeoCoordinates",
          latitude: 56.3269,
          longitude: 44.0059,
        },
        description: "Федеральный сервис заказа межгородских трансферов и такси. Диспетчеры работают из Нижнего Новгорода, поездки выполняются по всей России.",
        priceRange: "₽₽",
        openingHours: "Mo-Su 00:00-23:59",
        currenciesAccepted: "RUB",
        paymentAccepted: "Cash, Credit Card",
        areaServed: {
          "@type": "Country",
          name: "Россия",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги трансфера",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Междугороднее такси" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Трансфер в аэропорт" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Поездки по городу" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Корпоративные перевозки" } },
          ],
        },
        sameAs: [
          `https://t.me/vector_rf52`,
          `https://yandex.ru/maps/org/187298057123`,
        ],

      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Вектор РФ — трансферы и поездки по России",
        description: "Сервис заказа межгородских трансферов и такси по России 24/7. Комфорт, бизнес, минивэн. Стоимость фиксируется до выезда.",
        inLanguage: "ru-RU",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
      },

    ],
  };

  return (
    <html lang="ru">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var isAdmin = window.location.pathname.startsWith("/admin");
    var saved = localStorage.getItem("admin-theme");

    if (isAdmin) {
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
            `,
          }}
        />

        {/* Яндекс.Метрика — оба домена */}
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://mc.yandex.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.com" />
        {/* Яндекс.Метрика preconnect */}
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://mc.yandex.com" />
        {/* Google Tag Manager / GA4 */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Google Maps — lazy, только DNS */}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />
      </head>

      <body className="bg-[#eef4ff] text-slate-900">


        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="ga4-init"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-config" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}

        <UTMCollector />
        {children}

        {/* Яндекс.Метрика */}
        <Script id="ym-init" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=106629239','ym');
          ym(106629239,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
        `}</Script>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/106629239" style={{position:"absolute",left:"-9999px"}} alt="" /></div>
        </noscript>
      </body>
    </html>
  );
}
