"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Twitter,
  Copy,
  Check,
  ChevronRight,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import type { Article } from "./page";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  article: Article;
  slug: string;
  relatedArticles: { id: string; title: string; category: string }[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ArticleContent({ article, slug, relatedArticles }: Props) {
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [pageUrl, setPageUrl] = useState("");
  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Refs for sticky sidebar logic
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarCardRef = useRef<HTMLDivElement>(null);
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);

  // Set URL only on client to avoid SSR mismatch
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  // ── Reading progress ──────────────────────────────────────────────────────

  const handleScroll = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const scrollTop = window.scrollY;
    const docHeight = el.offsetHeight;
    const winHeight = window.innerHeight;
    const pct = (scrollTop / Math.max(docHeight - winHeight, 1)) * 100;
    setReadProgress(Math.min(pct, 100));

    // ── Scroll-spy: detect active heading ──────────────────────────────────
    const headings = document.querySelectorAll("article h2[id], article h3[id]");
    let current = "";
    
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      // If heading is in top half of viewport, mark as active
      if (rect.top <= window.innerHeight / 3) {
        current = heading.id;
      }
    });
    
    setActiveHeading(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Sticky sidebar logic (only on lg+ screens) ────────────────────────────

  useEffect(() => {
    // Only apply JS sticky logic on lg+ screens (>=1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateSidebarPosition = () => {
      if (!mediaQuery.matches) return;

      const sidebar = sidebarRef.current;
      const card = sidebarCardRef.current;
      const wrapper = sidebarWrapperRef.current;
      const section = sectionRef.current;

      if (!sidebar || !card || !wrapper || !section) return;

      const TOP_OFFSET = 60; // Отступ от верха экрана при фиксировании

      const sidebarRect = sidebar.getBoundingClientRect();
      const cardHeight = card.offsetHeight;
      const sectionRect = section.getBoundingClientRect();

      // The card should stop when its bottom aligns with the sidebar's bottom
      const sidebarBottom = sidebarRect.bottom;
      const sidebarTop = sidebarRect.top;

      if (sidebarTop > TOP_OFFSET) {
        // Haven't reached sticky point yet — natural flow
        card.style.position = "relative";
        card.style.top = "0px";
        card.style.left = "";
        card.style.width = "";
        card.style.willChange = "auto";
        card.style.transition = "none";
      } else if (sidebarBottom > cardHeight + TOP_OFFSET) {
        // Within scroll range — fix the card
        card.style.position = "fixed";
        card.style.willChange = "transform";
        card.style.transition = "none";
        // Align card horizontally to its wrapper
        const wrapperRect = wrapper.getBoundingClientRect();
        card.style.top = `${TOP_OFFSET}px`;
        card.style.left = `${wrapperRect.left}px`;
        card.style.width = `${wrapperRect.width}px`;
      } else {
        // Past the bottom — pin card to the bottom of the sidebar
        card.style.position = "absolute";
        card.style.top = `${sidebar.offsetHeight - cardHeight}px`;
        card.style.left = "0px";
        card.style.width = "100%";
        card.style.willChange = "auto";
        card.style.transition = "none";
      }
    };

    const handleResize = () => {
      if (!mediaQuery.matches) {
        // Reset styles on mobile
        const card = sidebarCardRef.current;
        if (card) {
          card.style.position = "";
          card.style.top = "";
          card.style.left = "";
          card.style.width = "";
          card.style.willChange = "";
        }
      } else {
        updateSidebarPosition();
      }
    };

    window.addEventListener("scroll", updateSidebarPosition, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial call
    updateSidebarPosition();

    return () => {
      window.removeEventListener("scroll", updateSidebarPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── Copy link ─────────────────────────────────────────────────────────────

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Share ─────────────────────────────────────────────────────────────────

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: pageUrl,
      });
    }
  };

  // ── Table of contents ─────────────────────────────────────────────────────

  const headings = article.content
    .map((block, index) => {
      if (block.type !== "h2" && block.type !== "h3") return null;
      return {
        id: `heading-${index}`,
        text: block.text as string,
        level: block.type === "h2" ? 2 : 3,
      };
    })
    .filter(Boolean) as { id: string; text: string; level: number }[];

  // ── Twitter share URL ──────────────────────────────────────────────────────

  const twitterUrl = pageUrl
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`
    : "https://twitter.com";

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/60 origin-left z-40"
        style={{ scaleX: readProgress / 100 }}
      />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-24 lg:pt-32 pb-16 overflow-hidden" style={{ backgroundColor: "#549AF2" }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-white/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-white/5 pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs — semantic nav landmark, also helps SEO */}
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Breadcrumbs
                items={[
                  { label: "Блог", href: "/blog" },
                  { label: article.title },
                ]}
                white={true}
              />
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block px-3 py-1.5 bg-white/25 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                  {article.category}
                </span>
              </div>

              {/* h1 — one per page, contains main keyword */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {article.title}
              </h1>

              {/* Excerpt also rendered as meta description content */}
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl font-light">
                {article.excerpt}
              </p>

              {/* Author + metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4 border-t border-white/20">
                {/* Author — important for E-E-A-T */}
                <address className="not-italic flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center flex-shrink-0 border border-white/20"
                    aria-hidden="true"
                  >
                    <span className="font-bold text-white text-sm">
                      {article.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm" rel="author">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-white/70">{article.author.role}</p>
                  </div>
                </address>

                {/* Dates — use <time> for machine-readability */}
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <time dateTime={article.date}>{article.dateFormatted}</time>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Main content + sidebar ── */}
        <section ref={sectionRef} className="relative bg-background py-12 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">

              {/* Table of Contents sidebar */}
              {headings.length > 0 && (
                <motion.aside
                  ref={sidebarRef}
                  aria-label="Содержание статьи"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden lg:block lg:col-span-1 relative"
                >
                  <div ref={sidebarWrapperRef} className="relative">
                    <div 
                      ref={sidebarCardRef} 
                      className="space-y-4 p-4 rounded-xl border border-border/50 bg-gradient-to-br from-primary/3 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                    >
                      {/* Navigation */}
                      <nav aria-label="Разделы статьи" className="space-y-0">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                          <LinkIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                          <h2 className="text-[11px] font-bold text-foreground uppercase tracking-widest">
                            Содержание
                          </h2>
                        </div>
                        <ol className="space-y-0">
                          {headings.map((heading, idx) => {
                            const isActive = activeHeading === heading.id;
                            const isH3 = heading.level === 3;
                            
                            return (
                              <li key={idx}>
                                <a
                                  href={`#${heading.id}`}
                                  className={`group flex items-start gap-1.5 px-2 py-1.5 rounded-md transition-all duration-200 text-xs line-clamp-2 ${
                                    isActive
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                  } ${isH3 ? "pl-5" : "font-medium"}`}
                                >
                                  {isActive && (
                                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                  )}
                                  {!isActive && (
                                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/50 flex-shrink-0 mt-1.5 transition-colors" />
                                  )}
                                  <span className="flex-1 text-left leading-snug">{heading.text}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      </nav>

                      {/* Share */}
                      <div className="pt-3 border-t border-border/30 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                          <p className="text-[11px] font-bold text-foreground uppercase tracking-widest">
                            Поделиться
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <button
                            onClick={copyToClipboard}
                            aria-label={copied ? "Ссылка скопирована" : "Скопировать ссылку"}
                            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 border border-border/50 group hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3" aria-hidden="true" />
                                <span>Скопировано!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                <span>Ссылка</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Поделиться в Twitter"
                            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 border border-border/50 group hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                          >
                            <Twitter className="w-3 h-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <span>Twitter</span>
                          </Link>

                          <button
                            onClick={handleShare}
                            aria-label="Поделиться"
                            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 border border-border/50 group hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="w-3 h-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <span>Поделиться</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}

              {/* Mobile Table of Contents */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 p-4 rounded-xl border border-border/50 bg-gradient-to-br from-primary/3 to-transparent backdrop-blur-sm">
                  <nav aria-label="Разделы статьи" className="space-y-0">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                      <LinkIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                      <h2 className="text-[11px] font-bold text-foreground uppercase tracking-widest">
                        Содержание
                      </h2>
                    </div>
                    <ol className="space-y-0">
                      {headings.map((heading, idx) => {
                        const isH3 = heading.level === 3;
                        
                        return (
                          <li key={idx}>
                            <a
                              href={`#${heading.id}`}
                              className={`group flex items-start gap-1.5 px-2 py-1.5 rounded-md transition-all duration-200 text-xs line-clamp-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-medium ${isH3 ? "pl-5" : ""}`}
                            >
                              <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/50 flex-shrink-0 mt-1.5 transition-colors" />
                              <span className="flex-1 text-left leading-snug">{heading.text}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>
              )}

              {/* Article body */}
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <article
                  aria-label={article.title}
                  className="prose prose-lg max-w-none space-y-0"
                >
                  {article.content.map((block, index) => {
                    const headingId =
                      block.type === "h2" || block.type === "h3"
                        ? `heading-${index}`
                        : undefined;

                    switch (block.type) {
                      case "p":
                        return (
                          <p
                            key={index}
                            className="text-foreground/75 leading-[1.8] text-base sm:text-lg mb-6"
                          >
                            {block.text}
                          </p>
                        );

                      case "h2":
                        return (
                          <h2
                            key={index}
                            id={headingId}
                            className="text-3xl sm:text-4xl font-bold mt-16 mb-6 text-foreground scroll-mt-24 flex items-center gap-3"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            <span
                              className="inline-block w-1 h-12 bg-gradient-to-b from-primary to-primary/20 rounded-full"
                              aria-hidden="true"
                            />
                            {block.text}
                          </h2>
                        );

                      case "h3":
                        return (
                          <h3
                            key={index}
                            id={headingId}
                            className="text-2xl font-bold mt-12 mb-4 text-foreground scroll-mt-24"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {block.text}
                          </h3>
                        );

                      case "list":
                        return (
                          <ul key={index} className="space-y-3 mb-8 pl-2">
                            {(block.text as string[]).map((item, i) => (
                              <li
                                key={i}
                                className="text-foreground/75 flex items-start gap-4 text-base sm:text-lg leading-relaxed"
                              >
                                <ChevronRight
                                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );

                      case "quote":
                        return (
                          <blockquote
                            key={index}
                            className="border-l-4 border-primary pl-6 py-5 my-10 bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl italic text-base sm:text-lg text-foreground/80"
                          >
                            <p className="font-medium leading-relaxed">"{block.text}"</p>
                          </blockquote>
                        );

                      default:
                        return null;
                    }
                  })}
                </article>

                {/* Bottom share */}
                <div className="mt-16 pt-12 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Понравилась статья?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Поделитесь ей со своей аудиторией
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={copyToClipboard} variant="outline" className="rounded-lg">
                      {copied ? (
                        <Check className="w-4 h-4 mr-2" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                      )}
                      {copied ? "Скопировано" : "Ссылка"}
                    </Button>
                    <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-lg" aria-label="Twitter">
                        <Twitter className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="icon"
                      className="rounded-lg"
                      aria-label="Поделиться"
                    >
                      <Share2 className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                {/* Author bio — E-E-A-T signal */}
                <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 rounded-2xl flex gap-6 items-start">
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20"
                    aria-hidden="true"
                  >
                    <span className="font-bold text-primary text-lg">
                      {article.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">{article.author.name}</p>
                    <p className="text-sm text-primary font-medium mb-2">{article.author.role}</p>
                    {/* Bio comes from data, not hardcoded */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Related articles ── */}
        {relatedArticles.length > 0 && (
          <section
            aria-label="Читайте также"
            className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/30"
          >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Рекомендуемое
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold mt-3 text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Читайте также
                </h2>
                <p className="text-muted-foreground mt-3">
                  Подборка статей, которые помогут вам разобраться в смежных темах
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedArticles.map((related, idx) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/blog/${related.id}`}
                      className="group relative h-full p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent rounded-2xl transition-colors" />
                      <span className="text-xs font-bold text-primary uppercase tracking-widest relative z-10">
                        {related.category}
                      </span>
                      <h3 className="font-bold text-lg mt-3 group-hover:text-primary transition-colors relative z-10 flex-grow leading-tight">
                        {related.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-primary relative z-10 group-hover:gap-3 transition-all">
                        <span className="text-sm font-semibold">Читать далее</span>
                        <ArrowLeft
                          className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back to blog ── */}
        <section className="py-12 bg-background border-t border-border/50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all group"
              >
                <ArrowLeft
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                Вернуться ко всем статьям
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}