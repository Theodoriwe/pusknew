import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telegram боты и Mini Apps",
  description: "Разработка Telegram ботов и мини-приложений для бизнеса. Автоматизация продаж, поддержки, записи на услуги в Сочи.",
  keywords: ["telegram боты", "mini apps", "разработка", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/uslugi/mini-apps-boty",
  },
  openGraph: {
    title: "Telegram боты и Mini Apps | ПУСК",
    description: "Разработка Telegram ботов и мини-приложений для бизнеса. Автоматизация продаж, поддержки, записи на услуги в Сочи.",
    url: "https://agencypusk.ru/uslugi/mini-apps-boty",
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
