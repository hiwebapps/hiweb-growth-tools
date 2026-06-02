# Hiweb Growth Tools

Suite modular de herramientas interactivas para Hiweb Marketing: diagnóstico digital, agendamiento y calculadora de ROI. Una sola app en Webflow Cloud con rutas internas y Code Components.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Webflow Cloud + Code Components (integración en fases posteriores)
- SQLite, KV Store y n8n (backend en fases posteriores)

## Herramientas y rutas

| Herramienta | Ruta |
|-------------|------|
| Quiz de diagnóstico | `/diagnostico-marketing-digital` |
| Calendario | `/calendario` |
| Calculadora ROI | `/calculadora-roi` |

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Vista previa del design system (desarrollo): [http://localhost:3000/design-system](http://localhost:3000/design-system).

### Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servidor tras build
- `npm run lint` — ESLint

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

| Variable | Uso |
|----------|-----|
| `N8N_WEBHOOK_QUIZ_URL` | Webhook n8n al enviar quiz |
| `N8N_WEBHOOK_CALENDAR_URL` | Webhook n8n al reservar cita |
| `N8N_WEBHOOK_ROI_URL` | Webhook n8n al enviar ROI |
| `N8N_WEBHOOK_SECRET` | Secreto compartido con n8n |
| `APP_URL` | URL pública de la app (ej. `http://localhost:3000`) |

No subas `.env` ni secretos al repositorio.

## APIs (estructura)

APIs implementadas (SQLite + webhooks n8n):

- `GET /api/health` — comprobación de deploy
- `POST /api/quiz/session`, `POST /api/quiz/submit`
- `GET /api/calendar/availability`, `POST /api/calendar/book`, `POST /api/calendar/cancel`
- `POST /api/roi/calculate`, `POST /api/roi/submit`

## Estructura de carpetas

```txt
app/
  diagnostico-marketing-digital/
  calendario/
  calculadora-roi/
  api/quiz|calendar|roi/
components/
  shared/
  code-components/
  quiz/ calendar/ roi/
lib/
  shared/
  db/
  quiz/ calendar/ roi/ n8n/
docs/
  HIWEB_GROWTH_TOOLS_SPEC.md
```

## Code Components (Fase 7)

Biblioteca **Hiweb Growth Tools** para Webflow Designer. Ver guía completa: [`docs/WEBFLOW_CODE_COMPONENTS.md`](docs/WEBFLOW_CODE_COMPONENTS.md).

```bash
npx webflow auth login
npm run webflow:import
```

| Componente | Ruta app |
|--------------|----------|
| `QuizToolComponent` | `/diagnostico-marketing-digital` |
| `CalendarToolComponent` | `/calendario` |
| `RoiCalculatorComponent` | `/calculadora-roi` |

Archivos: `components/code-components/*.webflow.tsx` + `webflow.json`.

**Quiz (Fase 4):** flujo completo en `/diagnostico-marketing-digital` — 8 preguntas, captura de lead, score en servidor, SQLite (`data/app.db`) y webhook n8n (fire-and-forget).

**Calendario (Fase 5):** flujo en `/calendario` — disponibilidad por fecha, reserva en SQLite, cancelación vía `POST /api/calendar/cancel` y webhook n8n.

**ROI (Fase 6):** flujo en `/calculadora-roi` — cálculo en servidor (`POST /api/roi/calculate`), guardado opcional con lead (`POST /api/roi/submit`) y webhook n8n.

## Documentación

Especificación completa: [`docs/HIWEB_GROWTH_TOOLS_SPEC.md`](docs/HIWEB_GROWTH_TOOLS_SPEC.md).

## Deploy (Webflow Cloud) — Fase 8

1. Push a GitHub (`hiwebapps/hiweb-growth-tools`, rama `main`).
2. Conectar el repo en **Webflow Cloud** (workspace Hiweb).
3. Definir **mount path** y `NEXT_PUBLIC_BASE_PATH` (mismo valor, ej. `/growth-tools`).
4. Variables: `APP_URL`, `N8N_WEBHOOK_*` (ver `.env.example`).
5. Deploy y validar `GET /api/health` + rutas de herramientas.

Guía paso a paso: [`docs/DEPLOY_WEBFLOW_CLOUD.md`](docs/DEPLOY_WEBFLOW_CLOUD.md).

Code Components: [`docs/WEBFLOW_CODE_COMPONENTS.md`](docs/WEBFLOW_CODE_COMPONENTS.md) — `npm run webflow:import` requiere **Workspace API token**.

## n8n

Los webhooks se disparan desde el servidor (fire-and-forget) tras validar y guardar en SQLite. El frontend nunca llama a n8n directamente.
