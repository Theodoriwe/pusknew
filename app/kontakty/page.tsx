"use client";

import { useState } from "react";
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

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

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
                Расскажите о вашем проекте — мы подготовим предложение и ответим на все вопросы
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = contactIconMap[method.iconName];
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 rounded-[1.5rem] border border-transparent bg-[#549AF2] text-white shadow-[0_20px_60px_rgba(84,154,242,0.22)] transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-white/80 mb-1">{method.label}</p>
                    <p className="text-lg font-semibold mb-2 text-white">{method.value}</p>
                    <p className="text-sm text-white/85">{method.description}</p>
                  </motion.a>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="rounded-[2rem] bg-[#d0ef4c] p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[1.75rem] bg-transparent p-6 sm:p-8"
                >
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
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Сообщение</label>
                      <Textarea
                        placeholder="Расскажите о вашем проекте: что нужно сделать, какие цели, какой бюджет..."
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
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}