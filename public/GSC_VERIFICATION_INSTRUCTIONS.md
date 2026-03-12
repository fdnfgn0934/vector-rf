# Google Search Console Verification

1. Войдите в Google Search Console: https://search.google.com/search-console
2. Добавьте ресурс: https://vector-rf.ru
3. Выберите метод верификации: "HTML тег"
4. Скопируйте content из мета-тега, например: `abc123xyz`
5. Добавьте в Vercel Environment Variables:
   - Name: `NEXT_PUBLIC_GSC_VERIFICATION`
   - Value: `abc123xyz` (только content, без тега)
6. Задеплойте и нажмите "Verify" в GSC

Яндекс.Вебмастер уже верифицирован (yandex_2e7dc3a65216d356.html).
