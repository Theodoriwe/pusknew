import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контекстная реклама",
  description:
    "Настраиваем Яндекс.Директ и Google Ads с максимальной эффективностью. Снижаем стоимость заявки и увеличиваем конверсию.",
  keywords: [
    "контекстная реклама",
    "яндекс директ",
    "google ads",
    "настройка рекламы",
    "таргетированная реклама",
  ],
  openGraph: {
    title: "Контекстная реклама | ПУСК",
    description:
      "Настраиваем Яндекс.Директ и Google Ads с максимальной эффективностью.",
    url: "https://pusk.agency/uslugi/kontekstnaya-reklama",
  },
  alternates: {
    canonical: "https://pusk.agency/uslugi/kontekstnaya-reklama",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
