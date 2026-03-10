import type { Metadata } from "next";

import KeywordLandingPage, {
  buildKeywordLandingMetadata,
} from "@/app/ui/keyword-landing-page";
import { KEYWORD_LANDINGS_BY_SLUG } from "@/lib/keyword-landings";

const CONFIG = KEYWORD_LANDINGS_BY_SLUG["taxi-v-aeroport"];
const base = buildKeywordLandingMetadata(CONFIG);

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: "/transfer-v-aeroport",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <KeywordLandingPage config={CONFIG} />;
}