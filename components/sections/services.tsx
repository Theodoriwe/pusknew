"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useInView } from "framer-motion";
import { Globe, Target, MapPin, Share2, Bot, ArrowUpRight, Sparkles } from "lucide-react";

// cardBg: explicit bg color; dark: true = white text on dark bg
const services = [
  {
    icon: Globe,
    title: "Разработка сайтов",
    description: "Создаём современные сайты, лендинги и интернет-магазины с конверсией выше рынка в 2-3 раза",
    features: ["Лендинги", "Корпоративные сайты", "Интернет-магазины", "Веб-приложения"],
    result: "+180% заявок",
    href: "/uslugi/razrabotka-sajtov",
    gradient: "from-[#549AF2] to-[#7B5AF5]",
    cardBg: "#549AF2",
    dark: true,
    number: "01",
  },
  {
    icon: Target,
    title: "Контекстная реклама",
    description: "Настраиваем Яндекс.Директ - платите только за целевые переходы",
    features: ["Поисковая реклама", "РСЯ", "Ретаргетинг", "Аналитика"],
    result: "Будьте над конкурентами",
    href: "/uslugi/kontekstnaya-reklama",
    gradient: "from-[#7B5AF5] to-[#549AF2]",
    cardBg: "#ffffff",
    dark: false,
    number: "02",
  },
  {
    icon: MapPin,
    title: "Геосервисы",
    description: "Выводим бизнес в топ Яндекс.Карт, 2ГИС и Гугл.Карт",
    features: ["Оптимизация карточек", "Управление отзывами", "Локальное СЕО", "Мониторинг"],
    result: "+270% звонков",
    href: "/uslugi/prodvizhenie-v-geoserwisah",
    gradient: "from-[#00C48C] to-[#549AF2]",
    cardBg: "#d0ef4c",
    dark: false,
    number: "03",
  },
  {
    icon: Share2,
    title: "СММ продвижение",
    description: "Строим сообщества и увеличиваем продажи через соцсети",
    features: ["Контент-стратегия", "Таргетированная реклама",  "Аналитика"],
    result: "+320% вовлечённости",
    href: "/uslugi/smm",
    gradient: "from-[#7B5AF5] to-[#00C48C]",
    cardBg: "#ffffff",
    dark: false,
    number: "04",
  },
  {
    icon: Bot,
    title: "Телеграмм боты",
    description: "Автоматизируем продажи и поддержку с помощью чат-ботов",
    features: ["Чат-боты", "Мини приложения", "Интеграции с CRM", "Умные ассистенты"],
    result: "70% автоматизация",
    href: "/uslugi/mini-apps-boty",
    gradient: "from-[#F0643C] to-[#7B5AF5]",
    cardBg: "#549AF2",
    dark: true,
    number: "05",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const textColor = service.dark ? "rgba(255,255,255,0.95)" : "var(--foreground)";
  const subColor  = service.dark ? "rgba(255,255,255,0.60)" : "var(--muted-foreground)";
  const tagBg     = service.dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)";
  const tagColor  = service.dark ? "rgba(255,255,255,0.80)" : "var(--foreground)";
  const badgeBg   = service.dark ? "rgba(255,255,255,0.15)" : "var(--muted)";
  const badgeBorder = service.dark ? "rgba(255,255,255,0.20)" : "rgba(84,154,242,0.20)";
  const numColor  = service.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const iconBg    = service.dark ? "rgba(255,255,255,0.15)" : "rgba(84,154,242,0.10)";
  const iconColor = service.dark ? "#ffffff" : "#549AF2";

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group"
    >
      <Link
        href={service.href}
        className="block relative h-full p-8 rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
        style={{
          background: service.cardBg,
          border: service.dark ? "1.5px solid rgba(255,255,255,0.10)" : "1.5px solid var(--border)",
          boxShadow: service.dark ? "none" : undefined,
        }}
      >
        {/* Number */}
        <div
          className="absolute top-6 right-6 text-6xl font-bold select-none pointer-events-none"
          style={{ fontFamily: "var(--font-display)", color: numColor }}
        >
          {service.number}
        </div>

        {/* Content */}
        <div className="relative">
          {/* Icon — plain rounded square, no border ring */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ background: iconBg }}
          >
            <service.icon style={{ width: 22, height: 22, color: iconColor }} />
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-display)", color: textColor }}
          >
            {service.title}
            <ArrowUpRight
              style={{ width: 18, height: 18, color: textColor, opacity: 0 }}
              className="group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
            />
          </h3>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-sm" style={{ color: subColor }}>
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ background: tagBg, color: tagColor }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Result badge */}
          <div
            className="inline-flex items-center px-3 py-1.5 rounded-full"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}
          >
            <span className="text-sm font-semibold" style={{ color: iconColor }}>{service.result}</span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-[#549AF2]/20 text-sm font-medium text-foreground/70 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Услуги
          </m.div>
          
          <h2 
            className="heading-1 mb-6 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Услуги для роста продаж 
            <br />
            <span className="gradient-text">в интернете</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Берём на себя сайт, рекламу и продвижение — вы занимаетесь бизнесом.
          </p>
        </m.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
          
          {/* CTA Card */}
          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <div
              className="relative h-full p-8 rounded-3xl overflow-hidden flex flex-col justify-center items-center text-center"
              style={{ background: "#111827", border: "1.5px solid rgba(255,255,255,0.08)" }}
            >
              {/* subtle noise texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              <div className="relative">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "#ffffff" }}
                >
                  Не нашли подходящее?
                </h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Расскажите о вашей задаче — подберём оптимальное решение
                </p>
                <Link
                  href="/kontakty"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full text-sm transition-opacity hover:opacity-90"
                  style={{ background: "#549AF2", color: "#ffffff" }}
                >
                  Связаться с нами
                  <ArrowUpRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
