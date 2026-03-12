/** Утилита для объединения CSS-классов (аналог clsx без зависимости) */
export function cn(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(" ");
}
