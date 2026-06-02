"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Target, Quote } from "lucide-react";
import Image from "next/image";
import { CaseData } from "@/lib/cases";

interface CasePageClientProps {
  caseData: CaseData;
}

const cardColors = ["#549AF2", "#111827", "#7B5AF5", "#111827"];

export function CasePageClient({ caseData }: CasePageClientProps) {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-2" style={{ background: "#ffffff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 lg:p-12 rounded-2xl flex flex-col justify-between relative overflow-hidden"
              style={{ background: "#6e9bee", height: "500px" }}
            >
            {caseData.logo && (
  <div 
    className="absolute pointer-events-none"
    style={{ 
      top: "clamp(12px, 3vw, 24px)",
      right: "clamp(12px, 3vw, 24px)",
      width: "clamp(120px, 20vw, 220px)",
      height: "clamp(120px, 20vw, 220px)",
    
    }}
  >
    <Image
      src={caseData.logo}
      alt=""
      fill
      sizes="(max-width: 768px) 120px, 220px"
      className="object-contain"
      style={{ objectPosition: "top right" }}
    />
  </div>
)}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 w-fit relative z-10"
                style={{
                  background: "rgba(255,255,255,0.20)",
                  border: "1px solid rgba(255,255,255,0.30)",
                  color: "#ffffff",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ffffff" }} />
                {caseData.category}
              </div>

              <div className="relative z-10">
                <h1
                  className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6"
                  style={{ fontFamily: "var(--font-display)", color: "#ffffff" }}
                >
                  {caseData.title}
                </h1>
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{
                    color: "rgba(255,255,255,0.90)",
                    maxWidth: 560,
                  }}
                >
                  {caseData.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {caseData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        color: "#ffffff",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: Calendar, label: "Срок", value: caseData.duration },
                    { icon: Users, label: "Команда", value: caseData.team },
                    { icon: Target, label: "Клиент", value: caseData.client },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2 text-sm">
                      <Icon size={15} style={{ color: "#ffffff" }} />
                      <span style={{ color: "rgba(255,255,255,0.70)" }}>
                        {label}:
                      </span>
                      <span className="font-semibold" style={{ color: "#ffffff" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-rows-3 gap-3 h-full"
              style={{ height: "500px" }}
            >
              {caseData.results.slice(0, 3).map((r, i) => (
                <div
                  key={r.label}
                  className="p-6 rounded-2xl flex flex-col justify-between"
                  style={{
                    background: cardColors[i],
                    border: i < 2 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  }}
                >
                  <p
                    className="text-xs font-medium mb-3 uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {r.label}
                  </p>
                  <div>
                    <p className="text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "#fff" }}>
                      {r.after}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span style={{ color: "rgba(255,255,255,0.40)", textDecoration: "line-through" }}>
                        {r.before}
                      </span>
                      <span className="font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {r.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Challenge ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(84,154,242,0.20)",
                  color: "var(--muted-foreground)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#549AF2" }} />
                Задача
              </div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                С чем пришёл клиент
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {caseData.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {caseData.results.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: "var(--background)",
                    border: "1.5px solid var(--border)",
                  }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                      {r.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm line-through" style={{ color: "var(--muted-foreground)" }}>
                      {r.before}
                    </span>
                    <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                      {r.after}
                    </span>
                    <span
                      className="text-sm font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(0,196,140,0.12)",
                        color: "#00C48C",
                      }}
                    >
                      {r.change}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Solution ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{
                  background: "var(--muted)",
                  border: "1px solid rgba(84,154,242,0.20)",
                  color: "var(--muted-foreground)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#549AF2" }} />
                Решение
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Что мы сделали
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                Комплексный подход с фокусом на практические результаты. Каждый этап разработан для максимального влияния на финальные метрики.
              </p>
            </motion.div>

            <div className="space-y-4">
              {caseData.solution.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group"
                >
                  <div
                    className="relative p-5 rounded-2xl border transition-all duration-300 cursor-default"
                    style={{
                      background: i % 2 === 1 ? "#6e9bed" : "var(--background-alt)",
                      border:
                        i % 2 === 1
                          ? "1.5px solid rgba(110,155,237,0.3)"
                          : "1.5px solid rgba(84,154,242,0.12)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{
                          background: i % 2 === 0 ? "#549AF2" : "#fff",
                          color: i % 2 === 0 ? "#fff" : "#6e9bed",
                          minWidth: "40px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p
                          className="text-base leading-relaxed"
                          style={{
                            color: i % 2 === 1 ? "#fff" : "var(--foreground)",
                          }}
                        >
                          {step}
                        </p>
                      </div>
                    </div>

                    {i < caseData.solution.length - 1 && (
                      <div
                        className="absolute left-[27px] top-[60px] w-0.5 h-[72px]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(84,154,242,0.3) 0%, rgba(84,154,242,0.05) 100%)",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────────── */}
      {caseData.testimonial && (
        <section className="py-20" style={{ background: "#111827" }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <Quote size={40} className="mx-auto mb-8" style={{ color: "#549AF2", opacity: 0.6 }} />
              <blockquote
                className="text-2xl md:text-3xl font-medium leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-display)", color: "#fff" }}
              >
                {caseData.testimonial.quote}
              </blockquote>
              <div>
                <p className="font-semibold text-white">{caseData.testimonial.author}</p>
                <p style={{ color: "rgba(255,255,255,0.45)" }}>{caseData.testimonial.position}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
