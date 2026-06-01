/**
 * Prefix for API calls when the app is mounted under a subpath on Webflow Cloud.
 * Set NEXT_PUBLIC_BASE_PATH to match next.config basePath (e.g. `/growth-tools`).
 */
export function getApiBasePath(): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || base === "/") {
    return "";
  }
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBasePath()}${normalized}`;
}
