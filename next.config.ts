import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.8.0.127", "[::1]"],

  async redirects() {
    return [
      // Закрываем хвосты вида /index.html (Google часто такое находит)
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.htm", destination: "/", permanent: true },

      // Иногда встречается /home
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;