"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useModalStore } from "@/lib/store";

interface Message {
  id: string;
  text: string;
  sender: "user" | "operator";
  timestamp: Date;
}

const STORAGE_KEY = "chat-messages";
const STORAGE_EXPIRY_KEY = "chat-messages-expiry";
const STORAGE_LAST_ID_KEY = "chat-last-message-id";
const SESSION_KEY = "chat-session-id";
const HAS_USER_MESSAGES_KEY = "chat-has-user-messages";
const EXPIRY_TIME = 24 * 60 * 60 * 1000;
const WORKER_URL = "https://chat.agencypusk.ru";

function generateSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function toDate(val: unknown): Date {
  if (val instanceof Date) return val;
  return new Date(val as string);
}

export function ChatModal() {
  const { isChatOpen, closeChat, markMessagesAsRead, addUnreadMessage } = useModalStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [hasUserMessages, setHasUserMessages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Refs — не вызывают лишних ре-рендеров и пересоздания интервалов
  const lastMessageIdRef = useRef<number>(0);
  const isSendingRef = useRef(false);
  const sendQueueRef = useRef<string[]>([]);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Инициализация ───
  useEffect(() => {
    if (typeof window === "undefined") return;

    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateSessionId();
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);

    const savedLastId = localStorage.getItem(STORAGE_LAST_ID_KEY);
    // Берём lastMessageId только если он выглядит как наш счётчик (небольшое число),
    // а не как старый update_id от Telegram (огромное число > 1 000 000)
    if (savedLastId) {
      const parsed = parseInt(savedLastId, 10);
      lastMessageIdRef.current = parsed > 1_000_000 ? 0 : parsed;
      if (parsed > 1_000_000) {
        localStorage.setItem(STORAGE_LAST_ID_KEY, "0");
      }
    }

    const hadUserMessages = localStorage.getItem(HAS_USER_MESSAGES_KEY) === "true";
    if (hadUserMessages) setHasUserMessages(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);

      if (stored && expiry && Date.now() < parseInt(expiry, 10)) {
        const parsed = JSON.parse(stored);
        const restoredMessages = parsed.map((msg: Record<string, unknown>) => ({
          ...msg,
          sender: msg.sender === "bot" ? "operator" : msg.sender,
          timestamp: toDate(msg.timestamp),
        }));
        setMessages(restoredMessages);
      } else {
        clearStorage();
        setMessages([{
          id: "welcome",
          text: "Привет! 👋 Чем могу помочь?",
          sender: "operator",
          timestamp: new Date(),
        }]);
      }
    } catch {
      setMessages([{
        id: "welcome",
        text: "Привет! 👋 Чем могу помочь?",
        sender: "operator",
        timestamp: new Date(),
      }]);
    }

    setInitialized(true);
  }, []);

  function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EXPIRY_KEY);
    localStorage.removeItem(STORAGE_LAST_ID_KEY);
    localStorage.removeItem(HAS_USER_MESSAGES_KEY);
    lastMessageIdRef.current = 0;
  }

  // ─── Сохраняем сообщения ───
  useEffect(() => {
    if (!initialized || messages.length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      localStorage.setItem(STORAGE_EXPIRY_KEY, (Date.now() + EXPIRY_TIME).toString());
    } catch {}
  }, [messages, initialized]);

  // ─── Scroll ───
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ─── Фокус при открытии ───
  useEffect(() => {
    if (isChatOpen) {
      markMessagesAsRead();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isChatOpen, markMessagesAsRead]);

  // ─── Escape ───
  useEffect(() => {
    if (!isChatOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isChatOpen, closeChat]);

  // ─── Polling ───
  const poll = useCallback(async () => {
    if (!sessionId || !initialized || !hasUserMessages) return;

    try {
      const res = await fetch(
       `${WORKER_URL}/chat?sessionId=${sessionId}&siteId=agencypusk&after=${lastMessageIdRef.current}`
      );
      if (!res.ok) return;
      const data = await res.json();

      if (!data.replies || data.replies.length === 0) return;

      const newMessages: Message[] = data.replies.map((r: { id: string; text: string; timestamp: string }) => ({
        id: `op-${r.id}`,  // Префикс чтобы никогда не пересекался с id сообщений пользователя
        text: r.text,
        sender: "operator" as const,
        timestamp: toDate(r.timestamp),
      }));

      const newLastId = parseInt(data.replies[data.replies.length - 1].id, 10);
      lastMessageIdRef.current = newLastId;
      localStorage.setItem(STORAGE_LAST_ID_KEY, newLastId.toString());

      // Показываем анимацию набора
      setIsTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const unique = newMessages.filter(m => !existingIds.has(m.id));
          return unique.length > 0 ? [...prev, ...unique] : prev;
        });
      }, 600);

      const currentState = useModalStore.getState();
      if (!currentState.isChatOpen) {
        playNotificationSound();
        currentState.addUnreadMessage();
      }
    } catch {}
  }, [sessionId, initialized, hasUserMessages]);

  useEffect(() => {
    if (!sessionId || !initialized || !hasUserMessages) return;

    poll(); // Сразу при старте

    const interval = isChatOpen ? 3000 : 15000;
    pollingRef.current = setInterval(poll, interval);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [poll, isChatOpen]);

  // ─── Звук ───
  const playNotificationSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      const makeBeep = (freq: number, start: number, end: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.01, end);
        osc.start(start);
        osc.stop(end);
      };

      makeBeep(523.25, now, now + 0.3);
      makeBeep(659.25, now + 0.3, now + 0.6);
    } catch {}
  };

  // ─── Отправка ───
  const processSendQueue = useCallback(async () => {
    if (isSendingRef.current || sendQueueRef.current.length === 0 || !sessionId) return;
    isSendingRef.current = true;

    const text = sendQueueRef.current[0];

    const sendWithRetry = async (retries = 3): Promise<boolean> => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(`${WORKER_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ sessionId, message: text, siteId: "agencypusk" }),
          });
          if (res.ok) return true;
        } catch {}
        if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
      return false;
    };

    await sendWithRetry();

    sendQueueRef.current = sendQueueRef.current.slice(1);
    isSendingRef.current = false;

    if (sendQueueRef.current.length > 0) processSendQueue();
  }, [sessionId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || !sessionId) return;

    // ID сообщения пользователя — с префиксом "user-" чтобы никогда не пересекался с operator
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    if (!hasUserMessages) {
      setHasUserMessages(true);
      localStorage.setItem(HAS_USER_MESSAGES_KEY, "true");
    }

    sendQueueRef.current = [...sendQueueRef.current, text];
    processSendQueue();
  };

  const showWaitingIndicator =
    hasUserMessages &&
    !isTyping &&
    messages.filter(m => m.sender === "operator" && m.id !== "welcome").length === 0;

  return (
    <AnimatePresence>
      {isChatOpen && (
        <m.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 w-[calc(100%-24px)] sm:w-full max-w-sm bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 sm:h-[430px] lg:h-[500px] border-2"
          style={{ borderColor: "#549AF2" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-5 border-b border-border bg-card sticky top-0 z-10 gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold truncate" style={{ fontFamily: "var(--font-display)" }}>
                Чат поддержки
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Обычно отвечаем за 2 минуты
              </p>
            </div>
            <button
              onClick={closeChat}
              className="p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <m.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs rounded-xl px-3 sm:px-4 py-2 ${
                    message.sender === "user" ? "" : "bg-muted text-foreground"
                  }`}
                  style={message.sender === "user" ? { backgroundColor: "#d5ed5d", color: "#1a1a1a" } : {}}
                >
                  <p className="text-xs sm:text-sm break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-current/70" : "text-muted-foreground"}`}>
                    {toDate(message.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </m.div>
            ))}

            <AnimatePresence>
              {isTyping && (
                <m.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <div
                          key={delay}
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showWaitingIndicator && (
                <m.div
                  key="waiting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-4"
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#549AF2", color: "white" }}
                  >
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <div
                          key={delay}
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Подключаем оператора</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-border bg-card flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Сообщение..."
                className="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base cursor-text"
                style={{ fontSize: "16px" }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#d5ed5d", color: "#1a1a1a" }}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </m.div>
      )}
    </AnimatePresence>
  );
}