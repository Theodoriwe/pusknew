"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import { useModalStore } from "@/lib/store";

const menuItems = [
  {
    icon: HelpCircle,
    label: "Расчёт",
    description: "Рассчитать стоимость",
    key: "quiz",
  },
  {
    icon: MessageSquare,
    label: "Чат",
    description: "Написать нам",
    key: "chat",
  },
  {
    icon: Phone,
    label: "Звонок",
    description: "Позвонить сейчас",
    key: "call",
  },
  {
    icon: Mail,
    label: "Форма",
    description: "Оставить заявку",
    key: "form",
  },
];

export function FloatingHelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { openQuiz, openContact, openCall, openChat, unreadCount } = useModalStore();

  useEffect(() => {
    setMounted(true);
    // Check if user is on mobile
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleCall = () => {
    if (isMobile) {
      window.location.href = "tel:+79282428240";
    } else {
      // Open call modal for PC users
      openCall();
    }
    setIsOpen(false);
  };

  const handleClick = (key: string) => {
    if (key === "quiz") openQuiz();
    if (key === "form") openContact();
    if (key === "chat") {
      openChat();
    }
    if (key === "call") handleCall();
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div ref={ref} className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3" style={{ pointerEvents: isOpen ? "auto" : "none" }}>

      {/* Panel */}
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0px) scale(1)" : "translateY(12px) scale(0.97)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.22s ease, transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)",
          transformOrigin: "bottom right",
        }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden w-64"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Как мы можем помочь?</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Выберите удобный способ</p>
        </div>

        {/* Items */}
        <div className="p-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const hasUnread = item.key === "chat" && unreadCount > 0;
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item.key)}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0px)" : "translateX(8px)",
                  transition: `opacity 0.2s ease ${isOpen ? i * 45 + 80 : 0}ms, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1) ${isOpen ? i * 45 + 80 : 0}ms`,
                  backgroundColor: hasUnread ? "rgba(239, 68, 68, 0.1)" : "transparent",
                }}
                className="relative w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150 group text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                  <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" strokeWidth={1.8} />
                  {/* Unread indicator for chat item */}
                  {hasUnread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                      {unreadCount > 9 ? '9' : unreadCount}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${hasUnread ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-zinc-100"} leading-none`}>{item.label}</p>
                  <p className={`text-xs ${hasUnread ? "text-red-500/70 dark:text-red-500/60" : "text-zinc-400 dark:text-zinc-500"} mt-1 leading-none`}>{item.description}</p>
                </div>
                <svg
                  className={`w-3.5 h-3.5 ${hasUnread ? "text-red-400 dark:text-red-500" : "text-zinc-300 dark:text-zinc-600"} ml-auto flex-shrink-0 group-hover:text-zinc-400 transition-colors`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Обычно отвечаем за <span className="text-zinc-600 dark:text-zinc-400 font-medium">2 минуты</span>
          </p>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
        style={{
          backgroundColor: "#d5ed5d",
          color: "#1a1a1a",
          boxShadow: isOpen
            ? "0 8px 30px rgba(213, 237, 93, 0.3)"
            : unreadCount > 0
            ? "0 4px 20px rgba(239, 68, 68, 0.4)"
            : "0 4px 20px rgba(213, 237, 93, 0.25)",
        }}
        aria-label="Открыть меню помощи"
      >
        {/* Unread badge */}
        {unreadCount > 0 && !isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
        {/* Pulse ring — visible when closed */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ animationDuration: "2.4s", backgroundColor: unreadCount > 0 ? "#ef4444" : "#d5ed5d" }}
          />
        )}
        <span
          style={{
            position: "absolute",
            transition: "opacity 0.18s, transform 0.22s cubic-bezier(0.34,1.4,0.64,1)",
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "rotate(-30deg) scale(0.7)" : "rotate(0deg) scale(1)",
            color: "#1a1a1a",
          }}
        >
          <MessageCircle className="w-6 h-6" strokeWidth={1.8} />
        </span>
        <span
          style={{
            position: "absolute",
            transition: "opacity 0.18s, transform 0.22s cubic-bezier(0.34,1.4,0.64,1)",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(30deg) scale(0.7)",
            color: "#1a1a1a",
          }}
        >
          <X className="w-5 h-5" strokeWidth={2.2} />
        </span>
      </button>
    </div>
  );
}