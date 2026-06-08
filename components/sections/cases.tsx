"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconTarget() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="13" r="9" />
      <circle cx="13" cy="13" r="5" />
      <circle cx="13" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <line x1="13" y1="4" x2="13" y2="1.5" />
      <line x1="13" y1="24.5" x2="13" y2="22" />
      <line x1="4" y1="13" x2="1.5" y2="13" />
      <line x1="24.5" y1="13" x2="22" y2="13" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7.5" />
      <line x1="17" y1="17" x2="24" y2="24" />
      <line x1="8.5" y1="11" x2="13.5" y2="11" />
      <line x1="11" y1="8.5" x2="11" y2="13.5" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 7 1 13 7 19" />
      <polyline points="19 7 25 13 19 19" />
      <line x1="15" y1="3.5" x2="11" y2="22.5" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 5 1 23 9 19 17 23 25 19 25 1 17 5 9 1 1 5" />
      <line x1="9" y1="1" x2="9" y2="19" />
      <line x1="17" y1="5" x2="17" y2="23" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 21 8 12 14 16 23 5" />
      <polyline points="18 5 23 5 23 11" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9.5" cy="22" r="1.5" />
      <circle cx="19.5" cy="22" r="1.5" />
      <path d="M1 1.5h3.5l2.5 12.5a2 2 0 0 0 2 1.5h9.5a2 2 0 0 0 2-1.6L22.5 7H6" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9.5" cy="7.5" r="3.5" />
      <path d="M1.5 23c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <circle cx="20" cy="7.5" r="2.5" />
      <path d="M20 16.5c3 0 5.5 2.5 5.5 5.5" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="13" width="5" height="10" rx="1" />
      <rect x="10" y="7" width="5" height="16" rx="1" />
      <rect x="18" y="2" width="5" height="21" rx="1" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 16 9.5 24.5 10.3 18.5 15.8 20.5 24 13 19.5 5.5 24 7.5 15.8 1.5 10.3 10 9.5 13 2" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACCENT = "#549AF2";

const cases = [
  {
    id: 1,
    title: "Лаундж-бар",
    description: "Разработка сайта, с продвижением - увеличение конверсий и бронирований",
    category: "Разработка сайтов",
    href: "/kejsy/lounge-bar",
    stats: [
      { value: "7.8%", label: "Конверсия" },
      { value: "1-3", label: "Позиция выдачи" },
      { value: "+325%", label: "Брони" },
    ],
    tasks: [
      { Icon: IconCode, label: "Разработка сайта" },
      { Icon: IconSearch, label: "SEO оптимизация" },
      { Icon: IconTarget, label: "Контекстная реклама" },
      { Icon: IconMap, label: "Геосервисы" },
    ],
    results: [
      { value: "7.8%", label: "Конверсия", sub: "было 3.2%" },
      { value: "+500%", label: "Трафик сайта", sub: "" },
      { value: "+200%", label: "Брони", sub: "" },
    ],
  },
  {
    id: 2,
    title: "Ресторан Трикони",
    description: "Комплексная реклама, разработка сайта и продвижение в гео. сервисах",
    category: "Контекстная реклама",
    href: "/kejsy/trikoni-restaurant",
    stats: [
      { value: "8.1%", label: "CTR" },
      { value: "+155%", label: "Трафик сайта" },
      { value: "420%", label: "ROI" },
    ],
    tasks: [
      { Icon: IconTarget, label: "Контекстная реклама" },
      { Icon: IconMap, label: "Геосервисы" },
      { Icon: IconCode, label: "Разработка сайта" },
      { Icon: IconChart, label: "Аналитика" },
    ],
    results: [
      { value: "8.1%", label: "CTR", sub: "было 2.4%" },
      { value: "+155%", label: "Трафик сайта", sub: "" },
      { value: "420%", label: "ROI", sub: "" },
    ],
  },
  {
    id: 3,
    title: "Ресторан Кочевники",
    description: "Продвижение в гео. сервисах, разработка сайта и комплексная реклама",
    category: "Комплексное продвижение",
    href: "/kejsy/kochevniki-restaurant",
    stats: [
      { value: "×3.2", label: "Звонки" },
      { value: "61%", label: "Видимость" },
      { value: "+140%", label: "Трафик карт" },
    ],
    tasks: [
      { Icon: IconMap, label: "Геосервисы" },
      { Icon: IconUsers, label: "SMM" },
      { Icon: IconTarget, label: "Контекстная реклама" },
      { Icon: IconChart, label: "Аналитика" },
    ],
    results: [
      { value: "×3.2", label: "Звонки", sub: "было ×1" },
      { value: "61%", label: "Видимость", sub: "" },
      { value: "+140%", label: "Трафик карт", sub: "" },
    ],
  },
  {
    id: 4,
    title: "Тюбинг Роза Хутор",
    description: "Комплексное продвижение и разработка сайтов",
    category: "Геосервисы",
    href: "/kejsy/rosa-hotor-tubing",
    stats: [
      { value: "Топ 5", label: "SEO выдача" },
      { value: "1.2K/мес", label: "Просмотры" },
      { value: "+290%", label: "Звонки" },
    ],
    tasks: [
      { Icon: IconMap, label: "Яндекс.Карты" },
      { Icon: IconSearch, label: "SEO-продвижение" },
      { Icon: IconCode, label: "Разработка сайта" },
      { Icon: IconStar, label: "Отзывы и рейтинг" },
    ],
    results: [
      { value: "Топ 5", label: "SEO выдача", sub: "" },
      { value: "1.2K/мес", label: "Просмотры", sub: "" },
      { value: "+290%", label: "Звонки", sub: "" },
    ],
  },
  {
    id: 5,
    title: "Цветочный магазин",
    description: "Продвижение в гео. сервисах и сервисах доставки",
    category: "Контекстная реклама",
    href: "/kejsy/florist-shop",
    stats: [
      { value: "15-20", label: "Заказы/день" },
      { value: "+600%", label: "Рост" },
      { value: "2.2K₽", label: "Средний чек" },
    ],
    tasks: [
      { Icon: IconMap, label: "Яндекс.Карты" },
      { Icon: IconCart, label: "Сервисы доставки" },
      { Icon: IconTarget, label: "Контекстная реклама" },
      { Icon: IconSearch, label: "SEO" },
    ],
    results: [
      { value: "15-20", label: "Заказы/день", sub: "было 2-3" },
      { value: "2.2K₽", label: "Средний чек", sub: "было 1.5K₽" },
      { value: "100%", label: "Прямые продажи", sub: "новый канал" },
    ],
  },
  {
    id: 6,
    title: "Банный комплекс",
    description: "Лидогенерация для банного комплекса",
    category: "Контекстная реклама",
    href: "/kejsy/bath-complex",
    stats: [
      { value: "180/мес", label: "Лиды" },
      { value: "340%", label: "ROI" },
      { value: "-35%", label: "Отказы" },
    ],
    tasks: [
      { Icon: IconTarget, label: "Яндекс.Директ" },
      { Icon: IconMap, label: "Яндекс.Карты" },
      { Icon: IconSearch, label: "SEO" },
      { Icon: IconChart, label: "Отслеживание" },
    ],
    results: [
      { value: "180/мес", label: "Лиды", sub: "было 40/мес" },
      { value: "340%", label: "ROI", sub: "было 120%" },
      { value: "35%", label: "Отказы", sub: "было 65%" },
    ],
  },
];

// ─── Case card (left panel) ───────────────────────────────────────────────────

function CaseCard({
  c,
  isActive,
  onClick,
}: {
  c: (typeof cases)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const cardContent = (
    <div className="px-5 pt-4 pb-5">
      {/* Category pill */}
      <span
        className="inline-block text-[9px] font-black tracking-[0.14em] uppercase px-2.5 py-[5px] rounded-full mb-3"
        style={{
          background: isActive ? "rgba(255,255,255,0.22)" : `${ACCENT}15`,
          color: isActive ? "white" : ACCENT,
        }}
      >
        {c.category}
      </span>

      {/* Title + Arrow */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3
            className="font-black leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
              letterSpacing: "-0.03em",
              color: isActive ? "white" : "#0d1526",
            }}
          >
            {c.title}
          </h3>
          <p
            className="text-[0.8rem] leading-tight mt-1.5"
            style={{
              color: isActive ? "rgba(255,255,255,0.7)" : "#96a8c0",
            }}
          >
            {c.description}
          </p>
        </div>

        <m.div
          animate={{
            scale: hovered || isActive ? 1.2 : 1,
            rotate: hovered || isActive ? 45 : 0,
            opacity: isActive ? 1 : hovered ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            border: `2px solid ${isActive ? "rgba(255,255,255,0.55)" : ACCENT}`,
            background: isActive ? "rgba(255,255,255,0.18)" : `${ACCENT}10`,
            boxShadow: isActive ? `0 0 18px rgba(255,255,255,0.2)` : "none",
          }}
        >
          <ArrowUpRight
            className="w-4 h-4"
            style={{ color: isActive ? "white" : ACCENT }}
          />
        </m.div>
      </div>

      {/* Mini stats */}
      <div
        className="flex items-end gap-5 mt-4 pt-3.5"
        style={{
          borderTop: isActive
            ? "1px solid rgba(255,255,255,0.22)"
            : "1px solid #edf2fa",
        }}
      >
        {c.stats.map((s) => (
          <div key={s.label} className="text-center">
            <p
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                letterSpacing: "-0.02em",
                color: isActive ? "white" : ACCENT,
              }}
            >
              {s.value}
            </p>
            <p
              className="text-[8.5px] font-bold tracking-wider mt-0.5 uppercase"
              style={{ color: isActive ? "rgba(255,255,255,0.55)" : "#b0bcd4" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const sharedStyle = {
    background: isActive ? ACCENT : "white",
    border: isActive ? `2px solid transparent` : `2px solid ${ACCENT}`,
    boxShadow: isActive
      ? `0 10px 36px ${ACCENT}45`
      : hovered
      ? "0 4px 20px rgba(84,154,242,0.18)"
      : "0 2px 10px rgba(0,0,0,0.07)",
  };

  return (
    <>
      {/* Desktop — кнопка с открытием детальной панели */}
      <m.button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.985 }}
        className="relative w-full text-left rounded-[20px] overflow-hidden transition-all duration-300 outline-none cursor-pointer hidden lg:block"
        style={sharedStyle}
      >
        {cardContent}
      </m.button>

      {/* Mobile — сразу переход на страницу кейса */}
      <m.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.985 }}
        className="relative w-full rounded-[20px] overflow-hidden transition-all duration-300 lg:hidden"
        style={sharedStyle}
      >
        <Link href={c.href} className="block">
          {cardContent}
        </Link>
      </m.div>
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function CasesSection({ title }: { title?: string } = {}) {
  const [activeId, setActiveId] = useState(1);
  const activeCase = cases.find((c) => c.id === activeId)!;
  const displayTitle = title || "Результаты,\nкоторые работают";

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

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

    window.addEventListener("scroll", updateCardPosition, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateCardPosition();

    return () => {
      window.removeEventListener("scroll", updateCardPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="py-16 md:py-24"
      style={{ backgroundColor: ACCENT }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8"
        >
          <div className="flex-1">
            <h2
              className="font-black text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              {displayTitle.includes('\n') ? (
                <>
                  {displayTitle.split('\n')[0]}<br />
                  <span style={{ color: "white", opacity: 0.95 }}>{displayTitle.split('\n')[1]}</span>
                </>
              ) : (
                displayTitle
              )}
            </h2>
          </div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <Link
              href="/kejsy"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-white/90 transition-all"
            >
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Все проекты
              </span>
              <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center transition-all group-hover:border-white/40">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }} />
              </div>
            </Link>
          </m.div>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-start">

          {/* ── LEFT PANEL — карточки кейсов ── */}
          <div
            ref={leftColRef}
            className="rounded-[28px] p-5 md:p-7"
            style={{
              background: "white",
              backdropFilter: "blur(16px)",
              border: "1.5px solid #edf2fa",
            }}
          >
            <div className="flex flex-col gap-3">
              {cases.map((c, i) => (
                <m.div
                  key={c.id}
                  initial={{ opacity: 10, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <CaseCard
                    c={c}
                    isActive={c.id === activeId}
                    onClick={() => setActiveId(c.id)}
                  />
                </m.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL — детальная панель, только desktop ── */}
          <div
            ref={cardWrapperRef}
            className="relative hidden lg:block"
            style={{ minHeight: "560px" }}
          >
            <div
              ref={cardRef}
              className="rounded-[28px] overflow-hidden"
              style={{ minHeight: "560px" }}
            >
              <Link
                href={activeCase.href}
                className="block w-full h-full transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className="rounded-[28px] p-5 md:p-7 flex flex-col h-full"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    border: "1.5px solid rgba(255,255,255,0.9)",
                    minHeight: "560px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeId}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-9 flex-1"
                    >
                      {/* PROJECT DESCRIPTION */}
                      <div className="flex gap-6 items-start">
                        <div className="flex-1">
                          <h3
                            className="font-black leading-tight mb-2"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.4rem",
                              letterSpacing: "-0.03em",
                              color: "#0d1526",
                            }}
                          >
                            {activeCase.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#5a6b7f", lineHeight: 1.6 }}
                          >
                            {activeCase.description}
                          </p>
                        </div>

                        <m.div
                          animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                          whileHover={{ opacity: 1, scale: 1.3, rotate: 45 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 cursor-pointer"
                          style={{ borderColor: ACCENT, background: `${ACCENT}10` }}
                        >
                          <ArrowUpRight className="w-7 h-7" style={{ color: ACCENT }} />
                        </m.div>
                      </div>

                      {/* ЗАДАЧИ */}
                      <div>
                        <p
                          className="font-black uppercase tracking-[0.2em] mb-5"
                          style={{
                            fontSize: "0.78rem",
                            color: ACCENT,
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          Задачи
                        </p>
                        <div className="flex flex-col gap-3.5">
                          {activeCase.tasks.map(({ Icon, label }, i) => (
                            <m.div
                              key={label}
                              initial={{ opacity: 0, x: 14 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.26, delay: i * 0.06 }}
                              className="flex items-center gap-4"
                            >
                              <div
                                className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${ACCENT}15`, color: ACCENT }}
                              >
                                <Icon />
                              </div>
                              <p
                                className="font-semibold leading-tight"
                                style={{ fontSize: "1rem", color: "#031a4b", letterSpacing: "-0.01em" }}
                              >
                                {label}
                              </p>
                            </m.div>
                          ))}
                        </div>
                      </div>

                      {/* РЕЗУЛЬТАТЫ */}
                      <div>
                        <p
                          className="font-black uppercase tracking-[0.2em] mb-5"
                          style={{
                            fontSize: "0.78rem",
                            color: ACCENT,
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          Результаты
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {activeCase.results.map((r, i) => (
                            <m.div
                              key={r.label}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.28, delay: i * 0.07 }}
                              className="rounded-2xl p-4 border-2"
                              style={{ background: "white", borderColor: "#6e9bee" }}
                            >
                              <p
                                className="font-black leading-none mb-1.5"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                                  color: "#6e9bee",
                                  letterSpacing: "-0.03em",
                                }}
                              >
                                {r.value}
                              </p>
                              <p className="text-xs font-bold leading-tight mb-0.5" style={{ color: "#6e9bee" }}>
                                {r.label}
                              </p>
                              <p className="text-[11px] leading-tight" style={{ color: "#96a8c0" }}>
                                {r.sub}
                              </p>
                            </m.div>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}