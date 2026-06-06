"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ExternalLink,
} from "lucide-react";

interface BrowserMockupProps {
  siteUrl?: string;
  title: string;
}

export function BrowserMockup({
  siteUrl,
  title,
}: BrowserMockupProps) {
  const [view, setView] = useState<"live" | "mobile">("live");
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = mounted && screenWidth < 1000;
  const buttonPadding = isSmallScreen ? "px-8 py-4" : "px-4 py-2";
  const buttonTextSize = isSmallScreen ? "text-lg" : "text-sm";
  const iconSize = isSmallScreen ? 20 : 15;

  // Фиксированные размеры "экрана" телефона
  const IFRAME_W = 407; // 390 + 17px под скроллбар
  const IFRAME_H = 844;

  // Ширина телефонного фрейма (включая рамку 8px с каждой стороны)
  const phoneFrameWidth = isSmallScreen ? 340 : 360;
  const innerWidth = phoneFrameWidth - 16; // минус border 8px * 2

  // Масштаб: вписываем 390px контент в innerWidth
  const scale = innerWidth / IFRAME_W;
  const scaledH = IFRAME_H * scale;

  return (
    <>
      {/* Toggle и ссылка */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 w-full">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-xl"
          style={{ background: "var(--muted)", border: "1px solid rgba(84,154,242,0.15)" }}
        >
          {siteUrl && (
            <button
              onClick={() => setView("live")}
              className={`inline-flex items-center gap-2 ${buttonPadding} rounded-lg ${buttonTextSize} font-medium transition-all duration-200`}
              style={
                view === "live"
                  ? { background: "#549AF2", color: "#fff", boxShadow: "0 2px 8px rgba(84,154,242,0.35)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              <Monitor size={iconSize} />
              Десктоп
            </button>
          )}
          <button
            onClick={() => setView("mobile")}
            className={`inline-flex items-center gap-2 ${buttonPadding} rounded-lg ${buttonTextSize} font-medium transition-all duration-200`}
            style={
              view === "mobile"
                ? { background: "#549AF2", color: "#fff", boxShadow: "0 2px 8px rgba(84,154,242,0.35)" }
                : { color: "var(--muted-foreground)" }
            }
          >
            <Smartphone size={iconSize} />
            Мобильный
          </button>
        </div>

        {siteUrl && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${buttonTextSize} font-medium transition-colors hover:opacity-80 w-full lg:w-auto`}
            style={{ color: "#549AF2", justifyContent: "center" }}
          >
            Открыть полностью
            <ExternalLink size={isSmallScreen ? 18 : 14} />
          </a>
        )}
      </div>

      {/* Фреймы */}
      <AnimatePresence mode="wait">
        {view === "live" && siteUrl ? (
          <m.div
            key="live"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: "1.5px solid rgba(84,154,242,0.20)" }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: "#F0F2F5", borderBottom: "1px solid #E4E6EA" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#28CA41" }} />
                </div>
                <div
                  className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs"
                  style={{
                    background: "#fff",
                    border: "1px solid #D1D5DB",
                    color: "#6B7280",
                    maxWidth: 400,
                    margin: "0 auto",
                  }}
                >
                  <span className="text-green-500">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M5 0C3.3 0 2 1.3 2 3v.5H1C.4 3.5 0 4 0 4.5v5c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H8V3c0-1.7-1.3-3-3-3zm2 3.5H3V3c0-1.1.9-2 2-2s2 .9 2 2v.5z" />
                    </svg>
                  </span>
                  {siteUrl!.replace(/^https?:\/\//, "")}
                </div>
              </div>
              {/* iframe */}
              <div
                className="relative w-full"
                style={{ height: "70vh", minHeight: 500, background: "#fff" }}
              >
                <iframe
                  src={siteUrl!.startsWith("http") ? siteUrl! : `https://${siteUrl!}`}
                  title={`Живой просмотр ${title}`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </m.div>
        ) : (
          <m.div
            key="mobile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex justify-center"
          >
            {/* Phone frame */}
            <div
              style={{
                width: phoneFrameWidth,
                borderRadius: 44,
                border: "8px solid #1A1A2E",
                boxShadow:
                  "0 0 0 1.5px rgba(84,154,242,0.25), 0 32px 80px rgba(0,0,0,0.25)",
                overflow: "hidden",
                position: "relative",
                background: "#1A1A2E",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 100,
                  height: 26,
                  background: "#1A1A2E",
                  borderRadius: "0 0 16px 16px",
                  zIndex: 10,
                }}
              />

              {/* Screen area */}
              <div
                style={{
                  paddingTop: 18,
                  paddingBottom: 0,
                  background: "#1b1a2d",
                  overflow: "hidden",
                  height: scaledH + 16 + 24,
                }}
              >
                <div
                  style={{
                    width: innerWidth,
                    height: scaledH,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <iframe
                    src={siteUrl ? (siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`) : "about:blank"}
                    title={`Мобильный просмотр ${title}`}
                    style={{
                      width: IFRAME_W + 15,
                      height: IFRAME_H,
                      border: "none",
                      transformOrigin: "top left",
                      transform: `scale(${scale})`,
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Home indicator */}
              <div
                style={{
                  height: 24,
                  background: "#1A1A2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.3)",
                  }}
                />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
