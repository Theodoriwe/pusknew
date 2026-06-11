"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Target, MapPin, Share2, Bot, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

const services = [
  {
    title: "Разработка сайтов",
    description: "Собираем сайты и интернет-магазины под ключ, которые не просто красивые, а помогают продавать и превращать трафик в заявки.",
    bullets: ["Лендинги", "Корпоративные сайты", "Интернет-магазины", "Веб-приложения"],
    href: "/uslugi/razrabotka-sajtov",
    icon: Globe,
    accent: "#549AF2",
    cardBg: "#549AF2",
    dark: true,
  },
  {
    title: "Контекстная реклама",
    description: "Запускаем целевую рекламу в поиске и КМС, чтобы привлекать готовых клиентов уже в первый месяц.",
    bullets: ["Яндекс.Директ", "РСЯ", "Ретаргетинг", "Аналитика и отчёты"],
    href: "/uslugi/kontekstnaya-reklama",
    icon: Target,
    accent: "#7B5AF5",
    cardBg: "#ffffff",
    dark: false,
  },
  {
    title: "Продвижение в геосервисах",
    description: "Выводим бизнес в топ карт, делаем карточки привлекательными и повышаем поток обращений из локального поиска.",
    bullets: ["Яндекс.Карты", "2ГИС", "Google Карты", "Отзывы и репутация"],
    href: "/uslugi/prodvizhenie-v-geoserwisah",
    icon: MapPin,
    accent: "#00C48C",
    cardBg: "#d0ef4c",
    dark: false,
  },
  {
    title: "SMM продвижение",
    description: "Строим контент и рекламу в соцсетях, чтобы увеличивать узнаваемость и вовлечённость аудитории.",
    bullets: ["Контент-стратегия", "Таргет", "Креативы", "Ежемесячная аналитика"],
    href: "/uslugi/smm",
    icon: Share2,
    accent: "#F0643C",
    cardBg: "#161b28",
    dark: true,
  },
  {
    title: "Telegram боты и Mini Apps",
    description: "Автоматизируем продажи, поддержку и продвигаем бизнес через чат-ботов и удобные Mini Apps внутри Telegram.",
    bullets: ["Чат-боты продаж", "Боты записи", "Поддержка", "Mini Apps"],
    href: "/uslugi/mini-apps-boty",
    icon: Bot,
    accent: "#549AF2",
    cardBg: "#549AF2",
    dark: true,
  },
];

const stats = [
  { value: "4+", label: "года опыта" },
  { value: "50+", label: "проектов" },
  { value: "100%", label: "прозрачной отчётности" },
  { value: "от 7 дней", label: "до запуска" },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-background">
        <section className="relative overflow-hidden pt-32 pb-8 sm:pb-10">
          <div className="absolute inset-0 bg-[#549AF2]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <Breadcrumbs items={[{ label: "Услуги" }]} white />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Услуги разработки сайтов, рекламы и&nbsp;продвижения для бизнеса любого масштаба
              </h1>

              <p className="mt-5 mx-auto max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
                Мы собираем комплексные решения под задачу: от запуска первой рекламы до создания удобных сервисов и автоматизации продаж через ботов.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="#services-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1A3A5F] transition-transform hover:scale-[1.01]"
                >
                  Смотреть услуги
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/kontakty"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Обсудить проект
                </Link>
              </div>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur"
                >
                  <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {item.value}
                  </div>
                  <p className="mt-2 text-sm text-white/85">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services-list" className="pt-2 pb-20 sm:pb-24 w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white/80 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:px-6 sm:py-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#549AF2]">Что мы делаем</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Кратко о каждом направлении
                </h2>
              </div>
              <p className="max-w-2xl text-sm sm:text-base leading-7 text-slate-600">
                У нас есть отдельные решения под сайты, рекламу, локальный поиск, SMM и Telegram-сервисы — всё в одном агентстве с понятной стратегией.
              </p>
            </div>

            <div className="w-full grid gap-4 lg:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isDark = service.dark;
                const forceWhite = service.title === "Продвижение в геосервисах";
                const forceBlack = service.title === "Продвижение в геосервисах";
                const fullWidth = service.title === "Telegram боты и Mini Apps";
                const titleColor = isDark ? "#ffffff" : "#111827";
                const bodyColor = isDark ? "rgba(255,255,255,0.88)" : "#475569";
                const labelColor = isDark ? "rgba(255,255,255,0.76)" : "#64748b";
                const bulletColor = isDark ? "rgba(255,255,255,0.92)" : "#334155";
                const listBg = isDark || forceWhite ? "rgba(255,255,255,0.12)" : "#f8fafc";
                const badgeBg = forceBlack ? "transparent" : (isDark || forceWhite ? "rgba(255,255,255,0.12)" : `${service.accent}12`);
                const badgeColor = forceBlack ? "#000000" : (isDark || forceWhite ? "#ffffff" : service.accent);
                const buttonBg = forceBlack ? "#ffffff" : (isDark ? "rgba(255,255,255,0.12)" : `${service.accent}12`);
                const buttonColor = forceBlack ? "#d0ef4c" : (isDark ? "#ffffff" : service.accent);
                const iconColor = forceBlack ? "#000000" : (isDark || forceWhite ? "#ffffff" : service.accent);
                const iconBg = forceBlack ? "transparent" : (isDark || forceWhite ? "rgba(255,255,255,0.14)" : `${service.accent}15`);

                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`flex h-full flex-col rounded-[28px] border border-white/10 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(84,154,242,0.14)] ${fullWidth ? "lg:col-span-2" : ""}`}
                    style={{ backgroundColor: service.cardBg }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
                          style={{ backgroundColor: iconBg, color: iconColor, borderColor: forceBlack ? "rgba(0, 0, 0, 0.2)" : isDark ? "rgba(255, 255, 255, 0.2)" : `${service.accent}20` }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "var(--font-unbounded)", color: titleColor }}>
                          {service.title}
                        </h3>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                        style={{ backgroundColor: badgeBg, color: badgeColor, border: forceBlack ? "1px solid #000000" : "none" }}
                      >
                        Направление
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7" style={{ color: bodyColor }}>
                      {service.description}
                    </p>

                    <div className="mt-5 rounded-[24px] p-4" style={{ backgroundColor: listBg }}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: labelColor }}>Что входит</p>
                      <ul className="mt-3 space-y-2.5">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-sm">
                            <span
                              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.12)" : `${service.accent}12`, color: isDark ? "#ffffff" : service.accent }}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </span>
                            <span style={{ color: bulletColor }}>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 pt-2">
                      <p className="text-sm font-semibold" style={{ color: bodyColor }}>Подходит для бизнеса любого масштаба</p>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                        style={{ backgroundColor: buttonBg, color: buttonColor }}
                      >
                        Подробнее
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-border bg-[#111827] px-6 py-8 sm:px-8 sm:py-10 text-white">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Готовы начать?</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                    Подберём услуги под ваш бизнес и запланируем первый шаг
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-white/75">
                    Расскажите о задачах — мы быстро покажем, что стоит запускать в первую очередь и как это будет работать по бюджету и срокам.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/brief"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#111827]"
                  >
                    Заполнить бриф
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/kontakty"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Связаться с нами
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
