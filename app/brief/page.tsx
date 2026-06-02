"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WebsiteBriefForm } from "@/components/brief/website-brief-form";
import {
  IconGlobe,
  IconSearch,
  IconSmartphone,
  IconRobot,
  IconBox,
  IconClock,
  IconChart,
  IconTag,
} from "@/components/brief/icons";

type ServiceType = "website" | "context-ads" | "smm" | "telegram-bot" | "mini-app" | null;

interface Service {
  id: ServiceType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: "website" as ServiceType,
    name: "Разработка сайтов",
    description: "Бриф для создания корпоративного сайта, лендинга или интернет-магазина",
    icon: <IconGlobe />,
  },
  {
    id: "context-ads" as ServiceType,
    name: "Контекстная реклама",
    description: "Информация для запуска и оптимизации контекстной рекламы",
    icon: <IconSearch />,
  },
  {
    id: "smm" as ServiceType,
    name: "SMM продвижение",
    description: "Данные для разработки стратегии в социальных сетях",
    icon: <IconSmartphone />,
  },
  {
    id: "telegram-bot" as ServiceType,
    name: "Telegram боты",
    description: "Требования для создания интерактивного бота",
    icon: <IconRobot />,
  },
  {
    id: "mini-app" as ServiceType,
    name: "Мини приложения",
    description: "Спецификация для разработки мини приложения",
    icon: <IconBox />,
  },
];

interface ComingSoonFormProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onBack: () => void;
}

function ComingSoonForm({ title, description, icon, onBack }: ComingSoonFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12"
            whileHover={{ x: -4 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Вернуться к выбору услуги</span>
          </motion.button>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent text-center"
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center p-6 rounded-full bg-primary/10 mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-primary">
                {icon}
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl font-black text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-12">
              {description}
            </p>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 mb-8"
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-primary">Скоро появится</span>
            </motion.div>

            {/* Subtitle */}
            <p className="text-muted-foreground">
              Мы активно разрабатываем эту форму!
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BriefPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleBackToSelection = () => {
    setSelectedService(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Selection Screen */}
        <AnimatePresence mode="wait">
          {selectedService === null ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-24 lg:py-32"
            >
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-16"
                  >
                    <h1
                      className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Расскажите о своем проекте
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                      Выберите услугу и заполните бриф. Это займет 10-15 минут и поможет нам лучше понять ваши задачи
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                      {[
                        { icon: <IconClock />, label: "10-15 мин", desc: "на заполнение" },
                        { icon: <IconChart />, label: "Все услуги", desc: "в одном бриефе" },
                        { icon: <IconTag />, label: "Честные цены", desc: "без скрытых платежей" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 text-primary flex-shrink-0">{item.icon}</div>
                          <div className="text-left">
                            <div className="font-bold text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Services Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                      <motion.button
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                        onClick={() => handleServiceSelect(service.id)}
                        className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, rgba(84,154,242,0.1) 0%, rgba(123,90,245,0.1) 100%)",
                          border: "2px solid rgba(84,154,242,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(84,154,242,0.6)";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(84,154,242,0.15) 0%, rgba(123,90,245,0.15) 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(84,154,242,0.2)";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(84,154,242,0.1) 0%, rgba(123,90,245,0.1) 100%)";
                        }}
                      >
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <div className="w-12 h-12 text-primary mb-4">{service.icon}</div>
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20">
                          <svg
                            className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedService === "website" && (
                <WebsiteBriefForm onBack={handleBackToSelection} />
              )}
              {/* Other forms will be added here */}
              {selectedService === "context-ads" && (
                <ComingSoonForm title="Контекстная реклама" description="Форма для заполнения бриф-листа по контекстной рекламе" icon={<IconSearch className="w-16 h-16" />} onBack={handleBackToSelection} />
              )}
              {selectedService === "smm" && (
                <ComingSoonForm title="SMM" description="Форма для заполнения бриф-листа по продвижению в соцсетях" icon={<IconSmartphone className="w-16 h-16" />} onBack={handleBackToSelection} />
              )}
              {selectedService === "telegram-bot" && (
                <ComingSoonForm title="Telegram бот" description="Форма для заполнения бриф-листа по созданию Telegram бота" icon={<IconRobot className="w-16 h-16" />} onBack={handleBackToSelection} />
              )}
              {selectedService === "mini-app" && (
                <ComingSoonForm title="Мини приложение" description="Форма для заполнения бриф-листа по разработке мини приложения" icon={<IconBox className="w-16 h-16" />} onBack={handleBackToSelection} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
