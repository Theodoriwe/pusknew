import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами по телефону, email или через форму. Агентство ПУСК в Сочи помогает бизнесу расти.",
  keywords: ["контакты", "Сочи", "телефон", "email"],
  alternates: {
    canonical: "https://agencypusk.ru/kontakty",
  },
  openGraph: {
    title: "Контакты | ПУСК",
    description: "Свяжитесь с нами по телефону, email или через форму. Агентство ПУСК в Сочи помогает бизнесу расти.",
    url: "https://agencypusk.ru/kontakty",
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
