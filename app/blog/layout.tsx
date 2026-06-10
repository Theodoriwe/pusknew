import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи о маркетинге, разработке, SMM и аналитике. Советы по привлечению клиентов и продвижению бизнеса в Сочи.",
  keywords: ["блог", "маркетинг", "Сочи", "статьи"],
  alternates: {
    canonical: "https://agencypusk.ru/blog",
  },
  openGraph: {
    title: "Блог | ПУСК",
    description: "Статьи о маркетинге, разработке, SMM и аналитике. Советы по привлечению клиентов и продвижению бизнеса в Сочи.",
    url: "https://agencypusk.ru/blog",
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
