"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

const services = [
  { value: "site", label: "Разработка сайта" },
  { value: "ads", label: "Контекстная реклама" },
  { value: "geo", label: "Продвижение в геосервисах" },
  { value: "smm", label: "SMM продвижение" },
  { value: "telegram", label: "Telegram бот / мини-приложение" },
  { value: "other", label: "Другое" },
];

export function ContactModal() {
  const { isContactOpen, selectedService, closeContact } = useModalStore();
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Format phone number with mask
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    
    // For Russian phone numbers: +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (digits.length > 0) {
      const areaCode = digits.substring(1, 4);
      if (areaCode) formatted += ' (' + areaCode;
    }
    if (digits.length > 3) {
      formatted += ') ' + digits.substring(4, 7);
    }
    if (digits.length > 6) {
      formatted += '-' + digits.substring(7, 9);
    }
    if (digits.length > 8) {
      formatted += '-' + digits.substring(9, 11);
    }
    
    return formatted;
  };

  // Set selected service from store
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Focus trap and escape key
  useEffect(() => {
    if (!isContactOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isContactOpen, closeContact]);

  // Reset form on close
  useEffect(() => {
    if (!isContactOpen) {
      setTimeout(() => {
        setFormState("idle");
        setFormData({ name: "", contact: "", service: "", comment: "" });
        setErrors({});
      }, 300);
    }
  }, [isContactOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Введите телефон";
    } else {
      // Check if phone number is valid (should have 11 digits for Russian numbers)
      const digits = formData.contact.replace(/\D/g, '');
      if (digits.length !== 11) {
        newErrors.contact = "Введите корректный номер телефона";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  setFormState("loading");

  try {
    await fetch("https://pusknew.theodoriwe.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        name: formData.name,
        contact: formData.contact,
        service: services.find(s => s.value === formData.service)?.label || formData.service,
        comment: formData.comment,
      }),
    });
  } catch (e) {
    console.error(e);
  }

  setFormState("success");
};
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeContact();
    }
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
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
            className="relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={closeContact}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors focus-ring"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">Заявка принята!</h3>
                <p className="text-muted-foreground mb-6">
                  Напишем вам в ближайшее время
                </p>
                <Button onClick={closeContact} variant="outline" size="lg">
                  Закрыть
                </Button>
              </motion.div>
            ) : (
              <div className="p-6 sm:p-8">
                <h2
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-semibold mb-2 pr-8"
                  style={{ fontFamily: "var(--font-unbounded)" }}
                >
                  Обсудим ваш проект
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ответим в течение 15 минут в рабочее время
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Имя <span className="text-destructive">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.name ? "border-destructive" : "border-border"
                      }`}
                      placeholder="Как к вам обращаться?"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact */}
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium mb-2"
                    >
                      Телефон {" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          contact: formatted,
                        }))
                      }}
                      className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.contact ? "border-destructive" : "border-border"
                      }`}
                      placeholder="+7 (___) ___-__-__ "
                    />
                    {errors.contact && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium mb-2"
                    >
                      Какая услуга интересует?
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="">Выберите услугу</option>
                      {services.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium mb-2"
                    >
                      Комментарий
                    </label>
                    <textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Расскажите о проекте в двух словах"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={formState === "loading"}
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="underline hover:text-primary">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
