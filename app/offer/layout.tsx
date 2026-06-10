import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Договор оферты",
  description: "Договор оферты о предоставлении услуг маркетинга и разработки от агентства ПУСК.",
  keywords: ["договор", "оферта", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/offer",
  },
  openGraph: {
    title: "Договор оферты | ПУСК",
    description: "Договор оферты о предоставлении услуг маркетинга и разработки от агентства ПУСК.",
    url: "https://agencypusk.ru/offer",
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
