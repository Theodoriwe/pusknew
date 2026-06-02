import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги | ПУСК",
  description: "Полный спектр услуг цифрового маркетинга: разработка сайтов, контекстная реклама, продвижение, SMM и Telegram-боты.",
};

export default function UslugiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
