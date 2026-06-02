import { TrendingUp, Clock, Star } from "lucide-react";

export type CaseData = {
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  team: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string[];
  results: {
    label: string;
    before: string;
    after: string;
    change: string;
    icon?: typeof TrendingUp;
  }[];
  siteUrl?: string;
  logo?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    avatar?: string;
  };
  nextCase?: {
    slug: string;
    title: string;
    category: string;
  };
};

export const casesData: Record<string, CaseData> = {
  "lounge-bar": {
    title: "Лаундж-бар",
    client: "Tooman Polyana",
    category: "Разработка сайтов",
    year: "2024",
    duration: "2 года",
    team: "5 человек",
    tags: ["Яндекс Директ", "Гео-сервисы", "Таргетированная реклама"],
    description: "Разработка сайта, с продвижением - увеличение конверсий и бронирований",
    logo: "/tooman.webp",
    challenge:
      "Старый сайт был на простой CMS, не привлекал клиентов. Низкая видимость в поиске, сложное бронирование столиков, нет системы управления событиями.",
    solution: [
      "Разработали красивый адаптивный сайт с системой бронирования",
      "Настроили SEO оптимизацию и контекстную рекламу",
      "Создали интеграцию с CRM для управления бронированиями",
      "Запустили локальное продвижение в геосервисах",
    ],
    results: [
      { label: "Конверсия", before: "3.2%", after: "7.8%", change: "+217%", icon: TrendingUp },
      { label: "Позиция в выдаче", before: "5 страница", after: "1-3", change: "+500%", icon: TrendingUp },
      { label: "Трафик сайта", before: "", after: "+500%", change: "", icon: Clock },
    ],
    siteUrl: "https://toomanpolyana.ru",
    testimonial: {
      quote:
        "После запуска сайта у нас полностью заполняется график в выходные. Клиентам нравится что можно забронировать стол прямо с сайта.",
     
      position: "Tooman Polyana",
    },
    nextCase: { slug: "trikoni-restaurant", title: "Ресторан Трикони", category: "Контекстная реклама" },
  },
  "trikoni-restaurant": {
    title: "Ресторан Трикони",
    client: "Трикони",
    category: "Контекстная реклама",
    year: "2024",
    duration: "12 месяцев",
    team: "3 человека",
    tags: ["Яндекс.Директ", "Гео. сервисы", "Аналитика"],
    description: "Комплексная реклама, разработка сайта и продвижение в гео. сервисах- увеличение заявок и бронирований",
    logo: "/trikonilogo.webp",
    challenge:
      "Высокая стоимость клика в контекстной рекламе, низкое качество лидов, отсутствие интеграции с системой управления бронированиями.",
    solution: [
      "Провели аудит контекстных кампаний и оптимизировали ключевые слова",
      "Создали объявления и провели A/B тестирование для улучшения CTR",
      "Настроили отслеживание звонков и бронирований",
      "Настроили ретаргетинг и удержание клиентов",
    ],
    results: [
      { label: "Отказы", before: "58%", after: "23%", change: "-60%", icon: TrendingUp },
      { label: "CTR", before: "2.4%", after: "8.1%", change: "+237%", icon: TrendingUp },
      { label: "ROI рекламы", before: "150%", after: "420%", change: "+180%", icon: Star },
     
    ],
    siteUrl: "https://trikonipolyana.ru/",
    
    nextCase: { slug: "kochevniki-restaurant", title: "Ресторан Кочевники", category: "Комплексное продвижение" },
  },
  "kochevniki-restaurant": {
    title: "Ресторан",
    client: "Кочевники",
    category: "Комплексное продвижение",
    year: "2024",
    duration: "4 месяца",
    team: "4 человека",
    tags: ["Яндекс.Директ", "Гео. сервисы", "SMM", "Аналитика"],
    description: "Продвижение в гео. сервисах, разработка сайта и комплексная реклама - увеличение заявок и бронирований",
    logo: "/kochevnikilogo.png",
    challenge:
      "Низкая видимость в геосервисах, слабое присутствие в соцсетях, конкуренция с другими ресторанами в районе.",
    solution: [
      "Разработали простой сайт с акцентом на геолокацию и меню",
      "Создали карточки в Яндекс.Картах и Google Maps, и 2гис",
      "Запустили системную работу рекламных кампаний с геотаргетингом",
       
      
    ],
    results: [
      { label: "Звонки", before: "×1", after: "×3.2", change: "+220%", icon: TrendingUp },
      { label: "Видимость", before: "14%", after: "61%", change: "+336%", icon: TrendingUp },
      { label: "Трафик с карт", before: "0", after: "+140%", change: "+140%", icon: Star },
      
    ],
    siteUrl: "https://kochevniki-by-trikoni.ru/",
   
    nextCase: { slug: "rosa-hotor-tubing", title: "Тюбинг Роза Хутор", category: "Геосервисы" },
  },
  "rosa-hotor-tubing": {
    title: "Тюбинг Роза Хутор",
    client: "Тюбинг Роза Хутор",
    category: "Геосервисы",
    year: "2024",
    duration: "4 месяца",
    team: "2 человека",
    tags: ["Яндекс.Карты", "Карты", "SEO"],
    description: "Комплексное продвижение и разработка сайтов",
    logo: "/tubinglogo.png",
    challenge:
      "Сезонный бизнес, нужно было быстро получать видимость перед сезоном. Никакой информации в геосервисах, слабые позиции в поиске.",
    solution: [
      "Оптимизировали и заполнили карточки во всех геосервисах",
      "Создали простой лендинг с ценами и трассами",
      "Запустили SEO для локальных запросов",
      "Настроили рекламные компании яндекс директ с геотаргетингом",
    ],
    results: [
      { label: "SEO выдача", before: "0", after: "Топ 5", change: "Новый канал", icon: TrendingUp },
      { label: "Просмотры карточки", before: "0", after: "1 200+/мес", change: "Новый канал", icon: Clock },
      { label: "Звонки/сообщения", before: "", after: "+290%", change: "", icon: TrendingUp },
    ],
    siteUrl: "https://tubingrosa.ru/",
   
    nextCase: { slug: "florist-shop", title: "Цветочный магазин", category: "Контекстная реклама" },
  },
  "florist-shop": {
    title: "Цветочный магазин",
    client: "Flowers",
    category: "Контекстная реклама",
    year: "2024",
    duration: "13 месяца",
    team: "2 человека",
    tags: ["Сервисы", "SEO", "Карты", "Yandex Market"],
    description: "Продвижение в гео. сервисах и сервисах доставки - увеличение заявок и покупок",
    challenge:
      "Сервисы доставки забирают большую комиссию, нужно было привлекать клиентов на прямые заказы. Отсутствие видимости в картах.",
    solution: [
      "Оптимизировали карточку в Яндекс.Картах с каталогом",
      "Создали каталог товаров на сайте",
      "Запустили рекламу с акцентом на прямые заказы",
      "Настроили интеграцию с Яндекс.Маркет, и других сервисов для дополнительного канала продаж",
    ],
    results: [
      { label: "Продажи через сервисы", before: "0%", after: "100%", change: "новый канал", icon: TrendingUp },
      { label: "Отказы", before: "65%", after: "35%", change: "-46%", icon: TrendingUp },
      { label: "Средний чек", before: "1 500₽", after: "2 200₽", change: "+47%", icon: TrendingUp },
      { label: "Заказы в день", before: "2-3", after: "15-20", change: "+600%", icon: Clock },
    ],
    siteUrl: "https://lili-florist.ru",
    
    nextCase: { slug: "bath-complex", title: "Банный комплекс", category: "Контекстная реклама" },
  },
  "bath-complex": {
    title: "Банный комплекс",
    client: "Русь Баня",
    category: "Контекстная реклама",
    year: "2024",
    duration: "5 месяцев",
    team: "3 человека",
    tags: ["Яндекс.Директ", "Карты", "SEO", "CRM"],
    description: "Лидогенерация для банного комплекса",
    challenge:
      "Высокая конкуренция в нише, низкая конверсия сайта, нет системы для обработки заявок.",
    solution: [
      "Создали специальные объявления для разных типов услуг",
      "Оптимизировали сайт для конверсии (улучшили UX бронирования)",
      "Интегрировали CRM для обработки лидов",
      "Настроили таргетированную рекламу с акцентом на геолокацию и сезонность",
    ],
    results: [
      { label: "Лиды", before: "40/мес", after: "180/мес", change: "+350%", icon: TrendingUp },
      { label: "ROI", before: "120%", after: "340%", change: "+183%", icon: TrendingUp },
      { label: "Повторные клиенты", before: "15%", after: "42%", change: "+180%", icon: Star },
      { label: "Средняя стоимость лида", before: "1 500₽", after: "950₽", change: "-37%", icon: TrendingUp },
    ],
    siteUrl: "https://rus-banya.ru",
    
    nextCase: { slug: "lounge-bar", title: "Лаундж-бар", category: "Разработка сайтов" },
  },
};
