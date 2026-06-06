"use client";

import dynamic from "next/dynamic";

const FloatingHelpWidget = dynamic(
  () => import("@/components/floating-help-widget").then(m => ({ default: m.FloatingHelpWidget })),
  { ssr: false }
);

export function ClientWidgets() {
  return <FloatingHelpWidget />;
}