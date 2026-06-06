"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const WORKER_URL = "https://pusknew.theodoriwe.workers.dev";

function generateSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function toDate(val: any): Date {
  if (val instanceof Date) return val;
  return new Date(val);
}

export function ChatModal() {
  const { isChatOpen, closeChat, markMessagesAsRead, addUnreadMessage } = useModalStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [lastMessageId, setLastMessageId] = useState("0");
  // Polling запускается только если юзер когда-либо писал
  const [hasUserMessages, setHasUserMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Инициализация
  useEffect(() => {
    if (typeof window === "undefined") return;

    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateSessionId();
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);

    const savedLastId = localStorage.getItem(STORAGE_LAST_ID_KEY);
    if (savedLastId) setLastMessageId(savedLastId);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);

      if (stored && expiry && Date.now() < parseInt(expiry, 10)) {
        const parsed = JSON.parse(stored);
        const restoredMessages = parsed.map((msg: any) => ({
          ...msg,
          sender: msg.sender === "bot" ? "operator" : msg.sender,
          timestamp: toDate(msg.timestamp),
        }));
        setMessages(restoredMessages);

        // Проверяем были ли сообщения от юзера в прошлой сессии
        const hadUserMessages = restoredMessages.some((m: Message) => m.sender === "user");
        if (hadUserMessages) setHasUserMessages(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXPIRY_KEY);
        localStorage.removeItem(STORAGE_LAST_ID_KEY);
        localStorage.removeItem(HAS_USER_MESSAGES_KEY);
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

  // Сохраняем сообщения
  useEffect(() => {
    if (!initialized || messages.length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      localStorage.setItem(STORAGE_EXPIRY_KEY, (Date.now() + EXPIRY_TIME).toString());
    } catch {}
  }, [messages, initialized]);

  // Сохраняем lastMessageId
  useEffect(() => {
    if (lastMessageId !== "0") {
      localStorage.setItem(STORAGE_LAST_ID_KEY, lastMessageId);
    }
  }, [lastMessageId]);

  // Polling — запускается ТОЛЬКО если юзер когда-либо писал
  useEffect(() => {
    if (!sessionId || !initialized || !hasUserMessages) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `${WORKER_URL}/chat?sessionId=${sessionId}&after=${lastMessageId}`
        );
        const data = await res.json();

        if (data.replies && data.replies.length > 0) {
          const newMessages: Message[] = data.replies.map((r: any) => ({
            id: r.id,
            text: r.text,
            sender: "operator" as const,
            timestamp: toDate(r.timestamp),
          }));

          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id));
            const unique = newMessages.filter(m => !existingIds.has(m.id));
            return unique.length > 0 ? [...prev, ...unique] : prev;
          });

          const newLastId = data.replies[data.replies.length - 1].id;
          setLastMessageId(newLastId);

          const currentState = useModalStore.getState();
          if (!currentState.isChatOpen) {
            playNotificationSound();
            currentState.addUnreadMessage();
          }
        }
      } catch {}
    };

    // Когда чат открыт — каждые 3с, закрыт — каждые 15с
    const interval = isChatOpen ? 3000 : 15000;
    pollingRef.current = setInterval(poll, interval);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [sessionId, initialized, hasUserMessages, lastMessageId, isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) markMessagesAsRead();
  }, [isChatOpen, markMessagesAsRead]);

  useEffect(() => {
    if (!isChatOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isChatOpen, closeChat]);

  const playNotificationSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.frequency.value = 523.25;
      osc1.type = "sine";
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc1.start(now);
      osc1.stop(now + 0.3);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 659.25;
      osc2.type = "sine";
      gain2.gain.setValueAtTime(0, now + 0.25);
      gain2.gain.setValueAtTime(0.25, now + 0.3);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc2.start(now + 0.3);
      osc2.stop(now + 0.6);
    } catch {}
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId) return;

    const text = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Включаем polling — юзер написал первое сообщение
    if (!hasUserMessages) {
      setHasUserMessages(true);
    }

    try {
      await fetch(`${WORKER_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50 w-full max-w-sm bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 sm:h-[500px]"
        >
          <div className="flex items-center justify-between p-5 border-b border-border bg-card sticky top-0 z-10">
            <div>
              <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Чат поддержки
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Обычно отвечаем за 2 минуты
              </p>
            </div>
            <button
              onClick={closeChat}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-xl px-4 py-2.5 ${
                    message.sender === "user" ? "" : "bg-muted text-foreground"
                  }`}
                  style={message.sender === "user" ? { backgroundColor: "#d5ed5d", color: "#1a1a1a" } : {}}
                >
                  <p className="text-sm break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-current/70" : "text-muted-foreground"}`}>
                    {toDate(message.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-muted rounded-xl px-4 py-2.5">
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
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder="Напишите сообщение..."
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                style={{ backgroundColor: "#d5ed5d", color: "#1a1a1a" }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}