import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заказать услугу",
  description: "Заполните бриф и получите первоначальный расчет стоимости разработки сайта, контекстной рекламы, SMM или Telegram бота.",
  keywords: ["бриф", "расчет стоимости", "Сочи", "заказать"],
  alternates: {
    canonical: "https://agencypusk.ru/brief",
  },
  openGraph: {
    title: "Заказать услугу | ПУСК",
    description: "Заполните бриф и получите первоначальный расчет стоимости разработки сайта, контекстной рекламы, SMM или Telegram бота.",
    url: "https://agencypusk.ru/brief",
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
