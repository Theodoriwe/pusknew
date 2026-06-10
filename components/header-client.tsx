"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, ArrowUpRight, ChevronDown, Globe, Target, MapPin, Share2, Bot } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { Logo } from "@/components/logo";

const services = [
  { label: "Разработка сайтов", href: "/uslugi/razrabotka-sajtov", icon: Globe },
  { label: "Контекстная реклама", href: "/uslugi/kontekstnaya-reklama", icon: Target },
  { label: "Продвижение в геосервисах", href: "/uslugi/prodvizhenie-v-geoserwisah", icon: MapPin },
  { label: "SMM продвижение", href: "/uslugi/smm", icon: Share2 },
  { label: "Telegram боты", href: "/uslugi/mini-apps-boty", icon: Bot },
];

const navLinks = [
  { label: "Кейсы", href: "/kejsy" },
  { label: "Блог", href: "/blog" },
  { label: "Цены", href: "/ceny" },
  { label: "Контакты", href: "/kontakty" },
];

export function HeaderClient() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const pathname = usePathname();
  const { openContact } = useModalStore();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY.current && y > 80);
    setScrolled(y > 20);
    lastY.current = y;
  });

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll-aware wrapper — двигает весь хедер вверх при скролле вниз */}
      <m.div
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
        style={{ pointerEvents: "none" }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6" style={{ pointerEvents: "auto" }}>
          <div
            className={`flex items-center justify-between gap-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 border-2 border-[#549AF2]/40 ${
              scrolled
                ? "bg-white backdrop-blur-xl shadow-lg shadow-[#549AF2]/10 py-3"
                : "bg-white backdrop-blur-md py-2"
            }`}
          >
            {/* Logo */}
            <Logo height={28} />

            {/* Center nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Основная навигация">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-muted/60 transition-all"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  Услуги
                  <m.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </m.span>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 pt-2 z-50"
                    >
                      <div className="w-72 bg-white rounded-2xl border border-border shadow-2xl shadow-black/10 overflow-hidden py-2">
                        {services.map((s) => {
                          const IconComponent = s.icon;
                          return (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="group flex items-center justify-between px-4 py-3 hover:bg-muted/60 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-primary-foreground shrink-0"
                                  style={{ background: "#549AF2" }}
                                >
                                  <IconComponent size={18} strokeWidth={2.5} />
                                </span>
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {s.label}
                                </span>
                              </div>
                              <ArrowUpRight
                                size={14}
                                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            </Link>
                          );
                        })}
                        <div className="mx-4 mt-2 pt-2 border-t border-border">
                          <Link
                            href="/uslugi"
                            className="flex items-center gap-2 py-2 text-sm font-medium text-primary hover:underline"
                          >
                            Все услуги
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-foreground bg-muted/60"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <m.button
                onClick={() => openContact()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-primary-foreground hover-shine transition-colors"
                style={{ background: "#549AF2" }}
              >
                Связаться
                <ArrowUpRight size={15} />
              </m.button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-border bg-white/80 backdrop-blur-sm hover:bg-muted/60 transition-colors"
                aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <m.span
                  animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-[18px] h-[1.5px] bg-foreground origin-center rounded-full"
                />
                <m.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-[18px] h-[1.5px] bg-foreground rounded-full"
                />
                <m.span
                  animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-[18px] h-[1.5px] bg-foreground origin-center rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </m.div>

      {/* ─── Mobile fullscreen menu ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 3rem)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <Logo height={24} />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-border"
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 mt-4">
                Услуги
              </p>
              <div className="flex flex-col gap-1 mb-4">
                {services.map((s, i) => {
                  const IconComponent = s.icon;
                  return (
                    <m.div
                      key={s.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={s.href}
                        className="flex items-center gap-3 py-2.5 text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                      >
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white shrink-0"
                          style={{ background: "#549AF2" }}
                        >
                          <IconComponent size={16} strokeWidth={2.5} />
                        </span>
                        {s.label}
                      </Link>
                    </m.div>
                  );
                })}
              </div>

              <div className="h-px bg-border my-2" />

              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-2xl font-bold text-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="px-6 pb-8 pt-4 border-t border-border flex flex-col gap-3"
            >
              <button
                onClick={() => { setMobileOpen(false); openContact(); }}
                className="w-full py-4 rounded-xl text-base font-bold text-primary-foreground hover-shine"
                style={{ background: "#549AF2" }}
              >
                Обсудить проект
              </button>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href="https://t.me/pusksupport" className="hover:text-foreground transition-colors">Telegram</a>
                <a href="https://wa.me/79282428240" className="hover:text-foreground transition-colors">WhatsApp</a>
                <a href="tel:+79001234567" className="hover:text-foreground transition-colors">Телефон</a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}