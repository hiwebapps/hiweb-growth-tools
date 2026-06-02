# Webflow Code Components — Hiweb Growth Tools

Guía para publicar e insertar los tres módulos interactivos en Webflow Designer.

## Componentes disponibles

| Componente en Designer | Archivo React | Grupo |
|------------------------|---------------|--------|
| Quiz — Diagnóstico marketing | `QuizToolComponent` | Hiweb Growth Tools |
| Calendario — Agendar llamada | `CalendarToolComponent` | Hiweb Growth Tools |
| Calculadora — ROI marketing | `RoiCalculatorComponent` | Hiweb Growth Tools |

Las definiciones para Webflow están en `components/code-components/*.webflow.tsx` (`declareComponent` + `@webflow/data-types`).

## Requisitos

- Cuenta Webflow con acceso al workspace
- Node.js 20+
- Token de API: [Webflow Account → API access](https://webflow.com/dashboard/account/integrations)

```bash
# .env.local (no subir al repo)
# Workspace API token (Workspace Admin → Apps & Integrations → Workspace API Access)
WEBFLOW_API_TOKEN=your_workspace_token_here
```

> **Importante:** Un **Site API token** permite `webflow sites list`, pero **`devlink import` falla** con “invalid or not authorized”. Usa siempre un **Workspace API token** o `npx webflow auth login --force`.

## Configuración del proyecto

- `webflow.json` — framework `nextjs` + biblioteca de componentes
- `NEXT_PUBLIC_BASE_PATH` — debe coincidir con el **mount path** de Webflow Cloud (ej. `/growth-tools`). Vacío en local.
- Las APIs usan rutas relativas (`/api/...`) con ese prefijo automático.

## Publicar la biblioteca en Webflow

```bash
npm install
npx webflow auth login
npx webflow devlink import
```

`devlink import` compila los `.webflow.tsx` y sube la biblioteca **Hiweb Growth Tools** al workspace.

Desarrollo local del bundle (opcional):

```bash
npm run webflow:bundle
```

## Usar en Webflow Designer

1. Abre el sitio en Webflow Designer.
2. Panel **Components** → biblioteca **Hiweb Growth Tools**.
3. Arrastra el componente a la página.
4. En el panel derecho, edita props (título, copy, CTA, tema, etc.).
5. Publica el sitio.

**No expongas en props:** webhooks, secretos, fórmulas ni scoring (solo copy y configuración visual segura).

## Webflow Cloud (app Next.js)

1. Conecta el repo de GitHub en Webflow Cloud.
2. Framework: **Next.js** (detectado vía `webflow.json`).
3. Configura el **mount path** y la misma variable `NEXT_PUBLIC_BASE_PATH`.
4. Variables de entorno de servidor: `N8N_WEBHOOK_*`, `APP_URL`, etc. (ver `.env.example`).
5. Deploy con `next build`.

La app completa sigue disponible en rutas:

- `/diagnostico-marketing-digital`
- `/calendario`
- `/calculadora-roi`

Los Code Components llaman a las mismas APIs (`/api/quiz`, `/api/calendar`, `/api/roi`).

## Solución de problemas

| Problema | Acción |
|----------|--------|
| `devlink import` falla por tipos | Revisa `npm run build`; usa `--force` solo si entiendes el error |
| `devlink import` — token no autorizado | Usa **Workspace API token**, no Site token. Ver [`DEPLOY_WEBFLOW_CLOUD.md`](./DEPLOY_WEBFLOW_CLOUD.md) §6 |
| Designer: `CompilationError: Invalid source code` | No importes archivos `.css` en componentes; usa `<style>` inline. Reimporta tras `npm run webflow:bundle` |
| APIs 404 en producción | Verifica `NEXT_PUBLIC_BASE_PATH` = mount path |
| Componente vacío en Designer | Confirma deploy de la app Cloud y CORS/origen del sitio |
| n8n no recibe datos | Revisa variables `N8N_WEBHOOK_*` en el entorno Cloud |

## Referencias

- [Code Components — Define](https://developers.webflow.com/code-components/define-code-component)
- [Webflow Cloud — Bring your own app](https://developers.webflow.com/webflow-cloud/bring-your-own-app)
- Spec del proyecto: `docs/HIWEB_GROWTH_TOOLS_SPEC.md`
