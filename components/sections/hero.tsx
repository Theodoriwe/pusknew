"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useModalStore } from "@/lib/store";

const WORDS = ["продаж", "заявок", "клиентов", "выручки"];

const TICKER_ITEMS = [
  "Разработка сайтов",
  "Контекстная реклама",
  "SMM",
  "Продвижение в геосервисах",
  "Telegram-боты",
  "SEO-продвижение",
  "Таргетированная реклама", // ИСПРАВЛЕНО: опечатка "Тарегетированная"
];

// Дублируем для бесшовной прокрутки
const REPEATED_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

function useCounter(target: number, duration = 1600, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf: number;
    let t0 = 0;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return val;
}

export function HeroSection() {
  const { openContact, openQuiz } = useModalStore();
  const [wordIdx, setWordIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [isHoveringTicker, setIsHoveringTicker] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const c1 = useCounter(340, 1400, started);
  const c2 = useCounter(7, 1200, started);
  const c3 = useCounter(4, 800, started);

  // FIX: управляем willChange только во время hover
  const handleTickerMouseEnter = () => {
    setIsHoveringTicker(true);
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = "paused";
    }
  };

  const handleTickerMouseLeave = () => {
    setIsHoveringTicker(false);
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          zIndex: 1,
        }}
      />

      {/* Large decorative arcs — top right */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: -120, right: -120, width: 600, height: 600, zIndex: 1, opacity: 0.055 }}
        viewBox="0 0 600 600" fill="none"
      >
        <circle cx="300" cy="300" r="280" stroke="#549AF2" strokeWidth="1" />
        <circle cx="300" cy="300" r="220" stroke="#7B5AF5" strokeWidth="0.75" />
        <circle cx="300" cy="300" r="160" stroke="#549AF2" strokeWidth="0.75" />
        <circle cx="300" cy="300" r="100" stroke="#7B5AF5" strokeWidth="0.5" />
      </svg>

      {/* Bottom-left square grid accent */}
      <svg
        aria-hidden="true"
        className="absolute bottom-16 left-8 pointer-events-none hidden md:block"
        style={{ width: 140, height: 140, zIndex: 1, opacity: 0.1 }}
        viewBox="0 0 140 140" fill="none"
      >
        {[0, 1, 2, 3].map(row =>
          [0, 1, 2, 3].map(col => (
            <circle
              key={`${row}-${col}`}
              cx={col * 40 + 20}
              cy={row * 40 + 20}
              r="2"
              fill="#549AF2"
            />
          ))
        )}
      </svg>

      {/* Diagonal cross — left middle */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: "38%", left: "6%", width: 32, height: 32, zIndex: 1, opacity: 0.18 }}
        viewBox="0 0 32 32" fill="none"
      >
        <line x1="16" y1="0" x2="16" y2="32" stroke="#549AF2" strokeWidth="1.5" />
        <line x1="0" y1="16" x2="32" y2="16" stroke="#549AF2" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3" fill="#549AF2" />
      </svg>

      {/* Small rotated square — right middle */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: "55%", right: "8%", width: 44, height: 44, zIndex: 1, opacity: 0.12 }}
        viewBox="0 0 44 44" fill="none"
      >
        <rect
          x="4" y="4" width="36" height="36" rx="4"
          stroke="#7B5AF5" strokeWidth="1.5"
          transform="rotate(18 22 22)"
        />
      </svg>

      {/* Main content */}
      <motion.div
        style={{ y, opacity, zIndex: 2 }} // FIX: убран sx={} (MUI проп, не работает в Next.js)
        className="relative flex-1 flex flex-col"
      >
        <div
          className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col flex-1"
          style={{ paddingTop: "var(--header-h, 72px)", zIndex: 2, position: "relative" }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 pt-10 sm:pt-14 pb-7 sm:pb-9"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#00C48C" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#00C48C" }}
              />
            </span>
            <span
              className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              Агентство цифрового маркетинга · Сочи
            </span>
          </motion.div>

          {/* 
            SEO FIX:
            - Большой заголовок стал div + aria-hidden="true"
              (визуально главный, но невидим для поисковых ботов и скринридеров)
            - H1 теперь подзаголовок с ключевыми словами
          */}

          {/* Большой декоративный заголовок — НЕ H1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ zIndex: 2, position: "relative" }}
          >
            <div
              className="font-black select-none text-foreground"
              aria-hidden="true" // скрыт от ботов и скринридеров — H1 находится ниже
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8.5vw, 9rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
              }}
            >
              {/* Line 1 */}
              <span className="block">Больше</span>

              {/* Line 2 — animated word */}
              <span
                className="block"
                style={{
                  height: "1.02em",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={wordIdx}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                      display: "block",
                      position: "absolute",
                      inset: 0,
                      lineHeight: "1.02em",
                      color: "var(--primary)",
                    }}
                  >
                    {WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* Line 3 */}
              <span className="block">
                {"для "}
                <span style={{ display: "inline", position: "relative", whiteSpace: "nowrap" }}>
                  бизнеса
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: "0.04em",
                      width: "100%",
                      height: "0.12em",
                      background: "var(--primary)",
                      borderRadius: "3px",
                      display: "block",
                    }}
                  />
                </span>
              </span>
            </div>
          </motion.div>

          {/* Bottom block: H1 (SEO) + CTAs + stats */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mt-10 sm:mt-14 pb-14 lg:pb-16">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-7 max-w-[440px]"
            >
              
              <h1
                className="leading-[1.7]"
                style={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                  color: "var(--muted-foreground)",
                }}
              >
                Разрабатываем сайты, запускаем рекламу и выстраиваем
                продажи в Сочи. Берём все продвижение под ключ —
                вы занимаетесь бизнесом.
              </h1>

              {/* FIX: кнопки через CSS-классы вместо инлайн style-мутаций в onMouseEnter/Leave */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openContact()}
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-6 py-3.5 text-sm font-semibold rounded-xl
                    transition-colors duration-200
                    text-white
                    hover:bg-primary hover:text-primary-foreground
                  "
                  style={{ backgroundColor: "#549AF2" }}
                >
                  Обсудить проект
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                  />
                </button>
                <button
                  onClick={() => openQuiz()}
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-6 py-3.5 text-sm font-semibold rounded-xl
                    transition-all duration-200
                    hover:opacity-90
                  "
                  style={{ backgroundColor: "#d0ef4c", color: "#000000" }}
                >
                  Узнать стоимость
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-150"
                  />
                </button>
              </div>


            </motion.div>

            {/* Right — stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:flex-1"
            >
              <div
                className="grid grid-cols-3 rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
              >
                {[
                  { n: c1, suffix: "%", label: "рост заявок", sub: "в среднем по клиентам" },
                  { n: c2, prefix: "от ", suffix: "", label: "дней", sub: "до запуска проекта" },
                  { n: c3, suffix: "+", label: "года на рынке", sub: "в цифровом-маркетинге" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col px-4 sm:px-6 py-5 sm:py-6"
                    style={{ borderLeft: i > 0 ? "1px solid var(--border)" : undefined }}
                  >
                    {/* FIX: minWidth на цифрах — предотвращает CLS при анимации счётчика */}
                    <span
                      className="font-black leading-none tabular-nums"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                        letterSpacing: "-0.04em",
                        color: "var(--foreground)",
                        minWidth: "4ch",
                        display: "inline-block",
                      }}
                    >
                      {s.prefix && <span style={{ color: "#549AF2" }}>{s.prefix}</span>}
                      {s.n}
                      <span style={{ color: "var(--primary)" }}>{s.suffix}</span>
                    </span>
                    <span
                      className="font-semibold mt-2 leading-tight"
                      style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.8rem)", color: "var(--foreground)" }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="mt-0.5 leading-tight"
                      style={{ fontSize: "clamp(0.62rem, 0.9vw, 0.7rem)", color: "var(--muted-foreground)" }}
                    >
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 
        Ticker — бесшовная прокрутка
        FIX: @keyframes перенесены в globals.css (см. комментарий ниже)
        FIX: willChange добавляется только при hover через state
        FIX: логика паузы упрощена до animationPlayState — без сложных матричных вычислений
      */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "#549AF2",
          zIndex: 5,
        }}
        onMouseEnter={handleTickerMouseEnter}
        onMouseLeave={handleTickerMouseLeave}
      >
        {/* Left gradient fade */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 pointer-events-none z-20"
          style={{ background: "linear-gradient(90deg, #549AF2 0%, rgba(84,154,242,0) 100%)" }}
        />

        {/* Right gradient fade */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 pointer-events-none z-20"
          style={{ background: "linear-gradient(270deg, #549AF2 0%, rgba(84,154,242,0) 100%)" }}
        />

        <div
          ref={tickerRef}
          className="flex whitespace-nowrap py-4 sm:py-5 select-none w-max"
          style={{
            animation: "ticker-seamless 30s linear infinite",
            // FIX: willChange только при hover
            willChange: isHoveringTicker ? "transform" : "auto",
          }}
        >
          {/* TRACK 1 */}
          <div className="flex items-center shrink-0">
            {REPEATED_ITEMS.map((label, i) => (
              <div
                key={`t1-${i}`}
                className="inline-flex items-center gap-6 sm:gap-10 px-3 sm:px-5 shrink-0"
              >
                <span
                  className="font-black whitespace-nowrap uppercase text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ background: "#ffffff" }} />
              </div>
            ))}
          </div>

          {/* TRACK 2 — дубликат для бесшовности */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {REPEATED_ITEMS.map((label, i) => (
              <div
                key={`t2-${i}`}
                className="inline-flex items-center gap-6 sm:gap-10 px-3 sm:px-5 shrink-0"
              >
                <span
                  className="font-black whitespace-nowrap uppercase text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ background: "#ffffff" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

