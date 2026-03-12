import type { NextConfig } from "next";

const cspDirectives = [
  "default-src 'self'",
  // Яндекс.Метрика: mc.yandex.ru + mc.yandex.com + yastatic.net
  // Google Maps: maps.googleapis.com + maps.gstatic.com
  // Google Tag Manager / GA4: googletagmanager.com + google-analytics.com
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://mc.yandex.ru https://mc.yandex.com https://yastatic.net https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  // connect-src: все внешние fetch/XHR запросы
  "connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://api.telegram.org https://mc.yandex.ru https://mc.yandex.com https://yandex.ru https://www.google-analytics.com https://www.googletagmanager.com https://region.metrica.yandex.com",
  "worker-src 'self' blob:",
  "frame-src https://www.google.com https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Content-Security-Policy", value: cspDirectives },
];

// CORS — разрешаем только свой домен на публичных API
const ALLOWED_ORIGINS = [
  "https://vector-rf.ru",
  "https://www.vector-rf.ru",
];

const corsHeaders = (origin: string) => [
  { key: "Access-Control-Allow-Origin", value: origin },
  { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Content-Type" },
  { key: "Access-Control-Max-Age", value: "86400" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.8.0.127", "[::1]"],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    // Автоматически tree-shake пакеты — меньше bundle size
    optimizePackageImports: [
      "lucide-react",
      "@prisma/client",
      "bcryptjs",
      "jose",
    ],
  },

  compiler: {
    // Убираем console.log в продакшене
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  async headers() {
    return [
      // Security headers на всех маршрутах
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Кэш статических ассетов Next.js на 1 год (immutable)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Кэш публичных файлов (иконки, og.jpg) на 7 дней
      {
        source: "/(.*)\.(png|jpg|jpeg|gif|ico|svg|webp|avif|woff2|woff)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      // Кэш шрифтов через next/font — на 1 год
      {
        source: "/_next/static/media/(.*)\.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // CORS на публичных API (в dev без проверки origin)
      ...(process.env.NODE_ENV === "production"
        ? ALLOWED_ORIGINS.map((origin) => ({
            source: "/api/(leads|reviews|distance|place)(.*)",
            headers: corsHeaders(origin),
          }))
        : [
            {
              source: "/api/(leads|reviews|distance|place)(.*)",
              headers: [
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
                { key: "Access-Control-Allow-Headers", value: "Content-Type" },
              ],
            },
          ]),
    ];
  },

  async redirects() {
    return [
      // www → non-www (основной домен без www)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vector-rf.ru" }],
        destination: "https://vector-rf.ru/:path*",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.htm", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
