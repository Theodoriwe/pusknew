"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { Logo } from "@/components/logo";

const footerLinks = {
  services: [
    { label: "Разработка сайтов", href: "/uslugi/razrabotka-sajtov" },
    { label: "Контекстная реклама", href: "/uslugi/kontekstnaya-reklama" },
    { label: "Геосервисы", href: "/uslugi/prodvizhenie-v-geoserwisah" },
    { label: "SMM продвижение", href: "/uslugi/smm" },
    { label: "Telegram боты", href: "/uslugi/mini-apps-boty" },
  ],
  company: [
    { label: "Кейсы", href: "/kejsy" },
    { label: "Блог", href: "/blog" },
    { label: "Цены", href: "/ceny" },
    { label: "Контакты", href: "/kontakty" },
  ],
};

const socialLinks = [
  { label: "Telegram", href: "https://t.me/pusksupport", icon: Send },
  { label: "WhatsApp", href: "https://wa.me/79282428240", icon: () => (
    <img src="/wa.svg" alt="WhatsApp" className="w-7 h-7" />
  )},
  { label: "Max", href: "https://max.ru/pusk_agency", icon: () => (
    <img src="/maxm.svg" alt="Max" className="w-5 h-5" />
  )},
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openContact, openQuiz } = useModalStore();

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* CTA Section */}
      <div className="relative border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 
              className="heading-display mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-foreground">Готовы</span>
              <span className="gradient-text">к росту?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Расскажите о вашем проекте — мы подготовим индивидуальное предложение за 24 часа
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => openQuiz()}
                className="group inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary-hover hover:scale-105 transition-transform hover-shine"
                data-magnetic
              >
                <span>Рассчитать стоимость</span>
                <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button
                onClick={() => openContact()}
                className="group inline-flex items-center gap-4 px-10 py-5 border-2 border-primary text-primary font-bold text-lg rounded-full hover:bg-primary/10 hover:scale-105 transition-transform"
                data-magnetic
              >
                <span>Обсудить проект</span>
                <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-6">
              <Logo height={30} />
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Агентство цифрового-маркетинга. Создаём сайты, запускаем рекламу и помогаем бизнесу расти в интернете с 2022 года.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
                  aria-label={social.label}
                  data-magnetic
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 
              className="font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground"
            >
              Услуги
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors hover-line"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">
              Компания
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors hover-line"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">
              Контакты
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+79282428240"
                  className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                  +7 (928) 242-82-40
                </a>
              </li>
              <li>
                <a
                  href="mailto:agencypusk@yandex.ru"
                  className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                  agencypusk@yandex.ru
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pusksupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Send className="w-4 h-4 flex-shrink-0 text-primary" />
                  @pusksupport
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-primary" />
                <span>Сочи</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>&copy; {currentYear} ПУСК. Все права защищены.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/offer" className="hover:text-foreground transition-colors">
              Договор оферты
            </Link>
          </div>
        </div>
      </div>
      
      {/* Giant background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div 
          className="text-[20vw] font-black text-foreground/[0.02] leading-none text-center select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ПУСК
        </div>
      </div>
    </footer>
  );
}
