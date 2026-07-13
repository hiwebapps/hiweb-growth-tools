# Calendario → n8n → HubSpot (leads)

Guía para registrar cada cita confirmada como **contacto (lead)** en HubSpot, con la reunión en el timeline del contacto.

Requiere el workflow extendido con Slack y Google Calendar. Ver [N8N_CALENDAR_GOOGLE.md](./N8N_CALENDAR_GOOGLE.md).

## Flujo

```txt
Usuario confirma cita
  → POST /api/calendar/book (Webflow Cloud + D1)
  → POST webhook a n8n
  → Slack #leads-landing-page
  → Google Calendar + Meet (paralelo)
  → HubSpot: Contacto (lead) → Reunión en timeline (paralelo a GCal)
```

No se crean **Deals** ni pipeline de ventas: solo listado de leads en **Contacts**.

El frontend **nunca** llama a HubSpot directamente.

---

## 1. Crear Private App en HubSpot

1. HubSpot → **Settings (⚙) → Integrations → Private Apps → Create a private app**
2. Nombre sugerido: `Hiweb n8n Calendario`
3. En **Scopes**, activa al menos:

| Scope | Uso |
|-------|-----|
| `crm.objects.contacts.read` | Buscar contactos |
| `crm.objects.contacts.write` | Crear/actualizar contactos (leads) |
| `crm.schemas.contacts.read` | Propiedades de contacto |

> **Reuniones:** el nodo **HubSpot — Reunión** usa **Engagement** (tipo `meeting`) en n8n. No existe scope `crm.objects.meetings` en Private Apps; con permisos de contactos suele bastar.

4. **Create app** y copia el **Token de acceso** (`pat-...`).

### Credencial en n8n

Usa **HubSpot App Token** (en n8n reciente puede llamarse **HubSpot Service Key**). **No** uses OAuth2 (Client ID / Client Secret).

| En HubSpot (Private App) | En n8n |
|--------------------------|--------|
| **Token de acceso** (`pat-...`) | Pégalo en el único campo de la credencial |
| **Secreto del cliente** | No se usa en este workflow |

1. n8n → **Credentials → Add credential → HubSpot App Token**
2. Pega el **Token de acceso**
3. Asigna la credencial en **HubSpot — Contacto** y **HubSpot — Reunión**

---

## 2. Propiedades personalizadas en Contact (recomendadas)

Crea en HubSpot (**Settings → Properties → Contact**):

| Nombre interno | Etiqueta sugerida | Tipo |
|----------------|-------------------|------|
| `hiweb_booking_id` | Hiweb Booking ID | Texto |
| `hiweb_service` | Hiweb Servicio | Texto |
| `hiweb_schedule_label` | Hiweb Horario | Texto |
| `lead_source` | Lead Source | Texto o lista |

Si **no** creas estas propiedades, elimina el bloque `customPropertiesUi` del nodo **HubSpot — Contacto** tras importar el workflow.

### Ver leads en HubSpot

**CRM → Contacts** — filtra por `lead_source = Calendario Hiweb` o busca por email. Cada cita nueva crea o actualiza el contacto; la reunión aparece en el **timeline** del contacto.

---

## 3. Importar workflow en n8n

1. Desactiva el workflow anterior si usas el mismo webhook.
2. **Workflows → Import from file** → `n8n/workflows/hiweb-calendar-booked-full.json`
3. Asigna credenciales: Slack, Google Calendar, HubSpot (2 nodos)
4. Activa el workflow

### Nodos HubSpot

| Nodo | Acción |
|------|--------|
| **Preparar HubSpot contacto** | Arma el body del upsert; `phone` y `company` solo si el usuario los llenó |
| **HubSpot — Contacto** | HTTP `batch/upsert` por email → lead en Contacts |
| **HubSpot — Reunión** | Cita en timeline del contacto (fecha, servicio, notas) |

Solo **nombre** y **email** son obligatorios en el formulario. Si empresa o teléfono van vacíos, el workflow no falla.

Slack y Google Calendar corren en **paralelo** con HubSpot.

---

## 4. Payload que envía la app

Tras deploy, cada `calendar.booked` incluye:

```json
{
  "hubspot": {
    "contact": {
      "email": "juan@empresa.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "+52 55 1234 5678",
      "company": "Empresa SA"
    },
    "meeting": {
      "title": "Auditoría SEO — Juan Pérez",
      "body": "Reserva ID: clx...",
      "start": "2026-07-14T10:00:00-06:00",
      "end": "2026-07-14T10:30:00-06:00"
    },
    "properties": {
      "leadSource": "Calendario Hiweb",
      "bookingId": "clx...",
      "serviceLabel": "Auditoría SEO",
      "scheduleLabel": "14 jul 2026 10:00 a. m."
    }
  }
}
```

`phone` y `company` se omiten del payload cuando el usuario no los completa.

---

## 5. Probar

### Curl directo a n8n

```bash
curl -X POST "https://n8n.hiweb.mx/webhook/hiweb-calendar-booked?secret=TU_SECRETO" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "calendar.booked",
    "bookingId": "test-hubspot-001",
    "calendar": {
      "title": "Auditoría SEO — Prueba",
      "description": "Reserva ID: test-hubspot-001",
      "start": "2026-07-15T10:00:00-06:00",
      "end": "2026-07-15T10:30:00-06:00",
      "attendeeEmail": "prueba@tu-dominio.com"
    },
    "hubspot": {
      "contact": {
        "email": "prueba@tu-dominio.com",
        "firstName": "Prueba",
        "lastName": "Hiweb",
        "phone": null,
        "company": "Hiweb Test"
      },
      "meeting": {
        "title": "Auditoría SEO — Prueba",
        "body": "Reserva ID: test-hubspot-001",
        "start": "2026-07-15T10:00:00-06:00",
        "end": "2026-07-15T10:30:00-06:00",
        "startTimeMs": 1784128800000,
        "endTimeMs": 1784130600000
      },
      "properties": {
        "leadSource": "Calendario Hiweb",
        "bookingId": "test-hubspot-001",
        "serviceLabel": "Auditoría SEO",
        "scheduleLabel": "15 jul 2026 10:00 a. m."
      }
    },
    "slack": {
      "channel": "leads-landing-page",
      "text": "📅 *Nueva cita (prueba HubSpot)*\n• Email: prueba@tu-dominio.com"
    }
  }'
```

### Verificar en HubSpot

1. **Contacts** → contacto por email
2. Propiedades `hiweb_*` y `lead_source` si las creaste
3. **Timeline** → reunión con fecha/hora

---

## 6. Troubleshooting

| Síntoma | Qué hacer |
|---------|-----------|
| `missing hubspot.contact.email` | Redeploy app con payload actualizado |
| HubSpot 401 | Regenerar token `pat-...` y actualizar credencial n8n |
| Propiedad desconocida | Crear custom property en Contact o quitar `customPropertiesUi` |
| Meeting no aparece | Revisar nodo **HubSpot — Reunión** en Executions |
| Pediste OAuth en n8n | Usa **App Token**, no Client ID/Secret |

---

## 7. Opcional más adelante

- Deals + pipeline si empiezan a usar ventas en HubSpot
- Sincronizar cancelaciones (`calendar.cancelled`)
- Quiz/ROI → mismo listado de Contacts

---

## Archivos relacionados

| Archivo | Rol |
|---------|-----|
| `lib/n8n/payloads.ts` | Bloque `hubspot` |
| `n8n/workflows/hiweb-calendar-booked-full.json` | Workflow Slack + GCal + HubSpot |
| `docs/N8N_CALENDAR_GOOGLE.md` | Guía Google Calendar |
