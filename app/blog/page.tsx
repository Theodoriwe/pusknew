"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag, Search, AlertCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Input } from "@/components/ui/input";

const categories = [
  "Все",
  "Разработка",
  "Маркетинг",
  "SMM",
  "Аналитика",
  "Кейсы",
];

const articles = [
  {
    id: "seo-trends-2026",
    title: "Как привлекать больше клиентов через интернет: разбор по каналам",
    excerpt: "Разбираем главные изменения в поисковых алгоритмах и как к ним подготовиться уже сейчас.",
    category: "Маркетинг",
    readTime: "8 мин",
    date: "28 марта 2026",
    featured: true,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "telegram-mini-apps-guide",
    title: "Полный гайд по Telegram Mini Apps для бизнеса",
    excerpt: "Как создать мини-приложение в Telegram, которое будет приносить клиентов и автоматизирует продажи.",
    category: "Разработка",
    readTime: "12 мин",
    date: "25 марта 2026",
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "context-ads-mistakes",
    title: "7 ошибок в контекстной рекламе, которые сливают бюджет",
    excerpt: "Проверьте свои рекламные кампании — возможно, вы теряете деньги из-за этих типичных ошибок.",
    category: "Маркетинг",
    readTime: "6 мин",
    date: "22 марта 2026",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "smm-content-plan",
    title: "Как составить контент-план для соцсетей: пошаговое руководство",
    excerpt: "Практическое руководство по созданию контент-плана, который работает. С шаблонами и примерами.",
    category: "SMM",
    readTime: "10 мин",
    date: "18 марта 2026",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "website-conversion-optimization",
    title: "Как увеличить конверсию сайта: 15 проверенных способов",
    excerpt: "Практические советы по оптимизации конверсии от наших специалистов. Каждый способ подкреплён кейсами.",
    category: "Аналитика",
    readTime: "15 мин",
    date: "15 марта 2026",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "geo-services-promotion",
    title: "Продвижение на картах: полное руководство по геосервисам",
    excerpt: "Как вывести компанию в ТОП Яндекс.Карт, Google Maps и 2ГИС. Работающие стратегии и лайфхаки.",
    category: "Маркетинг",
    readTime: "11 мин",
    date: "10 марта 2026",
    color: "from-amber-500/20 to-yellow-500/20",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "Все" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-24 lg:pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ label: "Блог" }]} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mb-12"
            >
              <h1 
                className="heading-1 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Блог
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Делимся экспертизой в digital-маркетинге. Полезные статьи, гайды и разборы кейсов.
              </p>
            </motion.div>

            {/* Search and notification */}
            <div className="space-y-4 w-full">
              <div className="w-full p-4 rounded-lg bg-primary/8 border border-primary/20 backdrop-blur-sm flex items-start gap-3 justify-center">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-center">
                  <p className="text-base font-semibold text-primary mb-1">Технические работы</p>
                  <p className="text-sm text-primary/80">На этой странице ведутся работы. Полезная информация будет доступна в ближайшее время</p>
                </div>
              </div>
              
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-6 bg-background border-y border-border backdrop-blur-lg bg-background/80">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <Tag className="w-5 h-5 text-muted-foreground flex-shrink-0" />
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

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 bg-background">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${article.id}`}
                      className="group block bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-500"
                    >
                      <div className={`h-64 bg-gradient-to-br ${article.color} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-grid-white/10" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                            Популярное
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>{article.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 
                          className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground">{article.excerpt}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section className="py-12 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${article.id}`}
                    className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
                  >
                    <div className={`h-40 bg-gradient-to-br ${article.color} relative`}>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 
                        className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Статьи не найдены</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
