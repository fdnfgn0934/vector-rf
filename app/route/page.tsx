import { permanentRedirect } from "next/navigation";

// Старый хаб /route держим только как permanent redirect на /city.
export default function Page() {
  permanentRedirect("/city");
}
