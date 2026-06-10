import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности агентства ПУСК по обработке персональных данных.",
  keywords: ["политика", "конфиденциальность", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/privacy",
  },
  openGraph: {
    title: "Политика конфиденциальности | ПУСК",
    description: "Политика конфиденциальности агентства ПУСК по обработке персональных данных.",
    url: "https://agencypusk.ru/privacy",
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
