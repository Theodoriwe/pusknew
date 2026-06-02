"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeroContextAdsMarquee } from "@/components/sections/hero-context-ads-marquee";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BarChart3, Target, RefreshCw, TrendingDown, Users, LineChart } from "lucide-react";

export function ContextualAdsPageClient() {
  return (
    <>
      <Header />
      <main>
        <HeroContextAdsMarquee />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Аналитика и стратегия",
      description:
        "Изучаем рынок, конкурентов и аудиторию. Строим стратегию на основе данных",
      icon: BarChart3,
    },
    {
      title: "Точный таргетинг",
      description:
        "Показываем рекламу только тем, кто готов купить. Минимум слива бюджета",
      icon: Target,
    },
    {
      title: "Постоянная оптимизация",
      description:
        "Ежедневно анализируем и улучшаем кампании. Снижаем CPL каждый месяц",
      icon: RefreshCw,
    },
    {
      title: "Снижение стоимости заявки",
      description:
        "Работаем над качеством трафика, а не просто накручиваем клики",
      icon: TrendingDown,
    },
    {
      title: "Ретаргетинг",
      description:
        "Возвращаем посетителей, которые не оставили заявку с первого раза",
      icon: Users,
    },
    {
      title: "Техническая настройка",
      description:
        "Аналитика, цели, коллтрекинг — всё настроим для точного отслеживания",
      icon: LineChart,
    },
  ];

  return (
    <section className="py-20 bg-background-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#111827",
            }}
          >
            Что мы делаем
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Комплексный подход к контекстной рекламе с фокусом на ROI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-xl border transition-all duration-200 hover:border-blue-400 hover:bg-blue-50"
                style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
              >
                <Icon size={24} style={{ color: "#549AF2", marginBottom: "16px" }} />
                <h3 className="font-bold mb-2" style={{ fontSize: "1.125rem", color: "#111827" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#6B7280", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
