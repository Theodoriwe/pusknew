"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  white?: boolean;
}

export function Breadcrumbs({ items, white }: BreadcrumbsProps) {
  // Schema.org BreadcrumbList markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://pusk.agency",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `https://pusk.agency${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              style={{
                color: white ? "white" : "var(--muted-foreground)"
              }}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Главная</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight 
                className="w-4 h-4"
                style={{
                  color: white ? "rgba(255, 255, 255, 0.5)" : "var(--muted-foreground)"
                }}
              />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  style={{
                    color: white ? "white" : "var(--muted-foreground)"
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  style={{
                    color: white ? "white" : "var(--foreground)"
                  }}
                  className="font-medium"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
