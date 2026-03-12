import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import LeadsClient from "./ui";

export default function AdminLeadsPage() {
  return <LeadsClient />;
}
