"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Сколько времени занимает разработка сайта?",
    answer:
      "Сроки зависят от сложности проекта. Лендинг делаем от 7 дней, корпоративный сайт - за 4-6 недель, интернет-магазин - от 8 недель. Точные сроки определяем после обсуждения вашего проекта.",
  },
  {
    question: "Какие гарантии вы даёте?",
    answer:
      "Мы работаем по договору с чётко прописанными условиями. Если не достигаем заявленных показателей - продолжаем работу бесплатно до их достижения. На разработку даём гарантию 12 месяцев. То есть даже после сдачи проекта мы остаёмся на связи и поддерживаем вас.",
  },
  {
    question: "Можно ли начать с небольшого бюджета?",
    answer:
      "Да, мы работаем с проектами разного масштаба. Минимальный бюджет на рекламу - от 30 000 руб./мес., на разработку - от 35 000 руб. Подберём оптимальное решение под ваш бюджет.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "Работаем по предоплате 50% для новых клиентов. После первого успешного проекта переходим на постоплату. Принимаем оплату от юрлиц и физлиц",
  },
  {
    question: "Вы работаете с регионами?",
    answer:
      "Да, работаем по всей России и СНГ. Большинство коммуникаций проходит онлайн - через онлайн встречи, месседжеры. При необходимости приезжаем на личные встречи.",
  },
  {
    question: "Что входит в ежемесячное обслуживание?",
    answer:
      "Зависит от услуги. Для рекламы: управление кампаниями, оптимизация, отчётность. Для SMM: создание контента, публикации, модерация. Для сайтов: техподдержка, обновления, бэкапы.",
  },
  {
    question: "Как вы отчитываетесь о работе?",
    answer:
      "Еженедельно отправляем краткий отчёт о проделанной работе. Ежемесячно - подробный отчёт с аналитикой, графиками и рекомендациями. Всегда на связи для оперативных вопросов.",
  },
  {
    question: "Можно ли расторгнуть договор досрочно?",
    answer:
      "Да, договор можно расторгнуть в любой момент с уведомлением за 14 дней. Оплаченные, но не выполненные работы возвращаем. Мы уверены в качестве - поэтому не держим клиентов насильно.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  toggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  toggle: () => void;
}) {
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
        className="w-full flex items-start justify-between gap-3 sm:gap-4 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-white leading-tight flex-1 group-hover:text-primary transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 mt-1 ${
            isOpen ? "rotate-180" : ""
          }`}
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
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-3 sm:mt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({ faqs: customFaqs }: { faqs?: Array<{ question: string; answer: string }> } = {}) {
  const displayFaqs = customFaqs || faqs;

  // Schema.org FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: displayFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Refs for sticky card logic
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Only apply JS sticky logic on lg+ screens (>=1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCardPosition = () => {
      if (!mediaQuery.matches) return;

      const leftCol = leftColRef.current;
      const card = cardRef.current;
      const cardWrapper = cardWrapperRef.current;

      if (!leftCol || !card || !cardWrapper) return;

      const TOP_OFFSET = 128; // lg:top-32 = 8rem = 128px

      const leftColRect = leftCol.getBoundingClientRect();
      const cardHeight = card.offsetHeight;

      // The card should stop when its bottom aligns with the left column's bottom
      const leftColBottom = leftColRect.bottom;
      const leftColTop = leftColRect.top;

      if (leftColTop > TOP_OFFSET) {
        // Haven't reached sticky point yet — natural flow
        card.style.position = "relative";
        card.style.top = "0px";
        card.style.left = "";
        card.style.width = "";
      } else if (leftColBottom > cardHeight + TOP_OFFSET) {
        // Within scroll range — fix the card
        card.style.position = "fixed";
        // Align card horizontally to its wrapper
        const wrapperRect = cardWrapper.getBoundingClientRect();
        card.style.top = `${TOP_OFFSET}px`;
        card.style.left = `${wrapperRect.left}px`;
        card.style.width = `${wrapperRect.width}px`;
      } else {
        // Past the bottom — pin card to the bottom of the left column
        card.style.position = "absolute";
        card.style.top = `${leftCol.offsetHeight - cardHeight}px`;
        card.style.left = "0px";
        card.style.width = "100%";
      }
    };

    const handleResize = () => {
      if (!mediaQuery.matches) {
        // Reset styles on mobile
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

    window.addEventListener("scroll", updateCardPosition, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial call
    updateCardPosition();

    return () => {
      window.removeEventListener("scroll", updateCardPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-[#131826] text-white">
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Key change: grid uses `items-start` so both columns are top-aligned
          and the grid height is determined by the taller (left) column.
          The right column uses `relative` positioning as the anchor for
          absolute positioning when the card reaches the bottom.
        */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-start">
          {/* Left — FAQ list (drives the grid height) */}
          <div ref={leftColRef} className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 sm:mb-6">
                
              </p>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                Частые вопросы
              </h2>
            </motion.div>

            <div>
              {displayFaqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.question}
                  a={faq.answer}
                  isOpen={openFaq === i}
                  toggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>

          {/* Right — CTA Card wrapper (relative container for absolute fallback) */}
          <div ref={cardWrapperRef} className="relative hidden lg:block">
            {/*
              The card itself is moved by JS between:
              - relative (before sticky kicks in)
              - fixed (while scrolling within the FAQ section)
              - absolute (after reaching the bottom of the left column)
            */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 lg:p-12 rounded-3xl border border-white/10 bg-white/[0.02]"
            >
              <h3
                className="font-bold mb-4 sm:mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Остались вопросы?
              </h3>
              <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-10 leading-relaxed">
                Наша команда готова помочь и ответить на любые вопросы о наших услугах.
              </p>

              <Link
                href="/kontakty"
                className="group flex items-center justify-center gap-3 w-full py-4 sm:py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
              >
                Связаться с нами
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/10 flex items-center justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    15 мин
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">ответ</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/10" />
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    100+
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">проектов</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/10" />
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    5 лет
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">опыта</div>
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
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02]"
            >
              <h3
                className="font-bold mb-4 sm:mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Остались вопросы?
              </h3>
              <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-10 leading-relaxed">
                Наша команда готова помочь и ответить на любые вопросы о наших услугах.
              </p>

              <Link
                href="/kontakty"
                className="group flex items-center justify-center gap-3 w-full py-4 sm:py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
              >
                Связаться с нами
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/10 flex items-center justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    15 мин
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">ответ</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/10" />
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    100+
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">проектов</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/10" />
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    5 лет
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1">опыта</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}