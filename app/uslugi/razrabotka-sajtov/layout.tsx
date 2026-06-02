import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Разработка сайтов | ПУСК",
  description: "Создаём современные сайты и интернет-магазины с конверсией выше рынка в 2-3 раза. Лендинги, корпоративные сайты, веб-приложения. Заказать разработку сайта в Москве.",
  keywords: [
    "разработка сайтов",
    "создание сайта",
    "веб-разработка",
    "лендинг",
    "интернет-магазин",
    "веб-приложение",
    "корпоративный сайт",
    "разработка сайта Москва",
  ],
  metadataBase: new URL("https://pusk.agency"),
  alternates: {
    canonical: "https://pusk.agency/uslugi/razrabotka-sajtov",
  },
  openGraph: {
    title: "Разработка сайтов | ПУСК",
    description: "Создаём современные сайты и интернет-магазины с конверсией выше рынка в 2-3 раза",
    url: "https://pusk.agency/uslugi/razrabotka-sajtov",
    type: "website",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
