import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";

const PainPointsSection = dynamic(() => import("@/components/sections/pain-points").then(m => ({ default: m.PainPointsSection })));
const ServicesSection = dynamic(() => import("@/components/sections/services").then(m => ({ default: m.ServicesSection })));
const CasesSection = dynamic(() => import("@/components/sections/cases").then(m => ({ default: m.CasesSection })));
const ProcessSection = dynamic(() => import("@/components/sections/process").then(m => ({ default: m.ProcessSection })));
const TeamSection = dynamic(() => import("@/components/sections/team").then(m => ({ default: m.TeamSection })));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials").then(m => ({ default: m.TestimonialsSection })));
const QuizSection = dynamic(() => import("@/components/sections/quiz").then(m => ({ default: m.QuizSection })));
const FAQSection = dynamic(() => import("@/components/sections/faq").then(m => ({ default: m.FAQSection })));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Сколько стоит разработка сайта?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "От 35 тысяч рублей за базовый сайт. Свяжитесь с нами для точной оценки.",
                },
              },
              {
                "@type": "Question",
                name: "Сколько времени занимает разработка сайта?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "От 1-2 недель для простых сайтов до 2-3 месяцев для сложных проектов.",
                },
              },
              {
                "@type": "Question",
                name: "Можете помочь с SEO продвижением?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Да, мы предоставляем полный спектр SEO услуг.",
                },
              },
            ],
          }),
        }}
      />
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <PainPointsSection />
        <ServicesSection />
        <CasesSection />
        <ProcessSection />
        <TeamSection />
        <TestimonialsSection />
        <QuizSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}