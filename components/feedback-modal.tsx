"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { useModalStore } from "@/lib/store";

export function FeedbackModal() {
  const { isFeedbackOpen, closeFeedback } = useModalStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    setTimeout(() => {
      closeFeedback();
      setFormData({ name: "", email: "", phone: "", message: "" });
      setDone(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isFeedbackOpen && (
        <>
          {/* Overlay */}
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[100]"
            onClick={closeFeedback}
          />

          {/* Modal */}
          <m.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border border-border">
              {/* Close */}
              <button
                onClick={closeFeedback}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-foreground/6 flex items-center justify-center hover:bg-foreground/12 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-10 md:p-12">
                <AnimatePresence mode="wait">
                  {done ? (
                    <m.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/15 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-accent" />
                      </div>
                      <h3
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Спасибо!
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Ваше сообщение отправлено. Мы ответим вам в ближайшее время.
                      </p>
                    </m.div>
                  ) : loading ? (
                    <m.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
                      <p className="text-lg font-medium text-foreground">
                        Отправка сообщения...
                      </p>
                    </m.div>
                  ) : (
                    <m.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h3
                        className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Напишите нам
                      </h3>
                      <p className="text-muted-foreground mb-8">
                        Ответим на все вопросы в течение 24 часов
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Имя <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ваше имя"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Телефон
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+7 (___) ___-__-__"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Сообщение <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Расскажите нам о вашем проекте..."
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                          className="w-full px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-6"
                        >
                          Отправить
                        </button>
                      </form>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
