"use client";

import { useState } from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function RequisitesClient({ plainText }: { plainText: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = plainText;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button
      type="button"
      onClick={copyAll}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold shadow-sm transition",
        copied
          ? "bg-emerald-600 text-white"
          : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:opacity-95"
      )}
    >
      {copied ? "Скопировано" : "Скопировать реквизиты"}
    </button>
  );
}