import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import ReviewsClient from "./ui";

export default function AdminReviewsPage() {
  return <ReviewsClient />;
}
