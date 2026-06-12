import type { Metadata } from "next";

export const generateMetadata = (title: string, description: string, path: string): Metadata => {
  return {
    title: `${title} | ПУСК`,
    description: description,
    metadataBase: new URL("https://agencypusk.ru"),
    alternates: {
      canonical: `https://agencypusk.ru${path}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://agencypusk.ru${path}`,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/og-image.jpg"],
    },
  };
};

// Service Schema generator
export const generateServiceSchema = (
  serviceName: string,
  description: string,
  provider: string = "ПУСК"
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  description: description,
  provider: {
    "@type": "Organization",
    name: provider,
    url: "https://agencypusk.ru",
    telephone: "+7-900-123-45-67",
  },
  serviceType: serviceName,
  areaServed: {
    "@type": "City",
    name: "Сочи",
  },
  priceRange: "₽₽",
  image: "https://agencypusk.ru/og-image.jpg",
});

// Breadcrumb Schema generator
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
