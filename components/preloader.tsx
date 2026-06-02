"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress ramp
    const start = Date.now();
    const duration = 1600;

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = elapsed / duration;
      // ease-out curve: fast start, slows near 100
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setVisible(false), 400);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

          {/* Accent blobs */}
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(84,154,242,0.08) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(123,90,245,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/logo.svg"
                alt="ПУСК"
                width={220}
                height={68}
                priority
                className="h-auto"
                style={{ width: 220 }}
              />
            </motion.div>

            {/* Progress bar track */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-[220px] flex flex-col items-end gap-2"
            >
              <span
                className="text-xs font-mono tabular-nums"
                style={{ color: "var(--muted-foreground)" }}
              >
                {progress}%
              </span>
              <div
                className="w-full h-px rounded-full overflow-hidden"
                style={{ background: "var(--border)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #549AF2, #7B5AF5)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
