"use client";

import Link from "next/link";
import { m } from "framer-motion";
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
          <m.div
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
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto">
              <button
                onClick={() => openQuiz()}
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground font-bold text-base sm:text-lg rounded-full hover:bg-primary-hover hover:scale-105 transition-transform hover-shine"
                data-magnetic
              >
                <span>Рассчитать</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button
                onClick={() => openContact()}
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 border-2 border-primary text-primary font-bold text-base sm:text-lg rounded-full hover:bg-primary/10 hover:scale-105 transition-transform"
                data-magnetic
              >
                <span>Обсудить</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </m.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-6 md:gap-8 lg:gap-8 items-start">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <Logo height={30} />
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
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
              className="font-semibold mb-4 text-sm sm:text-base uppercase tracking-wider text-muted-foreground"
            >
              Услуги
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-foreground/70 hover:text-foreground transition-colors hover-line line-clamp-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm sm:text-base uppercase tracking-wider text-muted-foreground">
              Компания
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-foreground/70 hover:text-foreground transition-colors hover-line line-clamp-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:-mt-6 bg-gradient-to-br from-primary/5 to-primary/[0.02] rounded-2xl p-4 sm:p-6 border border-primary/10 backdrop-blur-sm">
            <h3 className="font-semibold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider text-muted-foreground">
              Контакты
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a
                  href="tel:+79282428240"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">
                    +7 (928) 242-82-40
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:agencypusk@yandex.ru"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium truncate">
                    agencypusk@yandex.ru
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pusksupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">@pusksupport</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/80 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0 mt-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-sm sm:text-base font-medium pt-1.5 sm:pt-2">Сочи</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col gap-4 text-center">
          <div className="text-xs sm:text-sm text-muted-foreground">
            <p>&copy; {currentYear} ПУСК. Все права защищены.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
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
