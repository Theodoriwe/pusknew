"use client";

import { useRef, useState, useEffect } from "react";
import { m, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Eye, Handshake, Users, Palette, BarChart3, MessageSquare, Code2 } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const team = [
  {
    name: "Атаян Борис",
    role: "Основатель",
    telegram: "@theodoriwe",
    category: "Руководитель",
    index: 0,
    size: "large",
  },
  {
    name: "Дарья Кравченко",
    role: "Арт-директор",
    telegram: "",
    category: "Дизайнер",
    index: 1,
    size: "medium",
  },
  {
    name: "Антон Сыкревский",
    role: "Веб дизайнер",
    telegram: "",
    category: "Специалист по сайтам",
    index: 2,
    size: "medium",
  },
  {
    name: "Екатерина Пушкарева",
    role: "SMM-директор",
    telegram: "",
    category: "Контент",
    index: 3,
    size: "small",
  },
  {
    name: "Иван Новиков",
    role: "Программист",
    telegram: "",
    category: "Разработка",
    index: 4,
    size: "small",
  },
];

const values = [
  {
    title: "Результат важнее процесса",
    description: "Мы не продаём часы работы — мы продаём рост вашего бизнеса. Если что-то не работает, мы это скажем первыми.",
    accentColor: "#549AF2",
  },
  {
    title: "Прозрачность во всём",
    description: "Полный доступ к рекламным кабинетам, еженедельные отчёты, понятные метрики. Никаких чёрных ящиков.",
    accentColor: "#7B5AF5",
  },
  {
    title: "Партнёрство, не подряд",
    description: "Мы погружаемся в ваш бизнес как свой. Потому что ваш успех — это наш успех и лучшая реклама.",
    accentColor: "#00C48C",
  },
];

const memberColors = ["#549AF2", "#7B5AF5", "#00C48C", "#F0643C", "#E63946"];

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
          transition={{ duration: shouldReduceAnimations ? 0.3 : 0.5 }}
          className="mb-20 text-center"
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceAnimations ? 0.2 : 0.3, delay: shouldReduceAnimations ? 0 : 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border text-sm font-medium text-foreground/70 mb-6"
            style={{ borderColor: `${memberColors[0]}20` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: memberColors[0] }} />
            Наша команда
          </m.div>
          <h2 
            className="font-black text-foreground mb-6"
            style={{ 
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em"
            }}
          >
            Специалисты, которые
            <br />
            <span style={{ color: memberColors[0] }}>берут ответственность</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Специалисты по созданию сайтов, рекламе и цифровому-маркетингу
          </p>
        </m.div>



        {/* Team Members - Asymmetric Grid */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceAnimations ? 0.3 : 0.5 }}
        >
          <div className="grid lg:grid-cols-12 gap-6 mb-20">
            {team.map((member) => {
              const accentColor = memberColors[member.index];
              const isLarge = member.size === "large";
              const isMedium = member.size === "medium";

              return (
                <m.a
                  key={member.name}
                  href={`https://t.me/${member.telegram.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: shouldReduceAnimations ? 1 : 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: shouldReduceAnimations ? 1 : 0.95 }}
                  transition={{ 
                    duration: shouldReduceAnimations ? 0.25 : 0.4, 
                    delay: shouldReduceAnimations ? 0 : (0.15 + member.index * 0.05),
                    ease: "easeOut"
                  }}
                  whileHover={shouldReduceAnimations ? {} : { y: -4 }}
                  className={`
                    group relative rounded-3xl border-2 overflow-hidden
                    transition-all duration-300 cursor-pointer
                    ${isLarge ? "lg:col-span-6 lg:row-span-2" : ""}
                    ${isMedium ? "lg:col-span-3" : ""}
                    ${!isLarge && !isMedium ? "lg:col-span-3" : ""}
                    ${isMobile ? "backdrop-blur-0" : "backdrop-blur-sm"}
                  `}
                  style={{
                    background: isMobile 
                      ? `linear-gradient(135deg, ${accentColor}12, ${accentColor}04)`
                      : `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
                    borderColor: accentColor + (isMobile ? "44" : "66"),
                  }}
                >
                  {/* Background SVG Icon - отключены на мобильных */}
                  {!isMobile && (
                    <svg
                      className="absolute -right-12 -top-12 w-48 h-48 pointer-events-none"
                      style={{ 
                        opacity: 0.1,
                        color: accentColor,
                      }}
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {member.index === 0 && (
                        <>
                          <circle cx="100" cy="100" r="80" stroke={accentColor} strokeWidth="3" opacity="0.5" />
                          <path d="M100 60 L130 90 L130 140 Q100 160 70 140 L70 90 Z" stroke={accentColor} strokeWidth="3" fill="none" opacity="0.6" />
                        </>
                      )}
                      {member.index === 1 && (
                        <>
                          <circle cx="100" cy="100" r="80" stroke={accentColor} strokeWidth="3" opacity="0.5" />
                          <path d="M60 80 Q70 60 100 60 Q130 60 140 80 M70 100 L130 100 M75 120 L80 140 M125 120 L120 140" stroke={accentColor} strokeWidth="3" fill="none" opacity="0.6" />
                        </>
                      )}
                      {member.index === 2 && (
                        <>
                          <circle cx="100" cy="100" r="80" stroke={accentColor} strokeWidth="3" opacity="0.5" />
                          <path d="M80 70 L120 70 L130 100 L100 140 L70 100 Z M85 100 L115 100 M100 85 L100 115" stroke={accentColor} strokeWidth="3" fill="none" opacity="0.6" />
                        </>
                      )}
                      {member.index === 3 && (
                        <>
                          <circle cx="100" cy="100" r="80" stroke={accentColor} strokeWidth="3" opacity="0.5" />
                          <path d="M60 70 Q60 60 100 60 Q140 60 140 70 L135 140 Q100 160 65 140 Z M80 90 L120 90 M80 110 L120 110 M80 130 L120 130" stroke={accentColor} strokeWidth="3" fill="none" opacity="0.6" />
                        </>
                      )}
                      {member.index === 4 && (
                        <>
                          <circle cx="100" cy="100" r="80" stroke={accentColor} strokeWidth="3" opacity="0.5" />
                          <path d="M70 80 L85 65 L100 75 L115 65 L130 80 M70 80 L130 80 L130 130 Q100 150 70 130 Z M90 100 L110 100 M85 120 L115 120" stroke={accentColor} strokeWidth="3" fill="none" opacity="0.6" />
                        </>
                      )}
                    </svg>
                  )}

                  {/* Corner glow - только на десктопе */}
                  {!isMobile && (
                    <m.div 
                      className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: accentColor }}
                    />
                  )}

                  {/* Border glow on hover - только на десктопе */}
                  {!isMobile && (
                    <m.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 100% 0%, ${accentColor}30, transparent 80%)`,
                      }}
                    />
                  )}

                  <div className={`relative z-10 h-full flex flex-col ${isLarge ? "p-8 lg:p-10" : "p-6 lg:p-8"}`}>
                    {/* Top accent */}
                    <div className="flex items-center gap-3 mb-6 lg:mb-8">
                      <div 
                        className="w-1.5 h-8 rounded-full"
                        style={{ background: accentColor }}
                      />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {member.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-black text-foreground mb-2 leading-tight ${
                        isLarge ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`font-semibold mb-4 transition-colors ${
                        isLarge ? "text-base lg:text-lg" : "text-sm lg:text-base"
                      }`} style={{ color: accentColor }}>
                        {member.role}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 lg:pt-8 mt-6 lg:mt-8 border-t border-border/30 flex items-center justify-between">
                      <span 
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {member.telegram}
                      </span>
                      <m.div
                        className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg border flex items-center justify-center transition-all"
                        style={{
                          borderColor: accentColor,
                          background: `${accentColor}12`,
                        }}
                        whileHover={shouldReduceAnimations ? {} : { rotate: -45, scale: 1.15 }}
                      >
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: accentColor }} />
                      </m.div>
                    </div>
                  </div>
                </m.a>
              );
            })}
          </div>
        </m.div>

        {/* Why Choose Us Section */}
        <m.div
          initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceAnimations ? 0 : 40 }}
          transition={{ duration: shouldReduceAnimations ? 0.3 : 0.6, delay: shouldReduceAnimations ? 0 : 0.15 }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header with left border accent */}
            <div className="mb-20 pl-6 md:pl-8 border-l-4 border-blue-500/50">
              <m.h3 
                initial={{ opacity: 0, x: shouldReduceAnimations ? 0 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceAnimations ? 0 : -20 }}
                transition={{ delay: shouldReduceAnimations ? 0 : 0.2, duration: shouldReduceAnimations ? 0.3 : 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Почему выбирают<br />
                <span className="bg-gradient-to-r from-[#6e9bee] to-[#6e9bee] bg-clip-text text-transparent">
                  ПУСК
                </span>
              </m.h3>
            </div>

            {/* Two column premium layout */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Column 1 */}
              <m.div
                initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
                transition={{ delay: shouldReduceAnimations ? 0 : 0.25, duration: shouldReduceAnimations ? 0.3 : 0.5 }}
                className="relative"
              >
                {/* Number accent */}
                <div
                  className="absolute -top-12 -left-4 text-8xl md:text-9xl font-black text-blue-500/10"
                >
                  01
                </div>

                {/* Dot accent */}
                {!shouldReduceAnimations && (
                  <m.div
                    className="absolute -top-4 right-0 w-3 h-3 rounded-full bg-blue-500/40"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                )}

                <div className="relative z-10">
                  <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    Качество над количеством
                  </h4>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    Мы не гонимся за количеством клиентов — каждый проект получает <span className="text-foreground font-semibold">полное внимание команды</span>.
                  </p>

                  {/* Divider line */}
                  <m.div
                    className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent"
                    initial={{ opacity: 0, width: 0 }}
                    animate={isInView ? { opacity: 1, width: 48 } : { opacity: 0, width: 0 }}
                    transition={{ delay: shouldReduceAnimations ? 0 : 0.35, duration: shouldReduceAnimations ? 0.3 : 0.5 }}
                  />
                </div>
              </m.div>

              {/* Column 2 */}
              <m.div
                initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceAnimations ? 0 : 30 }}
                transition={{ delay: shouldReduceAnimations ? 0 : 0.3, duration: shouldReduceAnimations ? 0.3 : 0.5 }}
                className="relative"
              >
                {/* Number accent */}
                <div
                  className="absolute -top-12 -left-4 text-8xl md:text-9xl font-black"
                  style={{ color: "rgba(247, 108, 108, 0.1)" }}
                >
                  02
                </div>

                {/* Dot accent */}
                {!shouldReduceAnimations && (
                  <m.div
                    className="absolute -top-4 right-0 w-3 h-3 rounded-full"
                    style={{ background: "rgba(247, 108, 108, 0.4)" }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                )}

                <div className="relative z-10">
                  <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    Опыт высочайшего уровня
                  </h4>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    Специалисты с опытом знают, что приносит результат. Для нас ваш рост - важнейщая цель нашего сотрудничества.
                  </p>

                  {/* Divider line */}
                  <m.div
                    className="w-12 h-1 to-transparent"
                    style={{ background: "linear-gradient(to right, #F76C6C, transparent)" }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={isInView ? { opacity: 1, width: 48 } : { opacity: 0, width: 0 }}
                    transition={{ delay: shouldReduceAnimations ? 0 : 0.4, duration: shouldReduceAnimations ? 0.3 : 0.5 }}
                  />
                </div>
              </m.div>
            </div>

            {/* Bottom accent line */}
            <m.div
              className="mt-24 h-px to-transparent"
              style={{ background: "linear-gradient(to right, rgba(84, 154, 242, 0.2), rgba(247, 108, 108, 0.2), transparent)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: shouldReduceAnimations ? 0 : 0.5, duration: shouldReduceAnimations ? 0.3 : 0.6 }}
            />
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: shouldReduceAnimations ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceAnimations ? 0 : 20 }}
          transition={{ delay: shouldReduceAnimations ? 0 : 0.2, duration: shouldReduceAnimations ? 0.3 : 0.4 }}
          className="text-center"
        >
          <Link
            href="/kontakty"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all group font-bold text-base"
          >
            <span>Обсудить проект</span>
            <m.div whileHover={shouldReduceAnimations ? {} : { rotate: 45 }}>
              <ArrowUpRight className="w-5 h-5" />
            </m.div>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
