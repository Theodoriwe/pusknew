"use client";

import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Оборачивает компоненты в LazyMotion с domAnimation
 * Сокращает бандл framer-motion на ~40-50% и ускоряет LCP
 * domAnimation включает только необходимые анимации (не layout effects)
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
