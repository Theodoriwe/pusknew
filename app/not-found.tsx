"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Услуги", href: "/#services" },
  { label: "Кейсы", href: "/kejsy" },
  { label: "Блог", href: "/blog" },
  { label: "Цены", href: "/ceny" },
  { label: "Контакты", href: "/kontakty" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-[80vh] overflow-hidden bg-background">
        <div className="absolute inset-0 gradient-mesh opacity-35" />
        <div className="absolute inset-0 grid-bg opacity-60" />

        <motion.div
          className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[12%] h-64 w-64 rounded-full bg-violet-500/10 blur-[110px]"
          animate={{ x: [0, -24, 0], y: [0, 24, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center px-6 pb-12 pt-20 lg:px-8 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="glass w-full rounded-[30px] border border-border/70 px-6 py-8 md:px-10 md:py-12 lg:px-12"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-center lg:text-left">
                <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  Страница не найдена
                </div>

                <div className="mb-6">
                  <p
                    className="text-[5.5rem] font-black leading-none text-glow"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    404
                  </p>
                  <h1
                    className="mt-3 text-3xl font-bold md:text-4xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Здесь ничего нет
                  </h1>
                </div>

                <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
                  Похоже, вы попали на несуществующую ссылку. Вернитесь на главную или перейдите к разделам, где вы точно найдете нужную информацию.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                  <Button asChild size="lg">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      На главную
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/kejsy">
                      <Search className="mr-2 h-4 w-4" />
                      Смотреть кейсы
                    </Link>
                  </Button>
                </div>

                <div
                  className="mt-8 rounded-[24px] px-5 py-5 text-white"
                  style={{ backgroundColor: "#549AF2" }}
                >
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                    Возможно, вы искали:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="w-full max-w-md rounded-[28px] border border-primary/15 bg-card/90 p-6 shadow-[0_24px_90px_rgba(84,154,242,0.12)]"
                >
                  <div className="rounded-[22px] p-5" style={{ backgroundColor: "#549AF2" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        Что дальше
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
                        Навигация
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {[
                        { title: "На главную", desc: "Вернуться в начало и увидеть предложения агентства", href: "/" },
                        { title: "Кейсы", desc: "Посмотреть реальные результаты по проектам", href: "/kejsy" },
                        { title: "Бриф", desc: "Заполнить бриф и получить индивидуальную стратегию", href: "/brief" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 transition-all hover:border-primary/30 hover:bg-background"
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ArrowLeft className="h-4 w-4 -rotate-180 transition-transform group-hover:translate-x-0.5" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
