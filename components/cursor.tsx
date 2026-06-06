"use client";

import { useEffect, useState, useCallback } from "react";
import { m, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      const dataCursor = target.getAttribute("data-cursor") || target.closest("[data-cursor]")?.getAttribute("data-cursor");

      setIsPointer(!!isClickable);
      setCursorText(dataCursor || "");
    },
    [cursorX, cursorY]
  );

  const onMouseEnter = useCallback(() => setIsVisible(true), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse)
    const hasFineMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasFineMouse) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Add hover listeners for magnetic elements
    const magneticElements = document.querySelectorAll("[data-magnetic]");
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHovering(true));
      el.addEventListener("mouseleave", () => setIsHovering(false));
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseEnter, onMouseLeave]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <m.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isPointer ? 2.5 : isHovering ? 2 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`w-3 h-3 rounded-full bg-foreground transition-all duration-200 ${
              isPointer ? "scale-[0.4]" : ""
            }`}
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </m.div>
      </m.div>

      {/* Cursor ring */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <m.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isPointer ? 1.5 : isHovering ? 1.2 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-10 h-10 rounded-full border border-foreground/30"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </m.div>
      </m.div>

      {/* Cursor text label */}
      {cursorText && (
        <m.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-6 top-0 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full whitespace-nowrap"
          >
            {cursorText}
          </m.div>
        </m.div>
      )}
    </>
  );
}
