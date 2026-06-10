import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продвижение в геосервисах",
  description: "Продвижение бизнеса на Яндекс.Картах, Google Maps, 2ГИС. Управление репутацией, работа с отзывами, оптимизация карточек в Сочи.",
  keywords: ["геосервисы", "яндекс карты", "2гис", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/uslugi/prodvizhenie-v-geoserwisah",
  },
  openGraph: {
    title: "Продвижение в геосервисах | ПУСК",
    description: "Продвижение бизнеса на Яндекс.Картах, Google Maps, 2ГИС. Управление репутацией, работа с отзывами, оптимизация карточек в Сочи.",
    url: "https://agencypusk.ru/uslugi/prodvizhenie-v-geoserwisah",
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
