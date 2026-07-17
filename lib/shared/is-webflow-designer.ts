/**
 * Detecta el canvas de Webflow Designer (no el sitio publicado).
 * En Designer el iframe suele estar en *.design.webflow.com
 */
export function isWebflowDesignerCanvas(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname.toLowerCase();
  if (host.endsWith(".design.webflow.com")) {
    return true;
  }

  if (host === "webflow.com" || host === "www.webflow.com") {
    return true;
  }

  try {
    if (window.self !== window.top) {
      const ref = document.referrer.toLowerCase();
      if (ref.includes("webflow.com/design") || ref.includes("design.webflow.com")) {
        return true;
      }
    }
  } catch {
    // Iframe cross-origin en sitio publicado: no asumir Designer.
    return false;
  }

  return false;
}
