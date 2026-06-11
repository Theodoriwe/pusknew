"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Filter } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

const categories = [
  "Все",
  "Разработка сайтов",
  "Контекстная реклама",
  "SMM",
  "Геосервисы",
  "Telegram боты",
];

const cases = [
  {
    id: "lounge-bar",
    title: "Лаундж-бар",
    category: "Разработка сайтов",
    client: "Tooman Polyana",
    description: "Разработка сайта, с продвижением - увеличение конверсий и бронирований",
    metrics: [
      { label: "Конверсия", before: "3.2%", after: "7.8%", change: "+217%" },
      { label: "Позция в выдаче", before: "5 страница", after: "> 1", change: "+500%" },
      
    ],
    tags: ["Яндекс Директ", "Гео-сервисы", "Таргетированная реклама"],
    color: "from-violet-500/20 to-purple-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
    logo: "/tooman.webp",
  },
  {
    id: "trikoni-restaurant",
    title: "Ресторан",
    category: "Контекстная реклама",
    client: "Трикони",
    description: "Комплексная реклама, разработка сайта и продвижение в гео. сервисах- увеличение заявок и бронирований",
    metrics: [
      { label: "Отказы", before: "58%", after: "23%", change: "-100%" },
      { label: "CTR", before: "2.4%", after: "8.1%", change: "+300%" },
    ],
    tags: ["Яндекс.Директ", "Гео. сервисы", "Аналитика"],
    color: "from-blue-500/20 to-cyan-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
    logo: "/trikonilogo.webp",
  },
  {
    id: "kochevniki-restaurant",
    title: "Ресторан",
    category: "Комплексное",
    client: "Кочевники",
    description: "Продвижение в гео. сервисах, разработка сайта и комплексная реклама - увеличение заявок и бронирований",
    metrics: [
      { label: "Звонки", before: "×1", after: "×3.2", change: "+300%" },
      { label: "Видимость", before: "14%", after: "61%", change: "+400%" },
    ],
    tags: ["Яндекс.Директ", "Гео. сервисы", "Аналитика"],
    color: "from-orange-500/20 to-red-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
    logo: "/kochevnikilogo.png",
  },
  {
    id: "rosa-hotor-tubing",
    title: "Тюбинг",
    category: "Геосервисы",
    client: "Тюбинг Роза Хутор",
    description: "Комплексное продвижение и разрабтка сайтов",
    metrics: [
      { label: "SEO выдача", before: "0", after: "Топ 5 выдачи", change: "Новый канал" },
      { label: "Просмотры карточки", before: "0", after: "1 200+/мес", change: "Новый канал" },
    ],
    tags: ["Яндекс.Карты", "Карты", "SEO"],
    color: "from-green-500/20 to-emerald-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
    logo: "/tubinglogo.png",
  },
  {
    id: "florist-shop",
    title: "Цветочный магазин",
    category: "Контекстная реклама",
    client: "",
    description: "Продвижение в гео. сервисах и сервисах доставки - увеличение заявок и покупок",
    metrics: [
      { label: "Продажи через сервисы", before: "0%", after: "+100%", change: "новый канал" },
      { label: "Отказы", before: "65%", after: "35%", change: "-100%" },
    ],
    tags: ["Сервисы", "SEO", "Карты"],
    color: "from-pink-500/20 to-rose-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
   
  },
  {
    id: "bath-complex",
    title: "Банный комплекс",
    category: "Контекстная реклама",
    client: "",
    description: "Лидогенерация для банного комплекса",
    metrics: [
      { label: "Лиды", before: "40/мес", after: "180/мес", change: "+350%" },
      { label: "ROI", before: "120%", after: "340%", change: "+220%" },
    ],
    tags: ["Яндекс.Директ", "Карты", "SEO"],
    color: "from-amber-500/20 to-yellow-500/20",
    bgGradient: "linear-gradient(135deg, #549AF2 0%, #549AF2 100%)",
  
  },
];

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredCases = activeCategory === "Все"
    ? cases
    : cases.filter((c) => c.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
            <div className="mb-20">
              <Breadcrumbs items={[{ label: "Кейсы" }]} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 
                className="heading-1 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Наши кейсы
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Реальные результаты для реального бизнеса. Каждый проект — это история роста и достижения целей.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-background border-y border-border sticky top-16 z-30 backdrop-blur-lg bg-background/80">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/kejsy/${caseItem.id}`}
                    className="group block h-full"
                  >
                    <div 
                      className="relative p-8 lg:p-10 rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-500"
                      style={{
                        background: caseItem.bgGradient || "linear-gradient(135deg, #6e9bee 0%, #5a8bcc 100%)",
                        boxShadow: "0 4px 24px rgba(110, 155, 238, 0.2)",
                        transform: "translateY(0px)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(110, 155, 238, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0px)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(110, 155, 238, 0.2)";
                      }}
                    >
                      {/* Blur effect background */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                          }}
                        />
                      </div>

                      {/* Logo */}
                      {caseItem.logo && (
                        <div 
                          className="absolute pointer-events-none"
                          style={{ 
                            top: "clamp(12px, 3vw, 24px)",
                            right: "clamp(12px, 3vw, 24px)",
                            width: caseItem.id === "rosa-hotor-tubing" ? "clamp(110px, 18vw, 180px)" : caseItem.id === "trikoni-restaurant" ? "clamp(50px, 8vw, 80px)" : "clamp(80px, 15vw, 150px)",
                            height: caseItem.id === "rosa-hotor-tubing" ? "clamp(110px, 18vw, 180px)" : caseItem.id === "trikoni-restaurant" ? "clamp(50px, 8vw, 80px)" : "clamp(80px, 15vw, 150px)",
                          }}
                        >
                          <Image
                            src={caseItem.logo}
                            alt=""
                            fill
                            sizes={caseItem.id === "rosa-hotor-tubing" ? "(max-width: 768px) 110px, 180px" : caseItem.id === "trikoni-restaurant" ? "(max-width: 768px) 50px, 80px" : "(max-width: 768px) 80px, 150px"}
                            className="object-contain"
                            style={{ objectPosition: "top right" }}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Category Badge */}
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 w-fit"
                          style={{
                            background: "rgba(255,255,255,0.20)",
                            border: "1px solid rgba(255,255,255,0.30)",
                            color: "#ffffff",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ffffff" }} />
                          {caseItem.category}
                        </div>

                        {/* Client Name */}
                        <p
                          className="text-sm font-medium mb-2"
                          style={{ color: "rgba(255,255,255,0.70)" }}
                        >
                          {caseItem.client}
                        </p>

                        {/* Title */}
                        <h3 
                          className="text-2xl lg:text-3xl font-bold mb-3 group-hover:opacity-80 transition-opacity"
                          style={{ 
                            fontFamily: "var(--font-display)",
                            color: "#ffffff"
                          }}
                        >
                          {caseItem.title}
                        </h3>

                        {/* Description */}
                        <p 
                          className="text-base leading-relaxed mb-8"
                          style={{
                            color: "rgba(255,255,255,0.90)",
                          }}
                        >
                          {caseItem.description}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="relative z-10 space-y-5">
                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          {caseItem.metrics.map((metric) => (
                            <div key={metric.label}>
                              <p 
                                className="text-xs font-medium mb-1 uppercase tracking-wider"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                              >
                                {metric.label}
                              </p>
                              <div>
                                <p 
                                  className="text-lg lg:text-xl font-bold"
                                  style={{ color: "#ffffff" }}
                                >
                                  {metric.after}
                                </p>
                                <div className="flex items-center gap-1 text-xs mt-0.5">
                                  <span style={{ color: "rgba(255,255,255,0.40)", textDecoration: "line-through" }}>
                                    {metric.before}
                                  </span>
                                  <span className="font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>
                                    {metric.change}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {caseItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: "rgba(255,255,255,0.25)",
                                color: "#ffffff",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Confidentiality Section */}
        <section className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 lg:p-12 rounded-3xl overflow-hidden border w-full max-w-3xl"
              style={{
                background: "var(--background-alt)",
                borderColor: "rgba(84,154,242,0.5)",
                borderWidth: "2px",
                boxShadow: "0 0 0 1px rgba(84,154,242,0.3), inset 0 0 20px rgba(84,154,242,0.05)",
              }}
            >
              <div className="relative z-10 text-center">
                <div className="max-w-2xl mx-auto">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
                    style={{
                      background: "rgba(84,154,242,0.1)",
                      border: "1px solid rgba(84,154,242,0.3)",
                      color: "#549AF2",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#549AF2" }} />
                    Больше кейсов
                  </div>

                  <h2
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Это только часть нашей работы
                  </h2>

                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Мы работаем с компаниями разных сфер и размеров, но публикуем далеко не все кейсы. Многие из наших клиентов просят сохранить конфиденциальность результатов их проектов — и мы уважаем их пожелания.
                  </p>

                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--foreground)" }}
                  >
                    <span className="font-semibold">Но если вы заинтересованы,</span> мы с удовольствием расскажем о наших успехах в вашей сфере, когда свяжемся с вами. Просто оставьте заявку, и мы обсудим результаты, которые подходят именно вам.
                  </p>

                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/kontakty"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:gap-3"
                      style={{
                        background: "#549AF2",
                        color: "#ffffff",
                      }}
                    >
                      Связаться с нами
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
