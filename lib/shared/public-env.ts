/**
 * Lee variables NEXT_PUBLIC_* sin asumir que `process` existe (p. ej. Webflow code-island).
 */
export function readNextPublicEnv(key: string): string | undefined {
  if (typeof process === "undefined") {
    return undefined;
  }

  try {
    const value = process.env?.[key];
    return value === "" ? undefined : value;
  } catch {
    return undefined;
  }
}
