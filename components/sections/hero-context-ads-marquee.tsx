"use client";

import { m } from "framer-motion";
import { useModalStore } from "@/lib/store";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const MARQUEE_ITEMS = [
  "Яндекс.Директ",
  "Google Ads",
  "VK Реклама",
  "Meta Ads",
  "Яндекс.Директ",
  "Google Ads",
  "VK Реклама",
  "Meta Ads",
  "Яндекс.Директ",
  "Google Ads",
  "VK Реклама",
  "Meta Ads",
];

const MARQUEE_ITEMS_REVERSE = [
  "ROI до 450%",
  "CPL снизился на 45%",
  "Конверсия +340%",
  "Опыт 4+ года",
  "ROI до 450%",
  "CPL снизился на 45%",
  "Конверсия +340%",
  
  "ROI до 450%",
  "CPL снизился на 45%",
  "Конверсия +340%",
  
];

export function HeroContextAdsMarquee() {
  const { openContact } = useModalStore();

  return (
    <section
      className="relative w-full bg-background overflow-hidden"
      style={{ minHeight: "90svh" }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12">
        {/* Top Marquee - Left to Right */}
        <div className="absolute top-20 left-0 right-0 w-full overflow-hidden">
          <m.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -1500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="text-lg sm:text-xl font-bold uppercase tracking-wider flex-shrink-0"
                style={{ color: "#549AF2" }}
              >
                {item}
              </span>
            ))}
          </m.div>
        </div>

        {/* Center Content */}
        <m.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Heading */}
          <m.h1
            className="font-black select-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#111827",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block">Контекстная</span>
            <span className="block" style={{ color: "#549AF2" }}>
              реклама
            </span>
          </m.h1>

          {/* Subtitle */}
          <m.p
            className="text-lg sm:text-xl leading-relaxed mb-10"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Настраиваем рекламу в Яндекс и Google так, чтобы каждый рубль приносил максимум заявок. Снижаем CPL, увеличиваем ROI
          </m.p>

          {/* CTA Buttons */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={() => openContact("ads")}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200"
              style={{
                background: "#549AF2",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  background: "#3a85e0",
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(84, 154, 242, 0.2)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  background: "#549AF2",
                  transform: "scale(1)",
                  boxShadow: "none",
                })
              }
            >
              Получить стратегию
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
              />
            </button>
            <button
              onClick={() => openContact("ads")}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-200"
              style={{ borderColor: "#E5E7EB", color: "#111827" }}
              onMouseEnter={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  borderColor: "#549AF2",
                  color: "#549AF2",
                  backgroundColor: "rgba(84, 154, 242, 0.05)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  borderColor: "#E5E7EB",
                  color: "#111827",
                  backgroundColor: "transparent",
                })
              }
            >
              Бесплатный аудит
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </button>
          </m.div>
        </m.div>

        {/* Bottom Marquee - Right to Left */}
        <div className="absolute bottom-20 left-0 right-0 w-full overflow-hidden">
          <m.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [-1500, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
          >
            {MARQUEE_ITEMS_REVERSE.map((item, i) => (
              <span
                key={i}
                className="text-base sm:text-lg font-bold uppercase tracking-wider flex-shrink-0"
                style={{ color: "#7B5AF5" }}
              >
                {item}
              </span>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
