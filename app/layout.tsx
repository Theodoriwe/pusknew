import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "@/components/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { FloatingHelpWidget } from "@/components/floating-help-widget";


const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400" },
    { path: "./fonts/inter-500.woff2", weight: "500" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const unbounded = localFont({
  src: [
    { path: "./fonts/unbounded-600.woff2", weight: "600" },
    { path: "./fonts/unbounded-700.woff2", weight: "700" },
    { path: "./fonts/unbounded-900.woff2", weight: "900" },
  ],
  variable: "--font-unbounded",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "ПУСК — Агентство цифрового маркетинга в Сочи",
    template: "%s | ПУСК",
  },
  description:
    "Разрабатываем сайты, запускаем рекламу и продвигаем бизнес в интернете. Более 200 успешных проектов за 7 лет работы. Контекстная реклама, SMM, SEO, веб-разработка в Сочи.",
  keywords: [
    "цифровой маркетинг",
    "разработка сайтов",
    "контекстная реклама",
    "сайт под ключ сочи",
    "заказать разработку сайта",
    "веб-разработка Сочи",
    "директолог сочи",
    "SMM маркетинг",
    "продвижение бизнеса",
    "Telegram боты",
    "геосервисы",
    "SEO оптимизация",
    "веб-разработка Сочи",
    "интернет реклама",
    "маркетинговое агентство Сочи",
  ],
  authors: [{ name: "ПУСК", url: "https://agencypusk.ru" }],
  creator: "ПУСК",
  publisher: "ПУСК",
  category: "business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://agencypusk.ru"),
  alternates: {
    canonical: "https://agencypusk.ru",
    languages: {
      "ru-RU": "https://agencypusk.ru",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ПУСК",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://agencypusk.ru",
    siteName: "ПУСК",
    title: "ПУСК — Агентство цифрового маркетинга в Сочи",
    description:
      "Разрабатываем сайты, запускаем рекламу и продвигаем бизнес в интернете. 200+ успешных проектов за 7 лет.",
    images: [
      {
        url: "https://agencypusk.ru/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ПУСК — Агентство цифрового маркетинга в Сочи",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pusk_agency",
    creator: "@pusk_agency",
    title: "ПУСК — Агентство цифрового маркетинга",
    description:
      "Разрабатываем сайты, запускаем рекламу и продвигаем бизнес в интернете.",
    images: ["https://agencypusk.ru/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ЗАМЕНИ_НА_РЕАЛЬНЫЙ_КОД",
    yandex: "ЗАМЕНИ_НА_РЕАЛЬНЫЙ_КОД",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "apple-mobile-web-app-title": "ПУСК",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agencypusk.ru/#organization",
      "name": "ПУСК",
      "alternateName": "PUSK Agency",
      "url": "https://agencypusk.ru",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://agencypusk.ru/#logo",
        "url": "https://agencypusk.ru/logo.png",
        "width": 200,
        "height": 60,
        "caption": "ПУСК — Агентство цифрового маркетинга",
      },
      "image": { "@id": "https://agencypusk.ru/#logo" },
      "description":
        "Агентство цифрового маркетинга в Сочи. Разрабатываем сайты, запускаем контекстную рекламу, SMM, SEO-продвижение.",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Сочи",
        "addressCountry": "RU",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Russian",
      },
      "sameAs": [],
    },
    {
      "@type": "WebSite",
      "@id": "https://agencypusk.ru/#website",
      "url": "https://agencypusk.ru",
      "name": "ПУСК",
      "description": "Агентство цифрового маркетинга в Сочи",
      "publisher": { "@id": "https://agencypusk.ru/#organization" },
      "inLanguage": "ru-RU",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://agencypusk.ru/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://agencypusk.ru/#webpage",
      "url": "https://agencypusk.ru",
      "name": "ПУСК — Агентство цифрового маркетинга в Сочи",
      "description":
        "Разрабатываем сайты, запускаем рекламу и продвигаем бизнес в интернете.",
      "isPartOf": { "@id": "https://agencypusk.ru/#website" },
      "about": { "@id": "https://agencypusk.ru/#organization" },
      "inLanguage": "ru-RU",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Главная",
            "item": "https://agencypusk.ru",
          },
        ],
      },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://agencypusk.ru/#localbusiness",
      "name": "ПУСК",
      "image": "https://agencypusk.ru/og-image.jpg",
      "url": "https://agencypusk.ru",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Сочи",
        "addressCountry": "RU",
      },
      "geo": {
        "@type": "GeoCoordinates",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
        },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги цифрового маркетинга",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Разработка сайтов" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Контекстная реклама" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO-продвижение" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SMM" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Таргетированная реклама" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Telegram-боты" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${unbounded.variable} overflow-x-hidden`}>
      <head>
       

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* color-scheme hint */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <ModalProvider>
          <div className="noise" />
          {children}
          <FloatingHelpWidget />
        </ModalProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}