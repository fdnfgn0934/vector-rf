import KeywordLandingPage, { buildKeywordLandingMetadata } from "@/app/ui/keyword-landing-page";
import { KEYWORD_LANDINGS_BY_SLUG } from "@/lib/keyword-landings";

const config = KEYWORD_LANDINGS_BY_SLUG["transfer-v-aeroport"];

export const metadata = buildKeywordLandingMetadata(config);

export default function Page() {
  return <KeywordLandingPage config={config} />;
}
