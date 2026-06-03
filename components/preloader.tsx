"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted after first render to trigger hydration-safe state update
    setIsMounted(true);
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Check if user has visited before (check sessionStorage, not localStorage for each session)
      const hasVisited = sessionStorage.getItem("pusk_visited");
      
      if (!hasVisited) {
        // First visit: show preloader but reduce duration from 1600ms to 800ms
        setVisible(true);
        sessionStorage.setItem("pusk_visited", "true");
        
        const start = Date.now();
        const duration = 800; // Reduced from 1600ms

        const tick = () => {
          const elapsed = Date.now() - start;
          const raw = elapsed / duration;
          const eased = 1 - Math.pow(1 - Math.min(raw, 1), 3);
          setProgress(Math.round(eased * 100));
          if (raw < 1) {
            requestAnimationFrame(tick);
          } else {
            setProgress(100);
            setTimeout(() => setVisible(false), 300);
          }
        };

        requestAnimationFrame(tick);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Only render after hydration is complete, using portal to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  const preloaderContent = (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
            <Image
              src="/logo.svg"
              alt="ПУСК"
              width={220}
              height={68}
              priority
              fetchPriority="high"
              className="h-auto"
              style={{ width: 220 }}
            />

            <div className="w-[220px] flex flex-col items-end gap-2">
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
                <div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #549AF2, #7B5AF5)",
                    width: `${progress}%`,
                    transition: "width 0.05s",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' && document.getElementById('preloader-root')
    ? createPortal(preloaderContent, document.getElementById('preloader-root')!)
    : null;
}