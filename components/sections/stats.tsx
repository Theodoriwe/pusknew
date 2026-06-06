"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "framer-motion";

const stats = [
  {
    value: 200,
    suffix: "+",
    label: "Успешных проектов",
    description: "в разных нишах",
    color: "#549AF2",
  },
  {
    value: 150,
    suffix: "+",
    label: "Довольных клиентов",
    description: "по всей России",
    color: "#7B5AF5",
  },
  {
    value: 7,
    suffix: "+",
    label: "Лет на рынке",
    description: "digital-маркетинга",
    color: "#00C48C",
  },
  {
    value: 98,
    suffix: "%",
    label: "Клиентов",
    description: "рекомендуют нас",
    color: "#F0643C",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
  color,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
  color: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span>
      <span style={{ color }}>{count}</span>
      <span style={{ color }}>{suffix}</span>
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden bg-background-alt">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section label */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            В цифрах
          </p>
          <h2
            className="text-3xl lg:text-4xl font-black text-foreground text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Результаты, которые говорят сами за себя
          </h2>
        </m.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border p-8 flex flex-col items-start overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Top color accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: stat.color }}
              />

              <p
                className="text-5xl lg:text-6xl font-black mb-3 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                  color={stat.color}
                />
              </p>
              <p className="text-base font-semibold text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>

              {/* Background tint on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `${stat.color}08` }}
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
