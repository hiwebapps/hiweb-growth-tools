import type { ThemeVariant } from "./theme";

export type { ThemeVariant };

export type ToolViewState =
  | "intro"
  | "active"
  | "loading"
  | "error"
  | "success";

export type CodeComponentBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  themeVariant?: ThemeVariant;
  /** Fuerza un estado visual (útil en /design-system). */
  previewState?: ToolViewState;
  className?: string;
};

export function mergeProps<T extends object>(
  defaults: T,
  props: Partial<T>,
): T {
  const result = { ...defaults };

  for (const key of Object.keys(props) as Array<keyof T>) {
    const value = props[key];
    if (value !== undefined) {
      result[key] = value as T[keyof T];
    }
  }

  return result;
}
