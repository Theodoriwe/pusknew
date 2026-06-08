import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuizSection } from "@/components/sections/quiz";
import { BrowserMockup } from "@/components/browser-mockup";
import { CasePageClient } from "./client";
import { casesData } from "@/lib/cases";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseData = casesData[slug];

  if (!caseData) {
    return {
      title: "Кейс не найден",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://direktolog.ru";
  const canonicalUrl = `${baseUrl}/kejsy/${slug}`;

  return {
    title: `${caseData.title} - Кейсы | Direktolog`,
    description: caseData.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${caseData.title} - Кейсы`,
      description: caseData.description,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: caseData.title,
        },
      ],
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const caseData = casesData[slug];

  if (!caseData) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://direktolog.ru";
  const canonicalUrl = `${baseUrl}/kejsy/${slug}`;

  // Remove unserializable icon field from results for client component
  const caseDataForClient = {
    ...caseData,
    results: caseData.results.map(({ icon, ...rest }) => rest),
  };

  const schemaJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: String(caseData.title),
    description: String(caseData.description),
    image: `${baseUrl}/og-image.jpg`,
    datePublished: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "Direktolog",
      url: baseUrl,
    },
    about: {
      "@type": "LocalBusiness",
      name: String(caseData.client),
      description: String(caseData.description),
      url: String(caseData.siteUrl || baseUrl),
    },
  });

  return (
    <>
      <Header />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-32">
        <div className="mb-20">
          <Breadcrumbs
            items={[
              { label: "Кейсы", href: "/kejsy" },
              { label: caseData.title },
            ]}
          />
        </div>
      </div>
      <main className="pt-0 lg:pt-0">
        <CasePageClient caseData={caseDataForClient} />

        {/* ── Browser Mockup ────────────────────────────────────────── */}
        {slug !== "florist-shop" && slug !== "bath-complex" && (
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--background) 0%, var(--background-alt) 100%)",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{
                  background: "var(--muted)",
                  border: "1px solid rgba(84,154,242,0.20)",
                  color: "var(--muted-foreground)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#549AF2" }} />
                Результат
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Как выглядит сайт
              </h2>
              <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
                Смотрите полный результат работы и переключайтесь между десктопной версией, мобильным видом и живым сайтом
              </p>
            </div>

            <BrowserMockup siteUrl={caseData.siteUrl} title={caseData.title} />
          </div>
        </section>
        )}

        {/* ── Quiz CTA ──────────────────────────────────────────────────── */}
        <QuizSection />

        {/* ── Next case ─────────────────────────────────────────────── */}
        {caseData.nextCase && (
          <section
            className="py-12 border-t"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between">
              <Link
                href="/kejsy"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--muted-foreground)" }}
              >
                <ArrowLeft size={15} />
                Все кейсы
              </Link>
              <Link href={`/kejsy/${caseData.nextCase.slug}`} className="group flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>
                    Следующий кейс
                  </p>
                  <p className="font-semibold group-hover:text-[#549AF2] transition-colors">
                    {caseData.nextCase.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {caseData.nextCase.category}
                  </p>
                </div>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(84,154,242,0.10)" }}
                >
                  <ArrowRight size={18} style={{ color: "#549AF2" }} />
                </div>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJSON }}
      />

      <Footer />
    </>
  );
}
