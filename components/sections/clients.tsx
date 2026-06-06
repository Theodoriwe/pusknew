"use client";

import { m } from "framer-motion";

const clients = [
  { name: "СберБизнес", width: "w-24" },
  { name: "Яндекс", width: "w-20" },
  { name: "Ozon", width: "w-16" },
  { name: "Wildberries", width: "w-28" },
  { name: "Тинькофф", width: "w-24" },
  { name: "МТС", width: "w-14" },
  { name: "Ростелеком", width: "w-28" },
  { name: "Lamoda", width: "w-20" },
  { name: "ВкусВилл", width: "w-24" },
  { name: "Самокат", width: "w-20" },
  { name: "Delivery", width: "w-22" },
  { name: "Skyeng", width: "w-20" },
];

export function ClientsSection() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-alt/50 to-background" />
      
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 mb-10">
        <m.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-widest"
        >
          Нам доверяют более 200 компаний
        </m.p>
      </div>

      {/* First row - moves left */}
      <div className="relative mb-4 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`row1-${index}`}
              className="inline-flex items-center justify-center mx-3"
            >
              <div className="px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300 group">
                <span
                  className="text-lg font-semibold text-foreground/40 group-hover:text-foreground/70 transition-colors whitespace-nowrap"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Second row - moves right */}
      <div className="relative overflow-hidden">
        <div className="animate-ticker-reverse flex whitespace-nowrap">
          {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
            <div
              key={`row2-${index}`}
              className="inline-flex items-center justify-center mx-3"
            >
              <div className="px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300 group">
                <span
                  className="text-lg font-semibold text-foreground/40 group-hover:text-foreground/70 transition-colors whitespace-nowrap"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
