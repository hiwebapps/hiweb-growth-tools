# Fase 8 — Deploy en Webflow Cloud

Checklist para publicar **Hiweb Growth Tools** en producción.

## Estado previo

| Paso | Estado |
|------|--------|
| `npm run build` local | ✅ Debe pasar antes de cada deploy |
| Push a GitHub `hiwebapps/hiweb-growth-tools` | ✅ `main` en [github.com/hiwebapps/hiweb-growth-tools](https://github.com/hiwebapps/hiweb-growth-tools) |
| Bundle Code Components (`npm run webflow:bundle`) | ✅ Local OK |
| `webflow devlink import` | ⚠️ Requiere **Workspace API token** (ver abajo) |
| App conectada en Webflow Cloud | Pendiente (panel Webflow) |

## 1. Conectar el repositorio

1. Abre el workspace **Hiweb** en Webflow.
2. Ve a **Webflow Cloud** (o Apps → tu app Cloud).
3. **Connect repository** → GitHub → `hiwebapps/hiweb-growth-tools`.
4. Rama: `main`.
5. Framework: **Next.js** (detectado por `webflow.json` → `"framework": "nextjs"`).

## 2. Mount path y `basePath`

Define en Webflow Cloud el **mount path** de la app, por ejemplo:

```txt
/growth-tools
```

En el entorno Cloud, configura **la misma ruta** en:

```env
NEXT_PUBLIC_BASE_PATH=/growth-tools
```

Opcional (alias interno): `WEBFLOW_MOUNT_PATH=/growth-tools`

Sin esto, las APIs (`/api/quiz`, etc.) y assets fallarán en producción con 404.

Rutas públicas tras el deploy (ejemplo con mount `/growth-tools`):

| Ruta |
|------|
| `/growth-tools/` |
| `/growth-tools/diagnostico-marketing-digital` |
| `/growth-tools/calendario` |
| `/growth-tools/calculadora-roi` |
| `/growth-tools/api/health` |

## 3. Variables de entorno (Cloud)

Copia desde `.env.example` y completa en el panel de Webflow Cloud:

| Variable | Obligatoria | Notas |
|----------|-------------|--------|
| `NEXT_PUBLIC_BASE_PATH` | Sí (si hay mount) | Igual al mount path |
| `APP_URL` | Sí | URL pública completa de la app, ej. `https://www.hiweb.com/growth-tools` |
| `N8N_WEBHOOK_QUIZ_URL` | Para leads quiz | Solo servidor |
| `N8N_WEBHOOK_CALENDAR_URL` | Para reservas | Solo servidor |
| `N8N_WEBHOOK_ROI_URL` | Para ROI | Solo servidor |
| `N8N_WEBHOOK_SECRET` | Recomendada | Header compartido con n8n |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Opcional | Lectura GCal — ver [GOOGLE_CALENDAR_SERVICE_ACCOUNT.md](./GOOGLE_CALENDAR_SERVICE_ACCOUNT.md) |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Opcional | Clave PEM de la service account |
| `GOOGLE_CALENDAR_ID` | Opcional | Email o ID del calendario compartido con la SA |

**No** subas `WEBFLOW_API_TOKEN` al entorno Cloud (solo sirve para CLI local / import).

### SQLite (D1) en Cloud

1. En Webflow Cloud → **Storage** → **Add Storage** (SQLite).
2. El repo incluye `wrangler.json` con binding `DATABASE` y migraciones en `./migrations`.
3. Tras **commit + push**, Webflow aplica migraciones y asigna el `database_id` real.
4. En local sigue funcionando `data/app.db` con `better-sqlite3`.

Comprueba el backend activo:

```bash
curl -s "https://hiwebmar.webflow.io/tools/api/health"
# { "storage": "d1" } en Cloud con D1 configurado
# { "storage": "sqlite" } en local
```

## 4. Deploy

1. Guarda variables de entorno.
2. Lanza **Deploy** (o push a `main` si tienes auto-deploy).
3. Revisa logs de build: debe ejecutarse `next build` sin errores.

## 5. Validación post-deploy

Sustituye `{BASE}` por tu mount path (vacío en local).

```bash
# Health
curl -s "{APP_URL}/api/health"

# Quiz — crear sesión
curl -s -X POST "{APP_URL}/api/quiz/session" -H "Content-Type: application/json"

# ROI — cálculo
curl -s -X POST "{APP_URL}/api/roi/calculate" \
  -H "Content-Type: application/json" \
  -d "{\"monthlyBudget\":5000,\"averageLeadValue\":1200,\"leadsToCloseSale\":15,\"industry\":\"saas\"}"
```

En el navegador:

- [ ] Hub o rutas de herramientas cargan
- [ ] Quiz completa flujo y guarda lead
- [ ] Calendario muestra slots y reserva
- [ ] Calculadora ROI actualiza preview y envía lead
- [ ] Code Components en Designer apuntan a la app desplegada (mismo origen / base path)

## 6. Importar Code Components al workspace

`webflow sites list` puede funcionar con un **Site token**, pero **`webflow devlink import` exige un Workspace API token**.

1. Workspace **Hiweb** → **Apps & Integrations** → **Manage**.
2. Sección **Workspace API Access** → **Generate API Token** (necesitas ser **Workspace Admin**).
3. En `.env.local`:

   ```env
   WEBFLOW_API_TOKEN=<workspace-token-aqui>
   ```

4. Importar:

   ```bash
   npm run webflow:import
   ```

   Alternativa OAuth (recomendada la primera vez):

   ```bash
   npx webflow auth login --force
   npm run webflow:import
   ```

5. En Designer: panel **Components** → biblioteca **Hiweb Prueba** (`webflow.json` → `library.id: hiweb-prueba`).

## 7. Siguiente fase

Tras deploy estable → **Fase 9 (Resiliencia)**: `pending_sync`, errores UI, logs seguros, n8n caído sin romper UX.

## Referencias

- [`WEBFLOW_CODE_COMPONENTS.md`](./WEBFLOW_CODE_COMPONENTS.md)
- [`HIWEB_GROWTH_TOOLS_SPEC.md`](./HIWEB_GROWTH_TOOLS_SPEC.md)
- [Webflow Cloud — Bring your own app](https://developers.webflow.com/webflow-cloud/bring-your-own-app)
- [Code Components — Installation](https://developers.webflow.com/code-components/installation)
