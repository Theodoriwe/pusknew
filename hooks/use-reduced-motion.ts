"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect user preference for reduced motion.
 * Returns true if user has set prefers-reduced-motion: reduce
 * Useful for disabling animations when needed
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Use addEventListener for better browser compatibility
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return prefersReducedMotion;
}
