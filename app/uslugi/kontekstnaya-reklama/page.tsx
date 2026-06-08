"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

import { CasesSection } from "@/components/sections/cases";
import { ArrowRight, ArrowUpRight, Check, Minus, Plus, Search, Globe, Target } from "lucide-react";

// ============================================================================
// ANIMATED COUNTER
// ============================================================================
function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

// ============================================================================
// FAQ ITEM
// ============================================================================
function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={toggle} className="w-full py-8 flex items-start justify-between text-left gap-6 group">
        <span className="text-xl sm:text-2xl font-medium text-white group-hover:text-primary transition-colors leading-tight">
          {q}
        </span>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-1 group-hover:border-primary group-hover:text-primary transition-colors">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-white/60 text-lg leading-relaxed max-w-3xl">{a}</p>
      </motion.div>
    </div>
  );
}

// ============================================================================
// FULL CYCLE MANAGEMENT SECTION
// ============================================================================
interface Step {
  icon: string;
  name: string;
  tagline: string;
  detail: string[];
  why: string;
}

const beforeSteps: Step[] = [
  {
    icon: "search",
    name: "Сбор семантики",
    tagline: "Все запросы, по которым вас ищут клиенты",
    detail: [
      "Анализ ниши и конкурентов в Яндекс Директ",
      "Сбор ключевых фраз через Яндекс Wordstat и профессиональные инструменты",
      "Кластеризация запросов по группам и намерениям",
      "Сбор минус-слов, чтобы отсечь нецелевой трафик",
    ],
    why: "Без грамотной семантики реклама показывается не тем людям - деньги уходят в пустоту."
  },
  {
    icon: "target",
    name: "Анализ конкурентов",
    tagline: "Изучаем, как рекламируются ваши конкуренты",
    detail: [
      "Анализ объявлений конкурентов в выдаче Яндекса",
      "Изучение их офферов, УТП и посадочных страниц",
      "Определение ставок и позиций в аукционе",
      "Формирование стратегии выгодного отличия",
    ],
    why: "Зная сильные стороны конкурентов, мы делаем ваши объявления заметнее и убедительнее."
  },
  {
    icon: "pencil",
    name: "Написание объявлений",
    tagline: "Тексты, которые цепляют и конвертируют",
    detail: [
      "Создание нескольких вариантов объявлений для A/B-тестов",
      "Прописывание заголовков, текстов, быстрых ссылок и уточнений",
      "Добавление расширений: адрес, телефон, часы работы",
      "Соответствие объявления запросу и странице назначения",
    ],
    why: "Сильный текст объявления снижает стоимость клика и повышает CTR - вы платите меньше за тех же клиентов."
  },
  {
    icon: "sliders",
    name: "Настройка кампаний",
    tagline: "Технически правильный старт без потерь",
    detail: [
      "Настройка географии, расписания показов и устройств",
      "Выбор стратегии ставок (ручная / автоматическая / CPA)",
      "Настройка Яндекс Метрики и целей для отслеживания заявок",
      "Подключение колтрекинга и UTM-меток для аналитики",
      "Связь с Яндекс Бизнесом и проверка всех технических параметров",
    ],
    why: "Ошибки в настройках на старте = слитый бюджет в первые же дни. Правильная база экономит ваши деньги сразу."
  },
  {
    icon: "check-circle",
    name: "Проверка и модерация",
    tagline: "Кампания готова к запуску без сюрпризов",
    detail: [
      "Проверка всех объявлений перед отправкой на модерацию",
      "Корректировка под требования Яндекса",
      "Тестовый запуск и контроль первых показов",
      "Проверка корректности работы целей в Метрике",
    ],
    why: "Реклама без проверки - риск слить бюджет на нерабочую кампанию с первого дня."
  },
];

const afterSteps: Step[] = [
  {
    icon: "chart-line",
    name: "Анализ статистики",
    tagline: "Ежедневный мониторинг ключевых показателей",
    detail: [
      "Отслеживание CTR, CPC, CR, стоимости заявки каждый день",
      "Сравнение плановых и фактических показателей",
      "Выявление объявлений и ключей, которые не работают",
      "Отчёт для клиента: понятно, прозрачно, без воды",
    ],
    why: "Без регулярного анализа плохие объявления незаметно съедают весь бюджет, пока хорошие недополучают показы."
  },
  {
    icon: "sliders-horizontal",
    name: "Оптимизация ставок",
    tagline: "Каждый рубль работает на результат",
    detail: [
      "Корректировка ставок по ключевым фразам на основе конверсий",
      "Управление ставками по устройствам, полу, возрасту и времени",
      "Перераспределение бюджета в пользу работающих кампаний",
      "Контроль позиций в аукционе Яндекс Директ",
    ],
    why: "Яндекс Директ - живой аукцион. Ставки конкурентов меняются каждый час. Без управления вы переплачиваете."
  },
  {
    icon: "filter",
    name: "Чистка минус-слов",
    tagline: "Отсекаем нецелевой трафик постоянно",
    detail: [
      "Еженедельный анализ поисковых запросов, по которым были клики",
      "Добавление новых минус-слов, которые появились после запуска",
      "Исключение нерелевантных площадок в РСЯ",
      "Фильтрация фрода и некачественного трафика",
    ],
    why: "Без чистки через 1-2 месяца до 30-40% бюджета уходит на людей, которым ваш продукт не нужен."
  },
  {
    icon: "git-branch",
    name: "A/B-тестирование",
    tagline: "Постоянный поиск лучшего решения",
    detail: [
      "Тестирование новых заголовков и текстов объявлений",
      "Сравнение разных посадочных страниц и офферов",
      "Тест автостратегий vs ручного управления",
      "Замена неэффективных объявлений на основе данных",
    ],
    why: "Рынок меняется. То, что работало 2 месяца назад, сегодня может давать заявки в 2 раза дороже."
  },
  {
    icon: "shield-off",
    name: "Блокировка фрода",
    tagline: "Защита бюджета от скликивания",
    detail: [
      "Мониторинг подозрительных IP-адресов и поведения",
      "Исключение площадок РСЯ с высоким процентом отказов",
      "Работа с Яндексом по возврату средств за фрод",
      "Настройка антифрод-фильтров в Метрике",
    ],
    why: "Скликивание - реальная проблема. Конкуренты и боты могут сжечь недельный бюджет за сутки."
  },
  {
    icon: "rocket",
    name: "Масштабирование",
    tagline: "Находим новые точки роста",
    detail: [
      "Расширение семантики: новые запросы и направления",
      "Запуск новых форматов: Мастер кампаний, РСЯ, ретаргетинг",
      "Увеличение бюджета на работающих связках",
      "Поиск незанятых ниш и дешёвого трафика конкурентов",
    ],
    why: "Хорошая реклама - это не потолок, а стартовая точка. Масштабирование умножает результат."
  },
];

function IconComponent({ name }: { name: string }) {
  const iconProps = { width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", className: "text-current" };
  switch(name) {
    case "search": return <Search width={24} height={24} className="text-current" />;
    case "target": return <Target width={24} height={24} className="text-current" />;
    case "pencil": return <svg {...iconProps}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
    case "sliders": return <svg {...iconProps}><circle cx="6" cy="5" r="2" fill="currentColor"/><line x1="6" y1="7" x2="6" y2="18"/><circle cx="18" cy="15" r="2" fill="currentColor"/><line x1="18" y1="3" x2="18" y2="13"/><line x1="18" y1="17" x2="18" y2="22"/></svg>;
    case "check-circle": return <svg {...iconProps}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case "chart-line": return <svg {...iconProps}><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
    case "sliders-horizontal": return <svg {...iconProps}><circle cx="5" cy="6" r="2" fill="currentColor"/><line x1="7" y1="6" x2="20" y2="6"/><circle cx="18" cy="18" r="2" fill="currentColor"/><line x1="2" y1="18" x2="16" y2="18"/></svg>;
    case "filter": return <svg {...iconProps}><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
    case "git-branch": return <svg {...iconProps}><line x1="12" y1="2" x2="12" y2="9" strokeWidth="2"/><line x1="12" y1="9" x2="6" y2="15" strokeWidth="2"/><line x1="12" y1="9" x2="18" y2="15" strokeWidth="2"/><line x1="6" y1="15" x2="6" y2="22" strokeWidth="2"/><line x1="18" y1="15" x2="18" y2="22" strokeWidth="2"/><circle cx="6" cy="15" r="1.5" fill="currentColor"/><circle cx="18" cy="15" r="1.5" fill="currentColor"/></svg>;
    case "shield-off": return <svg {...iconProps}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
    case "rocket": return <svg {...iconProps}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    default: return <Search width={24} height={24} className="text-current" />;
  }
}

// ============================================================================
// SVG STYLES HELPER
// ============================================================================
interface SvgStyles {
  strip1: { bottom: string; right: string; width: string; height: string };
  strip2: { top: string; right: string; width: string; height: string };
  strip3: { bottom: string; left: string; width: string; height: string };
  strokeWidth: string;
  fontSize: string;
  isMobile: boolean;
}

function getSvgStylesForWidth(width: number): SvgStyles {
  if (width >= 2560) {
    return {
      strip1: { bottom: "-15%", right: "5%", width: "1500px", height: "1500px" },
      strip2: { top: "-10%", right: "-5%", width: "1500px", height: "1500px" },
      strip3: { bottom: "-20%", left: "-40%", width: "clamp(100vw, 150vw, 1400px)", height: "clamp(100vw, 150vw, 1400px)" },
      strokeWidth: "38", fontSize: "11", isMobile: false,
    };
  } else if (width >= 1920) {
    return {
      strip1: { bottom: "clamp(-15%, -20vw, -12%)", right: "clamp(-5%, -10vw, -5%)", width: "clamp(80vw, 120vw, 1200px)", height: "clamp(80vw, 120vw, 1200px)" },
      strip2: { top: "clamp(-8%, -12vw, -5%)", right: "clamp(-15%, -20vw, -20%)", width: "clamp(80vw, 120vw, 1200px)", height: "clamp(80vw, 120vw, 1200px)" },
      strip3: { bottom: "-40%", left: "-35%", width: "clamp(80vw, 110vw, 1000px)", height: "clamp(80vw, 110vw, 1000px)" },
      strokeWidth: "38", fontSize: "11", isMobile: false,
    };
  } else if (width >= 600) {
    return {
      strip1: { bottom: "clamp(-12%, -20vw, -8%)", right: "clamp(-10%, -15vw, 5%)", width: "clamp(70vw, 120vw, 1100px)", height: "clamp(70vw, 120vw, 1100px)" },
      strip2: { top: "clamp(-5%, -12vw, 0%)", right: "clamp(-25%, -35vw, -5%)", width: "clamp(70vw, 120vw, 1100px)", height: "clamp(70vw, 120vw, 1100px)" },
      strip3: { bottom: "-45%", left: "-30%", width: "clamp(70vw, 100vw, 900px)", height: "clamp(70vw, 100vw, 900px)" },
      strokeWidth: "32", fontSize: "10", isMobile: false,
    };
  } else {
    return {
      strip1: { bottom: "-10%", right: "-10%", width: "clamp(100vw, 150vw, 1400px)", height: "clamp(100vw, 150vw, 1400px)" },
      strip2: { top: "-10%", right: "-10%", width: "clamp(100vw, 150vw, 1400px)", height: "clamp(100vw, 150vw, 1400px)" },
      strip3: { bottom: "-25%", left: "-40%", width: "clamp(100vw, 150vw, 1400px)", height: "clamp(100vw, 150vw, 1400px)" },
      strokeWidth: "52", fontSize: "13", isMobile: true,
    };
  }
}

// ============================================================================
// DIRECT CYCLE FULL
// ============================================================================
function DirectCycleFull() {
  const cardColors = [
    { bg: "#549AF2", text: "#ffffff" },
    { bg: "#d0ef4c", text: "#000000" },
    { bg: "#ffffff", text: "#000000" },
    { bg: "#ffffff", text: "#000000" },
    { bg: "#549AF2", text: "#ffffff" },
    { bg: "#131826", text: "#ffffff" },
  ];

  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Полный цикл
          </div>
          <h2 className="font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Ведение Яндекс Директ от А до Я
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Реклама - это не одноразовый запуск. Это постоянная работа, которая требует анализа, тестирования и оптимизации. Мы управляем каждым этапом.
          </p>
        </motion.div>

        {/* BEFORE PHASE */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-32">
          <div className="mb-12 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-2" style={{ background: "#549AF2" }} />
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Подготовка к запуску</h3>
              <p className="text-muted-foreground text-base mt-2">Пять критических этапов перед стартом кампании</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {beforeSteps.map((step, idx) => {
              const colors = cardColors[idx % cardColors.length];
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className={`group p-6 lg:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${idx < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
                  style={{ background: colors.bg, borderColor: idx === 2 || idx === 3 ? "#549AF2" : colors.bg }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)" }}>
                      <div style={{ fontSize: "2rem", color: colors.text }}><IconComponent name={step.icon} /></div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1.5 rounded-full" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)", color: colors.text }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>{step.name}</h4>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)" }}>{step.tagline}</p>
                  <ul className="space-y-2.5">
                    {step.detail.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                        <span className="text-xs leading-snug" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5" style={{ borderTop: colors.text === "#ffffff" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)" }}>
                    <p className="text-xs leading-relaxed italic" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>"{step.why}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* DIVIDER */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-6 my-12 lg:my-16">
          <div className="flex-1 h-px bg-border" />
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* AFTER PHASE */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="mb-12 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-2" style={{ background: "#549AF2" }} />
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Ведение и масштабирование</h3>
              <p className="text-muted-foreground text-base mt-2">Ежедневная оптимизация для лучших результатов</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
            {afterSteps.map((step, idx) => {
              const colors = cardColors[idx % cardColors.length];
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className={`group p-6 lg:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${idx < 3 ? "lg:col-span-2" : idx === 5 ? "lg:col-span-6" : "lg:col-span-3"}`}
                  style={{ background: colors.bg, borderColor: idx === 2 || idx === 3 ? "#549AF2" : colors.bg }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)" }}>
                      <div style={{ fontSize: "2rem", color: colors.text }}><IconComponent name={step.icon} /></div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1.5 rounded-full" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)", color: colors.text }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: colors.text }}>{step.name}</h4>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)" }}>{step.tagline}</p>
                  <ul className="space-y-2.5">
                    {step.detail.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: colors.text === "#ffffff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }} />
                        <span className="text-xs leading-snug" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5" style={{ borderTop: colors.text === "#ffffff" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)" }}>
                    <p className="text-xs leading-relaxed italic" style={{ color: colors.text === "#ffffff" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>"{step.why}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BOTTOM NOTE */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 p-6 lg:p-8 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "rgba(84,154,242,0.3)", background: "rgba(84,154,242,0.05)" }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(84,154,242,0.2)" }}>
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Рекламный бюджет без присмотра сгорает.</span> Ведение - это не формальность, а ежедневная работа, которая удерживает стоимость заявки на минимуме и защищает каждый рубль вашего бюджета.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MARQUEE
// ============================================================================
const BASE_TEXT = " ★ ЯНДЕКС.ДИРЕКТ ★ GOOGLE ADS ★ ROI 300%+ ★ СНИЖАЕМ CPL ★ МАСШТАБИРУЕМ ★ A/B ТЕСТЫ";
const REPEATED_TEXT = `${BASE_TEXT}${BASE_TEXT}${BASE_TEXT}${BASE_TEXT}${BASE_TEXT}`;

// ============================================================================
// PAGE
// ============================================================================
export default function KontekstnayaReklamaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false); 

  // ── Sticky card refs (FAQ секция) ──
  const faqSectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  // ── SVG стили: ленивая инициализация — читаем window сразу, без эффекта ──
  const [styles, setStyles] = useState<SvgStyles>(getSvgStylesForWidth(typeof window !== "undefined" ? window.innerWidth : 1920));
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // ── Длина одного блока текста для анимации ──
  const [textLoopLength, setTextLoopLength] = useState<number>(0);
  const textMeasuredRef = useRef<SVGTextElement>(null);
  const currentOffsetRef = useRef<number>(0);

  // Hero scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
    setStyles(getSvgStylesForWidth(window.innerWidth));
    const isMobile = window.matchMedia("(max-width: 768px)").matches || window.innerWidth < 768;
    setIsMobileDevice(isMobile);
  }, []);

  // ── Resize: обновляем стили при изменении размера окна ──
  useEffect(() => {
    const handleResize = () => {
      setStyles(getSvgStylesForWidth(window.innerWidth));
      const isMobile = window.matchMedia("(max-width: 768px)").matches || window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Измеряем длину текста надежным способом для всех браузеров ──
  useEffect(() => {
    let attempts = 0;
    let timeoutId: NodeJS.Timeout;
    const maxAttempts = 10;
    
    const measureText = () => {
      if (textMeasuredRef.current) {
        // Замеряем исключительно скрытый BASE_TEXT без textPath
        const total = textMeasuredRef.current.getComputedTextLength();
        if (total > 0) {
          setTextLoopLength(total); // Без деления на 5, т.к. измеряется ровно один цикл
          return;
        }
      }
      attempts++;
      if (attempts < maxAttempts) {
        timeoutId = setTimeout(measureText, 100);
      }
    };
    
    measureText();
    window.addEventListener("resize", measureText, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureText);
    };
  }, []);

  // ── Исправленная анимация с корректной очисткой и дельта-таймом ──
  useEffect(() => {
    let frameId: number;
    let localLastTime = performance.now();
    
    const animateText = (time: number) => {
      // Считаем точную дельту прошедшего времени с прошлого кадра (dt)
      const dt = (time - localLastTime) / 1000;
      localLastTime = time;
      
      const speed = isMobileDevice ? 50 : 30;
      const loopLen = textLoopLength || 1000;
      
      // Сдвигаем текущий offset плавно и сбрасываем только по бесшовному модулю
      currentOffsetRef.current -= (speed * dt);
      currentOffsetRef.current = currentOffsetRef.current % loopLen;
      
      const textPaths = document.querySelectorAll('textPath[href*="arcPath"]');
      textPaths.forEach((tp) => {
        tp.setAttribute('startOffset', `${currentOffsetRef.current}`);
      });
      
      frameId = requestAnimationFrame(animateText);
    };
    
    if (textLoopLength > 0) {
      frameId = requestAnimationFrame(animateText);
    }
    
    // Обязательная очистка старого фрейма во избежание наслаивания
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isMobileDevice, textLoopLength]);

  // ── Sticky card (FAQ) ──
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
      if (leftColRect.top > TOP_OFFSET) {
        card.style.position = "relative";
        card.style.top = "0px";
        card.style.left = "";
        card.style.width = "";
      } else if (leftColRect.bottom > cardHeight + TOP_OFFSET) {
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
        if (card) { card.style.position = ""; card.style.top = ""; card.style.left = ""; card.style.width = ""; }
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
    <>
      <Header />
      <main className="bg-background overflow-x-hidden">

        {/* ══ HERO ══ */}
        <section ref={heroRef} className="relative bg-background overflow-hidden" style={{ height: "100vh" }}>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {mounted && (
              <>
            {/* Strip 1 + Hidden Measurement Text */}
            <svg
              className="absolute"
              style={{
                bottom: styles.strip1.bottom,
                right: styles.strip1.right,
                width: styles.strip1.width,
                height: styles.strip1.height,
                maxWidth: "1500px",
                maxHeight: "1500px",
                overflow: "visible",
              }}
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path id="arcPath1" d="M 380,790 A 395,395 0 0,1 790,380" />
              </defs>
              
              {/* СКРЫТЫЙ ТЕКСТ: Нужен для точного обхода бага урезания длины textPath в Safari/iOS */}
              <text
                ref={textMeasuredRef}
                fontSize={styles.fontSize}
                fontWeight="800"
                letterSpacing="3"
                visibility="hidden"
              >
                {BASE_TEXT}
              </text>

              <path d="M 380,790 A 395,395 0 0,1 790,380" fill="none" stroke="#549AF2" strokeWidth={styles.strokeWidth} strokeLinecap="butt" />
              <text
                fontSize={styles.fontSize}
                fontWeight="800"
                fill="white"
                letterSpacing="3"
                dy="0.35em"
                style={{ visibility: textLoopLength > 0 ? "visible" : "hidden" }}
              >
                <textPath href="#arcPath1" startOffset="0">
                  {REPEATED_TEXT}
                </textPath>
              </text>
            </svg>

            {/* Strip 2 */}
            <svg
              className="absolute"
              style={{
                top: styles.strip2.top,
                right: styles.strip2.right,
                width: styles.strip2.width,
                height: styles.strip2.height,
                maxWidth: "1500px",
                maxHeight: "1500px",
                overflow: "visible",
              }}
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path id="arcPath2" d="M 420,10 A 395,395 0 0,0 790,410" />
              </defs>
              <path d="M 420,10 A 395,395 0 0,0 790,410" fill="none" stroke="#549AF2" strokeWidth={styles.strokeWidth} strokeLinecap="butt" />
              <text
                fontSize={styles.fontSize}
                fontWeight="800"
                fill="white"
                letterSpacing="3"
                dy="0.35em"
                style={{ visibility: textLoopLength > 0 ? "visible" : "hidden" }}
              >
                <textPath href="#arcPath2" startOffset="0">
                  {REPEATED_TEXT}
                </textPath>
              </text>
            </svg>

            {/* Strip 3 */}
            <svg
              className="absolute"
              style={{
                bottom: styles.strip3.bottom,
                left: styles.strip3.left,
                width: styles.strip3.width,
                height: styles.strip3.height,
                maxWidth: "1400px",
                maxHeight: "1400px",
                overflow: "visible",
              }}
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path id="arcPath3" d="M 10,400 A 560,560 0 0,1 790,790" />
              </defs>
              <path d="M 10,400 A 560,560 0 0,1 790,790" fill="none" stroke="#549AF2" strokeWidth={styles.strokeWidth} strokeLinecap="butt" />
              <text
                fontSize={styles.fontSize}
                fontWeight="800"
                fill="white"
                letterSpacing="3"
                dy="0.35em"
                style={{ visibility: textLoopLength > 0 ? "visible" : "hidden" }}
              >
                <textPath href="#arcPath3" startOffset="0">
                  {REPEATED_TEXT}
                </textPath>
              </text>
            </svg>
            </>
            )}
          </div>

          {/* Hero content */}
          <motion.div style={{ opacity: heroOpacity, scale: heroScale, height: "100vh" }} className="relative z-10 w-full flex items-start overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
              <div className="mb-6">
                <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi" }, { label: "Контекстная реклама" }]} />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
              >
                Реклама для вашего
                <br />
                <span className="text-primary">бизнеса</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="relative inline-block mt-8 mb-8"
              >
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: "#549AF2", willChange: "transform" }} />
                <div className="relative px-4 sm:px-6 py-4 rounded-2xl border-2 border-primary/30 bg-background">
                  <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Уже платили за рекламу без результата? Разберём почему и запустим по-другому
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-12 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
              <div className="w-1.5 h-3 rounded-full bg-foreground/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="relative py-24 lg:py-32" style={{ background: "#549AF2" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Как это работает
              </div>
              <h2 className="font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Работаем с тёплой аудиторией
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Контекстная реклама показывается пользователям, которые уже ищут ваши услуги или интересовались ими ранее. Это не холодные звонки - это клиенты, готовые к покупке.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="group relative p-8 lg:p-10 rounded-3xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#549AF215" }}>
                  <Search className="w-7 h-7" style={{ color: "#549AF2" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Реклама на поиске</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Объявления в результатах поиска Яндекса. Когда пользователь вводит запрос - ваше предложение появляется в топе выдачи.</p>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 font-medium" style={{ color: "#549AF2" }}>Реклама</span>
                    <span>yandex.ru</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Ваше объявление здесь</div>
                  <div className="text-xs text-gray-500">Показывается по запросу пользователя</div>
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#549AF220" }}>
                    <Check className="w-3 h-3" style={{ color: "#549AF2" }} />
                  </div>
                  <span className="text-sm text-gray-900">Максимальная конверсия - клиент уже ищет решение</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="group relative p-8 lg:p-10 rounded-3xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#549AF215" }}>
                  <Globe className="w-7 h-7" style={{ color: "#549AF2" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Рекламная сеть Яндекса (РСЯ)</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Размещение на сервисах Яндекса и более 20 000 партнёрских площадок. Графика, видео и текст - догоняем тех, кто уже интересовался.</p>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="h-8 rounded" style={{ background: "#549AF215" }} />
                    <div className="h-8 rounded" style={{ background: "#549AF225" }} />
                    <div className="h-8 rounded" style={{ background: "#549AF215" }} />
                  </div>
                  <div className="text-xs text-gray-500 text-center">Баннеры на популярных сайтах</div>
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#549AF220" }}>
                    <Check className="w-3 h-3" style={{ color: "#549AF2" }} />
                  </div>
                  <span className="text-sm text-gray-900">Широкий охват и ретаргетинг - напоминаем о себе</span>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="mt-10 p-6 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-white/90">
                <span className="text-white font-medium">Комбинируем оба формата</span> - поиск приводит горячих клиентов, РСЯ возвращает тех, кто ушёл подумать. Вместе они дают максимальный результат.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══ FULL CYCLE ══ */}
        <DirectCycleFull />

        {/* ══ CASES ══ */}
        <CasesSection />

        {/* ══ PRICING ══ */}
        <section id="pricing" className="py-32 lg:py-48 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Тарифы
              </div>
              <h2 className="font-bold text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                Выберите формат работы
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { name: "Старт", price: "35 000", desc: "Для старта и тестирования", features: ["До 50 000 ₽ бюджета", "1 рекламная система", "Базовая аналитика", "Отчёты 2 раза в месяц"], featured: false },
                { name: "Рост", price: "50 000", desc: "Оптимально для большинства", features: ["До 200 000 ₽ бюджета", "Яндекс + Google", "Сквозная аналитика", "Еженедельные отчёты", "A/B тестирование"], featured: true },
                { name: "Масштаб", price: "100 000", desc: "Максимальный результат", features: ["Без лимита бюджета", "Все рекламные системы", "Выделенная команда", "Ежедневная оптимизация", "Стратегические сессии"], featured: false },
              ].map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative p-10 rounded-3xl flex flex-col ${plan.featured ? "bg-foreground text-background lg:scale-105 lg:-my-4" : "bg-card border border-border"}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">Популярный</div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>{plan.name}</h3>
                    <p className={plan.featured ? "text-background/60" : "text-muted-foreground"}>{plan.desc}</p>
                  </div>
                  <div className="mb-8">
                    <span className="font-bold" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>{plan.price}</span>
                    <span className={plan.featured ? "text-background/60" : "text-muted-foreground"}> ₽/мес</span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={20} className="text-primary shrink-0" />
                        <span className={plan.featured ? "text-background/80" : "text-muted-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/kontakty"
                    className={`block w-full py-4 text-center font-semibold rounded-xl transition-all duration-300 ${plan.featured ? "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/30" : "bg-foreground text-background hover:bg-primary"}`}
                  >
                    Выбрать тариф
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ + CTA ══ */}
        <section ref={faqSectionRef} className="py-32 lg:py-48 text-white" style={{ background: "#151825" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div ref={leftColRef}>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                  <h2 className="font-bold" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                    Частые вопросы
                  </h2>
                </motion.div>
                <div>
                  {[
                    { q: "Рекламный бюджет идёт через вас или напрямую в Яндекс?", a: "Напрямую в Яндекс - на ваш рекламный кабинет, к которому у вас есть полный доступ в любой момент. Мы не касаемся рекламных денег: вы пополняете счёт сами и видите каждую копейку расхода." },
                    { q: "Что входит в ежемесячное ведение, а что нет?", a: "Входит: мониторинг и оптимизация кампаний, A/B тесты объявлений, корректировка ставок, еженедельные отчёты, рекомендации по сайту. Не входит: рекламный бюджет (оплачивается отдельно напрямую в Яндекс), разработка нового сайта или посадочных страниц." },
                    { q: "Можно сначала протестировать на небольшом бюджете?", a: "Да. Стартовать можно от 30 000 руб. на рекламный бюджет - этого хватит чтобы проверить нишу, собрать первую статистику и понять реальную стоимость заявки. После теста уже понятно стоит ли масштабироваться и до какого бюджета." },
                    { q: "Какой минимальный бюджет для старта?", a: "Для каждой ниши разный бюджет, но рекомендуем от 30 000 руб./мес. на рекламу. Это позволит собрать достаточно данных для оптимизации и получить первые результаты." },
                    { q: "Через сколько будут первые заявки?", a: "Первые заявки появляются в течение первой недели после запуска. Стабильный предсказуемый поток - через 2-3 недели после оптимизации кампаний." },
                    { q: "Какие гарантии вы даёте?", a: "Мы гарантируем прозрачность: вы видите все данные в реальном времени. Если результаты не устраивают - можете остановить сотрудничество в любой момент без штрафов." },
                    { q: "Вы работаете с нашей нишей?", a: "Работаем со всеми нишами Б2Б и Б2С. Особенно сильны в HoReCa, e-commerce и услугах. На старте проведём аудит и скажем честно, сможем ли помочь." },
                  ].map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
                  ))}
                </div>
              </div>

              <div ref={cardWrapperRef} className="relative hidden lg:block">
                <motion.div ref={cardRef} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="p-10 lg:p-12 rounded-3xl border border-white/10 bg-white/[0.02]"
                >
                  <h3 className="font-bold mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                    Готовы увеличить продажи?
                  </h3>
                  <p className="text-white/60 text-lg mb-10 leading-relaxed">
                    Получите бесплатный аудит текущих кампаний и персональный план роста с прогнозом результатов.
                  </p>
                  <Link href="/kontakty"
                    className="group flex items-center justify-center gap-3 w-full py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                  >
                    Получить аудит бесплатно
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
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}