"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function CallModal() {
  const { isCallOpen, closeCall } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and escape key
  useEffect(() => {
    if (!isCallOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCall();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isCallOpen, closeCall]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCall();
    }
  };

  const handleCallClick = () => {
    window.location.href = "tel:+79282428240";
  };

  return (
    <AnimatePresence>
      {isCallOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-modal-title"
          >
            {/* Close button */}
            <button
              onClick={closeCall}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors focus-ring z-10"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-10 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Phone className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Title */}
              <h2
                id="call-modal-title"
                className="text-2xl sm:text-3xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Позвоните нам!
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-lg">
                Мы ждём вашего звонка
              </p>

              {/* Phone number */}
              <div className="mb-8 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Номер телефона:</p>
                <a
                  href="tel:+79282428240"
                  className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  +7 928 242-82-40
                </a>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCallClick}
                  size="lg"
                  className="w-full"
                  style={{
                    backgroundColor: "#d5ed5d",
                    color: "#1a1a1a",
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Позвонить
                </Button>
                <Button
                  onClick={closeCall}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
