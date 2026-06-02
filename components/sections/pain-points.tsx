"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { useState, useEffect, useRef } from "react";

const pains = [
  {
    id: 1,
    number: "01",
    title: "Платим за рекламу — заявок больше не стало",
    quote: "Платим за рекламу — заявок больше не стало",
    detail:
      "Деньги уходят каждый месяц, отчёты приходят, а телефон молчит. Никакой прозрачности, никаких результатов. Это финансовая чёрная дыра.",
    color: "#549AF2",
    btnColor: "#549AF2",
  },
  {
    id: 2,
    number: "02",
    title: "Сайт сделали — он не продаёт",
    quote: "Сайт сделали — он не продаёт, непонятно почему",
    detail:
      "Красивый дизайн, но посетители уходят без звонка. Конверсия близка к нулю. Сайт — это просто красивая картинка, а не инструмент продаж.",
    color: "#7B5AF5",
    btnColor: "#7B5AF5",
  },
  {
    id: 3,
    number: "03",
    title: "Хотим увеличить продажи через интернет, но не знаем как",
    quote: "Хотим больше продаж из интернета, но не знаем как",
    detail:
      "Понимаем, что упускаем продажи, но не знаем, с чего начать. Реклама? Сайт? Соцсети? Всё кажется сложным и запутанным. Нужна простая стратегия.",
    color: "#F0643C",
    btnColor: "#F0643C",
  },
  {
    id: 4,
    number: "04",
    title: "Директор требует заявки из интернета — не знаю с чего начать",
    quote: "Директор требует заявки из интернета, а я не знаю с чего начать",
    detail:
      "Задача поставлена, инструментов нет, непонятно за что браться первым. Нужен план, стратегия и чёткое понимание того, что делать.",
    color: "#00C48C",
    btnColor: "#00895F",
  },
];

export function PainPointsSection() {
  const { openContact } = useModalStore();
  const [selectedId, setSelectedId] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const selected = pains.find((p) => p.id === selectedId)!;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    intervalRef.current = setInterval(() => {
      setSelectedId((prev) => (prev === 4 ? 1 : prev + 1));
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      intervalRef.current = setInterval(() => {
        setSelectedId((prev) => (prev === 4 ? 1 : prev + 1));
      }, 4000);
    }
  };

  return (
    <section
      className="py-24 sm:py-32 bg-background overflow-hidden"
      aria-labelledby="pain-section-heading"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            Мы вас понимаем
          </div>
          <h2
            id="pain-section-heading"
            className="font-black text-foreground"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Нет заявок с сайта и рекламы?
          </h2>
          <p
            className="mt-5 text-muted-foreground leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)" }}
          >
            Типичные проблемы бизнеса с рекламой, сайтом и продажами в интернете —
            мы поможем вам их решить.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">

          {/*
            ИСПРАВЛЕНИЕ ВЫСОТЫ — правильный подход:

            Все карточки живут в одной grid-ячейке (grid-area: 1/1).
            Каждая занимает полную высоту ячейки через h-full.
            Активная — opacity:1, pointer-events:auto.
            Остальные — opacity:0, pointer-events:none, но остаются в DOM.
            Браузер считает высоту ячейки = максимум среди всех карточек.
            Никакого absolute, никакого фиксированного min-h.
          */}
          <div
            role="tabpanel"
            id="pain-panel"
            aria-live="polite"
            aria-label={selected.title}
            className="lg:col-span-2"
          >
            {/* Grid-контейнер: все карточки в одной ячейке */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr",
              }}
            >
              {pains.map((pain) => {
                const isActive = pain.id === selectedId;
                return (
                  <motion.div
                    key={pain.id}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={!isActive}
                    className="flex flex-col p-8 sm:p-10 rounded-3xl overflow-hidden"
                    style={{
                      gridArea: "1 / 1",         // все карточки в одной ячейке
                      pointerEvents: isActive ? "auto" : "none",
                      background: pain.color,
                      border: `2px solid ${pain.color}`,
                    }}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full text-xl font-black mb-6 shrink-0"
                        style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                        aria-hidden="true"
                      >
                        {pain.number}
                      </div>

                      <h3
                        className="font-black leading-tight mb-5"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                          letterSpacing: "-0.02em",
                          color: "#ffffff",
                        }}
                      >
                        {pain.title}
                      </h3>

                      <p
                        className="text-base sm:text-lg leading-relaxed mb-8 flex-1"
                        style={{ color: "rgba(255,255,255,0.88)" }}
                      >
                        {pain.detail}
                      </p>

                      <button
                        onClick={() => openContact()}
                        tabIndex={isActive ? 0 : -1}
                        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm w-fit transition-all duration-200 hover:brightness-95 shrink-0"
                        style={{ background: "#ffffff", color: pain.btnColor }}
                      >
                        Решить проблему
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Selector tabs */}
          <div
            role="tablist"
            aria-label="Проблемы бизнеса в интернете"
            className="flex lg:flex-col gap-3 sm:gap-4"
          >
            {pains.map((pain) => {
              const isActive = selectedId === pain.id;
              return (
                <button
                  key={pain.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="pain-panel"
                  onClick={() => handleSelect(pain.id)}
                  className="relative group p-4 sm:p-5 rounded-xl border-2 transition-colors duration-300 text-left overflow-hidden"
                  style={{
                    background: isActive ? pain.color : "var(--card)",
                    borderColor: pain.color,
                    boxShadow: isActive ? `0 4px 16px ${pain.color}40` : "none",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                    style={{ background: isActive ? "white" : pain.color }}
                  />
                  <div className="relative z-10">
                    <div
                      className="text-xs font-bold mb-2"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
                      }}
                    >
                      {pain.number}
                    </div>
                    <p
                      className="text-sm leading-tight font-semibold line-clamp-2"
                      style={{ color: isActive ? "#ffffff" : "var(--foreground)" }}
                    >
                      {pain.quote}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-8 sm:p-12 rounded-3xl border border-border bg-card overflow-hidden"
          style={{ outline: "3px solid #549AF2", outlineOffset: "-3px" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ background: "linear-gradient(135deg, #549AF2, #7B5AF5)" }}
          />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <p
              className="text-foreground leading-snug font-semibold mb-4"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)" }}
            >
              Это не просто проблемы —{" "}
              <span style={{ color: "var(--primary)" }}>это упущенные возможности.</span>
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              У нас есть чёткая система,
              которая работает. Давайте разберём вашу ситуацию.
            </p>
            <button
              onClick={() => openContact()}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base text-white transition-colors duration-200 hover:brightness-90"
              style={{ background: "var(--primary)" }}
            >
              Запланировать консультацию
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}