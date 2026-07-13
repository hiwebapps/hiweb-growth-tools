# Calendario → n8n → Slack + Google Calendar (Meet)

Guía para extender el flujo de reservas con **Google Calendar** y envío automático de invitación con **Google Meet** al correo del cliente.

Requiere tener funcionando la Fase A (Slack). Ver [N8N_CALENDAR_SLACK.md](./N8N_CALENDAR_SLACK.md).

## Flujo

```txt
Usuario confirma cita
  → POST /api/calendar/book (Webflow Cloud + D1)
  → Guarda en calendar_bookings
  → POST webhook a n8n
  → n8n valida secreto
  → Slack #leads-landing-page
  → Google Calendar: evento + Meet + invitación al cliente
```

El frontend **nunca** llama a n8n ni a Google directamente.

---

## 1. Importar workflow en n8n

1. Abre n8n en tu VPS (`https://n8n.hiweb.mx`).
2. **Workflows → Import from file**.
3. Selecciona:

   `n8n/workflows/hiweb-calendar-booked-full.json`

4. Si ya tienes activo `hiweb-calendar-booked-slack.json`, **desactívalo** antes de activar el nuevo (mismo path de webhook).
5. Asigna credenciales en los nodos Slack y Google Calendar (secciones 2 y 3).
6. Guarda y activa el workflow.

---

## 2. Credencial Google Calendar (cuenta personal)

Usarás la cuenta Google personal del miembro del equipo que recibirá las citas en su calendario.

### Crear credencial OAuth en Google Cloud

1. [Google Cloud Console](https://console.cloud.google.com/) → proyecto (o crea uno, ej. `hiweb-n8n`).
2. **APIs & Services → Enable APIs** → activa **Google Calendar API**.
3. **OAuth consent screen** → External o Internal según tu workspace.
4. **Credentials → Create credentials → OAuth client ID**:
   - Tipo: **Web application**
   - Authorized redirect URIs: la URL que muestra n8n al crear la credencial Google Calendar OAuth2 (algo como `https://n8n.hiweb.mx/rest/oauth2-credential/callback`).
5. Copia **Client ID** y **Client Secret**.

### Credencial en n8n

1. n8n → **Credentials → Add credential → Google Calendar OAuth2 API**.
2. Pega Client ID y Client Secret.
3. **Connect my account** e inicia sesión con la cuenta personal de Google del equipo.
4. En el nodo **Google Calendar — Crear evento**:
   - Selecciona esa credencial.
   - **Calendar**: elige el calendario de esa cuenta (`primary` o el email de la cuenta).

> Anota el email de la cuenta aquí cuando lo configures, para referencia del equipo.

### Verificar Google Meet

Crea manualmente un evento de prueba en Google Calendar con Meet en esa cuenta. Si no aparece la opción de videollamada, habilita Meet en la cuenta Google Workspace / personal.

---

## 3. Configurar nodos del workflow

### Slack — leads-landing-page

Igual que en la guía Slack: credencial del bot e invitación al canal `#leads-landing-page`.

### Google Calendar — Crear evento

El nodo ya viene configurado con:

| Campo | Valor |
|-------|--------|
| Start | `{{ $json.calendar.start }}` |
| End | `{{ $json.calendar.end }}` |
| Summary | `{{ $json.calendar.title }}` |
| Description | `{{ $json.calendar.description }}` |
| Attendees | `{{ $json.calendar.attendeeEmail }}` |
| Conference Data | Google Meet |
| Send Updates | `all` |

Con **Send Updates: all**, Google envía al cliente un correo de invitación al evento con el enlace de **Google Meet**. No hace falta un nodo Gmail adicional.

---

## 4. Variables de entorno

Sin cambios respecto a la Fase A:

| Dónde | Variable | Valor |
|-------|----------|--------|
| n8n VPS | `HIWEB_WEBHOOK_SECRET` | Secreto compartido |
| Webflow Cloud | `N8N_WEBHOOK_CALENDAR_URL` | `https://n8n.hiweb.mx/webhook/hiweb-calendar-booked` |
| Webflow Cloud | `N8N_WEBHOOK_SECRET` | Mismo que `HIWEB_WEBHOOK_SECRET` |

Redeploy la app tras actualizar variables.

---

## 5. Payload que envía la app

Al confirmar una cita (`calendar.booked`), la app incluye el bloque `calendar`:

```json
{
  "event": "calendar.booked",
  "bookingId": "clx...",
  "booking": { "...": "..." },
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
  "calendar": {
    "title": "Auditoría SEO — Juan Pérez",
    "description": "Reserva ID: clx...\nCliente: Juan Pérez\nEmail: juan@empresa.com",
    "start": "2026-07-14T10:00:00-06:00",
    "end": "2026-07-14T10:30:00-06:00",
    "timeZone": "America/Mexico_City",
    "attendeeEmail": "juan@empresa.com",
    "durationMinutes": 30
  },
  "slack": {
    "channel": "leads-landing-page",
    "text": "📅 *Nueva cita agendada*\n..."
  },
  "submittedAt": "2026-07-10T19:00:00.000Z"
}
```

Las cancelaciones (`calendar.cancelled`) siguen enviando solo Slack; no crean ni borran eventos en Google Calendar (fase futura).

---

## 6. Probar

### A) Curl directo a n8n

```bash
curl -X POST "https://n8n.hiweb.mx/webhook/hiweb-calendar-booked?secret=TU_SECRETO" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "calendar.booked",
    "bookingId": "test-gcal-001",
    "summary": {
      "serviceLabel": "Auditoría SEO",
      "name": "Prueba Hiweb",
      "email": "tu-email-real@gmail.com"
    },
    "calendar": {
      "title": "Auditoría SEO — Prueba Hiweb",
      "description": "Reserva ID: test-gcal-001\nCliente: Prueba Hiweb",
      "start": "2026-07-15T10:00:00-06:00",
      "end": "2026-07-15T10:30:00-06:00",
      "timeZone": "America/Mexico_City",
      "attendeeEmail": "tu-email-real@gmail.com",
      "durationMinutes": 30
    },
    "slack": {
      "channel": "leads-landing-page",
      "text": "📅 *Nueva cita agendada (prueba GCal)*\n• Servicio: Auditoría SEO\n• Nombre: Prueba Hiweb\n• Email: tu-email-real@gmail.com\n• ID: test-gcal-001"
    }
  }'
```

Verifica:

1. Mensaje en `#leads-landing-page`.
2. Evento en el calendario personal de Google.
3. Correo de invitación al `attendeeEmail` con enlace Meet.

### B) Reserva real en producción

1. Abre `https://hiwebmar.webflow.io/tools/calendario`.
2. Elige día y hora (el flujo avanza solo al paso de datos).
3. Completa nombre y email real.
4. Revisa n8n → Executions, Slack, Google Calendar y bandeja del cliente.

---

## 7. Troubleshooting

| Síntoma | Causa probable | Qué hacer |
|---------|----------------|-----------|
| Slack OK, sin evento GCal | Credencial Google no asignada o nodo desconectado | Revisar conexiones y credencial OAuth |
| Evento sin Meet | Conference Data no habilitado | En el nodo, Additional Fields → Conference Data → Google Meet |
| Cliente no recibe correo | `sendUpdates` no es `all` | Verificar Additional Fields → Send Updates → all |
| `Invalid payload: missing calendar.start/end` | App sin redeploy | Redeploy con versión que incluye bloque `calendar` |
| `Unauthorized` | Secreto distinto | Igualar `N8N_WEBHOOK_SECRET` y `HIWEB_WEBHOOK_SECRET` |
| OAuth redirect error | URI incorrecta en Google Cloud | Copiar URI exacta desde n8n credential setup |
| Evento en calendario equivocado | Calendar ID incorrecto | Elegir `primary` o el email de la cuenta correcta |

---

## 8. Siguiente fase (opcional)

- Guardar `googleEventId` en D1 al crear el evento.
- Al cancelar (`calendar.cancelled`), borrar o actualizar el evento en Google Calendar.
- Correo HTML con branding Hiweb además de la invitación nativa de Google.

---

## Archivos relacionados

| Archivo | Rol |
|---------|-----|
| `lib/n8n/payloads.ts` | Bloque `calendar` + texto Slack |
| `lib/calendar/calendar-rules.ts` | Helpers ISO start/end |
| `n8n/workflows/hiweb-calendar-booked-full.json` | Workflow Slack + GCal |
| `n8n/workflows/hiweb-calendar-booked-slack.json` | Workflow anterior (solo Slack) |
| `docs/N8N_CALENDAR_SLACK.md` | Guía Fase A |
