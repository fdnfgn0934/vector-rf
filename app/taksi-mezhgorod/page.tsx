import type { Metadata } from "next";

import KeywordLandingPage, {
  buildKeywordLandingMetadata,
} from "@/app/ui/keyword-landing-page";
import { KEYWORD_LANDINGS_BY_SLUG } from "@/lib/keyword-landings";

const CONFIG = KEYWORD_LANDINGS_BY_SLUG["taksi-mezhgorod"];
const base = buildKeywordLandingMetadata(CONFIG);

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: "/taxi-mezhgorod",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <KeywordLandingPage config={CONFIG} />;
}