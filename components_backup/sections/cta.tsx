"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/lib/store";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openContact } = useModalStore();

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(84,154,242,0.10)" }} />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(123,90,245,0.10)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-[#549AF2]/20 text-sm font-medium text-foreground/70 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Бесплатная консультация
          </motion.div>

          <h2
            className="heading-1 mb-6"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            Готовы начать?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Расскажите о вашем проекте — мы подготовим индивидуальное предложение
            и ответим на все вопросы
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => openContact()}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 h-auto"
            >
              Обсудить проект
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Ответим в течение 15 минут
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Бесплатная консультация
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Без обязательств
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Прозрачные цены
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
