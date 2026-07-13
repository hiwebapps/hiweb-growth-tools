# Fase A — Calendario → n8n → Slack

Guía para conectar las reservas del calendario con **n8n** (VPS) y notificar el canal **`#leads-landing-page`** en Slack.

> **Workflow recomendado:** `hiweb-calendar-booked-full.json` incluye Slack, Google Calendar (Meet) y HubSpot. Guías: [N8N_CALENDAR_GOOGLE.md](./N8N_CALENDAR_GOOGLE.md), [N8N_CALENDAR_HUBSPOT.md](./N8N_CALENDAR_HUBSPOT.md). Este documento describe la Fase A (solo Slack).

## Flujo

```txt
Usuario confirma cita
  → POST /api/calendar/book (Webflow Cloud + D1)
  → Guarda en calendar_bookings
  → POST webhook a n8n (async, no bloquea al usuario)
  → n8n valida X-Webhook-Secret
  → n8n publica en #leads-landing-page
```

El frontend **nunca** llama a n8n directamente.

---

## 1. Importar workflow en n8n (VPS)

1. Abre n8n en tu VPS.
2. **Workflows → Import from file**.
3. Selecciona:

   `n8n/workflows/hiweb-calendar-booked-slack.json`

4. Abre el nodo **Slack — leads-landing-page** y asigna tu credencial de Slack (ver sección 2).
5. Guarda el workflow.

---

## 2. Configurar Slack en n8n

### Crear app de Slack (si no existe)

1. [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → From scratch.
2. Nombre sugerido: `Hiweb n8n`.
3. En **OAuth & Permissions**, agrega scopes del bot:
   - `chat:write`
   - `chat:write.public` (si el bot no está invitado al canal privado)
4. **Install to Workspace** y copia el **Bot User OAuth Token** (`xoxb-...`).

### Credencial en n8n

1. n8n → **Credentials → Add credential → Slack API**.
2. Pega el token del bot.
3. En el workflow, nodo Slack → selecciona esa credencial.

### Invitar el bot al canal

En Slack:

```txt
/invite @Hiweb n8n
```

(dentro de `#leads-landing-page`)

Los integrantes del canal recibirán la notificación según sus preferencias de Slack (mensaje normal en el canal; no hace falta `@channel` salvo que quieran ping a todos).

---

## 3. Secreto compartido en n8n

En el servidor del VPS, agrega a las variables de entorno de n8n:

```env
HIWEB_WEBHOOK_SECRET=genera-un-secreto-largo-aleatorio
```

Genera uno seguro, por ejemplo:

```bash
openssl rand -hex 32
```

El nodo **Validar secreto** compara el header `X-Webhook-Secret` con `HIWEB_WEBHOOK_SECRET`.

---

## 4. Activar workflow y copiar URL

1. Activa el workflow (**Active: ON**).
2. Abre el nodo **Webhook Calendario**.
3. Copia la **Production URL**, algo como:

   `https://n8n.tudominio.com/webhook/hiweb-calendar-booked`

---

## 5. Variables en Webflow Cloud

En el panel de **Webflow Cloud → Environment variables**:

| Variable | Valor |
|----------|--------|
| `N8N_WEBHOOK_CALENDAR_URL` | URL base del webhook (sin `?secret=`): `https://n8n.hiweb.mx/webhook/hiweb-calendar-booked` |
| `N8N_WEBHOOK_SECRET` | **El mismo** valor que `HIWEB_WEBHOOK_SECRET`. La app lo envía en header y en `?secret=` automáticamente. |

Redeploy la app tras guardar.

### Local (opcional)

En `.env.local`:

```env
N8N_WEBHOOK_CALENDAR_URL=https://n8n.tudominio.com/webhook/hiweb-calendar-booked
N8N_WEBHOOK_SECRET=tu-secreto
```

---

## 6. Payload que envía la app

Ejemplo al confirmar una cita:

```json
{
  "event": "calendar.booked",
  "bookingId": "clx...",
  "booking": {
    "id": "clx...",
    "name": "Juan Pérez",
    "email": "juan@empresa.com",
    "company": "Empresa SA",
    "phone": "+52 55 1234 5678",
    "service": "Auditoría SEO",
    "selectedDate": "2026-07-14",
    "selectedTime": "10:00",
    "status": "confirmed",
    "createdAt": "2026-07-10T19:00:00.000Z"
  },
  "summary": {
    "service": "seo-audit",
    "serviceLabel": "Auditoría SEO",
    "scheduleLabel": "14 jul 2026 10:00 a. m.",
    "date": "2026-07-14",
    "time": "10:00",
    "timeLabel": "10:00 a. m.",
    "timezone": "America/Mexico_City",
    "name": "Juan Pérez",
    "email": "juan@empresa.com",
    "company": "Empresa SA",
    "phone": "+52 55 1234 5678"
  },
  "slack": {
    "channel": "leads-landing-page",
    "text": "📅 *Nueva cita agendada*\n• Servicio: Auditoría SEO\n..."
  },
  "submittedAt": "2026-07-10T19:00:00.000Z"
}
```

El nodo Slack usa `{{ $json.slack.text }}` directamente.

También se dispara `calendar.cancelled` al cancelar una cita (mismo workflow).

---

## 7. Probar

### A) Curl directo a n8n (sin pasar por la app)

```bash
curl -X POST "https://n8n.tudominio.com/webhook/hiweb-calendar-booked" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: TU_SECRETO" \
  -d '{
    "event": "calendar.booked",
    "bookingId": "test-001",
    "summary": {
      "service": "Auditoría SEO",
      "scheduleLabel": "14 jul 2026 10:00 a. m.",
      "name": "Prueba Hiweb",
      "email": "prueba@hiweb.mx"
    },
    "slack": {
      "channel": "leads-landing-page",
      "text": "📅 *Nueva cita agendada (prueba)*\n• Servicio: Auditoría SEO\n• Horario: 14 jul 2026 10:00 a. m.\n• Nombre: Prueba Hiweb\n• Email: prueba@hiweb.mx\n• ID: test-001"
    }
  }'
```

Deberías ver el mensaje en `#leads-landing-page`.

### B) Reserva real en producción

1. Abre `https://hiwebmar.webflow.io/tools/calendario` (o desde la calculadora ROI → CTA auditoría).
2. Completa una cita de prueba.
3. Revisa ejecuciones en n8n y el canal de Slack.

### C) Health check (storage)

```bash
curl -s "https://hiwebmar.webflow.io/tools/api/health"
```

Debe responder `"storage": "d1"`.

---

## 8. Troubleshooting

| Síntoma | Causa probable | Qué hacer |
|---------|----------------|-----------|
| Cita OK pero sin Slack | `N8N_WEBHOOK_CALENDAR_URL` vacía en Cloud | Configurar variable y redeploy |
| n8n 401 / Unauthorized | Secreto distinto entre Cloud y n8n | Igualar `N8N_WEBHOOK_SECRET` y `HIWEB_WEBHOOK_SECRET` |
| Slack `channel_not_found` | Bot no invitado al canal | `/invite @bot` en `#leads-landing-page` |
| Slack `not_in_channel` | Falta scope o canal privado | Agregar `chat:write` e invitar bot |
| Webhook no llega | Firewall / URL incorrecta | Probar curl al VPS; revisar HTTPS y path |
| Ejecución falla en Validar secreto | Headers no expuestos | En n8n Webhook node → Options → Raw Body / incluir headers según versión |

Logs en Webflow Cloud: busca `[n8n] webhook dispatch failed` si la app no puede alcanzar n8n.

---

## 9. Siguiente fase (Portal)

Cuando el Portal esté listo, se agrega un nodo **HTTP Request** después de Slack (o en paralelo) hacia `POST /api/internal/bookings` en el VPS. La Fase A no requiere cambios en `hiweb-growth-tools`.

---

## Archivos relacionados

| Archivo | Rol |
|---------|-----|
| `app/api/calendar/book/route.ts` | Guarda + dispara webhook |
| `lib/n8n/client.ts` | Envío async a n8n |
| `lib/n8n/payloads.ts` | Payload + texto Slack |
| `n8n/workflows/hiweb-calendar-booked-slack.json` | Workflow importable (solo Slack) |
| `n8n/workflows/hiweb-calendar-booked-full.json` | Workflow Slack + Google Calendar + HubSpot |
| `docs/N8N_CALENDAR_GOOGLE.md` | Guía Google Calendar + Meet |
| `docs/N8N_CALENDAR_HUBSPOT.md` | Guía HubSpot CRM |
