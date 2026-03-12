import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Служебные страницы
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          // Конверсионные страницы — не индексируем
          "/thanks",
          "/thanks/",
          // Старый хаб маршрутов — только редиректы
          "/route",
          "/route/",
          // Технические redirect-прокси (экономим crawl budget)
          "/taksi-iz/",
          "/taksi-v/",
          "/transfer/",
        ],
      },
      // Яндексбот — отдельно разрешаем всё кроме выше
      {
        userAgent: "Yandexbot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/thanks",
          "/thanks/",
          "/route",
          "/route/",
          "/taksi-iz/",
          "/taksi-v/",
          "/transfer/",
        ],
      },
      // Блокируем AI-краулеры (экономим crawl budget)
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https?:\/\//, ""),
  };
}
