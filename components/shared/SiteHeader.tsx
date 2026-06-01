import Link from "next/link";
import { cn } from "@/lib/shared/utils";

const navItems = [
  { href: "/diagnostico-marketing-digital", label: "Diagnóstico" },
  { href: "/calendario", label: "Calendario" },
  { href: "/calculadora-roi", label: "ROI" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-border bg-surface/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="text-sm font-semibold text-foreground">
          Hiweb Growth Tools
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
