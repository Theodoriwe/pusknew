import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page-template";
import type { ServicePageData } from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "Telegram боты и Mini Apps | ПУСК",
  description: "Разработка Telegram ботов и мини-приложений для бизнеса. Автоматизация продаж, поддержки, записи на услуги.",
};

const serviceData: ServicePageData = {
  slug: "telegram-bots",
  title: "Разработка Telegram-ботов и Мини приложений для бизнеса",
  subtitle: "Разрабатываем умных ботов и мини-приложения, которые автоматизируют продажи и работу с клиентами",
  description: "Создание Telegram ботов и Mini Apps для автоматизации бизнес-процессов. Продажи, запись, поддержка клиентов.",
  features: [
    {
      title: "Чат-боты продаж",
      description: "Автоматические воронки продаж с оплатой в боте",
      icon: "ShoppingCart" as const,
    },
    {
      title: "Боты записи",
      description: "Онлайн-запись на услуги с напоминаниями",
      icon: "Bot" as const,
    },
    {
      title: "Боты поддержки",
      description: "Автоответы на частые вопросы, тикет-система",
      icon: "MessageSquare" as const,
    },
    {
      title: "Mini Apps",
      description: "Полноценные веб-приложения внутри Telegram",
      icon: "Zap" as const,
    },
    {
      title: "Интеграции",
      description: "Связь с CRM, платёжными системами, 1C",
      icon: "Plug" as const,
    },
    {
      title: "AI-функционал",
      description: "Умные ответы на базе GPT и других нейросетей",
      icon: "BrainCircuit" as const,
    },
  ],
  audiences: [
    { title: "Онлайн-школы", description: "Доставка курсов и проверка домашек" },
    { title: "Салоны красоты", description: "Запись и напоминания клиентам" },
    { title: "Интернет-магазины", description: "Каталог и оформление заказов" },
    { title: "Сервисные компании", description: "Приём заявок и статус выполнения" },
  ],
  metrics: [],
  steps: [
    { title: "Анализ", description: "Изучаем бизнес-процессы и определяем задачи бота" },
    { title: "Проектирование", description: "Создаём сценарии диалогов и архитектуру" },
    { title: "Разработка", description: "Программируем бота с нужным функционалом" },
    { title: "Запуск", description: "Тестируем, деплоим и обучаем команду" },
  ],
  cases: [
    {
      id: "bot-school",
      title: "Онлайн-школа «Знание»",
      category: "Telegram Bot",
      resultBefore: "2ч",
      resultAfter: "5мин",
      metric: "время ответа",
    },
    {
      id: "bot-salon",
      title: "Сеть салонов «Бьюти»",
      category: "Mini App",
      resultBefore: "500",
      resultAfter: "2 000",
      metric: "+300%",
    },
    {
      id: "bot-delivery",
      title: "Служба доставки «Быстро»",
      category: "Telegram Bot",
      resultBefore: "30%",
      resultAfter: "85%",
      metric: "автоматизация",
    },
  ],
  prices: [
    {
      title: "Простой бот",
      price: "от 50 000 ₽",
      features: [
        "Базовые команды",
        "Меню и кнопки",
        "Интеграция с 1 сервисом",
        "Документация",
        "14 дней поддержки",
      ],
    },
    {
      title: "Бизнес-бот",
      price: "от 150 000 ₽",
      highlighted: true,
      features: [
        "Сложные сценарии",
        "Интеграция с CRM",
        "Приём платежей",
        "Административная панель",
        "3 месяца поддержки",
      ],
    },
    {
      title: "Mini App",
      price: "от 300 000 ₽",
      features: [
        "Полноценное веб-приложение",
        "Уникальный дизайн",
        "Любые интеграции",
        "Мобильная адаптация",
        "6 месяцев поддержки",
      ],
    },
  ],
  faqs: [
    {
      question: "Чем Mini App отличается от обычного бота?",
      answer: "Mini App — это полноценное веб-приложение, которое открывается внутри Telegram. Оно поддерживает сложные интерфейсы, формы, каталоги товаров и другой функционал, недоступный в обычных ботах.",
    },
    {
      question: "Сколько времени занимает разработка?",
      answer: "Простой бот — 2-3 недели, бизнес-бот — 1-2 месяца, Mini App — от 2 месяцев. Сроки зависят от сложности функционала и количества интеграций.",
    },
    {
      question: "Какие интеграции возможны?",
      answer: "Мы интегрируем ботов с любыми системами CRM и платёжными системами",
    },
    {
      question: "Как оплачивается хостинг бота?",
      answer: "Мы размещаем ботов на надёжных серверах. Стоимость хостинга от  500 ₽/мес для простых ботов и от 10 000 ₽/мес для высоконагруженных проектов.",
    },
  ],
};

export default function TelegramBotsPage() {
  return <ServicePageTemplate data={serviceData} />;
}
