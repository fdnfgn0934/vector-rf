import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import AuditClient from "./ui";

export default function AdminAuditPage() {
  return <AuditClient />;
}
