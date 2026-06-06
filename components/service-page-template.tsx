"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, TrendingUp, Globe, Smartphone, ShoppingCart, Palette, Zap, Search, Target, Users, TrendingDown, BarChart3, BarChart2, LineChart, MousePointerClick, RefreshCw, MapPin, Star, MessageSquare, Eye, Navigation, Bot, Cpu, Plug, BrainCircuit, Share2, PenTool, Megaphone, UserCheck, MessageCircle, ChartSpline, Settings, Award, Layers, Lightbulb, Repeat } from "lucide-react";

const iconMap = {
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  Zap,
  Search,
  Target,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  MousePointerClick,
  RefreshCw,
  MapPin,
  Star,
  MessageSquare,
  Eye,
  Navigation,
  Bot,
  Cpu,
  Plug,
  BrainCircuit,
  Share2,
  PenTool,
  Megaphone,
  UserCheck,
  MessageCircle,
  ChartSpline,
  BarChart2,
  Settings,
  Award,
  Layers,
  Lightbulb,
  Repeat,
};
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CasesSection } from "@/components/sections/cases";
import { FAQSection } from "@/components/sections/faq";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/lib/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceFeature {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

interface ServiceAudience {
  title: string;
  description: string;
}

interface ServiceMetric {
  value: string;
  label: string;
}

interface ServiceStep {
  title: string;
  description: string;
}

interface ServiceCase {
  id: string;
  title: string;
  category: string;
  resultBefore: string;
  resultAfter: string;
  metric: string;
}

interface ServicePrice {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  audiences: ServiceAudience[];
  metrics: ServiceMetric[];
  steps: ServiceStep[];
  cases: ServiceCase[];
  prices: ServicePrice[];
  faqs: ServiceFAQ[];
  featuresTitle?: string;
  featuresSubtitle?: string;
}

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openContact } = useModalStore();
  const smmTitleRef = useRef<HTMLSpanElement>(null);
  const smmSubtitleRef = useRef<HTMLSpanElement>(null);
  const [letterSpacing, setLetterSpacing] = useState("0.15em");

  useEffect(() => {
    if (data.slug !== "smm" || !smmTitleRef.current || !smmSubtitleRef.current) return;

    const calculateSpacing = () => {
      const subtitleWidth = smmSubtitleRef.current?.offsetWidth || 0;
      if (subtitleWidth === 0) return;

      const titleElement = smmTitleRef.current;
      if (!titleElement) return;

      // Get the title text width without letter-spacing
      const originalSpacing = titleElement.style.letterSpacing;
      titleElement.style.letterSpacing = "0";
      const titleWidthNoSpacing = titleElement.offsetWidth;
      titleElement.style.letterSpacing = originalSpacing;

      if (titleWidthNoSpacing === 0) return;

      // Calculate needed letter-spacing: (target width - text width) / (number of gaps)
      // SMM has 2 gaps between 3 letters
      const smmLetters = 3;
      const gapCount = smmLetters - 1;
      const neededSpacing = (subtitleWidth - titleWidthNoSpacing) / gapCount;
      const spacingEm = neededSpacing / 16; // Convert px to em (assuming 16px base)

      setLetterSpacing(`${spacingEm}em`);
    };

    // Wait for fonts to load and initial render
    setTimeout(calculateSpacing, 100);
    window.addEventListener("resize", calculateSpacing);

    return () => window.removeEventListener("resize", calculateSpacing);
  }, [data.slug]);

  // Schema.org Service markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: "ПУСК",
      url: "https://pusk.agency",
    },
    offers: data.prices.map((price) => ({
      "@type": "Offer",
      name: price.title,
      price: price.price.replace(/\D/g, ""),
      priceCurrency: "RUB",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Header />

      <main>
        {/* Hero Section - SMM Edition */}
        {data.slug === "smm" && (
        <section 
          className="relative overflow-hidden pt-32 pb-20"
          style={{ background: "var(--primary)" }}
        >
          {/* Background social media icons pattern - Mobile */}
          <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: "8%", y: "15%", size: 70, opacity: 0.15, icon: "telegram", rotate: -12 },
              { x: "18%", y: "55%", size: 100, opacity: 0.1, icon: "vk", rotate: 20 },
              { x: "82%", y: "25%", size: 85, opacity: 0.12, icon: "instagram", rotate: -25 },
              { x: "70%", y: "65%", size: 110, opacity: 0.08, icon: "telegram", rotate: 15 },
              { x: "28%", y: "40%", size: 80, opacity: 0.11, icon: "instagram", rotate: -18 },
              { x: "55%", y: "10%", size: 95, opacity: 0.09, icon: "vk", rotate: 22 },
              { x: "12%", y: "75%", size: 75, opacity: 0.13, icon: "telegram", rotate: -20 },
              { x: "75%", y: "50%", size: 90, opacity: 0.1, icon: "instagram", rotate: 28 },
              { x: "45%", y: "75%", size: 105, opacity: 0.08, icon: "vk", rotate: -15 },
              { x: "38%", y: "5%", size: 85, opacity: 0.11, icon: "telegram", rotate: 18 },
            ].map((icon, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  left: icon.x,
                  top: icon.y,
                  transform: `translate(-50%, -50%) rotate(${icon.rotate}deg)`,
                  opacity: icon.opacity,
                }}
              >
                <Image
                  src={`/${icon.icon}.svg`}
                  alt={icon.icon}
                  width={icon.size}
                  height={icon.size}
                  className="object-contain"
                  style={{ filter: "invert(1)" }}
                />
              </div>
            ))}
          </div>

          {/* Background social media icons pattern - Desktop */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: "3%", y: "8%", size: 75, opacity: 0.15, icon: "telegram", rotate: -15 },
              { x: "12%", y: "42%", size: 95, opacity: 0.1, icon: "vk", rotate: 22 },
              { x: "22%", y: "18%", size: 80, opacity: 0.12, icon: "instagram", rotate: -28 },
              { x: "35%", y: "58%", size: 110, opacity: 0.09, icon: "telegram", rotate: 18 },
              { x: "48%", y: "12%", size: 85, opacity: 0.11, icon: "vk", rotate: -20 },
              { x: "62%", y: "48%", size: 100, opacity: 0.08, icon: "instagram", rotate: 30 },
              { x: "78%", y: "72%", size: 90, opacity: 0.1, icon: "telegram", rotate: -12 },
              { x: "88%", y: "28%", size: 120, opacity: 0.08, icon: "vk", rotate: 25 },
              { x: "95%", y: "78%", size: 85, opacity: 0.12, icon: "instagram", rotate: -22 },
              { x: "28%", y: "88%", size: 75, opacity: 0.13, icon: "telegram", rotate: 20 },
              { x: "58%", y: "82%", size: 95, opacity: 0.09, icon: "vk", rotate: -18 },
              { x: "5%", y: "68%", size: 85, opacity: 0.11, icon: "instagram", rotate: 16 },
              { x: "18%", y: "2%", size: 90, opacity: 0.1, icon: "vk", rotate: -25 },
              { x: "42%", y: "35%", size: 105, opacity: 0.08, icon: "telegram", rotate: 12 },
              { x: "72%", y: "18%", size: 80, opacity: 0.12, icon: "instagram", rotate: -30 },
              { x: "15%", y: "75%", size: 100, opacity: 0.1, icon: "telegram", rotate: 22 },
              { x: "68%", y: "62%", size: 95, opacity: 0.09, icon: "vk", rotate: -16 },
              { x: "85%", y: "55%", size: 110, opacity: 0.08, icon: "instagram", rotate: 28 },
              { x: "32%", y: "25%", size: 75, opacity: 0.11, icon: "telegram", rotate: -18 },
              { x: "55%", y: "28%", size: 100, opacity: 0.1, icon: "vk", rotate: 24 },
            ].map((icon, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  left: icon.x,
                  top: icon.y,
                  transform: `translate(-50%, -50%) rotate(${icon.rotate}deg)`,
                  opacity: icon.opacity,
                }}
              >
                <Image
                  src={`/${icon.icon}.svg`}
                  alt={icon.icon}
                  width={icon.size}
                  height={icon.size}
                  className="object-contain"
                  style={{ filter: "invert(1)" }}
                />
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", href: "/uslugi" },
                { label: data.title },
              ]}
              white
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <m.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.h1
                  className="font-black mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {data.slug === "smm" && data.title.split(' ').length > 1 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em', lineHeight: 0.9 }}>
                      <span 
                        ref={smmTitleRef}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(4.5rem, 12vw, 7.5rem)",
                          letterSpacing: letterSpacing,
                          color: "white",
                          fontWeight: 900,
                          display: "inline-block",
                          whiteSpace: "nowrap",
                          transition: "letter-spacing 0.3s ease",
                        }}
                      >
                        {data.title.split(' ')[0]}
                      </span>
                      <span 
                        ref={smmSubtitleRef}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(2rem, 5vw, 3.5rem)",
                          letterSpacing: "-0.02em",
                          color: "#1c212e",
                          fontWeight: 900,
                        }}
                      >
                        {data.title.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  ) : data.title.split(' ').length > 1 ? (
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: "white",
                    }}>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span style={{ color: "#1c212e" }}>
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                  ) : (
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: "#1c212e",
                    }}>
                      {data.title}
                    </span>
                  )}
                </m.h1>

                <m.p
                  className="text-lg leading-relaxed mb-10"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {data.subtitle}
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{
                      background: "white",
                      color: "var(--primary)",
                    }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { background: "rgba(255, 255, 255, 0.9)", color: "var(--primary)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { background: "white", color: "var(--primary)" })}
                  >
                    Получить стратегию
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-200"
                    style={{ borderColor: "rgba(255, 255, 255, 0.5)", color: "white" }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "white", color: "white", background: "rgba(255, 255, 255, 0.1)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "rgba(255, 255, 255, 0.5)", color: "white", background: "transparent" })}
                  >
                    Бесплатный аудит
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </m.div>
              </m.div>

              {/* Right Visual */}
              <m.div
                className="relative h-96 flex items-center justify-center"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Social Media Icons - Rainbow Arc */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Instagram Icon - Left Arc */}
                  <m.div
                    className="absolute"
                    style={{
                      left: "8%",
                      top: "35%",
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: -25 }}
                    animate={{ scale: 1, opacity: 1, rotate: -25 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={110}
                      height={110}
                      className="object-contain drop-shadow-lg"
                      style={{ filter: "invert(1)" }}
                    />
                  </m.div>

                  {/* VK Icon - Center Top Arc */}
                  <m.div
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "-5%",
                      transform: "translateX(-50%)",
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Image
                      src="/vk.svg"
                      alt="VK"
                      width={140}
                      height={140}
                      className="object-contain drop-shadow-lg"
                      style={{ filter: "invert(1)" }}
                    />
                  </m.div>

                  {/* Telegram Icon - Right Arc */}
                  <m.div
                    className="absolute"
                    style={{
                      left: "92%",
                      top: "35%",
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: 25 }}
                    animate={{ scale: 1, opacity: 1, rotate: 25 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Image
                      src="/telegram.svg"
                      alt="Telegram"
                      width={120}
                      height={120}
                      className="object-contain drop-shadow-lg"
                      style={{ filter: "invert(1)" }}
                    />
                  </m.div>
                </div>
              </m.div>
            </div>

          </div>
        </section>
        )}

        {/* Hero Section - Telegram Bots Edition */}
        {data.slug === "telegram-bots" && (
        <section 
          className="relative overflow-hidden pt-32 pb-20"
          style={{ background: "var(--primary)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", href: "/uslugi" },
                { label: data.title },
              ]}
              white
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <m.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.h1
                  className="font-black mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "white",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {data.title}
                </m.h1>

                <m.p
                  className="text-lg leading-relaxed mb-10"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {data.subtitle}
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{
                      background: "white",
                      color: "var(--primary)",
                    }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { background: "rgba(255, 255, 255, 0.9)", color: "var(--primary)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { background: "white", color: "var(--primary)" })}
                  >
                    Обсудить проект
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-200"
                    style={{ borderColor: "rgba(255, 255, 255, 0.5)", color: "white" }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "white", color: "white", background: "rgba(255, 255, 255, 0.1)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "rgba(255, 255, 255, 0.5)", color: "white", background: "transparent" })}
                  >
                    Запросить демо
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </m.div>
              </m.div>

              {/* Right Visual - Telegram 3D Icon */}
              <m.div
                className="relative flex items-center justify-center overflow-visible px-2 md:px-0"
                style={{ minHeight: "280px" }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.div
                  className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[560px] aspect-square"
                  style={{
                    rotateZ: 15,
                  }}
                >
                  <Image
                    src="/telegram 4.svg"
                    alt="Telegram"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 560px"
                    className="object-contain"
                    style={{
                      filter: "drop-shadow(0 36px 80px rgba(0, 0, 0, 0.22))",
                    }}
                  />
                </m.div>
              </m.div>
            </div>

          </div>
        </section>
        )}

        {/* Hero Section - Default Edition (for other services) */}
        {data.slug !== "smm" && data.slug !== "telegram-bots" && (
        <section className="relative bg-background overflow-hidden pt-32 pb-20">
          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <Breadcrumbs
              items={[
                { label: "Услуги", href: "/uslugi" },
                { label: data.title },
              ]}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <m.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.h1
                  className="font-black mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {data.title.split(' ').length > 1 ? (
                    <>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span style={{ color: "var(--primary)" }}>
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "var(--primary)" }}>{data.title}</span>
                  )}
                </m.h1>

                <m.p
                  className="text-lg leading-relaxed mb-10"
                  style={{ color: "var(--muted-foreground)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {data.subtitle}
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{
                      background: data.slug === "geoservisy" ? "#549AF2" : "var(--foreground)",
                      color: data.slug === "geoservisy" ? "white" : "var(--background)",
                    }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { background: data.slug === "geoservisy" ? "#d0ef4c" : "var(--primary)", color: data.slug === "geoservisy" ? "black" : "var(--primary-foreground)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { background: data.slug === "geoservisy" ? "#549AF2" : "var(--foreground)", color: data.slug === "geoservisy" ? "white" : "var(--background)" })}
                  >
                    Получить стратегию
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => openContact(data.slug)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "var(--primary)", color: "var(--primary)" })}
                    onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "var(--border)", color: "var(--foreground)" })}
                  >
                    Бесплатный аудит
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </m.div>
              </m.div>

              {/* Right Visual */}
              <m.div
                className="relative h-96 flex items-center justify-center"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* SVG Lines to map icons */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Line to Google Maps (top right) */}
                  <path
                    d="M 50 50 Q 70 35, 88 20"
                    stroke="var(--primary)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                  {/* Line to Yandex Maps (bottom left) */}
                  <path
                    d="M 50 50 Q 25 65, 10 86"
                    stroke="var(--primary)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                  {/* Line to 2GIS (bottom right) */}
                  <path
                    d="M 50 50 Q 75 65, 88 86"
                    stroke="var(--primary)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                </svg>

                {/* Central Location Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* SVG Location Pin - 2x Larger */}
                    <svg width="320" height="320" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                      {/* Main pin body */}
                      <path
                        d="M80 20C59.0294 20 42 37.0294 42 58C42 85 80 140 80 140C80 140 118 85 118 58C118 37.0294 100.971 20 80 20Z"
                        fill="var(--primary)"
                        stroke="var(--primary)"
                        strokeWidth="2"
                      />
                      
                      {/* Inner circle */}
                      <circle cx="80" cy="58" r="14" fill="white" />
                      
                      {/* Center dot */}
                      <circle cx="80" cy="58" r="6" fill="var(--primary)" />
                    </svg>
                  </div>
                </div>

                {/* Google Maps Icon - Top Right */}
                <m.div
                  className="absolute"
                  style={{ top: "5%", right: "8%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/google.svg"
                      alt="Google Maps"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </m.div>

                {/* Yandex Maps Icon - Bottom Left */}
                <m.div
                  className="absolute"
                  style={{ bottom: "8%", left: "5%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/ya.svg"
                      alt="Yandex Maps"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </m.div>

                {/* 2GIS Icon - Bottom Right */}
                <m.div
                  className="absolute"
                  style={{ bottom: "10%", right: "6%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/2gis.svg"
                      alt="2GIS"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </m.div>
              </m.div>
            </div>

          </div>
        </section>
        )}

        {/* Features Section */}
        <section
          className={data.slug === "telegram-bots" ? "py-20 bg-[#f7f8ff]" : "py-20"}
          style={data.slug === "telegram-bots" ? undefined : { backgroundColor: data.slug === "smm" ? "white" : "#549AF2" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold mb-5 ${
                  data.slug === "telegram-bots" ? "bg-primary/10 text-primary" : "bg-white/10 text-white"
                }`}
              >
                Что входит в услугу
              </div>
              <h2
                className={`heading-2 mb-4 ${data.slug === "smm" ? "text-black" : data.slug === "telegram-bots" ? "text-gray-900" : "text-white"}`}
                style={{ fontFamily: "var(--font-unbounded)" }}
              >
                {data.featuresTitle || "Готовый набор инструментов под ваш продукт"}
              </h2>
              <p
                className={`max-w-3xl mx-auto text-base sm:text-lg leading-relaxed ${
                  data.slug === "smm" ? "text-black" : data.slug === "telegram-bots" ? "text-gray-600" : "text-white"
                }`}
              >
                {data.featuresSubtitle || "Мы собираем решение под задачи бизнеса: от сценариев общения до интеграций, чтобы бот помогал не только отвечать, но и продавать."}
              </p>
            </m.div>

            {data.slug === "telegram-bots" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <m.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="group rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(84,154,242,0.12)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="rounded-full bg-[#f7f8ff] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">
                          {`0${index + 1}`}
                        </span>
                      </div>

                      <h3
                        className="mt-5 text-lg font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-unbounded)" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </m.div>
                  );
                })}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-max">
                {data.features.map((feature, index) => {
                  let gridColSpan = "lg:col-span-3";
                  let gridRowSpan = "";

                  if (index === 0 || index === 3) {
                    gridColSpan = "lg:col-span-6";
                    gridRowSpan = "lg:row-span-2";
                  }

                  return (
                    <m.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={`group ${gridColSpan} ${gridRowSpan} md:col-span-1 p-6 md:p-8 rounded-2xl border transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 cursor-pointer relative overflow-hidden ${
                        data.slug === "smm"
                          ? "border-[#4a8fe7] hover:shadow-lg"
                          : "bg-card border-border hover:border-primary/20 hover:shadow-primary/10"
                      }`}
                      style={data.slug === "smm" ? { backgroundColor: "#549AF2" } : {}}
                    >
                      <div
                        className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl -mr-10 -mt-10 transition-colors duration-300 ${
                          data.slug === "smm" ? "" : "bg-primary/5 group-hover:bg-primary/10"
                        }`}
                        style={data.slug === "smm" ? { backgroundColor: "rgba(84, 154, 242, 0.3)" } : {}}
                      />

                      <div className="relative z-10">
                        {(() => {
                          const IconComponent = iconMap[feature.icon];
                          return (
                            <m.div
                              className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                                data.slug === "smm" ? "" : "bg-primary/15 group-hover:bg-primary/20"
                              }`}
                              style={data.slug === "smm" ? { backgroundColor: "rgba(255, 255, 255, 0.2)" } : {}}
                              whileHover={{ rotate: 5 }}
                            >
                              <IconComponent className={`w-8 h-8 ${data.slug === "smm" ? "text-white" : "text-primary"}`} />
                            </m.div>
                          );
                        })()}

                        <div className={`text-sm font-semibold mb-3 ${data.slug === "smm" ? "text-white/70" : "text-primary/60"}`}>
                          0{index + 1}
                        </div>

                        <h3
                          className={`text-lg md:text-xl font-semibold mb-3 transition-colors duration-300 ${
                            data.slug === "smm" ? "text-white" : "text-foreground group-hover:text-primary"
                          }`}
                          style={{ fontFamily: "var(--font-unbounded)" }}
                        >
                          {feature.title}
                        </h3>

                        <p className={`text-sm md:text-base leading-relaxed ${data.slug === "smm" ? "text-blue-50" : "text-muted-foreground"}`}>
                          {feature.description}
                        </p>

                        {data.slug !== "smm" && data.slug !== "geoservisy" && (
                          <div className="flex items-center gap-2 mt-6 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-sm font-medium">Подробнее</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        )}
                      </div>
                    </m.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Metrics Section */}
        {data.metrics.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.metrics.map((metric, index) => (
                <m.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl border border-border bg-card"
                >
                  <div
                    className="text-4xl sm:text-5xl font-black text-primary mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {metric.value}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Process Section */}
        {data.slug === "telegram-bots" ? (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary mb-5">
                    Как мы работаем
                  </div>

                  <h2
                    className="heading-2 mb-4"
                    style={{ fontFamily: "var(--font-unbounded)" }}
                  >
                    Путь от идеи до запуска
                  </h2>

                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    Мы берём задачу в единый поток: от понимания бизнес-логики до запуска и поддержки. Каждый этап фиксируется в рамках одного проекта, чтобы вы видели, что делается и зачем.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="rounded-2xl border border-border bg-background-alt p-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Bot className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Единая логика проекта</p>
                          <p className="text-sm text-muted-foreground">Сценарии, интерфейс и интеграции — в одном решении</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-background-alt p-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Smartphone className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Подготовка к запуску</p>
                          <p className="text-sm text-muted-foreground">Тесты, обучение команды и безопасный релиз</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 hidden lg:block w-px bg-border" />

                  <div className="space-y-4">
                    {data.steps.map((step, index) => {
                      const Icon = index === 0 ? Bot : index === 2 ? Smartphone : Check;

                      return (
                        <m.div
                          key={step.title}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                          <div
                            className="group relative rounded-[28px] border p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:shadow-[0_18px_40px_rgba(84,154,242,0.28)]"
                            style={{ backgroundColor: "#549AF2", borderColor: "rgba(255,255,255,0.18)" }}
                          >
                            <div className="flex gap-4 md:gap-5">
                              <div className="hidden sm:flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                                  {index === 1 ? (
                                    <svg
                                      className="h-5 w-5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect x="4" y="4" width="16" height="16" rx="2.5" />
                                      <path d="M8 8h8" />
                                      <path d="M8 12h5" />
                                      <path d="M8 16h6" />
                                      <path d="M15 8l2 2-2 2" />
                                    </svg>
                                  ) : (
                                    <Icon className="h-5 w-5" />
                                  )}
                                </div>
                                {index < data.steps.length - 1 && (
                                  <div className="mt-3 h-full w-px bg-white/25" />
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-sm font-semibold text-white/90">
                                      {String(index + 1).padStart(2, "0")}
                                    </p>
                                    <h3
                                      className="mt-2 text-lg font-bold text-white"
                                      style={{ fontFamily: "var(--font-unbounded)" }}
                                    >
                                      {step.title}
                                    </h3>
                                  </div>
                                  <span className="hidden sm:inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">
                                    шаг {index + 1}
                                  </span>
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-white/85">
                                  {step.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
                                  <Check className="h-4 w-4" />
                                  Чёткий результат на каждом этапе
                                </div>
                              </div>
                            </div>
                          </div>
                        </m.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2
                  className="heading-2 mb-4"
                  style={{ fontFamily: "var(--font-unbounded)" }}
                >
                  Как мы работаем
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Четырёхэтапный процесс, который гарантирует результаты и полную прозрачность
                </p>
              </m.div>

              <div className="relative">
                <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-6">
                  {data.steps.map((step, index) => (
                    <m.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="relative bg-card rounded-2xl border border-border p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                        <div className="absolute -top-4 -left-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-background font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="pt-4">
                          <h3
                            className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
                            style={{ fontFamily: "var(--font-unbounded)" }}
                          >
                            {step.title}
                          </h3>

                          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                            {step.description}
                          </p>

                          {index < data.steps.length - 1 && (
                            <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                              <div className="w-10 h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
                              <ArrowRight className="w-5 h-5 text-primary/50 -ml-2" />
                            </div>
                          )}
                        </div>
                      </div>

                      {index < data.steps.length - 1 && (
                        <div className="lg:hidden flex justify-center my-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-primary/50 to-primary/20 rounded-full" />
                        </div>
                      )}
                    </m.div>
                  ))}
                </div>
              </div>

              {data.slug !== "telegram-bots" && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-16 p-8 rounded-2xl border border-border bg-card/50"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">7-10</div>
                      <p className="text-sm text-muted-foreground">дней на подготовку</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <p className="text-sm text-muted-foreground">прозрачность процесса</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">2-3</div>
                      <p className="text-sm text-muted-foreground">месяца на результаты</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <p className="text-sm text-muted-foreground">поддержка и консультации</p>
                    </div>
                  </div>
                </m.div>
              )}
            </div>
          </section>
        )}

        {/* Cases Section */}
        {data.slug !== "smm" && data.slug !== "telegram-bots" && <CasesSection title="Кейсы по этой услуге" />}

        {/* Pricing Section */}
        <section className="py-32 lg:py-48 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/10 text-sm font-medium text-foreground/70 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Стоимость
              </div>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                Выберите подходящий тариф
              </h2>
            </m.div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {data.prices.map((price, i) => (
                <m.div
                  key={price.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative p-10 rounded-3xl flex flex-col ${
                    price.highlighted ? "bg-foreground text-background lg:scale-105 lg:-my-4" : "bg-card border border-border"
                  }`}
                >
                  {price.highlighted && (
                    <div className="absolute -top-4 left-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Популярный
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>{price.title}</h3>
                  </div>

                  <div className="mb-8">
                    <span className="font-bold block" style={{ fontFamily: "var(--font-display)" }}>
                      {price.price.startsWith("от ") ? (
                        <>
                          <span style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)" }}>от </span>
                          <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{price.price.slice(3)}</span>
                        </>
                      ) : (
                        <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{price.price}</span>
                      )}
                    </span>
                    {price.period && (
                      <span className={price.highlighted ? "text-background/60" : "text-muted-foreground"}> /{price.period}</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {price.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={20} className="text-primary shrink-0" />
                        <span className={price.highlighted ? "text-background/80" : "text-muted-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => openContact(data.slug)}
                    className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold ${
                      price.highlighted ? "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/30" : "bg-foreground text-background hover:bg-primary"
                    }`}
                  >
                    Выбрать тариф
                  </Button>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={data.faqs} />


      </main>

      <Footer />
    </>
  );
}
