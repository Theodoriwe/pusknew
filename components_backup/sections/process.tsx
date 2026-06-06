"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ACCENT = "#549AF2";

// ─── Big number ───────────────────────────────────────────────────────────────
function Num({ n, dark, className = "" }: { n: string; dark: boolean; className?: string }) {
  return (
    <span
      className={`font-black leading-none select-none ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 6vw, 5.5rem)",
        letterSpacing: "-0.05em",
        color: dark ? "rgba(255,255,255,0.22)" : `${ACCENT}28`,
        lineHeight: 1,
      }}
    >
      {n}
    </span>
  );
}

// ─── Tags ─────────────────────────────────────────────────────────────────────
function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase"
          style={{ background: "rgba(255,255,255,0.22)", color: "white", letterSpacing: "0.07em" }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ─── Text helpers ─────────────────────────────────────────────────────────────
function Title({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <h3
      className="font-black leading-[1.15]"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.35rem, 2.1vw, 1.65rem)",
        letterSpacing: "-0.025em",
        color: dark ? "white" : "#6E9BED",
      }}
    >
      {children}
    </h3>
  );
}

function Body({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <p
      className="leading-relaxed"
      style={{
        color: dark ? "rgba(255,255,255,0.7)" : "#6E9BED",
        fontSize: "clamp(0.97rem, 1.15vw, 1.05rem)",
      }}
    >
      {children}
    </p>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({
  dark,
  index,
  children,
  className = "",
}: {
  dark: boolean;
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.52, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className={`relative rounded-[22px] overflow-hidden h-full ${className}`}
      style={{
        background: dark ? ACCENT : "white",
        border: dark ? "none" : `2px solid ${ACCENT}28`,
        boxShadow: dark
          ? `0 12px 36px ${ACCENT}40`
          : "0 4px 20px rgba(0,0,0,0.07)",
      }}
    >
      {dark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 120% 120%, rgba(255,255,255,0.1) 0%, transparent 55%)",
          }}
        />
      )}
      <div className="relative z-10 p-6 md:p-7 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-5"
            style={{ background: `${ACCENT}0f`, borderColor: `${ACCENT}30`, color: ACCENT }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            Зачем это вам
          </div>

          <h2
            className="font-black leading-[0.95] text-foreground"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="inline-flex items-center gap-3">
              Почему это
              <motion.span
                initial={{ rotate: 0 }}
                animate={isInView ? { rotate: -10 } : { rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 160 }}
                className="inline-flex items-center justify-center rounded-[14px] text-white font-black flex-shrink-0"
                style={{
                  background: ACCENT,
                  boxShadow: `0 8px 28px ${ACCENT}50`,
                  width: "clamp(2.6rem, 4.8vw, 4.4rem)",
                  height: "clamp(2.6rem, 4.8vw, 4.4rem)",
                  fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
                }}
              >
                !
              </motion.span>
            </span>
            <br />
            <span style={{ color: ACCENT }}>нужно бизнесу</span>
          </h2>
        </motion.div>

        {/* ── Bento grid — Desktop ── */}
        {/*
          Key fix: no minHeight on the grid — height is driven purely by card 01's content.
          Card 01 no longer uses flex-1 on the image container, so it shrinks to fit.
          Columns 2-3 stretch to match via align-items: stretch (default).
        */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
          }}
        >
          {/* ── CARD 01 — col 1, rows 1+2 (tall, dark) ── */}
          <div style={{ gridColumn: "1", gridRow: "1 / 3" }}>
            <Card dark index={0}>
              {/* Title */}
              <Title dark>9 из 10 клиентов ищут услуги в интернете</Title>

              {/* Tags — directly below title, no extra gap */}
              <div className="mt-3">
                <Tags tags={["Присутствие в выдаче", "Реклама", "Карты"]} />
              </div>

              {/* Image — directly below tags, no flex-1 spacer */}
              <div className="mt-4" style={{ position: "relative", width: "90%", aspectRatio: "200/140" }}>
                <Image
                  src="/graf.png"
                  alt="Growth chart"
                  fill
                  style={{ objectFit: "contain", objectPosition: "right center" }}
                />
              </div>

              {/* Number — pinned to bottom */}
              <div className="mt-auto pt-4">
                <Num n="01" dark />
              </div>
            </Card>
          </div>

          {/* ── CARD 02 — col 2, rows 1+2 (tall, white) ── */}
          <div style={{ gridColumn: "2", gridRow: "1 / 3" }}>
            <Card dark={false} index={1}>
              {/* Number + image side by side at top */}
              <div style={{ position: "relative", marginBottom: "220px" }}>
                <Num n="02" dark={false} />
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "55%",
                    height: "160px",
                    marginTop: "80px",
                  }}
                >
                  <Image
                    src="/peop.png"
                    alt="People network"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Title + body at bottom */}
              <div className="flex flex-col gap-8">
                <Title dark={false}>Конкуренты уже вкладываются в рекламу</Title>
                
                <Body dark={false}>
                  Пока вы откладываете, они забирают вашу аудиторию через контекст, таргет и удобный сайт.
                </Body>
              </div>
            </Card>
          </div>

          {/* ── CARD 03 — col 3, row 1 (dark) ── */}
          <div style={{ gridColumn: "3", gridRow: "1" }}>
            <Card dark index={2}>
              <Title dark>Мы погружаемся в ваш бизнес как в свой</Title>
              <div className="mt-2">
                <Body dark>Потому что ваш успех — это наш успех и лучшая реклама.</Body>
              </div>
              <div className="mt-auto flex justify-end">
                <Num n="03" dark />
              </div>
            </Card>
          </div>

          {/* ── CARD 04 — col 3, row 2 (white) ── */}
          <div style={{ gridColumn: "3", gridRow: "2" }}>
            <Card dark={false} index={3}>
              <div className="flex items-start justify-between gap-2">
                <Num n="04" dark={false} />
                <div style={{ width: "45%", height: "100px", position: "relative" }}>
                  <Image 
                    src="/paz.png" 
                    alt="Puzzle" 
                    fill 
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 200px"
                    style={{ objectFit: "contain" }} 
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <Title dark={false}>На вас работает целая команда</Title>
                <Body dark={false}>Правильный выбор экономит больше, чем низкая цена.</Body>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Mobile — single column ── */}
        <div className="md:hidden flex flex-col gap-4">
          {/* 01 */}
          <Card dark index={0}>
            <Title dark>9 из 10 клиентов ищут услуги в интернете</Title>
            <div className="mt-2">
              <Tags tags={["Присутствие в выдаче", "Реклама", "Карты"]} />
            </div>
            <div className="mt-4" style={{ height: "140px", position: "relative" }}>
              <Image 
                src="/graf.png" 
                alt="Growth chart" 
                fill 
                loading="lazy"
                sizes="(max-width: 768px) 150px, 250px"
                style={{ objectFit: "contain" }} 
              />
            </div>
            <div className="mt-3">
              <Num n="01" dark />
            </div>
          </Card>
          {/* 02 */}
          <Card dark={false} index={1}>
            <Num n="02" dark={false} />
            <div className="my-3" style={{ height: "160px", position: "relative" }}>
              <Image 
                src="/peop.png" 
                alt="People network" 
                fill 
                loading="lazy"
                sizes="(max-width: 768px) 150px, 250px"
                style={{ objectFit: "contain" }} 
              />
            </div>
            <Title dark={false}>Конкуренты уже вкладываются в digital</Title>
            <div className="mt-3">
              <Body dark={false}>
                Пока вы откладываете, они забирают вашу аудиторию через контекст, таргет и удобный сайт.
              </Body>
            </div>
          </Card>
          {/* 03 */}
          <Card dark index={2}>
            <Title dark>Мы погружаемся в ваш бизнес как в свой</Title>
            <div className="mt-1">
              <Body dark>Потому что ваш успех — это наш успех и лучшая реклама.</Body>
            </div>
            <div className="mt-4 flex justify-end">
              <Num n="03" dark />
            </div>
          </Card>
          {/* 04 */}
          <Card dark={false} index={3}>
            <div className="flex items-start justify-between">
              <Num n="04" dark={false} />
              <div style={{ width: "42%", height: "90px", position: "relative" }}>
                <Image 
                src="/paz.png" 
                alt="Puzzle" 
                fill 
                loading="lazy"
                sizes="(max-width: 768px) 100px, 200px"
                style={{ objectFit: "contain" }} 
              />
              </div>
            </div>
            <div className="mt-2">
              <Title dark={false}>На вас работает целая команда</Title>
              <div className="mt-1">
                <Body dark={false}>Правильный выбор экономит больше, чем низкая цена.</Body>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}