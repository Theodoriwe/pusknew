import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Примеры работ и результатов для наших клиентов. Кейсы по разработке сайтов, маркетингу и SMM в Сочи.",
  keywords: ["кейсы", "примеры работ", "результаты", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/kejsy",
  },
  openGraph: {
    title: "Кейсы | ПУСК",
    description: "Примеры работ и результатов для наших клиентов. Кейсы по разработке сайтов, маркетингу и SMM в Сочи.",
    url: "https://agencypusk.ru/kejsy",
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
