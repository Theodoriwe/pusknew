import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMM продвижение",
  description: "Продвижение бизнеса в социальных сетях. Ведение аккаунтов ВКонтакте, Telegram, создание контента, таргетированная реклама в Сочи.",
  keywords: ["smm", "социальные сети", "контент", "Сочи"],
  alternates: {
    canonical: "https://agencypusk.ru/uslugi/smm",
  },
  openGraph: {
    title: "SMM продвижение | ПУСК",
    description: "Продвижение бизнеса в социальных сетях. Ведение аккаунтов ВКонтакте, Telegram, создание контента, таргетированная реклама в Сочи.",
    url: "https://agencypusk.ru/uslugi/smm",
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
