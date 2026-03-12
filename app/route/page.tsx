import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import { permanentRedirect } from "next/navigation";

// Старый хаб /route держим только как permanent redirect на /city.
export default function Page() {
  permanentRedirect("/city");
}
