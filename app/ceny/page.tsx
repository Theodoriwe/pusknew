"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useModalStore } from "@/lib/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const services = [
  {
    id: "websites",
    name: "Разработка сайтов",
    description: "Лендинги, корпоративные сайты, интернет-магазины",
    plans: [
      {
        name: "Лендинг",
        price: "от 35 000",
        period: "проект",
        features: [
          { text: "До 5 экранов", included: true },
          { text: "Адаптивный дизайн", included: true },
          { text: "Базовая SEO-оптимизация", included: true },
          { text: "Форма обратной связи", included: true },
          { text: "Интеграция с CRM", included: false },
          { text: "Каталог товаров", included: false },
        ],
        popular: false,
      },
      {
        name: "Корпоративный сайт",
        price: "от 80 000",
        period: "проект",
        features: [
          { text: "До 15 страниц", included: true },
          { text: "Уникальный дизайн", included: true },
          { text: "Полная SEO-оптимизация", included: true },
          { text: "Интеграция с CRM", included: true },
          { text: "Админ-панель", included: true },
          { text: "Каталог товаров", included: false },
        ],
        popular: true,
      },
      {
        name: "Интернет-магазин",
        price: "от 150 000",
        period: "проект",
        features: [
          { text: "Неограниченно страниц", included: true },
          { text: "Каталог и корзина", included: true },
          { text: "Интеграция с 1С", included: true },
          { text: "Личный кабинет", included: true },
          { text: "Онлайн-оплата", included: true },
          { text: "Интеграция с доставкой", included: true },
        ],
        popular: false,
      },
    ],
  },
  {
    id: "ads",
    name: "Контекстная реклама",
    description: "Яндекс.Директ, Google Ads, ремаркетинг",
    plans: [
      {
        name: "Старт",
        price: "от 35 000",
        period: "месяц",
        features: [
          { text: "До 100 ключевых слов", included: true },
          { text: "1 рекламная система", included: true },
          { text: "Базовая аналитика", included: true },
          { text: "Еженедельные отчёты", included: true },
          { text: "Ремаркетинг", included: false },
          { text: "A/B тестирование", included: false },
        ],
        popular: false,
      },
      {
        name: "Бизнес",
        price: "от 50 000",
        period: "месяц",
        features: [
          { text: "До 500 ключевых слов", included: true },
          { text: "Яндекс + Google", included: true },
          { text: "Сквозная аналитика", included: true },
          { text: "Ремаркетинг", included: true },
          { text: "A/B тестирование", included: true },
          { text: "Персональный менеджер", included: false },
        ],
        popular: true,
      },
      {
        name: "Агентство",
        price: "от 100 000",
        period: "месяц",
        features: [
          { text: "Неограниченно слов", included: true },
          { text: "Все рекламные системы", included: true },
          { text: "BI-дашборды", included: true },
          { text: "Персональный менеджер", included: true },
          { text: "Приоритетная поддержка", included: true },
          { text: "Стратегические сессии", included: true },
        ],
        popular: false,
      },
    ],
  },
  {
    id: "smm",
    name: "SMM продвижение",
    description: "Ведение соцсетей, контент, таргетированная реклама",
    plans: [
      {
        name: "Старт",
        price: "от 30 000",
        period: "месяц",
        features: [
          { text: "1 социальная сеть", included: true },
          { text: "12 постов в месяц", included: true },
          { text: "Базовая модерация", included: true },
          { text: "Ежемесячный отчёт", included: true },
          { text: "Stories / Reels", included: false },
          { text: "Таргетированная реклама", included: false },
        ],
        popular: false,
      },
      {
        name: "Бизнес",
        price: "от 60 000",
        period: "месяц",
        features: [
          { text: "2 социальные сети", included: true },
          { text: "20 постов в месяц", included: true },
          { text: "Stories и Reels", included: true },
          { text: "Таргетированная реклама", included: true },
          { text: "Комьюнити-менеджмент", included: true },
          { text: "Работа с инфлюенсерами", included: false },
        ],
        popular: true,
      },
      {
        name: "Премиум",
        price: "от 120 000",
        period: "месяц",
        features: [
          { text: "3+ социальных сетей", included: true },
          { text: "Ежедневный контент", included: true },
          { text: "Видеопродакшн", included: true },
          { text: "Работа с инфлюенсерами", included: true },
          { text: "Персональный менеджер", included: true },
          { text: "Стратегические сессии", included: true },
        ],
        popular: false,
      },
    ],
  },
];

export default function PricesPage() {
  const [activeService, setActiveService] = useState("websites");
  const { openContact } = useModalStore();
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const currentService = services.find((s) => s.id === activeService);

  return (
    <TooltipProvider>
      <Header />
      <main className="bg-background text-foreground">
        {/* Desktop Hero Section */}
        <section className="hidden lg:block pt-24 pb-10 lg:pb-14">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Цены" }]} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 lg:mt-12"
            >
              <div className="overflow-hidden rounded-[32px] border border-white/5 bg-[linear-gradient(135deg,rgba(10,10,15,0.98),rgba(17,24,39,0.96),rgba(15,23,42,0.92))] px-7 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12 shadow-[0_35px_120px_-50px_rgba(0,0,0,0.7)]">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div className="text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
                      <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      Фиксированные цены без сюрпризов
                    </div>

                    <h1
                      className="mt-5 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.5rem]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <span className="block">Честные цены</span>
                      <span className="block" style={{ color: "var(--primary)" }}>
                        на услуги маркетинга
                      </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                      Выберите готовый пакет или запросите индивидуальное предложение.
                      Мы подбираем формат под задачу бизнеса и фиксируем стоимость до старта.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {[
                        { id: "websites", label: "Разработка сайтов" },
                        { id: "ads", label: "Контекстная реклама" },
                        { id: "smm", label: "SMM продвижение" },
                      ].map((item) => (
                        <motion.button
                          key={item.id}
                          onClick={() => setActiveService(item.id)}
                          className={`rounded-full px-5 py-3 text-sm font-bold transition-transform ${
                            activeService === item.id
                              ? "bg-[var(--primary)] text-black"
                              : "border border-white/10 bg-white/5 text-white hover:border-white/25 hover:bg-white/10"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {[
                        { value: "от 24 ч", label: "срок ответа" },
                        { value: "100%", label: "прозрачность" },
                        { value: "3 мес", label: "поддержка" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                        >
                          <p className="text-xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                            {item.value}
                          </p>
                          <p className="mt-1 text-sm text-white/70">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-border bg-background/95 p-5 sm:p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.5)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                          Актуальный пакет
                        </p>
                        <h2 className="mt-3 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                          {currentService?.name}
                        </h2>
                      </div>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/80">
                        {currentService?.plans[0]?.name}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {currentService?.description}. Мы поднимаем запуск с нуля и сопровождаем рост после старта.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        { label: "Фиксированная цена", value: currentService?.plans[0]?.price ?? "от 50 000" },
                        { label: "Срок запуска", value: "от 7 дней" },
                        { label: "Поддержка", value: "3 месяца" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
                        >
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-semibold text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <motion.button
                        onClick={() => openContact(currentService?.id)}
                        className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
                        whileTap={{ scale: 0.98 }}
                      >
                        Получить расчёт
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setActiveService(currentService?.id ?? "websites");
                          setTimeout(() => {
                            pricingRef.current?.scrollIntoView({ behavior: "smooth" });
                          }, 0);
                        }}
                        className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground transition-transform hover:border-primary/50"
                        whileTap={{ scale: 0.98 }}
                      >
                        Смотреть тарифы
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Header Section */}
        <section className="lg:hidden pt-25 pb-6">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <Breadcrumbs items={[{ label: "Цены" }]} />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-3xl font-black tracking-[-0.05em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block" style={{ color: "var(--primary)" }}>Честные цены</span>
              <span className="block text-foreground">
                на услуги маркетинга
              </span>
            </motion.h1>
          </div>
        </section>

        <section className="pb-8 pt-6 lg:pb-12" ref={pricingRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    activeService === service.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border hover:border-primary/50"
                  }`}
                >
                  {service.name}
                </motion.button>
              ))}
            </div>

            {currentService && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                      Прайс
                    </p>
                    <h2
                      className="mt-3 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {currentService.name}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {currentService.description}. Пакеты рассчитаны на быстрое старта и масштабирование.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      { label: "Фиксная ставка", value: "без доплат" },
                      { label: "Оперативный старт", value: "от 7 дней" },
                      { label: "Поддержка", value: "3 месяца" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-[#549AF2] px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-5 xl:grid-cols-3">
                  {currentService.plans.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className={`relative flex flex-col rounded-[28px] border p-6 sm:p-7 ${
                        plan.popular
                          ? "border-transparent bg-[linear-gradient(180deg,#111827,#0f172a)] text-white shadow-[0_30px_100px_-45px_rgba(15,23,42,0.75)]"
                          : "border-border bg-card"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                          Популярный
                        </div>
                      )}

                      <div className="mb-5">
                        <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                          {plan.name}
                        </h3>
                        <p className={`mt-2 text-sm leading-6 ${plan.popular ? "text-white/75" : "text-muted-foreground"}`}>
                          {currentService.description}
                        </p>
                      </div>

                      <div className="mb-6 flex items-end gap-2">
                        <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>ОТ</span>
                        <span
                          className="text-4xl font-black tracking-[-0.05em]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {plan.price.replace("от ", "")}
                        </span>
                        <span className={`pb-1 text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>₽</span>
                      </div>

                      <ul className="space-y-3.5">
                        {plan.features.map((feature) => (
                          <li key={feature.text} className="flex items-start gap-3">
                            {feature.included ? (
                              <Check
                                size={18}
                                className={`mt-0.5 shrink-0 ${plan.popular ? "text-[var(--primary)]" : "text-primary"}`}
                              />
                            ) : (
                              <X
                                size={18}
                                className={`mt-0.5 shrink-0 ${plan.popular ? "text-white/30" : "text-muted-foreground/40"}`}
                              />
                            )}
                            <span
                              className={`text-sm leading-6 ${
                                plan.popular
                                  ? feature.included
                                    ? "text-white/85"
                                    : "text-white/45"
                                  : feature.included
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <motion.button
                          onClick={() => openContact(currentService.id)}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                            plan.popular
                              ? "bg-[var(--primary)] text-black"
                              : "bg-[#d5ed5d] text-black"
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                          Заказать
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[28px] border border-border bg-card p-6 sm:p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Что входит в цену
                </p>
                <h3 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Всё, что нужно для запуска
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Полная разработка или настройка",
                    "Работа квалифицированных специалистов",
                    "Правки и доработки в рамках ТЗ",
                    "Техническая поддержка 3 месяца",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <Check className="mt-0.5 shrink-0 text-primary" size={18} strokeWidth={3} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-[28px] border border-border bg-[linear-gradient(180deg,rgba(84,154,242,0.15),rgba(84,154,242,0.05))] p-6 sm:p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Как работает оплата
                </p>
                <h3 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Структура удобна для бизнеса
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "50% предоплаты при подписании договора",
                    "50% при сдаче проекта",
                    "Для крупных проектов — поэтапная оплата",
                    "Счёт и безопасность гарантированы",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <Check className="mt-0.5 shrink-0 text-primary" size={18} strokeWidth={3} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-border bg-muted/40 px-6 py-10 sm:px-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Индивидуальный расчёт
              </p>
              <h2
                className="mt-4 text-4xl font-black tracking-[-0.05em] text-foreground sm:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block">Не нашли подходящий</span>
                <span className="block" style={{ color: "var(--primary)" }}>
                  пакет?
                </span>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                Расскажите о вашем проекте — мы подготовим предложение за 24 часа и расскажем, что даст максимум результата.
              </p>
              <motion.button
                onClick={() => openContact()}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
                whileTap={{ scale: 0.98 }}
              >
                Получить расчёт
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </TooltipProvider>
  );
}
