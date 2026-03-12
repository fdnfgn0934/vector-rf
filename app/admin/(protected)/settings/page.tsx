import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import SettingsClient from "./ui";

export default function AdminSettingsPage() {
  return <SettingsClient />;
}
