import { readNextPublicEnv } from "@/lib/shared/public-env";

/** Mount path por defecto en Webflow Cloud (hiwebmar). */
const DEFAULT_WEBFLOW_MOUNT = "/tools";

declare global {
  interface Window {
    /** Override en runtime para Code Components (ej. `"/tools"`). */
    __HIWEB_API_BASE__?: string;
  }
}

function normalizeBasePath(base: string): string {
  if (!base || base === "/") {
    return "";
  }
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function inferBasePathFromWindow(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const override = window.__HIWEB_API_BASE__;
  if (override) {
    return normalizeBasePath(override);
  }

  const { pathname, hostname } = window.location;

  if (pathname === DEFAULT_WEBFLOW_MOUNT || pathname.startsWith(`${DEFAULT_WEBFLOW_MOUNT}/`)) {
    return DEFAULT_WEBFLOW_MOUNT;
  }

  // Code component embebido en páginas del sitio Webflow; APIs en Cloud mount.
  if (hostname.endsWith(".webflow.io") || hostname.endsWith(".webflow.com")) {
    return DEFAULT_WEBFLOW_MOUNT;
  }

  return "";
}

/**
 * Prefijo para llamadas API cuando la app está montada bajo un subpath (Webflow Cloud).
 * Debe coincidir con `NEXT_PUBLIC_BASE_PATH` / mount path (ej. `/tools`).
 */
export function getApiBasePath(): string {
  const fromEnv = readNextPublicEnv("NEXT_PUBLIC_BASE_PATH");
  if (fromEnv) {
    return normalizeBasePath(fromEnv);
  }

  return inferBasePathFromWindow();
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBasePath()}${normalized}`;
}
