export type CityLanding = {
  slug: string;
  name: string;
  fromGenitive: string;
  popularTo: string[];
};

type RegionKey =
  | "center"
  | "northwest"
  | "volga"
  | "south"
  | "caucasus"
  | "ural"
  | "siberia"
  | "far-east"
  | "crimea";

type RawCity = {
  slug: string;
  name: string;
  fromGenitive: string;
  region: RegionKey;
};

const NATIONAL_HUBS = [
  "moskva",
  "sankt-peterburg",
  "nizhniy-novgorod",
  "kazan",
  "yekaterinburg",
  "samara",
  "ufa",
  "chelyabinsk",
  "novosibirsk",
  "krasnoyarsk",
  "rostov-na-donu",
  "krasnodar",
  "sochi",
  "simferopol",
  "sevastopol",
  "voronezh",
  "volgograd",
  "saratov",
  "tyumen",
  "perm",
  "irkutsk",
  "omsk",
  "vladivostok",
  "khabarovsk",
  "kaliningrad",
  "donetsk",
  "lugansk",
  "mariupol",
  "melitopol",
  "berdyansk",
  "henichesk",
  "skadovsk",
  "enerhodar",
] as const;

const REGION_HUBS: Record<RegionKey, string[]> = {
  center: [
    "moskva",
    "voronezh",
    "yaroslavl",
    "belgorod",
    "smolensk",
    "balashikha",
    "podolsk",
  ],
  northwest: [
    "sankt-peterburg",
    "kaliningrad",
    "arkhangelsk",
    "vologda",
    "murmansk",
    "gatchina",
    "viborg",
  ],
  volga: [
    "nizhniy-novgorod",
    "kazan",
    "samara",
    "saratov",
    "kirov",
    "ulyanovsk",
    "tolyatti",
  ],
  south: [
    "rostov-na-donu",
    "krasnodar",
    "volgograd",
    "sochi",
    "astrakhan",
    "gelendzhik",
    "armavir",
    "donetsk",
    "lugansk",
    "mariupol",
    "melitopol",
    "berdyansk",
    "makeyevka",
    "gorlovka",
    "henichesk",
    "skadovsk",
    "enerhodar",
    "alchevsk",
    "severodonetsk",
    "lisichansk",
  ],
  caucasus: [
    "pyatigorsk",
    "mineralnye-vody",
    "makhachkala",
    "grozny",
    "vladikavkaz",
    "cherkessk",
    "kislovodsk",
  ],
  ural: [
    "yekaterinburg",
    "chelyabinsk",
    "tyumen",
    "ufa",
    "perm",
    "tobolsk",
    "kopeysk",
  ],
  siberia: [
    "novosibirsk",
    "omsk",
    "krasnoyarsk",
    "irkutsk",
    "tomsk",
    "novoaltaisk",
    "norilsk",
  ],
  "far-east": [
    "khabarovsk",
    "vladivostok",
    "yakutsk",
    "blagoveshchensk",
    "chita",
    "yuzhno-sakhalinsk",
    "petropavlovsk-kamchatskiy",
  ],
  crimea: [
    "simferopol",
    "sevastopol",
    "yalta",
    "kerch",
    "evpatoriya",
    "feodosiya",
    "dzhankoy",
  ],
};

const REGION_NEIGHBORS: Record<RegionKey, RegionKey[]> = {
  center: ["northwest", "volga", "south"],
  northwest: ["center", "volga"],
  volga: ["center", "ural", "south"],
  south: ["caucasus", "center", "volga", "crimea"],
  caucasus: ["south", "crimea"],
  ural: ["volga", "siberia"],
  siberia: ["ural", "far-east"],
  "far-east": ["siberia"],
  crimea: ["south", "caucasus"],
};

const RAW_CITIES: RawCity[] = [
  { slug: "moskva", name: "Москва", fromGenitive: "Москвы", region: "center" },
  {
    slug: "sankt-peterburg",
    name: "Санкт-Петербург",
    fromGenitive: "Санкт-Петербурга",
    region: "northwest",
  },
  {
    slug: "nizhniy-novgorod",
    name: "Нижний Новгород",
    fromGenitive: "Нижнего Новгорода",
    region: "volga",
  },
  { slug: "kazan", name: "Казань", fromGenitive: "Казани", region: "volga" },
  {
    slug: "yekaterinburg",
    name: "Екатеринбург",
    fromGenitive: "Екатеринбурга",
    region: "ural",
  },
  { slug: "samara", name: "Самара", fromGenitive: "Самары", region: "volga" },
  { slug: "ufa", name: "Уфа", fromGenitive: "Уфы", region: "ural" },
  { slug: "perm", name: "Пермь", fromGenitive: "Перми", region: "ural" },
  {
    slug: "chelyabinsk",
    name: "Челябинск",
    fromGenitive: "Челябинска",
    region: "ural",
  },
  { slug: "tyumen", name: "Тюмень", fromGenitive: "Тюмени", region: "ural" },
  { slug: "omsk", name: "Омск", fromGenitive: "Омска", region: "siberia" },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    fromGenitive: "Новосибирска",
    region: "siberia",
  },
  { slug: "tomsk", name: "Томск", fromGenitive: "Томска", region: "siberia" },
  {
    slug: "kemerovo",
    name: "Кемерово",
    fromGenitive: "Кемерово",
    region: "siberia",
  },
  {
    slug: "novokuznetsk",
    name: "Новокузнецк",
    fromGenitive: "Новокузнецка",
    region: "siberia",
  },
  {
    slug: "barnaul",
    name: "Барнаул",
    fromGenitive: "Барнаула",
    region: "siberia",
  },
  {
    slug: "krasnoyarsk",
    name: "Красноярск",
    fromGenitive: "Красноярска",
    region: "siberia",
  },
  {
    slug: "irkutsk",
    name: "Иркутск",
    fromGenitive: "Иркутска",
    region: "siberia",
  },
  {
    slug: "ulan-ude",
    name: "Улан-Удэ",
    fromGenitive: "Улан-Удэ",
    region: "far-east",
  },
  { slug: "chita", name: "Чита", fromGenitive: "Читы", region: "far-east" },
  {
    slug: "khabarovsk",
    name: "Хабаровск",
    fromGenitive: "Хабаровска",
    region: "far-east",
  },
  {
    slug: "vladivostok",
    name: "Владивосток",
    fromGenitive: "Владивостока",
    region: "far-east",
  },
  {
    slug: "yakutsk",
    name: "Якутск",
    fromGenitive: "Якутска",
    region: "far-east",
  },
  {
    slug: "blagoveshchensk",
    name: "Благовещенск",
    fromGenitive: "Благовещенска",
    region: "far-east",
  },
  {
    slug: "rostov-na-donu",
    name: "Ростов-на-Дону",
    fromGenitive: "Ростова-на-Дону",
    region: "south",
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    fromGenitive: "Краснодара",
    region: "south",
  },
  { slug: "sochi", name: "Сочи", fromGenitive: "Сочи", region: "south" },
  { slug: "anapa", name: "Анапа", fromGenitive: "Анапы", region: "south" },
  {
    slug: "novorossiysk",
    name: "Новороссийск",
    fromGenitive: "Новороссийска",
    region: "south",
  },
  {
    slug: "stavropol",
    name: "Ставрополь",
    fromGenitive: "Ставрополя",
    region: "south",
  },
  {
    slug: "pyatigorsk",
    name: "Пятигорск",
    fromGenitive: "Пятигорска",
    region: "caucasus",
  },
  {
    slug: "mineralnye-vody",
    name: "Минеральные Воды",
    fromGenitive: "Минеральных Вод",
    region: "caucasus",
  },
  {
    slug: "volgograd",
    name: "Волгоград",
    fromGenitive: "Волгограда",
    region: "south",
  },
  {
    slug: "saratov",
    name: "Саратов",
    fromGenitive: "Саратова",
    region: "volga",
  },
  {
    slug: "voronezh",
    name: "Воронеж",
    fromGenitive: "Воронежа",
    region: "center",
  },
  {
    slug: "belgorod",
    name: "Белгород",
    fromGenitive: "Белгорода",
    region: "center",
  },
  { slug: "kursk", name: "Курск", fromGenitive: "Курска", region: "center" },
  {
    slug: "bryansk",
    name: "Брянск",
    fromGenitive: "Брянска",
    region: "center",
  },
  {
    slug: "smolensk",
    name: "Смоленск",
    fromGenitive: "Смоленска",
    region: "center",
  },
  {
    slug: "kaluga",
    name: "Калуга",
    fromGenitive: "Калуги",
    region: "center",
  },
  { slug: "tula", name: "Тула", fromGenitive: "Тулы", region: "center" },
  { slug: "ryazan", name: "Рязань", fromGenitive: "Рязани", region: "center" },
  { slug: "orel", name: "Орёл", fromGenitive: "Орла", region: "center" },
  {
    slug: "lipetsk",
    name: "Липецк",
    fromGenitive: "Липецка",
    region: "center",
  },
  {
    slug: "tver",
    name: "Тверь",
    fromGenitive: "Твери",
    region: "center",
  },
  {
    slug: "yaroslavl",
    name: "Ярославль",
    fromGenitive: "Ярославля",
    region: "center",
  },
  {
    slug: "ivanovo",
    name: "Иваново",
    fromGenitive: "Иваново",
    region: "center",
  },
  {
    slug: "kostroma",
    name: "Кострома",
    fromGenitive: "Костромы",
    region: "center",
  },
  {
    slug: "vladimir",
    name: "Владимир",
    fromGenitive: "Владимира",
    region: "center",
  },
  {
    slug: "tambov",
    name: "Тамбов",
    fromGenitive: "Тамбова",
    region: "center",
  },
  { slug: "penza", name: "Пенза", fromGenitive: "Пензы", region: "volga" },
  {
    slug: "ulyanovsk",
    name: "Ульяновск",
    fromGenitive: "Ульяновска",
    region: "volga",
  },
  {
    slug: "saransk",
    name: "Саранск",
    fromGenitive: "Саранска",
    region: "volga",
  },
  {
    slug: "cheboksary",
    name: "Чебоксары",
    fromGenitive: "Чебоксар",
    region: "volga",
  },
  {
    slug: "yoshkar-ola",
    name: "Йошкар-Ола",
    fromGenitive: "Йошкар-Олы",
    region: "volga",
  },
  { slug: "kirov", name: "Киров", fromGenitive: "Кирова", region: "volga" },
  { slug: "izhevsk", name: "Ижевск", fromGenitive: "Ижевска", region: "ural" },
  {
    slug: "naberezhnye-chelny",
    name: "Набережные Челны",
    fromGenitive: "Набережных Челнов",
    region: "volga",
  },
  {
    slug: "tolyatti",
    name: "Тольятти",
    fromGenitive: "Тольятти",
    region: "volga",
  },
  {
    slug: "orenburg",
    name: "Оренбург",
    fromGenitive: "Оренбурга",
    region: "ural",
  },
  {
    slug: "magnitogorsk",
    name: "Магнитогорск",
    fromGenitive: "Магнитогорска",
    region: "ural",
  },
  {
    slug: "surgut",
    name: "Сургут",
    fromGenitive: "Сургута",
    region: "ural",
  },
  {
    slug: "nizhnevartovsk",
    name: "Нижневартовск",
    fromGenitive: "Нижневартовска",
    region: "ural",
  },
  {
    slug: "arkhangelsk",
    name: "Архангельск",
    fromGenitive: "Архангельска",
    region: "northwest",
  },
  {
    slug: "murmansk",
    name: "Мурманск",
    fromGenitive: "Мурманска",
    region: "northwest",
  },
  {
    slug: "petrozavodsk",
    name: "Петрозаводск",
    fromGenitive: "Петрозаводска",
    region: "northwest",
  },
  { slug: "pskov", name: "Псков", fromGenitive: "Пскова", region: "northwest" },
  {
    slug: "velikiy-novgorod",
    name: "Великий Новгород",
    fromGenitive: "Великого Новгорода",
    region: "northwest",
  },
  {
    slug: "vologda",
    name: "Вологда",
    fromGenitive: "Вологды",
    region: "northwest",
  },
  {
    slug: "cherepovets",
    name: "Череповец",
    fromGenitive: "Череповца",
    region: "northwest",
  },
  {
    slug: "kaliningrad",
    name: "Калининград",
    fromGenitive: "Калининграда",
    region: "northwest",
  },
  {
    slug: "astrakhan",
    name: "Астрахань",
    fromGenitive: "Астрахани",
    region: "south",
  },
  {
    slug: "makhachkala",
    name: "Махачкала",
    fromGenitive: "Махачкалы",
    region: "caucasus",
  },
  {
    slug: "derbent",
    name: "Дербент",
    fromGenitive: "Дербента",
    region: "caucasus",
  },
  {
    slug: "grozny",
    name: "Грозный",
    fromGenitive: "Грозного",
    region: "caucasus",
  },
  {
    slug: "nalchik",
    name: "Нальчик",
    fromGenitive: "Нальчика",
    region: "caucasus",
  },
  {
    slug: "vladikavkaz",
    name: "Владикавказ",
    fromGenitive: "Владикавказа",
    region: "caucasus",
  },
  {
    slug: "maikop",
    name: "Майкоп",
    fromGenitive: "Майкопа",
    region: "caucasus",
  },
  { slug: "elista", name: "Элиста", fromGenitive: "Элисты", region: "south" },
  {
    slug: "taganrog",
    name: "Таганрог",
    fromGenitive: "Таганрога",
    region: "south",
  },
  {
    slug: "volzhsky",
    name: "Волжский",
    fromGenitive: "Волжского",
    region: "south",
  },
  { slug: "kurgan", name: "Курган", fromGenitive: "Кургана", region: "ural" },
  {
    slug: "syktyvkar",
    name: "Сыктывкар",
    fromGenitive: "Сыктывкара",
    region: "northwest",
  },
  {
    slug: "nizhny-tagil",
    name: "Нижний Тагил",
    fromGenitive: "Нижнего Тагила",
    region: "ural",
  },
  {
    slug: "sevastopol",
    name: "Севастополь",
    fromGenitive: "Севастополя",
    region: "crimea",
  },
  {
    slug: "simferopol",
    name: "Симферополь",
    fromGenitive: "Симферополя",
    region: "crimea",
  },
  { slug: "yalta", name: "Ялта", fromGenitive: "Ялты", region: "crimea" },
  { slug: "kerch", name: "Керчь", fromGenitive: "Керчи", region: "crimea" },
  { slug: "abakan", name: "Абакан", fromGenitive: "Абакана", region: "siberia" },
  { slug: "bratsk", name: "Братск", fromGenitive: "Братска", region: "siberia" },
  { slug: "biysk", name: "Бийск", fromGenitive: "Бийска", region: "siberia" },
  {
    slug: "novy-urengoy",
    name: "Новый Уренгой",
    fromGenitive: "Нового Уренгоя",
    region: "ural",
  },
  {
    slug: "salekhard",
    name: "Салехард",
    fromGenitive: "Салехарда",
    region: "ural",
  },
  { slug: "orsk", name: "Орск", fromGenitive: "Орска", region: "ural" },
  {
    slug: "sterlitamak",
    name: "Стерлитамак",
    fromGenitive: "Стерлитамака",
    region: "ural",
  },
  {
    slug: "salavat",
    name: "Салават",
    fromGenitive: "Салавата",
    region: "ural",
  },
  { slug: "miass", name: "Миасс", fromGenitive: "Миасса", region: "ural" },
  {
    slug: "zlatoust",
    name: "Златоуст",
    fromGenitive: "Златоуста",
    region: "ural",
  },
  {
    slug: "kamensk-uralskiy",
    name: "Каменск-Уральский",
    fromGenitive: "Каменска-Уральского",
    region: "ural",
  },
  {
    slug: "berezniki",
    name: "Березники",
    fromGenitive: "Березников",
    region: "ural",
  },
  {
    slug: "khanty-mansiysk",
    name: "Ханты-Мансийск",
    fromGenitive: "Ханты-Мансийска",
    region: "ural",
  },
  {
    slug: "nefteyugansk",
    name: "Нефтеюганск",
    fromGenitive: "Нефтеюганска",
    region: "ural",
  },
  {
    slug: "severodvinsk",
    name: "Северодвинск",
    fromGenitive: "Северодвинска",
    region: "northwest",
  },
  {
    slug: "kotlas",
    name: "Котлас",
    fromGenitive: "Котласа",
    region: "northwest",
  },
  {
    slug: "dzerzhinsk",
    name: "Дзержинск",
    fromGenitive: "Дзержинска",
    region: "volga",
  },
  {
    slug: "engels",
    name: "Энгельс",
    fromGenitive: "Энгельса",
    region: "volga",
  },
  {
    slug: "balakovo",
    name: "Балаково",
    fromGenitive: "Балаково",
    region: "volga",
  },
  {
    slug: "nizhnekamsk",
    name: "Нижнекамск",
    fromGenitive: "Нижнекамска",
    region: "volga",
  },
  {
    slug: "angarsk",
    name: "Ангарск",
    fromGenitive: "Ангарска",
    region: "siberia",
  },

  { slug: "donetsk", name: "Донецк", fromGenitive: "Донецка", region: "south" },
  { slug: "makeyevka", name: "Макеевка", fromGenitive: "Макеевки", region: "south" },
  { slug: "gorlovka", name: "Горловка", fromGenitive: "Горловки", region: "south" },
  { slug: "mariupol", name: "Мариуполь", fromGenitive: "Мариуполя", region: "south" },
  { slug: "lugansk", name: "Луганск", fromGenitive: "Луганска", region: "south" },
  { slug: "melitopol", name: "Мелитополь", fromGenitive: "Мелитополя", region: "south" },
  { slug: "berdyansk", name: "Бердянск", fromGenitive: "Бердянска", region: "south" },
  { slug: "kherson", name: "Херсон", fromGenitive: "Херсона", region: "south" },

  { slug: "balashikha", name: "Балашиха", fromGenitive: "Балашихи", region: "center" },
  { slug: "khimki", name: "Химки", fromGenitive: "Химок", region: "center" },
  { slug: "mytishchi", name: "Мытищи", fromGenitive: "Мытищ", region: "center" },
  { slug: "podolsk", name: "Подольск", fromGenitive: "Подольска", region: "center" },
  { slug: "lyubertsy", name: "Люберцы", fromGenitive: "Люберец", region: "center" },
  { slug: "korolev", name: "Королёв", fromGenitive: "Королёва", region: "center" },
  { slug: "odintsovo", name: "Одинцово", fromGenitive: "Одинцово", region: "center" },
  {
    slug: "sergiev-posad",
    name: "Сергиев Посад",
    fromGenitive: "Сергиева Посада",
    region: "center",
  },
  { slug: "kolomna", name: "Коломна", fromGenitive: "Коломны", region: "center" },
  {
    slug: "domodedovo",
    name: "Домодедово",
    fromGenitive: "Домодедово",
    region: "center",
  },
  { slug: "noginsk", name: "Ногинск", fromGenitive: "Ногинска", region: "center" },
  {
    slug: "elektrostal",
    name: "Электросталь",
    fromGenitive: "Электростали",
    region: "center",
  },
  {
    slug: "orekhovo-zuevo",
    name: "Орехово-Зуево",
    fromGenitive: "Орехово-Зуево",
    region: "center",
  },
  { slug: "schelkovo", name: "Щёлково", fromGenitive: "Щёлково", region: "center" },
  { slug: "pushkino", name: "Пушкино", fromGenitive: "Пушкино", region: "center" },
  {
    slug: "ramenskoye",
    name: "Раменское",
    fromGenitive: "Раменского",
    region: "center",
  },
  {
    slug: "zhukovskiy",
    name: "Жуковский",
    fromGenitive: "Жуковского",
    region: "center",
  },
  {
    slug: "serpukhov",
    name: "Серпухов",
    fromGenitive: "Серпухова",
    region: "center",
  },
  { slug: "klin", name: "Клин", fromGenitive: "Клина", region: "center" },
  { slug: "dubna", name: "Дубна", fromGenitive: "Дубны", region: "center" },
  { slug: "reutov", name: "Реутов", fromGenitive: "Реутова", region: "center" },

  {
    slug: "gatchina",
    name: "Гатчина",
    fromGenitive: "Гатчины",
    region: "northwest",
  },
  { slug: "viborg", name: "Выборг", fromGenitive: "Выборга", region: "northwest" },
  {
    slug: "sosnovyy-bor",
    name: "Сосновый Бор",
    fromGenitive: "Соснового Бора",
    region: "northwest",
  },
  {
    slug: "kingisepp",
    name: "Кингисепп",
    fromGenitive: "Кингисеппа",
    region: "northwest",
  },
  {
    slug: "velikiye-luki",
    name: "Великие Луки",
    fromGenitive: "Великих Лук",
    region: "northwest",
  },
  {
    slug: "apatity",
    name: "Апатиты",
    fromGenitive: "Апатитов",
    region: "northwest",
  },
  {
    slug: "monchegorsk",
    name: "Мончегорск",
    fromGenitive: "Мончегорска",
    region: "northwest",
  },
  { slug: "ukhta", name: "Ухта", fromGenitive: "Ухты", region: "northwest" },
  { slug: "pechora", name: "Печора", fromGenitive: "Печоры", region: "northwest" },
  { slug: "usinsk", name: "Усинск", fromGenitive: "Усинска", region: "northwest" },
  { slug: "inta", name: "Инта", fromGenitive: "Инты", region: "northwest" },
  {
    slug: "naryan-mar",
    name: "Нарьян-Мар",
    fromGenitive: "Нарьян-Мара",
    region: "northwest",
  },
  {
    slug: "kandalaksha",
    name: "Кандалакша",
    fromGenitive: "Кандалакши",
    region: "northwest",
  },

  { slug: "syzran", name: "Сызрань", fromGenitive: "Сызрани", region: "volga" },
  {
    slug: "dimitrovgrad",
    name: "Димитровград",
    fromGenitive: "Димитровграда",
    region: "volga",
  },
  {
    slug: "novokuybyshevsk",
    name: "Новокуйбышевск",
    fromGenitive: "Новокуйбышевска",
    region: "volga",
  },
  {
    slug: "chapayevsk",
    name: "Чапаевск",
    fromGenitive: "Чапаевска",
    region: "volga",
  },
  {
    slug: "novocheboksarsk",
    name: "Новочебоксарск",
    fromGenitive: "Новочебоксарска",
    region: "volga",
  },
  {
    slug: "almetyevsk",
    name: "Альметьевск",
    fromGenitive: "Альметьевска",
    region: "volga",
  },
  {
    slug: "zelenodolsk",
    name: "Зеленодольск",
    fromGenitive: "Зеленодольска",
    region: "volga",
  },
  { slug: "bugulma", name: "Бугульма", fromGenitive: "Бугульмы", region: "volga" },
  { slug: "sarapul", name: "Сарапул", fromGenitive: "Сарапула", region: "volga" },
  {
    slug: "chistopol",
    name: "Чистополь",
    fromGenitive: "Чистополя",
    region: "volga",
  },
  { slug: "balashov", name: "Балашов", fromGenitive: "Балашова", region: "volga" },
  { slug: "volsk", name: "Вольск", fromGenitive: "Вольска", region: "volga" },

  {
    slug: "gelendzhik",
    name: "Геленджик",
    fromGenitive: "Геленджика",
    region: "south",
  },
  { slug: "armavir", name: "Армавир", fromGenitive: "Армавира", region: "south" },
  { slug: "tuapse", name: "Туапсе", fromGenitive: "Туапсе", region: "south" },
  { slug: "yeisk", name: "Ейск", fromGenitive: "Ейска", region: "south" },
  {
    slug: "novoshakhtinsk",
    name: "Новошахтинск",
    fromGenitive: "Новошахтинска",
    region: "south",
  },
  { slug: "shahty", name: "Шахты", fromGenitive: "Шахт", region: "south" },
  { slug: "bataysk", name: "Батайск", fromGenitive: "Батайска", region: "south" },
  { slug: "azov", name: "Азов", fromGenitive: "Азова", region: "south" },
  {
    slug: "kamyshin",
    name: "Камышин",
    fromGenitive: "Камышина",
    region: "south",
  },
  {
    slug: "volgodonsk",
    name: "Волгодонск",
    fromGenitive: "Волгодонска",
    region: "south",
  },
  { slug: "krymsk", name: "Крымск", fromGenitive: "Крымска", region: "south" },
  { slug: "temryuk", name: "Темрюк", fromGenitive: "Темрюка", region: "south" },
  {
    slug: "slavyansk-na-kubani",
    name: "Славянск-на-Кубани",
    fromGenitive: "Славянска-на-Кубани",
    region: "south",
  },
  {
    slug: "kropotkin",
    name: "Кропоткин",
    fromGenitive: "Кропоткина",
    region: "south",
  },

  {
    slug: "cherkessk",
    name: "Черкесск",
    fromGenitive: "Черкесска",
    region: "caucasus",
  },
  { slug: "nazran", name: "Назрань", fromGenitive: "Назрани", region: "caucasus" },
  {
    slug: "kaspiysk",
    name: "Каспийск",
    fromGenitive: "Каспийска",
    region: "caucasus",
  },
  {
    slug: "kislovodsk",
    name: "Кисловодск",
    fromGenitive: "Кисловодска",
    region: "caucasus",
  },
  {
    slug: "essentuki",
    name: "Ессентуки",
    fromGenitive: "Ессентуков",
    region: "caucasus",
  },
  {
    slug: "buynaksk",
    name: "Буйнакск",
    fromGenitive: "Буйнакска",
    region: "caucasus",
  },
  {
    slug: "khasavyurt",
    name: "Хасавюрт",
    fromGenitive: "Хасавюрта",
    region: "caucasus",
  },
  {
    slug: "karachayevsk",
    name: "Карачаевск",
    fromGenitive: "Карачаевска",
    region: "caucasus",
  },
  {
    slug: "izberbash",
    name: "Избербаш",
    fromGenitive: "Избербаша",
    region: "caucasus",
  },
  { slug: "kizlyar", name: "Кизляр", fromGenitive: "Кизляра", region: "caucasus" },
  { slug: "beslan", name: "Беслан", fromGenitive: "Беслана", region: "caucasus" },
  { slug: "argun", name: "Аргун", fromGenitive: "Аргуна", region: "caucasus" },

  {
    slug: "neftekamsk",
    name: "Нефтекамск",
    fromGenitive: "Нефтекамска",
    region: "ural",
  },
  {
    slug: "oktyabrskiy",
    name: "Октябрьский",
    fromGenitive: "Октябрьского",
    region: "ural",
  },
  {
    slug: "pervouralsk",
    name: "Первоуральск",
    fromGenitive: "Первоуральска",
    region: "ural",
  },
  { slug: "revda", name: "Ревда", fromGenitive: "Ревды", region: "ural" },
  {
    slug: "tobolsk",
    name: "Тобольск",
    fromGenitive: "Тобольска",
    region: "ural",
  },
  { slug: "ishim", name: "Ишим", fromGenitive: "Ишима", region: "ural" },
  {
    slug: "kopeysk",
    name: "Копейск",
    fromGenitive: "Копейска",
    region: "ural",
  },
  { slug: "asbest", name: "Асбест", fromGenitive: "Асбеста", region: "ural" },
  {
    slug: "polevskoy",
    name: "Полевской",
    fromGenitive: "Полевского",
    region: "ural",
  },
  {
    slug: "shadrinsk",
    name: "Шадринск",
    fromGenitive: "Шадринска",
    region: "ural",
  },
  {
    slug: "verkhnyaya-pyshma",
    name: "Верхняя Пышма",
    fromGenitive: "Верхней Пышмы",
    region: "ural",
  },
  {
    slug: "kumertau",
    name: "Кумертау",
    fromGenitive: "Кумертау",
    region: "ural",
  },
  { slug: "belebey", name: "Белебей", fromGenitive: "Белебея", region: "ural" },

  {
    slug: "novoaltaisk",
    name: "Новоалтайск",
    fromGenitive: "Новоалтайска",
    region: "siberia",
  },
  {
    slug: "rubtsovsk",
    name: "Рубцовск",
    fromGenitive: "Рубцовска",
    region: "siberia",
  },
  {
    slug: "prokopyevsk",
    name: "Прокопьевск",
    fromGenitive: "Прокопьевска",
    region: "siberia",
  },
  {
    slug: "leninsk-kuznetskiy",
    name: "Ленинск-Кузнецкий",
    fromGenitive: "Ленинска-Кузнецкого",
    region: "siberia",
  },
  { slug: "seversk", name: "Северск", fromGenitive: "Северска", region: "siberia" },
  { slug: "achinsk", name: "Ачинск", fromGenitive: "Ачинска", region: "siberia" },
  { slug: "norilsk", name: "Норильск", fromGenitive: "Норильска", region: "siberia" },
  {
    slug: "minusinsk",
    name: "Минусинск",
    fromGenitive: "Минусинска",
    region: "siberia",
  },
  {
    slug: "lesosibirsk",
    name: "Лесосибирск",
    fromGenitive: "Лесосибирска",
    region: "siberia",
  },
  {
    slug: "ust-ilimsk",
    name: "Усть-Илимск",
    fromGenitive: "Усть-Илимска",
    region: "siberia",
  },
  {
    slug: "ust-kut",
    name: "Усть-Кут",
    fromGenitive: "Усть-Кута",
    region: "siberia",
  },
  { slug: "belovo", name: "Белово", fromGenitive: "Белово", region: "siberia" },
  {
    slug: "kiselyovsk",
    name: "Киселёвск",
    fromGenitive: "Киселёвска",
    region: "siberia",
  },
  {
    slug: "mezhdurechensk",
    name: "Междуреченск",
    fromGenitive: "Междуреченска",
    region: "siberia",
  },
  { slug: "berdsk", name: "Бердск", fromGenitive: "Бердска", region: "siberia" },
  {
    slug: "iskitim",
    name: "Искитим",
    fromGenitive: "Искитима",
    region: "siberia",
  },

  {
    slug: "yuzhno-sakhalinsk",
    name: "Южно-Сахалинск",
    fromGenitive: "Южно-Сахалинска",
    region: "far-east",
  },
  {
    slug: "petropavlovsk-kamchatskiy",
    name: "Петропавловск-Камчатский",
    fromGenitive: "Петропавловска-Камчатского",
    region: "far-east",
  },
  {
    slug: "ussuriysk",
    name: "Уссурийск",
    fromGenitive: "Уссурийска",
    region: "far-east",
  },
  { slug: "nakhodka", name: "Находка", fromGenitive: "Находки", region: "far-east" },
  { slug: "artem", name: "Артём", fromGenitive: "Артёма", region: "far-east" },
  { slug: "magadan", name: "Магадан", fromGenitive: "Магадана", region: "far-east" },
  {
    slug: "birobidzhan",
    name: "Биробиджан",
    fromGenitive: "Биробиджана",
    region: "far-east",
  },
  {
    slug: "svobodny",
    name: "Свободный",
    fromGenitive: "Свободного",
    region: "far-east",
  },
  {
    slug: "belogorsk-amurskiy",
    name: "Белогорск",
    fromGenitive: "Белогорска",
    region: "far-east",
  },
  { slug: "neryungri", name: "Нерюнгри", fromGenitive: "Нерюнгри", region: "far-east" },
  {
    slug: "komsomolsk-na-amure",
    name: "Комсомольск-на-Амуре",
    fromGenitive: "Комсомольска-на-Амуре",
    region: "far-east",
  },
  {
    slug: "dalnegorsk",
    name: "Дальнегорск",
    fromGenitive: "Дальнегорска",
    region: "far-east",
  },
  {
    slug: "arsenyev",
    name: "Арсеньев",
    fromGenitive: "Арсеньева",
    region: "far-east",
  },

  {
    slug: "evpatoriya",
    name: "Евпатория",
    fromGenitive: "Евпатории",
    region: "crimea",
  },
  {
    slug: "feodosiya",
    name: "Феодосия",
    fromGenitive: "Феодосии",
    region: "crimea",
  },
  { slug: "dzhankoy", name: "Джанкой", fromGenitive: "Джанкоя", region: "crimea" },
  { slug: "alushta", name: "Алушта", fromGenitive: "Алушты", region: "crimea" },
  { slug: "sudak", name: "Судак", fromGenitive: "Судака", region: "crimea" },
  { slug: "saki", name: "Саки", fromGenitive: "Сак", region: "crimea" },
  {
    slug: "armyansk",
    name: "Армянск",
    fromGenitive: "Армянска",
    region: "crimea",
  },
  {
    slug: "bakhchisaray",
    name: "Бахчисарай",
    fromGenitive: "Бахчисарая",
    region: "crimea",
  },

  {
    slug: "alchevsk",
    name: "Алчевск",
    fromGenitive: "Алчевска",
    region: "south",
  },
  {
    slug: "stakhanov",
    name: "Стаханов",
    fromGenitive: "Стаханова",
    region: "south",
  },
  {
    slug: "krasny-luch",
    name: "Красный Луч",
    fromGenitive: "Красного Луча",
    region: "south",
  },
  {
    slug: "yenakiyevo",
    name: "Енакиево",
    fromGenitive: "Енакиево",
    region: "south",
  },
  {
    slug: "khartsyzk",
    name: "Харцызск",
    fromGenitive: "Харцызска",
    region: "south",
  },
  {
    slug: "shakhtyorsk",
    name: "Шахтёрск",
    fromGenitive: "Шахтёрска",
    region: "south",
  },
  {
    slug: "snezhnoye",
    name: "Снежное",
    fromGenitive: "Снежного",
    region: "south",
  },
  { slug: "torez", name: "Торез", fromGenitive: "Тореза", region: "south" },
  {
    slug: "yasinovataya",
    name: "Ясиноватая",
    fromGenitive: "Ясиноватой",
    region: "south",
  },
  {
    slug: "amvrosiyevka",
    name: "Амвросиевка",
    fromGenitive: "Амвросиевки",
    region: "south",
  },
  {
    slug: "severodonetsk",
    name: "Северодонецк",
    fromGenitive: "Северодонецка",
    region: "south",
  },
  {
    slug: "lisichansk",
    name: "Лисичанск",
    fromGenitive: "Лисичанска",
    region: "south",
  },
  {
    slug: "rubizhne",
    name: "Рубежное",
    fromGenitive: "Рубежного",
    region: "south",
  },
  {
    slug: "starobilsk",
    name: "Старобельск",
    fromGenitive: "Старобельска",
    region: "south",
  },
  { slug: "svatovo", name: "Сватово", fromGenitive: "Сватово", region: "south" },
  {
    slug: "henichesk",
    name: "Геническ",
    fromGenitive: "Геническа",
    region: "south",
  },
  {
    slug: "skadovsk",
    name: "Скадовск",
    fromGenitive: "Скадовска",
    region: "south",
  },
  {
    slug: "chaplynka",
    name: "Чаплинка",
    fromGenitive: "Чаплинки",
    region: "south",
  },
  {
    slug: "novooleksiivka",
    name: "Новоалексеевка",
    fromGenitive: "Новоалексеевки",
    region: "south",
  },
  {
    slug: "enerhodar",
    name: "Энергодар",
    fromGenitive: "Энергодара",
    region: "south",
  },
  { slug: "tokmak", name: "Токмак", fromGenitive: "Токмака", region: "south" },
  {
    slug: "vasylivka",
    name: "Васильевка",
    fromGenitive: "Васильевки",
    region: "south",
  },
];

function uniqueRawCities(items: RawCity[]) {
  const seen = new Set<string>();
  const out: RawCity[] = [];

  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }

  return out;
}

function uniqueSlugs(items: string[], selfSlug: string, known: Set<string>) {
  const seen = new Set<string>();
  const out: string[] = [];

  for (const item of items) {
    if (!item || item === selfSlug || !known.has(item) || seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }

  return out;
}

function buildPopularTo(city: RawCity, cities: RawCity[]) {
  const known = new Set(cities.map((item) => item.slug));

  const sameRegion = cities
    .filter((item) => item.region === city.region)
    .map((item) => item.slug);

  const neighborRegions = REGION_NEIGHBORS[city.region].flatMap((region) =>
    cities.filter((item) => item.region === region).map((item) => item.slug)
  );

  const candidates = uniqueSlugs(
    [
      ...sameRegion,
      ...REGION_HUBS[city.region],
      ...neighborRegions,
      ...NATIONAL_HUBS,
    ],
    city.slug,
    known
  );

  return candidates.slice(0, 60);
}

const UNIQUE_RAW_CITIES = uniqueRawCities(RAW_CITIES);

export const CITY_LANDINGS: CityLanding[] = UNIQUE_RAW_CITIES.map((city) => ({
  slug: city.slug,
  name: city.name,
  fromGenitive: city.fromGenitive,
  popularTo: buildPopularTo(city, UNIQUE_RAW_CITIES),
}));

export const CITY_BY_SLUG = new Map(
  CITY_LANDINGS.map((city) => [city.slug, city] as const)
);

export const CITY_NAME_BY_SLUG = new Map<string, string>(
  CITY_LANDINGS.map((city) => [city.slug, city.name] as const)
);

export const CITY_REGION_BY_SLUG = new Map<string, string>(
  UNIQUE_RAW_CITIES.map((city) => [city.slug, city.region] as const)
);

export function prettyCityNameFromSlug(slug: string) {
  return (
    CITY_NAME_BY_SLUG.get(slug) ??
    slug
      .split("-")
      .filter(Boolean)
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function getAllRouteTargets(fromSlug: string) {
  return CITY_LANDINGS.filter((city) => city.slug !== fromSlug).map(
    (city) => city.slug
  );
}

export function isValidCitySlug(slug: string) {
  return CITY_BY_SLUG.has(slug);
}

export function isValidRouteSlugs(fromSlug: string, toSlug: string) {
  return (
    fromSlug !== toSlug &&
    CITY_BY_SLUG.has(fromSlug) &&
    CITY_BY_SLUG.has(toSlug)
  );
}