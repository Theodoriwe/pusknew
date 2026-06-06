"use client";

import { useRef, useState, useEffect } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Игорь Смирнов",
    role: "Директор",
    company: "FitLife",
    text: "Работаем с ПУСК уже 2 года. За это время трафик на сайт вырос в 4 раза, а стоимость заявки снизилась на 60%. Ребята всегда на связи и быстро реагируют на любые вопросы.",
    rating: 5,
    result: "+400% трафика",
    color: "#549AF2",
    initials: "ИС",
  },
  {
    id: 2,
    name: "Елена Морозова",
    role: "Владелец",
    company: "Салон Glow",
    text: "Telegram-бот для записи клиентов — лучшее решение для нашего бизнеса. Теперь администраторы не тратят время на звонки, а клиенты могут записаться в любое время.",
    rating: 5,
    result: "180 записей/мес",
    color: "#7B5AF5",
    initials: "ЕМ",
  },
  {
    id: 3,
    name: "Андрей Кузнецов",
    role: "Маркетолог",
    company: "Ресторан «Восток»",
    text: "Продвижение в геосервисах дало нам то, что мы не могли получить от обычной рекламы — стабильный поток местных клиентов. Рейтинг вырос с 3.8 до 4.9.",
    rating: 5,
    result: "4.9 на картах",
    color: "#00C48C",
    initials: "АК",
  },
  {
    id: 4,
    name: "Ольга Николаева",
    role: "CEO",
    company: "TechStart",
    text: "Команда ПУСК помогла нам запустить лендинг для нового продукта за 2 недели. Конверсия 8% — это в 3 раза выше, чем мы ожидали. Рекомендую!",
    rating: 5,
    result: "8% конверсия",
    color: "#F0643C",
    initials: "ОН",
  },
];

export function TestimonialsSection() {
  // TODO: Отзывы временно скрыты, раскомментируй return null ниже чтобы вернуть
  return null;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Результаты в цифрах
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-black text-foreground max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Отзывы 
            <br />
            <span style={{ color: "#549AF2" }}>наших клиентов</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Реальные истории роста бизнеса благодаря нашим решениям
          </p>
        </m.div>

        {/* Main card + sidebar */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid lg:grid-cols-[1fr_280px] gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main quote card */}
          <div className="relative rounded-3xl bg-card border border-border overflow-hidden backdrop-blur-sm">
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500"
              style={{ background: current.color }}
            />

            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 lg:p-16"
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-12">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Star
                        className="w-5 h-5"
                        style={{
                          fill: i < current.rating ? current.color : "transparent",
                          stroke: i < current.rating ? current.color : "var(--border)",
                        }}
                      />
                    </m.div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-2xl lg:text-4xl text-foreground leading-tight mb-12 font-bold"
                >
                  &ldquo;{current.text}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-border mb-10" />

                {/* Author row */}
                <div className="flex items-end justify-between gap-6 flex-wrap lg:flex-nowrap">
                  <div className="flex items-center gap-4">
                    <m.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                      style={{ background: current.color }}
                    >
                      {current.initials}
                    </m.div>
                    <div>
                      <p className="font-bold text-lg text-foreground">{current.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {current.role} at {current.company}
                      </p>
                    </div>
                  </div>

                  {/* Result badge */}
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="px-5 py-3 rounded-2xl text-sm font-bold text-white flex items-center gap-2 whitespace-nowrap"
                    style={{ background: current.color }}
                  >
                    {current.result}
                    <ArrowRight className="w-4 h-4" />
                  </m.div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Sidebar cards */}
          <div className="flex flex-col gap-2">
            {testimonials.map((t, index) => (
              <m.button
                key={t.id}
                onClick={() => setCurrentIndex(index)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 group overflow-hidden relative ${
                  index === currentIndex
                    ? "border-transparent"
                    : "border-border hover:border-border/60"
                }`}
                style={{
                  background: index === currentIndex ? t.color : "var(--card)",
                }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ background: t.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: index === currentIndex ? "white" : t.color,
                        color: index === currentIndex ? t.color : "white",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold text-xs truncate"
                        style={{
                          color: index === currentIndex ? "white" : "var(--foreground)",
                        }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{
                          color:
                            index === currentIndex
                              ? "rgba(255,255,255,0.7)"
                              : "var(--muted-foreground)",
                        }}
                      >
                        {t.company}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-xs line-clamp-2 leading-relaxed"
                    style={{
                      color:
                        index === currentIndex
                          ? "rgba(255,255,255,0.85)"
                          : "var(--muted-foreground)",
                    }}
                  >
                    {t.text}
                  </p>
                </div>

                {/* Active indicator */}
                {index === currentIndex && (
                  <m.div
                    layoutId="active-indicator"
                    className="absolute top-0 right-0 w-1 h-1 rounded-full bg-white opacity-70"
                  />
                )}
              </m.button>
            ))}
          </div>
        </m.div>

        {/* Desktop navigation buttons */}
        <div className="hidden lg:flex items-center justify-between mt-12">
          <div className="flex items-center gap-3">
            <m.button
              onClick={goToPrev}
              whileHover={{ scale: 1.05, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-current hover:bg-muted transition-all duration-200 group"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </m.button>
            <m.button
              onClick={goToNext}
              whileHover={{ scale: 1.05, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-current hover:bg-muted transition-all duration-200 group"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </m.button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold" style={{ color: current.color }}>
              {currentIndex + 1}
            </span>
            <span>/</span>
            <span>{testimonials.length}</span>
          </div>
        </div>

        {/* Mobile nav — dots + buttons */}
        <div className="flex flex-col gap-6 mt-10 lg:hidden">
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            {testimonials.map((_, index) => (
              <m.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === currentIndex ? 32 : 10,
                  height: 10,
                  background: index === currentIndex ? current.color : "var(--border)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Отзыв ${index + 1}`}
              />
            ))}
          </m.div>

          {/* Mobile buttons */}
          <div className="flex items-center justify-center gap-3">
            <m.button
              onClick={goToPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-4 h-4" />
            </m.button>
            <m.button
              onClick={goToNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-4 h-4" />
            </m.button>
          </div>
        </div>
      </div>
    </section>
  );
}
