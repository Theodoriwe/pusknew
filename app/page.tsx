import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { CasesSection } from "@/components/sections/cases";
import { ProcessSection } from "@/components/sections/process";
import { TeamSection } from "@/components/sections/team";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PainPointsSection } from "@/components/sections/pain-points";

// Lazy load heavy components with SSR disabled for faster initial load
const QuizSection = dynamic(() => import("@/components/sections/quiz").then(mod => ({ default: mod.QuizSection })), {
  loading: () => null,
});
const FAQSection = dynamic(() => import("@/components/sections/faq").then(mod => ({ default: mod.FAQSection })), {
  loading: () => null,
});

// Schema.org markup for homepage
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ПУСК",
  alternateName: "Агентство ПУСК",
  description: "Агентство цифрового маркетинга — разработка сайтов, контекстная реклама, SMM, SEO",
  url: "https://pusk.agency",
  logo: "https://pusk.agency/logo.png",
  image: "https://pusk.agency/og-image.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-900-123-45-67",
    contactType: "sales",
    availableLanguage: ["Russian", "English"],
    contactOption: ["TollFree"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Примерная, 123",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  sameAs: [
    "https://t.me/pusk_agency",
    "https://vk.com/pusk_agency",
    "https://instagram.com/pusk_agency",
    "https://youtube.com/@pusk_agency",
  ],
  founder: {
    "@type": "Person",
    name: "ПУСК Team",
  },
  employees: {
    "@type": "Person",
    name: "Digital Marketing Team",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ПУСК",
  url: "https://pusk.agency",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://pusk.agency/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://pusk.agency",
  name: "ПУСК — Агентство цифрового маркетинга",
  alternateName: "ПУСК",
  description:
    "Разрабатываем сайты, запускаем рекламу и продвигаем бизнес в интернете. Более 200 успешных проектов за 7 лет работы в digital-маркетинге.",
  image: "https://pusk.agency/og-image.jpg",
  url: "https://pusk.agency",
  telephone: "+7-900-123-45-67",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Примерная, 123",
    addressLocality: "Москва",
    postalCode: "101000",
    addressCountry: "RU",
  },
  priceRange: "₽₽",
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "55.7558",
    longitude: "37.6173",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
};

// Service schema for services
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://pusk.agency",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Услуги",
      item: "https://pusk.agency/uslugi",
    },
  ],
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит разработка сайта?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость разработки сайта зависит от сложности проекта, функциональности и требований. От 150 тысяч рублей за базовый сайт. Свяжитесь с нами для точной оценки вашего проекта.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько времени занимает разработка сайта?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Обычно разработка сайта занимает от 4-6 недель (для простых сайтов) до 3-4 месяцев (для сложных веб-приложений).",
      },
    },
    {
      "@type": "Question",
      name: "Можете ли вы помочь с продвижением в поисковых системах?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы предоставляем полный спектр услуг SEO, включая оптимизацию сайта, семантический анализ и контент-маркетинг.",
      },
    },
  ],
};

// Company schema with full info
const companySchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ПУСК",
  description: "Агентство цифрового маркетинга",
  url: "https://pusk.agency",
  telephone: "+7-900-123-45-67",
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  knowsAbout: [
    "Веб-разработка",
    "Контекстная реклама",
    "SMM маркетинг",
    "SEO оптимизация",
    "Telegram боты",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(companySchema),
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
