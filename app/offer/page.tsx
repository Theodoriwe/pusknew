"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowLeft } from "lucide-react";

export default function OfferPage() {
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
              { label: "Договор оферты" }
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
                Договор<br />оферты
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Условия оказания услуг и сотрудничества с агентством ПУСК
              </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Определения</h2>
                <div className="space-y-3 text-foreground/80">
                  <p>
                    <strong className="text-foreground">Исполнитель</strong> - агентство цифрового маркетинга "ПУСК", юридическое лицо, 
                    оказывающее услуги в области интернет-маркетинга, разработки сайтов и цифровой рекламы.
                  </p>
                  <p>
                    <strong className="text-foreground">Заказчик</strong> - физическое или юридическое лицо, заключившее договор на получение услуг 
                    Исполнителя путём принятия настоящей оферты.
                  </p>
                  <p>
                    <strong className="text-foreground">Услуги</strong> - услуги в области маркетинга, разработки сайтов, SEO, рекламы в поисковых 
                    системах, социальных сетях и других цифровых каналах.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Предмет договора</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Исполнитель предлагает оказать Заказчику услуги, указанные в коммерческом предложении, а Заказчик 
                  обязуется оплатить эти услуги на условиях, установленных настоящей офертой.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Стоимость услуг</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Стоимость услуг устанавливается в индивидуальном коммерческом предложении</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Цены указаны в российских рублях (РУБ) без учёта НДС</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исполнитель вправе изменять цены с предварительным уведомлением</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Порядок оплаты</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Оплата производится в соответствии с индивидуальным графиком, указанным в коммерческом предложении</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Оплата может быть произведена банковским переводом или другим согласованным способом</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Задолженность Заказчика подлежит оплате в течение 5 рабочих дней с момента выставления счёта</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>При несвоевременной оплате Исполнитель вправе приостановить оказание услуг</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Условия оказания услуг</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Услуги оказываются в соответствии с действующим законодательством РФ</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исполнитель не несёт ответственность за результаты, обусловленные внешними факторами</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Заказчик обязан предоставить всю необходимую информацию для оказания услуг</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исполнитель имеет право использовать работы Заказчика в своём портфолио</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Сроки выполнения</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Сроки выполнения услуг устанавливаются в коммерческом предложении и зависят от сложности работ, 
                  своевременности предоставления информации Заказчиком и других факторов.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Интеллектуальная собственность</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Все материалы, созданные Исполнителем в ходе выполнения работ, принадлежат Исполнителю до момента 
                  полной оплаты. После полной оплаты все исключительные права передаются Заказчику.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Ответственность</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исполнитель несёт ответственность за надлежащее качество оказываемых услуг</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Исполнитель не отвечает за результаты, зависящие от действий Заказчика</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Максимальный размер ответственности не превышает сумму, уплаченную Заказчиком</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Расторжение договора</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Любая из сторон имеет право расторгнуть договор при письменном уведомлении за 10 дней до момента 
                  расторжения. Заказчик должен оплатить уже выполненные работы в соответствии с актом приёма-передачи.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Конфиденциальность</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Обе стороны обязуются сохранять конфиденциальность информации, полученной в ходе сотрудничества, 
                  за исключением информации, находящейся в открытом доступе.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. Согласие с офертой</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Принятие Заказчиком коммерческого предложения путём оплаты или письменного согласия является 
                  безусловным согласием со всеми условиями настоящей оферты.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">12. Реквизиты Исполнителя</h2>
                <ul className="space-y-2 ml-6">
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Наименование:</strong> ИП Пуск</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Email:</strong> agencypusk@yandex.ru</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Телефон:</strong> +7 (928) 242-82-40</span>
                  </li>
                  <li className="text-foreground/80 flex gap-3">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span><strong className="text-foreground">Адрес:</strong> Сочи</span>
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
