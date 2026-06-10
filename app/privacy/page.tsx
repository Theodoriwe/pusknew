"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: "Главная", href: "/" },
              { label: "Политика конфиденциальности" }
            ]}
          />

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </motion.button>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl font-black mb-6 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Политика<br />конфиденциальности
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Информация о том, как мы собираем и защищаем ваши данные
              </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Общие положения</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Настоящая Политика конфиденциальности описывает, как агентство цифрового маркетинга "ПУСК" 
                  (далее - "Компания") собирает, использует и защищает информацию, которую вы предоставляете при 
                  посещении нашего сайта и использовании наших услуг.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Информация, которую мы собираем</h2>
                <p className="text-foreground/80">Мы собираем следующие типы информации:</p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Личная информация, которую вы добровольно предоставляете (имя, email, телефон)</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Информацию об использовании сайта (IP-адрес, браузер, время посещения)</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Информацию из файлов cookie и аналитических сервисов</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Информацию о взаимодействии с нашим контентом</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Использование информации</h2>
                <p className="text-foreground/80">Мы используем собранную информацию для:</p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Предоставления и улучшения наших услуг</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Коммуникации с вами по поводу вашего проекта</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Отправки информационных материалов и предложений</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Анализа использования сайта и оптимизации</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Выполнения юридических обязательств</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Защита данных</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Мы принимаем разумные меры для защиты вашей личной информации от несанкционированного доступа, 
                  изменения, раскрытия или уничтожения. Однако ни один способ передачи в Интернете не является 
                  полностью безопасным.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Файлы cookie</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Наш сайт использует файлы cookie для улучшения вашего опыта. Вы можете отключить cookies в 
                  параметрах вашего браузера, однако это может повлиять на функциональность сайта.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Права пользователя</h2>
                <p className="text-foreground/80">Вы имеете право:</p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Получать информацию о собранных о вас данных</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исправлять неточные данные</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Требовать удаления ваших данных</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Отказаться от получения маркетинговых материалов</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Изменения в политике</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Мы оставляем за собой право изменять эту Политику конфиденциальности. Изменения вступают в силу 
                  с момента их публикации на сайте.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Контакты</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Если у вас есть вопросы о нашей Политике конфиденциальности, свяжитесь с нами:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Email: agencypusk@yandex.ru</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Телефон: +7 (928) 242-82-40</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Telegram: @pusksupport</span>
                  </li>
                </ul>
              </section>
            </div>

            <div className="pt-8 mt-12 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Последнее обновление: май 2026 г.
              </p>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </>
  );
}
