 "use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Shield,
  Briefcase,
  Lightbulb,
  Palette,
  Code2,
  BarChart3,
  Package,
  ChevronDown,
  ExternalLink,
  ShoppingCart,
  Calculator,
  Phone,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CasesSection } from "@/components/sections/cases";
import { useModalStore } from "@/lib/store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/10 last:border-b-0 py-4 sm:py-6"
    >
      <button
        onClick={toggle}
        className="w-full flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-white leading-tight flex-1 group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary transition-transform duration-300 mt-0.5 sm:mt-1 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-base text-white/60 leading-relaxed mt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RazrabotkaSajtovPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openQuiz } = useModalStore();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  // Animation config based on reduced motion preference and device
  const animConfig = useMemo(
    () => ({
      enabled: !prefersReducedMotion && !isMobile,
      duration: prefersReducedMotion || isMobile ? 0.2 : 0.6,
      delay: prefersReducedMotion || isMobile ? 0 : 0.1,
    }),
    [prefersReducedMotion, isMobile]
  );

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    let rafId: number | null = null;

    const updateCardPosition = () => {
      if (!mediaQuery.matches) return;

      const leftCol = leftColRef.current;
      const card = cardRef.current;
      const cardWrapper = cardWrapperRef.current;

      if (!leftCol || !card || !cardWrapper) return;

      const TOP_OFFSET = 128;
      const leftColRect = leftCol.getBoundingClientRect();
      const cardHeight = card.offsetHeight;
      const leftColBottom = leftColRect.bottom;
      const leftColTop = leftColRect.top;

      if (leftColTop > TOP_OFFSET) {
        card.style.position = "relative";
        card.style.top = "0px";
        card.style.left = "";
        card.style.width = "";
      } else if (leftColBottom > cardHeight + TOP_OFFSET) {
        card.style.position = "fixed";
        const wrapperRect = cardWrapper.getBoundingClientRect();
        card.style.top = `${TOP_OFFSET}px`;
        card.style.left = `${wrapperRect.left}px`;
        card.style.width = `${wrapperRect.width}px`;
      } else {
        card.style.position = "absolute";
        card.style.top = `${leftCol.offsetHeight - cardHeight}px`;
        card.style.left = "0px";
        card.style.width = "100%";
      }
    };

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCardPosition);
    };

    const handleResize = () => {
      if (!mediaQuery.matches) {
        const card = cardRef.current;
        if (card) {
          card.style.position = "";
          card.style.top = "";
          card.style.left = "";
          card.style.width = "";
        }
      } else {
        updateCardPosition();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    updateCardPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
      {/* HERO */}
      <section className="relative flex flex-col pt-32 pb-20 overflow-hidden bg-background" style={{ maxHeight: "100vh" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Услуги", href: "/uslugi" },
                { label: "Разработка сайтов" },
              ]}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left column - Content */}
            <div>
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="font-bold mb-6 text-balance"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 10vw, 8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                }}
              >
                  Разработка
                  <br />
                  <motion.span 
                    className="text-primary inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    сайтов
                  </motion.span>
                </motion.h1>

                {/* Offer */}
                <motion.div
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: isMobile ? 0 : 0, scale: isMobile ? 1 : 1 }}
                  transition={{ duration: animConfig.duration, delay: animConfig.delay * 3, ease: "easeOut" }}
                  className="relative inline-block mb-8"
                >
                  <div
                    className={isMobile ? "hidden" : "absolute inset-0 rounded-2xl blur-xl opacity-20"}
                    style={{ background: "#549AF2", willChange: "transform" }}
                  />
                  <div className="relative rounded-2xl border-2 border-primary/30 bg-background overflow-hidden">
                    {/* Browser chrome */}
                    <div
                      className="flex items-center gap-3 px-4 py-3"
                      style={{ background: "#F0F2F5", borderBottom: "1px solid #E4E6EA" }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA41" }} />
                      </div>
                      <div
                        className="flex-1 flex items-center gap-2 px-3 py-1 rounded text-xs"
                        style={{
                          background: "#fff",
                          border: "1px solid #D1D5DB",
                          color: "#6B7280",
                        }}
                      >
                        <span className="text-green-500">
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
                            <path d="M5 0C3.3 0 2 1.3 2 3v.5H1C.4 3.5 0 4 0 4.5v5c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H8V3c0-1.7-1.3-3-3-3zm2 3.5H3V3c0-1.1.9-2 2-2s2 .9 2 2v.5z" />
                          </svg>
                        </span>
                        ПУСК
                      </div>
                    </div>
                    {/* Content */}
                    <div className="px-4 sm:px-6 py-4">
                      <p className="text-sm sm:text-base lg:text-lg font-bold text-center sm:text-left">
                        Сайт, который приносит заявки —{" "}
                        <span className="text-primary whitespace-nowrap">от 7 дней и <span className="whitespace-nowrap">35 000 ₽</span></span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Trust indicators - Компактно на одной строке */}
                <motion.div
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: isMobile ? 0 : 0 }}
                  transition={{ duration: animConfig.duration, delay: animConfig.delay * 3.5, ease: "easeOut" }}
                  className="flex flex-wrap gap-2 sm:gap-3 mb-8"
                >
                  {[
                    { icon: Clock, text: "7 дней запуска" },
                    { icon: FileText, text: "Фиксированная цена" },
                    { icon: Briefcase, text: "Оплата по счету" },
                    { icon: Shield, text: "Гарантия 12 мес" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: animConfig.duration * 0.5, delay: animConfig.delay * (0.4 + i * 0.08) }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
                    >
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" strokeWidth={2} />
                      <span className="text-xs sm:text-sm font-medium text-foreground/90">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: isMobile ? 0 : 0 }}
                  transition={{ duration: animConfig.duration, delay: animConfig.delay * 4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-start gap-4 mb-8"
                >
                  <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: animConfig.duration * 0.6, delay: animConfig.delay * 5 }}
                    whileHover={isMobile ? undefined : { scale: 1.05 }}
                  >
                    <Link
                      href="/kontakty"
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25 text-sm sm:text-lg group"
                    >
                      Получить расчёт стоимости
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 px-4 py-3 sm:py-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Отвечаем за 15 минут
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right column - SVG */}
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: isMobile ? 0 : 0, scale: isMobile ? 1 : 1 }}
                transition={{ duration: animConfig.duration, delay: animConfig.delay * 3.5, ease: "easeOut" }}
                className="relative flex items-center justify-center hidden sm:flex"
              >
                <Image 
                  src="/dv.png" 
                  alt="Website development illustration"
                  width={500}
                  height={500}
                  quality={85}
                  className="w-full h-auto max-w-md"
                />
              </motion.div>
            </div>
          </div>

        {/* Optimized background decorations - static or reduced motion */}
        <div
          className="absolute top-20 left-4 sm:left-10 w-56 sm:w-72 h-56 sm:h-72 rounded-full blur-[80px] sm:blur-[120px] opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #549AF2, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] sm:blur-[140px] opacity-3 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7B5AF5, transparent)" }}
        />
      </section>

      {/* ЧТО ВХОДИТ В УСЛУГУ */}
      <section className="py-24 lg:py-32 overflow-hidden relative" style={{ background: "#f6f7ff" }}>
        {/* Static background decoration - no animation */}
        <div
          className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-[80px] sm:blur-[120px] opacity-5 pointer-events-none"
          style={{ background: "#549AF2" }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animConfig.enabled ? 0.8 : 0.4, ease: "easeOut" }}
              className="text-center mb-12 lg:mb-16"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.enabled ? 0.5 : 0.3, delay: animConfig.enabled ? 0.05 : 0 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-muted border border-[#549AF2]/20 text-xs sm:text-sm font-medium text-foreground/70 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Полный спектр услуг в один сайт
              </motion.div>
              
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Разработка сайтов под ключ - от прототипа до <span className="text-primary font-black">первых заявок</span>
              </h2>
              
              <p className="text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto mt-6 font-medium">
                Мы не только создаем сайты, а строим работающие системы для привлечения клиентов
              </p>
            </motion.div>

            {/* Highlighted card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative mb-16 group"
            >
              {/* Background with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300 opacity-60" />
              
              <div className="relative overflow-hidden rounded-3xl">
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-primary/80 to-primary/60" />
                
                {/* Card content */}
                <div className="bg-white p-10 sm:p-14 pl-8 sm:pl-12">
                  {/* Header with icon */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                      Почему стоит выбрать нас
                    </h3>
                  </div>
                  
                  {/* Main text with better structure */}
                  <div className="space-y-4">
                    <p className="text-lg text-foreground leading-relaxed">
                      <span className="font-bold text-primary">Правильный выбор экономит больше, чем низкая цена.</span> Разработка -это запуск цифрового актива, а не разовая задача.
                    </p>
                    
                    <div className="flex gap-4 pl-4 border-l-2 border-primary/30">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-base sm:text-lg text-foreground/85">
                        Мы проектируем так, <span className="font-bold text-foreground">чтобы посетитель превращался в заявку</span>, сайт не тормозил рекламу, когда вы решите масштабироваться.
                      </p>
                    </div>
                    
                    <p className="text-lg sm:text-xl text-foreground font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pt-2">
                      Вы получаете предсказуемый рост, а не сайт «на полке».
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service items */}
            <div className="space-y-0 md:space-y-0">
              {[
                {
                  icon: Lightbulb,
                  title: "Прототип и логика",
                  text: "Согласовываем структуру и тексты до дизайна. Правки -бесплатные.",
                  number: "01",
                },
                {
                  icon: Palette,
                  title: "Дизайн под ваш бренд",
                  text: "Уникальная отрисовка, а не шаблон. 3 раунда правок включены.",
                  number: "02",
                },
                {
                  icon: Code2,
                  title: "Чистый код и CMS",
                  text: "Сайт будет быстрым, а вы сможете менять тексты и фото без программиста.",
                  number: "03",
                },
                {
                  icon: BarChart3,
                  title: "Настройка аналитики",
                  text: "Метрика, Цели, CRM. Вы видите заявки, а не просто посетителей.",
                  number: "04",
                },
                {
                  icon: Package,
                  title: "Наполнение контентом",
                  text: "Загрузим ваши материалы, настроим формы заявок и уведомления",
                  number: "05",
                },
                {
                  icon: Shield,
                  title: "Гарантия 60 дней",
                  text: "Исправим любые проблемы с сайтом, если таковые будут.",
                  number: "06",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Connector line */}
                  {i < 5 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-24 top-full bg-gradient-to-b from-border to-transparent" />
                  )}
                  
                  {/* Card */}
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 group py-10 md:py-12 px-6 md:px-8 rounded-2xl bg-white border border-border/50 hover:border-primary/40 transition-all duration-300 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    {/* Number and icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300">
                          <item.icon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center text-primary font-black text-lg shadow-sm">
                          {item.number}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </div>
                    
                    {/* Side accent on desktop */}
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Divider */}
                  {i < 5 && (
                    <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-border to-transparent mt-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* СТОИМОСТЬ */}
      <section className="py-24 lg:py-48 bg-muted/40 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animConfig.enabled ? 0.8 : 0.4, ease: "easeOut" }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Прайс
            </div>
            <h2
              className="font-bold text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Стоимость разработки
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: "Лендинг",
                price: "35 000",
                desc: "Одна страница, максимум конверсии",
                features: ["Аналитика", "Копирайтинг", "Дизайн", "Верстка", "СЕО-оптимизация", "Гарантия 60 дней"],
                featured: false,
              },
              {
                name: "Корпоративный",
                price: "80 000",
                desc: "Имидж + генерация заявок",
                features: ["Аналитика", "Копирайтинг", "Дизайн", "Верстка", "СЕО-оптимизация", "Гарантия 60 дней"],
                featured: true,
              },
              {
                name: "Магазин",
                price: "150 000",
                desc: "Каталог, корзина, оплата",
                features: ["Аналитика", "Копирайтинг", "Дизайн", "Верстка", "СЕО-оптимизация", "Гарантия 60 дней"],
                featured: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.enabled ? 0.6 : 0.3, delay: animConfig.enabled ? i * 0.1 : 0 }}
                className={`relative p-8 sm:p-10 rounded-3xl flex flex-col ${
                  plan.featured
                    ? "bg-foreground text-background lg:scale-105 lg:-my-4"
                    : "bg-card border border-border"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-8 sm:left-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Популярный
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm sm:text-base ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-8 whitespace-nowrap">
                  <span className={`text-xs sm:text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                    ОТ{" "}
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 3vw, 3.5rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-xs sm:text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                    {" "}₽
                  </span>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check size={18} className={`${plan.featured ? "text-primary shrink-0" : "text-primary shrink-0"} mt-0.5`} />
                      <span className={`text-sm sm:text-base ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 w-full">
                  <motion.button
                    onClick={openQuiz}
                    className={`block w-full py-3 sm:py-4 px-6 text-center font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      plan.featured
                        ? "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/30"
                        : ""
                    }`}
                    style={!plan.featured ? { backgroundColor: "#d5ed5d", color: "#000000" } : {}}
                    whileHover={animConfig.enabled ? { opacity: 0.9 } : false}
                    whileTap={animConfig.enabled ? { opacity: 0.85 } : false}
                  >
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                    Калькулятор
                  </motion.button>
                  <Link
                    href="/kontakty"
                    className={`block w-full py-3 sm:py-4 px-6 text-center font-semibold rounded-xl transition-all duration-300 border-2 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      plan.featured
                        ? "border-primary text-primary-foreground hover:bg-primary/10"
                        : ""
                    }`}
                    style={!plan.featured ? { borderColor: "#d5ed5d", color: "#000000", backgroundColor: "transparent" } : {}}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    Заказать звонок
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CasesSection title="Кейсы по этой услуге" />

      {/* FAQ */}
      <section className="py-32 lg:py-48 bg-[#131826] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left -FAQ */}
            <div ref={leftColRef}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Частые вопросы
                </h2>
              </motion.div>

              <div>
                {[
                  { q: "Что нужно подготовить с нашей стороны?", a: "От вас потребуется только информация о продукте и обратная связь." },
                  {
  q: "Чем отличается сайт на коде от конструктора -и что лучше для бизнеса?",
  a: "Конструктор (Tilda, Bitrix, Wix) -быстро и дешевле на старте, подходит для простых задач, но зачастую несмотря на более дешевую стоимость разработки, такой сайт будет менее выгоден, из за того, что на нем будет ниже конверсия, а так же SEO выдача. Сайт - это ваш актив на долгие годы, и лучше один раз сделать качественно, чем потом переплачивать. Сайт на чистом коде даёт скорость загрузки в 2-3 раза выше, полную свободу в дизайне и функциях, лучшее SEO и отсутствие ежемесячной платы платформе. Мы умеем делать оба варианта -на консультации честно скажем, что подойдёт именно вам и почему.",
},
{
  q: "Почему сайт на коде стоит дороже конструктора?",
  a: "На конструкторе вы берёте готовый шаблон и подстраиваете бизнес под его ограничения. На коде мы строим под вас: уникальный дизайн, нужная структура, любые интеграции. Плюс вы не платите 1 000–3 000 ₽ в месяц платформе, а оплачиваете только домен ( 200-300р в месяц ) сайт полностью ваш. Через 2-3 года сайт на коде обходится дешевле ( даже не считая потерянный доход от недопотенциала конструктора ) Мы помогаем выбрать правильный инструмент, а не навязываем самый дорогой.",
},
{
  q: "Что входит в стоимость, а что оплачивается отдельно?",
  a: "В стоимость входит: прототип, дизайн, вёрстка, CMS, базовое SEO, настройка аналитики, наполнение вашими материалами, обучение и 365 дней гарантии - то есть вы получаете готовый сайт под ключ. Отдельно оплачивается только: домен и хостинг (около 3 000 ₽ в год) Всё фиксируем в смете до старта -никаких сюрпризов.",
},
{
  q: "Сайт будет мой или останется на ваших серверах?",
  a: "Сайт полностью ваш. После сдачи передаём все исходники, доступы к хостингу, домену и CMS. Вы можете уйти к другому подрядчику в любой момент -мы не создаём зависимости и не держим сайт в заложниках.",
},
{
  q: "Что происходит после сдачи -вы просто исчезаете?",
  a: "Нет. После сдачи даём гарантию 12 месяцев на все технические проблемы. Дальше два варианта: можем вести сайт за небольшую абонентскую плату -обновление контента, правки, мониторинг. Либо если мы ведём вашу рекламу -обслуживание сайта бесплатно: правки контента и мелкие изменения включены в стоимость рекламного сопровождения.",
},
                  { q: "Вы делаете на конструкторе или на CMS?", a: "Мы подбираем технологию под ваши задачи, а не под свои предпочтения. Мы вместе с вами определим нужную технологию разработки, именно под ваши задачи. Технология -инструмент. Мы фокусируемся на результате: конверсии, удобстве и окупаемости." },
                  { q: "Что если сайт сломается после сдачи?", a: "Мы несём ответственность за результат даже после запуска. Вы не остаетесь один. Поддержка -это не опция, а часть нашего стандарта." },
                ].map((faq, i) => (
                  <FAQItem
                    key={i}
                    q={faq.q}
                    a={faq.a}
                    isOpen={openFaq === i}
                    toggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            {/* Right -CTA Card (JS sticky like main FAQ) */}
            <div ref={cardWrapperRef} className="relative hidden lg:block">
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 lg:p-12 rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                <h3
                  className="font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Готовы создать сайт?
                </h3>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">
                  Получите бесплатную консультацию о технологиях и стратегии разработки для вашего проекта.
                </p>

                <Link
                  href="/kontakty"
                  className="group flex items-center justify-center gap-3 w-full py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                >
                  Получить консультацию
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-10 pt-10 border-t border-white/10 flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>15 мин</div>
                    <div className="text-sm text-white/40 mt-1">ответ</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>100+</div>
                    <div className="text-sm text-white/40 mt-1">проектов</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>5 лет</div>
                    <div className="text-sm text-white/40 mt-1">опыта</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile-only card (no sticky logic needed) */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                <h3 className="font-bold mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                  Готовы создать сайт?
                </h3>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">Получите бесплатную консультацию о технологиях и стратегии разработки для вашего проекта.</p>
                <Link href="/kontakty" className="group flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30">
                  Связаться
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}
