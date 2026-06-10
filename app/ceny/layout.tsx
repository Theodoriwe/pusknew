import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены и услуги",
  description: "Прозрачные цены на разработку сайтов, контекстную рекламу, SEO, SMM, геосервисы, Telegram боты в Сочи.",
  keywords: ["цены", "услуги", "Сочи", "стоимость"],
  alternates: {
    canonical: "https://agencypusk.ru/ceny",
  },
  openGraph: {
    title: "Цены и услуги | ПУСК",
    description: "Прозрачные цены на разработку сайтов, контекстную рекламу, SEO, SMM, геосервисы, Telegram боты в Сочи.",
    url: "https://agencypusk.ru/ceny",
    type: "website",
    images: [
      {
        url: "https://agencypusk.ru/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
