# Calendario — administración y sincronización

Operaciones de mantenimiento para la base D1 de reservas y sincronización con Google Calendar.

> Todas las rutas admin exigen el header `X-Webhook-Secret` con el mismo valor que `N8N_WEBHOOK_SECRET`.

---

## Vaciar reservas de prueba

Elimina **todas** las filas de `calendar_bookings` (confirmadas y canceladas).

### Producción (Webflow Cloud)

```bash
curl -X POST "https://hiwebmar.webflow.io/tools/api/calendar/admin/purge" \
  -H "X-Webhook-Secret: TU_SECRETO"
```

Respuesta esperada:

```json
{
  "ok": true,
  "deleted": 12,
  "message": "Se eliminaron 12 reservas de prueba."
}
```

### Local

```bash
curl -X POST "http://localhost:3000/api/calendar/admin/purge" \
  -H "X-Webhook-Secret: TU_SECRETO"
```

> **Nota:** No hay consola SQL en Webflow Cloud para ejecutar `DELETE` a mano. Esta ruta es la forma prevista de limpiar datos de prueba.

---

## Cancelar en Google Calendar → actualizar D1

Si borras un evento directamente en Google Calendar, la reserva en D1 **no se enteraba** sola. Ahora hay dos mecanismos:

### 1. Automático al abrir el calendario (recomendado)

Cada vez que alguien consulta disponibilidad (`GET /api/calendar/availability`), la app:

1. Lista reservas `confirmed` de ese día en D1
2. Busca en Google Calendar el evento con `Reserva ID: {bookingId}` en la descripción
3. Si **no existe**, marca la reserva como `cancelled` en D1 (sin volver a llamar a n8n)

Requisito: variables `GOOGLE_SERVICE_ACCOUNT_*` configuradas y calendario compartido con la service account (ver [GOOGLE_CALENDAR_SERVICE_ACCOUNT.md](./GOOGLE_CALENDAR_SERVICE_ACCOUNT.md)).

**Prueba:** cancela un evento en GCal → abre el calendario Hiweb en ese día → el horario debe volver a estar disponible.

### 2. Webhook manual (opcional, para n8n)

Si quieres sincronizar al instante sin esperar a que alguien abra el calendario:

```bash
curl -X POST "https://hiwebmar.webflow.io/tools/api/calendar/sync-cancel" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: TU_SECRETO" \
  -d '{"bookingId":"uuid-de-la-reserva"}'
```

Útil si más adelante conectas un trigger de Google Calendar en n8n que lea el `bookingId` de la descripción del evento cancelado.

---

## Flujos de cancelación

| Origen | D1 | Google Calendar | Slack |
|--------|----|-----------------|-------|
| Usuario en la app | `cancelled` | n8n elimina evento | n8n notifica |
| Usuario en Google Calendar | sync al consultar availability | ya borrado | no |
| `POST /sync-cancel` | `cancelled` | ya borrado | no |
| `POST /admin/purge` | filas eliminadas | no toca GCal | no |

---

## Seguridad

- No expongas `N8N_WEBHOOK_SECRET` en el frontend.
- Usa estas rutas solo desde terminal, n8n o scripts internos.
- `purge` es destructivo: borra todo el historial de reservas en D1.
