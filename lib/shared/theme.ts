export type ThemeVariant = "light" | "dark" | "brand";

export function themeRootClass(variant: ThemeVariant = "light"): string {
  switch (variant) {
    case "dark":
      return "rounded-xl border border-slate-700 bg-slate-900 text-slate-50";
    case "brand":
      return "rounded-xl border border-brand-700 bg-brand-600 text-white";
    default:
      return "rounded-xl border border-border bg-surface text-foreground";
  }
}
