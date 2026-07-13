# Google Calendar — Service Account para horarios ocupados

Guía para que el calendario Hiweb muestre horarios **ocupados** leyendo eventos de Google Calendar (además de las reservas en D1).

> **No confundir credenciales:** esto es distinto del OAuth de n8n (crear eventos) y del token de HubSpot (`pat-...`).

---

## Qué hace cada credencial

| Credencial | Dónde | Para qué |
|------------|-------|----------|
| **OAuth Google** (cuenta Gmail/Workspace) | n8n → nodo *Google Calendar* | Crear citas + Google Meet al reservar |
| **Service Account** (`...@....iam.gserviceaccount.com`) | Webflow Cloud → variables de entorno | Leer horarios ocupados (`freeBusy`) |
| **HubSpot App Token** (`pat-...`) | n8n → HubSpot | Guardar leads |

La app **no crea** eventos en Google Calendar; solo **lee** qué franjas están busy en el calendario que compartas con la service account.

---

## Resumen del flujo

```txt
Usuario abre calendario
  → GET /api/calendar/availability
  → D1: reservas confirmed
  → Google Calendar API freeBusy (si hay service account)
  → Merge → slots disponibles / ocupados en la UI
```

Sin service account, solo se usan reservas de D1 (suficiente si todas las citas pasan por la app).

---

## Parte 1 — Google Cloud Console

### 1.1 Proyecto y API

1. Entra a [Google Cloud Console](https://console.cloud.google.com/).
2. Arriba, elige un proyecto (o **Nuevo proyecto**, ej. `Hiweb Calendario`).
3. Menú **APIs y servicios → Biblioteca**.
4. Busca **Google Calendar API** → **Habilitar**.

### 1.2 Crear la service account

1. Menú **IAM y administración → Cuentas de servicio** (*Service Accounts*).
2. **+ Crear cuenta de servicio**.
3. Nombre: `hiweb-calendario-lectura` (o el que prefieras).
4. **Crear y continuar** → puedes omitir roles → **Listo**.

Anota el **email** que aparece en la lista. Formato:

```txt
hiweb-calendario-lectura@tu-proyecto-123456.iam.gserviceaccount.com
```

Ese valor es `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

### 1.3 Descargar la clave (PEM / JSON)

1. En la lista, clic en la cuenta de servicio.
2. Pestaña **Claves** (*Keys*).
3. **Agregar clave → Crear clave nueva**.
4. Tipo: **JSON** → **Crear**.

Se descarga un archivo como `tu-proyecto-123456-abc123.json`. **Guárdalo en lugar seguro**; no lo subas a GitHub.

Dentro del JSON:

```json
{
  "type": "service_account",
  "project_id": "tu-proyecto-123456",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n",
  "client_email": "hiweb-calendario-lectura@tu-proyecto-123456.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

| Campo del JSON | Variable en Webflow Cloud |
|----------------|---------------------------|
| `client_email` | `GOOGLE_SERVICE_ACCOUNT_EMAIL` |
| `private_key` | `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` |

> La clave privada **solo se muestra al crearla**. Si la pierdes, crea una clave nueva y borra la antigua.

---

## Parte 2 — Compartir el calendario con la service account

La service account no ve tu agenda hasta que la invites.

1. Abre [Google Calendar](https://calendar.google.com/) con la **misma cuenta** que usa n8n (OAuth) para crear eventos.
2. En la barra lateral, localiza ese calendario (suele ser **principal** o el email de la cuenta).
3. Menú **⋮** del calendario → **Configuración y uso compartido**.
4. **Compartir con determinadas personas o grupos**.
5. Añade el email de la service account:

   ```txt
   hiweb-calendario-lectura@tu-proyecto-123456.iam.gserviceaccount.com
   ```

6. Permiso: **Ver todos los detalles de los eventos** (*See all event details*).

7. **Enviar**.

Sin este paso, `freeBusy` devuelve vacío y el calendario solo bloqueará slots de D1.

### ¿Cuál es `GOOGLE_CALENDAR_ID`?

Es el identificador del calendario que compartiste:

| Calendario | Valor típico de `GOOGLE_CALENDAR_ID` |
|------------|--------------------------------------|
| Principal de la cuenta OAuth | El **email** de esa cuenta (ej. `agenda@hiweb.com`) |
| Calendario secundario | En *Configuración del calendario → Integrar calendario*, copia el **ID del calendario** |

En n8n, si el nodo usa `primary`, en Webflow Cloud pon el **email de la cuenta Google** conectada en n8n (no la palabra `primary`).

---

## Parte 3 — Variables en Webflow Cloud

1. Webflow → **Webflow Cloud** → tu app **Hiweb Growth Tools**.
2. **Environment variables** (Variables de entorno).
3. Añade:

| Variable | Valor |
|----------|--------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` del JSON |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Contenido completo de `private_key` del JSON |
| `GOOGLE_CALENDAR_ID` | Email del calendario compartido (ej. `tu@gmail.com`) |

### Cómo pegar la clave privada

El campo `private_key` del JSON incluye saltos de línea como `\n`. En Webflow Cloud puedes pegar:

**Opción A (recomendada):** el valor tal cual viene en el JSON, en una sola línea con `\n`:

```txt
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----\n
```

**Opción B:** el bloque PEM multilínea real (si el panel lo permite):

```txt
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQ...
...
-----END PRIVATE KEY-----
```

La app normaliza `\\n` → saltos de línea en `lib/google/service-account-auth.ts`.

4. **Guardar** variables.
5. **Redeploy** la app (o push a `main` si hay auto-deploy).

---

## Parte 4 — Desarrollo local (opcional)

En `.env.local` (no commitear):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=hiweb-calendario-lectura@tu-proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=agenda@tuempresa.com
```

Reinicia `npm run dev` tras añadirlas.

---

## Parte 5 — Comprobar que funciona

### 5.1 Storage activo

```bash
curl -s "https://hiwebmar.webflow.io/tools/api/health"
```

Esperado: `"storage": "d1"`.

### 5.2 Horario ocupado en Google Calendar

1. Crea un evento manual en el calendario compartido un día laborable entre 9:00 y 17:00 (hora CDMX).
2. Abre el calendario Hiweb y elige ese día.
3. Ese horario debe aparecer como **Ocupado** (deshabilitado).

### 5.3 Reserva desde la app

1. Agenda una cita en un slot libre.
2. El mismo slot debe quedar ocupado para otros usuarios (D1 + evento que crea n8n en GCal).

### 5.4 Cancelación

1. Tras confirmar, pulsa **Cancelar cita**.
2. El slot debe volver a estar disponible.
3. El evento desaparece de Google Calendar (rama cancelación en n8n).

---

## Migración D1 (índice anti doble reserva)

No ejecutes SQL a mano en Webflow. El archivo `migrations/0002_calendar_slot_unique.sql` se aplica **automáticamente** al hacer deploy si tienes **Storage → SQLite** configurado.

Ver [DEPLOY_WEBFLOW_CLOUD.md](./DEPLOY_WEBFLOW_CLOUD.md) § SQLite.

---

## Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| Todos los slots libres aunque hay eventos en GCal | Calendario no compartido con la SA | Compartir calendario (Parte 2) |
| Slots libres en GCal pero ocupados en app | Solo D1, SA no configurada | Añadir las 3 variables y redeploy |
| `freeBusy` falla en logs | API no habilitada | Habilitar Google Calendar API |
| Clave inválida | PEM mal pegado | Volver a copiar `private_key` del JSON |
| Eventos de n8n no bloquean slots | `GOOGLE_CALENDAR_ID` distinto al de n8n | Usar el email del calendario donde n8n crea eventos |
| Doble reserva mismo slot | Migración 0002 no aplicada | Verificar Storage + redeploy con `migrations/0002_...` |

---

## Seguridad

- **Nunca** commitees el JSON de la service account ni `.env.local`.
- Rota la clave si se expone: Google Cloud → Cuentas de servicio → Claves → eliminar la antigua, crear nueva.
- La service account solo necesita **lectura** del calendario (permiso al compartir); no hace falta darle rol de Editor en IAM.

---

## Archivos relacionados

| Archivo | Rol |
|---------|-----|
| `lib/google/service-account-auth.ts` | JWT + access token |
| `lib/calendar/google-busy.ts` | Consulta freeBusy |
| `lib/calendar/availability.ts` | Merge D1 + GCal |
| `docs/N8N_CALENDAR_GOOGLE.md` | OAuth n8n + cancelación |
| `docs/DEPLOY_WEBFLOW_CLOUD.md` | Deploy y Storage |
