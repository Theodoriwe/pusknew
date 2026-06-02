"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Target, Gift, Sparkles } from "lucide-react";
import { useModalStore } from "@/lib/store";

const perks = [
  {
    icon: Clock,
    color: "#549AF2",
    title: "2 минуты",
    desc: "Несколько вопросов о вашем проекте",
    featured: false,
  },
  {
    icon: Target,
    color: "#7B5AF5",
    title: "Точный расчёт",
    desc: "Персональная смета под ваши задачи",
    featured: false,
  },
  {
    icon: Gift,
    color: "#00C48C",
    title: "Скидка 10 000 ₽",
    desc: "На первый проект после консультации",
    featured: true,
  },
];

export function QuizSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuiz } = useModalStore();

  return (
    <section id="quiz" className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Solid background */}
            <div className="absolute inset-0 bg-[#549AF2]" />
            
            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none" />

            <div className="relative bg-[#549AF2]">
              <div className="grid lg:grid-cols-2 gap-0 items-center">
                {/* Left side - Main CTA */}
                <div className="p-12 lg:p-16 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 2 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/40 text-white text-sm font-semibold mb-8 self-start"
                  >
                    Быстрый расчёт
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="font-black mb-8 text-balance leading-tight text-white"
                    style={{ 
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 6vw, 3.5rem)",
                      letterSpacing: "-0.04em"
                    }}
                  >
                    Узнайте
                    <br />
                    <span className="text-white">стоимость</span>
                    <br />
                    проекта
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg lg:text-xl text-white/90 leading-relaxed mb-12 max-w-md font-medium"
                  >
                    Ответьте на несколько вопросов — мы подготовим персональный расчёт стоимости вашего проекта и отправим в удобный мессенджер.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    <motion.button
                      onClick={openQuiz}
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#549AF2] font-black text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                      Начать расчёт
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </motion.button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-sm text-white/70 mt-6 font-medium"
                  >
                    ✓ Бесплатная консультация • Никакой спама
                  </motion.p>
                </div>

                {/* Right side - Perks */}
                <div className="p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/20 flex flex-col justify-center gap-8">
                  {perks.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                        className="group"
                      >
                        <div 
                          className={`flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 ${
                            item.featured 
                              ? "bg-white/20 border-2 border-white/60 shadow-lg" 
                              : "hover:bg-white/10"
                          }`}
                        >
                          <motion.div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                            style={{
                              background: item.featured 
                                ? "rgba(255, 255, 255, 0.3)" 
                                : "rgba(255, 255, 255, 0.2)",
                              borderWidth: "2px",
                              borderColor: item.featured 
                                ? "rgba(255, 255, 255, 0.8)" 
                                : "rgba(255, 255, 255, 0.5)",
                            }}
                            whileHover={{ rotateZ: 10 }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <p className={`font-black leading-tight ${
                              item.featured 
                                ? "text-xl text-white" 
                                : "text-lg text-white"
                            }`}>{item.title}</p>
                            <p className={`leading-relaxed mt-2 font-medium ${
                              item.featured 
                                ? "text-sm text-white" 
                                : "text-sm text-white/80"
                            }`}>{item.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
