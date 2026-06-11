"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, Clock, MessageSquare } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/lib/store";

const contactMethods = [
  {
    iconName: "Phone" as const,
    label: "Телефон",
    value: "+7 (928) 242-82-40",
    href: "tel:+79282428240",
    description: "Ежедневно с 10:00 до 22:00",
  },
  {
    iconName: "Mail" as const,
    label: "Email",
    value: "agencypusk@yandex.ru",
    href: "mailto:agencypusk@yandex.ru",
    description: "Ответим в течение 2 часов",
  },
  {
    iconName: "Send" as const,
    label: "Telegram",
    value: "@pusksupport",
    href: "https://t.me/pusksupport",
    description: "Самый быстрый способ связи",
  },
  {
    iconName: "MessageSquare" as const,
    label: "WhatsApp",
    value: "+7 (928) 242-82-40",
    href: "https://wa.me/79282428240",
    description: "",
  },
];

const contactIconMap = { Phone, Mail, Send, MessageSquare };

export default function ContactsPage() {
  const { openContact } = useModalStore();
  
  const [visibleMethods, setVisibleMethods] = useState<Set<number>>(new Set());
  const methodsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!methodsContainerRef.current) return;
    const cards = methodsContainerRef.current.querySelectorAll("[data-method-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-method-id");
            if (id) {
              setVisibleMethods((prev) => new Set([...prev, parseInt(id)]));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "-50px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const formatPhoneNumber = (value: string): string => {
    // Оставляем только цифры
    const digits = value.replace(/\D/g, "");
    
    // Если пусто, возвращаем пусто
    if (!digits) return "";
    
    // Если цифры начинаются на 8, заменяем на 7
    let cleanDigits = digits;
    if (cleanDigits.startsWith("8")) {
      cleanDigits = "7" + cleanDigits.slice(1);
    }
    
    // Если не начинается на 7, добавляем его
    if (!cleanDigits.startsWith("7")) {
      cleanDigits = "7" + cleanDigits;
    }
    
    // Ограничиваем до 11 цифр (7 + 10 цифр)
    cleanDigits = cleanDigits.slice(0, 11);
    
    // Форматируем в формат +7 (XXX) XXX-XX-XX
    if (cleanDigits.length === 0) return "";
    if (cleanDigits.length <= 1) return "+" + cleanDigits;
    if (cleanDigits.length <= 4) return "+" + cleanDigits.slice(0, 1) + " (" + cleanDigits.slice(1);
    if (cleanDigits.length <= 7) return "+" + cleanDigits.slice(0, 1) + " (" + cleanDigits.slice(1, 4) + ") " + cleanDigits.slice(4);
    if (cleanDigits.length <= 9) return "+" + cleanDigits.slice(0, 1) + " (" + cleanDigits.slice(1, 4) + ") " + cleanDigits.slice(4, 7) + "-" + cleanDigits.slice(7);
    
    return "+" + cleanDigits.slice(0, 1) + " (" + cleanDigits.slice(1, 4) + ") " + cleanDigits.slice(4, 7) + "-" + cleanDigits.slice(7, 9) + "-" + cleanDigits.slice(9, 11);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(p => ({ ...p, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://pusknew.theodoriwe.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          contact: formData.phone,
          service: "Страница контактов",
          comment: formData.message,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(false);
    setIsDone(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="pt-24 lg:pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ label: "Контакты" }]} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1
                className="heading-1 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Свяжитесь с нами
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Расскажите о вашем проекте 
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div ref={methodsContainerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = contactIconMap[method.iconName];
                const isVisible = visibleMethods.has(index);
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-method-id={index}
                    className="group p-6 rounded-[1.5rem] border border-transparent bg-[#549AF2] text-white shadow-[0_20px_60px_rgba(84,154,242,0.22)] transition-all hover:-translate-y-1"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      animation: isVisible ? "fade-in 0.5s ease-out" : "none",
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-white/80 mb-1">{method.label}</p>
                    <p className="text-lg font-semibold mb-2 text-white">{method.value}</p>
                    <p className="text-sm text-white/85">{method.description}</p>
                  </a>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="rounded-[2rem] bg-[#d0ef4c] p-4 sm:p-6">
                <div className="rounded-[1.75rem] bg-transparent p-6 sm:p-8">
                  <h2
                    className="heading-3 mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Оставить заявку
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Имя</label>
                        <Input
                          placeholder="Как к вам обращаться?"
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Телефон</label>
                        <Input
                          type="tel"
                          placeholder="+7 (900) 000-00-00"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={18}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Сообщение</label>
                      <Textarea
                        placeholder="Расскажите о вашем проекте   "
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>

                    {isDone ? (
                      <div className="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 text-center font-medium">
                        ✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                      </div>
                    ) : (
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Отправка..." : "Отправить заявку"}
                      </Button>
                    )}

                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="underline hover:text-foreground">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-card rounded-2xl border border-border">
                  <h3
                    className="text-xl font-semibold mb-4 flex items-center gap-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Clock className="w-5 h-5 text-primary" />
                    Режим работы
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ежедневно</span>
                      <span className="font-medium">10:00 — 22:00</span>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Отвечаем в мессенджерах 24/7
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Находимся в городе Сочи, работаем по всей России и странам СНГ
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-card rounded-2xl border border-border">
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Реквизиты
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">ИП «Атаян Борис Симонович»</span></p>
                    <p><span className="text-muted-foreground">ИНН:</span> 262808458208</p>
                    <p><span className="text-muted-foreground">ОГРН:</span> 323265100169614</p>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}