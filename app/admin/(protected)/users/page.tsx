import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import UsersClient from "./ui";

export default function AdminUsersPage() {
  return <UsersClient />;
}
