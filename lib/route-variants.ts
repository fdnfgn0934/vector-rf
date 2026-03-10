export type RouteVariantKey =
  | "main"
  | "route"
  | "transfer"
  | "taxi-mezhgorod"
  | "mezhdugorodnee-taksi"
  | "taksi-iz"
  | "taksi-v";

export const ROUTE_VARIANTS: Array<{
  key: RouteVariantKey;
  pathPrefix: string | null;
  pageTitle: string;
  subtitle: string;
  titleTemplate: string;
  descriptionLead: string;
}> = [
  {
    key: "main",
    pathPrefix: null,
    pageTitle: "Такси {from} — {to}",
    subtitle: "Прямая поездка без пересадок. Стоимость согласуем заранее. Работаем 24/7.",
    titleTemplate: "Такси {from} — {to} | Междугородний трансфер",
    descriptionLead: "Прямая поездка между городами без пересадок.",
  },
  {
    key: "route",
    pathPrefix: "route",
    pageTitle: "Маршрут {from} — {to}: такси и трансфер",
    subtitle: "Отдельная SEO-страница маршрута с расчётом поездки, классами авто и заявкой онлайн.",
    titleTemplate: "Маршрут {from} — {to} | Такси и трансфер",
    descriptionLead: "Маршрут между городами с подачей ко времени.",
  },
  {
    key: "transfer",
    pathPrefix: "transfer",
    pageTitle: "Трансфер {from} — {to}",
    subtitle: "Индивидуальный трансфер между городами: адресная подача, выезд без ожиданий и подтверждение условий заранее.",
    titleTemplate: "Трансфер {from} — {to} | Заказать поездку",
    descriptionLead: "Индивидуальный трансфер между адресами без пересадок.",
  },
  {
    key: "taxi-mezhgorod",
    pathPrefix: "taxi-mezhgorod",
    pageTitle: "Такси межгород {from} — {to}",
    subtitle: "Отдельная страница под запросы по междугороднему такси на конкретном направлении.",
    titleTemplate: "Такси межгород {from} — {to} | Заказать онлайн",
    descriptionLead: "Такси межгород для поездки по России.",
  },
  {
    key: "mezhdugorodnee-taksi",
    pathPrefix: "mezhdugorodnee-taksi",
    pageTitle: "Междугороднее такси {from} — {to}",
    subtitle: "Поездка между городами без пересадок, с подачей по времени и выбором класса автомобиля.",
    titleTemplate: "Междугороднее такси {from} — {to} | Трансфер 24/7",
    descriptionLead: "Междугороднее такси с подтверждением цены до выезда.",
  },
  {
    key: "taksi-iz",
    pathPrefix: "taksi-iz",
    pageTitle: "Такси из {from} в {to}",
    subtitle: "Страница маршрута под запросы формата «из города в город» с онлайн-заявкой и быстрым расчётом.",
    titleTemplate: "Такси из {from} в {to} | Межгород",
    descriptionLead: "Поездка из одного города в другой без стыковок.",
  },
  {
    key: "taksi-v",
    pathPrefix: "taksi-v",
    pageTitle: "Такси в {to} из {from}",
    subtitle: "Маршрутная страница для запросов, где важен город прибытия и фиксирование условий до поездки.",
    titleTemplate: "Такси в {to} из {from} | Трансфер по России",
    descriptionLead: "Прямая поездка с акцентом на город прибытия.",
  },
];

const BY_KEY = new Map(ROUTE_VARIANTS.map((item) => [item.key, item] as const));

export function getRouteVariant(key: RouteVariantKey) {
  return BY_KEY.get(key) ?? ROUTE_VARIANTS[0];
}

function fill(template: string, fromName: string, toName: string) {
  return template.replaceAll("{from}", fromName).replaceAll("{to}", toName);
}

export function buildVariantHeading(key: RouteVariantKey, fromName: string, toName: string) {
  return fill(getRouteVariant(key).pageTitle, fromName, toName);
}

export function buildVariantSubtitle(key: RouteVariantKey, fromName: string, toName: string) {
  return fill(getRouteVariant(key).subtitle, fromName, toName);
}

export function buildVariantTitle(key: RouteVariantKey, fromName: string, toName: string) {
  return fill(getRouteVariant(key).titleTemplate, fromName, toName);
}

export function buildVariantPath(key: RouteVariantKey, fromSlug: string, toSlug: string) {
  const variant = getRouteVariant(key);
  if (!variant.pathPrefix) return `/${fromSlug}/${toSlug}`;
  return `/${variant.pathPrefix}/${fromSlug}/${toSlug}`;
}
