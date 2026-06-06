"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useModalStore } from "@/lib/store";

export function HeroContextAds() {
  const { openContact, openQuiz } = useModalStore();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { number: "340%", label: "прирост заявок", value: "за 3 мес." },
    { number: "2.5x", label: "улучшение ROI", value: "гарантировано" },
    { number: "48ч", label: "первые результаты", value: "начиная с" },
  ];

  const platforms = [
    { name: "Яндекс Директ", highlight: "60% трафика", desc: "максимум охвата" },
    { name: "Google Ads", highlight: "30% конверсий", desc: "глобальная сеть" },
    { name: "VK Реклама", highlight: "50% молодежи", desc: "целевая аудитория" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
    >
      {/* Modern minimalist background */}
      <div className="absolute inset-0">
        {/* Animated gradient blobs - very subtle */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(84, 154, 242, 0.04) 0%, transparent 70%)",
            animation: "float 20s ease-in-out infinite"
          }} 
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(123, 90, 245, 0.03) 0%, transparent 70%)",
            animation: "float 25s ease-in-out infinite reverse"
          }} 
        />

        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(30px) translateX(20px); }
          }
        `}</style>
      </div>

      {/* Main content */}
      <m.div
        style={{ y, opacity }}
        className="relative flex-1 flex flex-col z-10"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 xl:px-12 flex flex-col flex-1 justify-center py-20">
          
          {/* Category badge with subtle animation */}
          <m.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-12 flex items-center gap-2"
          >
            <m.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2"
            >
              <Sparkles size={14} className="text-primary" />
            </m.div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Контекстная реклама</span>
          </m.div>

          {/* Main hero layout - staggered asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
            
            {/* Left side - Headline section */}
            <m.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="flex flex-col gap-2 mb-8">
                <h1 
                  className="text-foreground/70 select-none leading-tight"
                  style={{ 
                    fontFamily: "var(--font-display)", 
                    fontSize: "clamp(0.9rem, 3vw, 1.3rem)", 
                    fontWeight: 500,
                    letterSpacing: "-0.01em"
                  }}
                >
                  Максимальный результат
                </h1>
              </div>
              
              <h2 
                className="select-none leading-[1.1] mb-8"
                style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: "clamp(2.5rem, 8vw, 5rem)", 
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #000 0%, #000 48%, #549AF2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                за минимальный бюджет
              </h2>

              {/* Description with accent line */}
              <div className="flex gap-4 items-start">
                <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 rounded-full flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  Настраиваем Яндекс и Google Ads с максимальной эффективностью. Каждый рубль — в результаты.
                </p>
              </div>

              {/* CTA Buttons */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-12"
              >
                <button
                  onClick={() => openContact("ads")}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-lg bg-foreground text-background transition-all hover:shadow-2xl hover:shadow-foreground/20 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Обсудить проект</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => openQuiz()}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-lg border border-foreground/20 text-foreground transition-all hover:border-foreground/50 hover:bg-foreground/5 active:scale-95"
                >
                  Узнать стоимость
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </m.div>
            </m.div>

            {/* Right side - Stats cards with modern layout */}
            <m.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max"
            >
              {stats.map((stat, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/3 to-transparent p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:from-primary/8 ${
                    idx === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Decorative line */}
                  <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  
                  <div className="relative z-10">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                      {stat.value}
                    </p>
                    <h3 
                      className="text-4xl sm:text-5xl font-black mb-2 tracking-tighter"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.number}
                    </h3>
                    <p className="text-sm font-semibold text-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>

          {/* Divider */}
          <m.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-20"
          />

          {/* Platforms section - modern grid */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="inline-block w-1 h-1 rounded-full bg-primary" />
              Платформы рекламы
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {platforms.map((platform, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.08 }}
                  className="group relative rounded-2xl border border-foreground/8 p-6 transition-all hover:border-primary/20 hover:bg-foreground/3"
                >
                  {/* Subtle animated background on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" 
                    style={{
                      background: "radial-gradient(circle at 100% 0%, rgba(84, 154, 242, 0.1) 0%, transparent 60%)"
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-foreground text-sm">{platform.name}</h4>
                      <m.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        className="w-2 h-2 rounded-full bg-primary/60"
                      />
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4 font-light">{platform.desc}</p>
                    
                    <div className="pt-4 border-t border-foreground/5">
                      <span className="text-sm font-bold text-primary/90">{platform.highlight}</span>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
