import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** "full" shows icon + wordmark, "icon" shows only the mark */
  variant?: "full" | "icon";
  height?: number;
  /** Forces the text colour of the wordmark (only used in full variant) */
  dark?: boolean;
}

export function Logo({ className, variant = "full", height = 32, dark = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 shrink-0", className)} aria-label="ПУСК — на главную">
      <Image
        src="/logo.svg"
        alt="ПУСК логотип"
        width={Math.round(height * (8504.84 / 2645.88))}
        height={height}
        priority
        className="h-auto"
        style={{ width: "auto", height }}
      />
    </Link>
  );
}
