"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Loader2, CheckCircle2, Check, Phone, MessageCircle, Send } from "lucide-react";
import { useModalStore } from "@/lib/store";

type ServiceType = "site" | "ads" | "seo" | "geo";
type ContactMethod = "whatsapp" | "telegram" | "phone";

interface Answers {
  services: ServiceType[];
  siteType: string;
  hasBrand: string;
  urgency: string;
  needAds: string;
  siteActivity: string;
  productType: string;
  trafficDest: string;
  audience: string;
  budget: string;
  contactMethods: ContactMethod[];
  phone: string;
}

const initialAnswers: Answers = {
  services: [],
  siteType: "",
  hasBrand: "",
  urgency: "",
  needAds: "",
  siteActivity: "",
  productType: "",
  trafficDest: "",
  audience: "",
  budget: "",
  contactMethods: [],
  phone: "",
};

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-base flex items-center justify-between gap-3 ${
        selected
          ? "border-primary bg-primary/8 text-foreground"
          : "border-border bg-card hover:border-primary/40 text-foreground"
      }`}
    >
      <span>{children}</span>
      {selected && (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
    </button>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h3
        className="text-xl md:text-2xl font-bold text-foreground mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const contactOptions: { value: ContactMethod; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  {
    value: "whatsapp",
    label: "WhatsApp",
    desc: "Пришлём расчёт в WhatsApp",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "#25D366",
  },
  {
    value: "telegram",
    label: "Telegram",
    desc: "Пришлём расчёт в Telegram",
    icon: <Send className="w-5 h-5" />,
    color: "#2AABEE",
  },
  {
    value: "phone",
    label: "Позвоните мне",
    desc: "Менеджер перезвонит в течение 15 минут",
    icon: <Phone className="w-5 h-5" />,
    color: "#549AF2",
  },
];

export function QuizModal() {
  const { isQuizOpen, closeQuiz } = useModalStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [loading, setLoading] = useState(false);
  const [loadingBeforeContact, setLoadingBeforeContact] = useState(false);
  const [done, setDone] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (isQuizOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuizOpen]);

  useEffect(() => {
    if (!isQuizOpen) {
      const t = setTimeout(() => {
        setStep(0);
        setAnswers(initialAnswers);
        setDone(false);
        setLoading(false);
        setLoadingBeforeContact(false);
        setPhoneError("");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isQuizOpen]);

  const hasSiteService = answers.services.includes("site");
  const hasOtherService = answers.services.some((s) => s !== "site");

  // Validate Russian phone number
  function isValidPhone(phone: string): boolean {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    // Russian phone should have 11 digits (7 + 10 digits)
    return digits.length === 11 && digits.startsWith("7");
  }

  // Build step list based on CURRENT answers (used for display after step 0 is committed)
  function buildSteps(a: Answers): string[] {
    const hasSite = a.services.includes("site");
    const hasOther = a.services.some((s) => s !== "site");
    const s: string[] = ["services"];
    if (hasSite) s.push("siteType", "hasBrand", "urgency", "needAds", "siteActivity");
    if (hasOther) s.push("productType", "trafficDest", "audience", "budget");
    s.push("contact");
    return s;
  }

  // For progress display: after selecting services on step 0, use those answers to compute total.
  // Before they've committed step 0 (step === 0), show a sensible estimate (min possible = services + contact = 2 steps)
  const displaySteps = step === 0
    ? ["services", "contact"] // placeholder until they proceed
    : buildSteps(answers);

  const steps = buildSteps(answers);
  const currentKey = steps[step] ?? "contact";
  const totalSteps = displaySteps.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  function canProceed(): boolean {
    switch (currentKey) {
      case "services": return answers.services.length > 0;
      case "siteType": return !!answers.siteType;
      case "hasBrand": return !!answers.hasBrand;
      case "urgency": return !!answers.urgency;
      case "needAds": return !!answers.needAds;
      case "siteActivity": return !!answers.siteActivity;
      case "productType": return !!answers.productType;
      case "trafficDest": return !!answers.trafficDest;
      case "audience": return !!answers.audience;
      case "budget": return !!answers.budget;
      case "contact": return answers.contactMethods.length > 0 && isValidPhone(answers.phone);
      default: return true;
    }
  }

  async function next() {
    const nextSteps = buildSteps(answers);
    const nextStepKey = nextSteps[step + 1];
    
    // If next step is "contact", show loading animation first
    if (nextStepKey === "contact") {
      setLoadingBeforeContact(true);
      await new Promise((r) => setTimeout(r, 2000));
      setLoadingBeforeContact(false);
    }
    
    if (step + 1 < nextSteps.length) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function toggleService(s: ServiceType) {
    setAnswers((a) => ({
      ...a,
      services: a.services.includes(s)
        ? a.services.filter((x) => x !== s)
        : [...a.services, s],
    }));
  }

  function toggleContact(m: ContactMethod) {
    setAnswers((a) => ({
      ...a,
      contactMethods: a.contactMethods.includes(m)
        ? a.contactMethods.filter((x) => x !== m)
        : [...a.contactMethods, m],
    }));
  }

 async function handleSubmit() {
  if (!answers.phone.trim()) {
    setPhoneError("Введите номер телефона");
    return;
  }
  
  if (!isValidPhone(answers.phone)) {
    setPhoneError("Введите корректный номер телефона (11 цифр)");
    return;
  }
  
  setPhoneError("");
  setLoading(true);

  try {
    await fetch("https://pusknew.theodoriwe.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "quiz",
        phone: answers.phone,
        contactMethods: answers.contactMethods,
        answers: {
          services: answers.services,
          siteType: answers.siteType,
          hasBrand: answers.hasBrand,
          urgency: answers.urgency,
          needAds: answers.needAds,
          siteActivity: answers.siteActivity,
          productType: answers.productType,
          trafficDest: answers.trafficDest,
          audience: answers.audience,
          budget: answers.budget,
        },
      }),
    });
  } catch (e) {
    console.error(e);
  }

  setLoading(false);
  setDone(true);
}

  // Recompute real total after step 0 is completed
  const realTotalSteps = buildSteps(answers).length;
  const displayStep = step + 1;
  const displayTotal = step === 0 ? buildSteps({ ...answers }).length || 2 : realTotalSteps;
  const displayProgress = Math.round((displayStep / displayTotal) * 100);

  return (
    <AnimatePresence>
      {isQuizOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[100]"
            onClick={closeQuiz}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border border-border">
              {/* Close */}
              <button
                onClick={closeQuiz}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-foreground/6 flex items-center justify-center hover:bg-foreground/12 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-10 md:p-12">
                <AnimatePresence mode="wait">
                  {/* Done */}
                  {done ? (
                    <motion.div
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
                        Заявка отправлена!
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Мы свяжемся с вами в ближайшее время и пришлём расчёт стоимости.
                      </p>
                    </motion.div>
                  ) : loading ? (
                    /* Loading - no text shown */
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
                    </motion.div>
                  ) : loadingBeforeContact ? (
                    /* Loading before contact step */
                    <motion.div
                      key="loading-before-contact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
                      <p className="text-lg font-medium text-foreground">
                        Секундочку просчитываем стоимость вашего проекта...
                      </p>
                    </motion.div>
                  ) : (
                    /* Steps */
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Progress — shown only after step 1 */}
                      {step >= 1 && (
                        <div className="mb-8">
                          <div className="flex justify-between text-sm text-muted-foreground mb-3">
                            <span className="font-medium">
                              Шаг {displayStep} из {displayTotal}
                            </span>
                            <span className="font-medium">{displayProgress}%</span>
                          </div>
                          <div className="h-2 bg-foreground/8 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#6e9bed] rounded-full"
                              animate={{ width: `${displayProgress}%` }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* services */}
                      {currentKey === "services" && (
                        <>
                          <StepHeader title="Выберите услугу" subtitle="Можно выбрать несколько" />
                          <div className="space-y-3">
                            {(
                              [
                                ["site", "Разработка сайта"],
                                ["ads", "Рекламное продвижение"],
                                ["seo", "SEO продвижение"],
                                ["geo", "Продвижение в картах"],
                              ] as [ServiceType, string][]
                            ).map(([val, label]) => (
                              <OptionButton
                                key={val}
                                selected={answers.services.includes(val)}
                                onClick={() => toggleService(val)}
                              >
                                {label}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* siteType */}
                      {currentKey === "siteType" && (
                        <>
                          <StepHeader title="Какой сайт вас интересует?" />
                          <div className="space-y-3">
                            {[
                              "Лендинг (одностраничный сайт)",
                              "Интернет-магазин",
                              "Многостраничный сайт (корпоративный, информационный)",
                              "Портфолио",
                              "Переработка существующего",
                              "Другое",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.siteType === opt}
                                onClick={() => setAnswers((a) => ({ ...a, siteType: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* hasBrand */}
                      {currentKey === "hasBrand" && (
                        <>
                          <StepHeader title="Есть ли у вас брендбук или фирменный стиль?" />
                          <div className="space-y-3">
                            {["Да, есть", "Нет, нужна разработка", "Есть частично"].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.hasBrand === opt}
                                onClick={() => setAnswers((a) => ({ ...a, hasBrand: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* urgency */}
                      {currentKey === "urgency" && (
                        <>
                          <StepHeader title="Как срочно нужен сайт?" />
                          <div className="space-y-3">
                            {[
                              "В течение 1–2 недель",
                              "В течение 1 месяца",
                              "Не срочно, срок разработки не важен",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.urgency === opt}
                                onClick={() => setAnswers((a) => ({ ...a, urgency: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* needAds */}
                      {currentKey === "needAds" && (
                        <>
                          <StepHeader title="Планируете ли настройку рекламы в Яндекс Директ?" />
                          <div className="space-y-3">
                            {[
                              "Да, нужна настройка рекламы",
                              "Не знаю. Хочу узнать подробнее",
                              "Нет, только разработка сайта",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.needAds === opt}
                                onClick={() => setAnswers((a) => ({ ...a, needAds: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* siteActivity */}
                      {currentKey === "siteActivity" && (
                        <>
                          <StepHeader title="Для какой деятельности будем делать сайт?" />
                          <textarea
                            value={answers.siteActivity}
                            onChange={(e) =>
                              setAnswers((a) => ({ ...a, siteActivity: e.target.value }))
                            }
                            placeholder="Напишите коротко о вашем бизнесе или продукте..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          />
                        </>
                      )}

                      {/* productType */}
                      {currentKey === "productType" && (
                        <>
                          <StepHeader title="Какой продукт или услугу вы хотите рекламировать?" />
                          <div className="space-y-3">
                            {[
                              "Физический товар (одежда, электроника и др.)",
                              "Онлайн-продукт (курсы, приложения)",
                              "Услуга (ремонт, обучение, консультации)",
                              "Другое",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.productType === opt}
                                onClick={() => setAnswers((a) => ({ ...a, productType: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* trafficDest */}
                      {currentKey === "trafficDest" && (
                        <>
                          <StepHeader title="Куда будем перенаправлять рекламный трафик?" />
                          <div className="space-y-3">
                            {[
                              "На уже существующий сайт",
                              "Хочу создать сайт для рекламы",
                              "На страницу или группу в социальной сети",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.trafficDest === opt}
                                onClick={() => setAnswers((a) => ({ ...a, trafficDest: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* audience */}
                      {currentKey === "audience" && (
                        <>
                          <StepHeader title="Кто ваша целевая аудитория?" />
                          <div className="space-y-3">
                            {[
                              "Частные лица (B2C)",
                              "Бизнес (B2B)",
                              "Смешанная аудитория",
                              "Не уверен в ответе",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.audience === opt}
                                onClick={() => setAnswers((a) => ({ ...a, audience: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* budget */}
                      {currentKey === "budget" && (
                        <>
                          <StepHeader title="Какой у вас бюджет на рекламу в месяц?" />
                          <div className="space-y-3">
                            {[
                              "До 40 000 рублей",
                              "40 000 – 100 000 рублей",
                              "Более 100 000 рублей",
                              "Ещё не определился с бюджетом",
                            ].map((opt) => (
                              <OptionButton
                                key={opt}
                                selected={answers.budget === opt}
                                onClick={() => setAnswers((a) => ({ ...a, budget: opt }))}
                              >
                                {opt}
                              </OptionButton>
                            ))}
                          </div>
                        </>
                      )}

                      {/* contact */}
                      {currentKey === "contact" && (
                        <>
                          <div className="mb-8">
                            <h3
                              className="text-xl md:text-2xl font-bold text-foreground mb-4"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              Как удобнее получить расчёт?
                            </h3>
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/15 to-accent/10 border border-accent/40 shadow-lg shadow-accent/10">
                              <p className="text-lg font-semibold text-accent">Отправим расчёт и промокод на скидку 10 000 ₽</p>
                            </div>
                          </div>

                          {/* Messenger buttons — visual cards, not text inputs */}
                          <div className="grid grid-cols-3 gap-3 mb-8">
                            {contactOptions.map((opt) => {
                              const selected = answers.contactMethods.includes(opt.value);
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => toggleContact(opt.value)}
                                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
                                    selected
                                      ? "border-transparent"
                                      : "border-border hover:border-border/60 bg-card"
                                  }`}
                                  style={
                                    selected
                                      ? { borderColor: opt.color, background: `${opt.color}12` }
                                      : {}
                                  }
                                >
                                  <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                                    style={{ background: opt.color }}
                                  >
                                    {opt.icon}
                                  </div>
                                  <span className="text-sm font-semibold text-foreground">
                                    {opt.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground text-center leading-snug hidden sm:block">
                                    {opt.desc}
                                  </span>
                                  {selected && (
                                    <span
                                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: opt.color }}
                                    >
                                      <Check className="w-3 h-3 text-white" />
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Phone input */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Номер телефона{" "}
                              <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="tel"
                              value={answers.phone}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                let formatted = "+7";
                                if (value.length > 1) {
                                  formatted += " " + value.slice(1, 4);
                                }
                                if (value.length > 4) {
                                  formatted += " " + value.slice(4, 7);
                                }
                                if (value.length > 7) {
                                  formatted += " " + value.slice(7, 9);
                                }
                                if (value.length > 9) {
                                  formatted += " " + value.slice(9, 11);
                                }
                                setAnswers((a) => ({ ...a, phone: formatted }));
                                
                                // Validate and show error if invalid
                                if (formatted.length > 0 && formatted !== "+7" && !isValidPhone(formatted)) {
                                  setPhoneError("Введите корректный номер телефона (11 цифр)");
                                } else {
                                  setPhoneError("");
                                }
                              }}
                              placeholder="+7 000 000 00 00"
                              className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                phoneError ? "border-destructive" : "border-border"
                              }`}
                            />
                            {phoneError && (
                              <p className="text-destructive text-sm mt-1">{phoneError}</p>
                            )}
                          </div>
                        </>
                      )}

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                        <button
                          onClick={back}
                          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${
                            step === 0 ? "invisible" : ""
                          }`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Назад
                        </button>

                        {currentKey === "contact" ? (
                          <button
                            onClick={handleSubmit}
                            disabled={!canProceed()}
                            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            Получить расчёт
                          </button>
                        ) : (
                          <button
                            onClick={next}
                            disabled={!canProceed()}
                            className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            Далее
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
