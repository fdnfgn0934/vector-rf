"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("admin-theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    >
      {isDark ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}