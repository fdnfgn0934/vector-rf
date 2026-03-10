// lib/city-faq.ts

export type FAQItem = { question: string; answer: string };

const BASE_FAQ = (cityFrom: string): FAQItem[] => [
  {
    question: `Как заказать междугороднее такси из ${cityFrom}?`,
    answer: "Оставьте заявку на сайте — мы уточним детали и подтвердим стоимость перед поездкой.",
  },
  {
    question: "Фиксируется ли стоимость поездки?",
    answer: "Да, стоимость согласуем заранее до выезда.",
  },
  {
    question: "Можно ли выбрать класс автомобиля?",
    answer: "Да, доступны классы стандарт, комфорт, бизнес и минивэн.",
  },
  {
    question: "Работаете ли вы круглосуточно?",
    answer: "Да, заявки принимаем 24/7.",
  },
];

export const CITY_FAQ: Record<string, FAQItem[]> = {
  "moskva": [
    { question: "Сколько стоит междугороднее такси из Москвы?", answer: "Цена зависит от расстояния и класса авто. Стоимость подтверждаем заранее перед поездкой." },
    { question: "Можно ли заказать трансфер из Москвы заранее?", answer: "Да, можно оформить поездку заранее на удобное время." },
    { question: "Какие автомобили доступны?", answer: "Доступны стандарт, комфорт, бизнес и минивэн." },
    { question: "Есть ли поездки в аэропорты?", answer: "Да, выполняем трансферы в аэропорты и на вокзалы." },
  ],
  "sankt-peterburg": [
    { question: "Можно ли заказать междугороднее такси из Санкт‑Петербурга ночью?", answer: "Да, работаем круглосуточно — можно заказать в любое время." },
    { question: "Фиксируется ли стоимость поездки?", answer: "Да, стоимость согласуем заранее до выезда." },
    { question: "Можно ли выбрать класс автомобиля?", answer: "Да, доступны стандарт/комфорт/бизнес/минивэн." },
    { question: "Есть ли трансферы в аэропорт?", answer: "Да, организуем трансферы в аэропорты и на вокзалы." },
  ],
  "kazan": BASE_FAQ("Казани"),
  "nizhniy-novgorod": BASE_FAQ("Нижнего Новгорода"),
  "yekaterinburg": BASE_FAQ("Екатеринбурга"),
  "samara": BASE_FAQ("Самары"),
  "rostov-na-donu": BASE_FAQ("Ростова‑на‑Дону"),
  "krasnodar": BASE_FAQ("Краснодара"),
  "voronezh": BASE_FAQ("Воронежа"),
  "ufa": BASE_FAQ("Уфы"),
  "chelyabinsk": BASE_FAQ("Челябинска"),
  "perm": BASE_FAQ("Перми"),
  "volgograd": BASE_FAQ("Волгограда"),
  "saratov": BASE_FAQ("Саратова"),
  "tyumen": BASE_FAQ("Тюмени"),
  "yaroslavl": BASE_FAQ("Ярославля"),
  "tula": BASE_FAQ("Тулы"),
  "ryazan": BASE_FAQ("Рязани"),
  "tver": BASE_FAQ("Твери"),
  "ivanovo": BASE_FAQ("Иваново"),
  "kaluga": BASE_FAQ("Калуги"),
  "kostroma": BASE_FAQ("Костромы"),
  "belgorod": BASE_FAQ("Белгорода"),
  "kursk": BASE_FAQ("Курска"),
  "bryansk": BASE_FAQ("Брянска"),
  "lipetsk": BASE_FAQ("Липецка"),
  "orel": BASE_FAQ("Орла"),
  "cheboksary": BASE_FAQ("Чебоксар"),
  "yoshkar-ola": BASE_FAQ("Йошкар‑Олы"),
  "smolensk": BASE_FAQ("Смоленска"),
};
