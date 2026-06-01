# Prompt maestro para Cursor — Hiweb Growth Tools con Webflow Cloud + Code Components

Actúa como un arquitecto senior full-stack especializado en Webflow Cloud, React, Next.js App Router, TypeScript, Webflow Code Components, DevLink CLI, GitHub, SQLite, KV Store, APIs serverless, n8n, UI frontend B2B SaaS y buenas prácticas de arquitectura.

Estoy construyendo una app para Hiweb Marketing llamada provisionalmente **Hiweb Growth Tools**.

La app será una suite modular de herramientas de captación, diagnóstico y conversión para clientes potenciales de Hiweb Marketing.

La app debe vivir en un solo repositorio de GitHub y desplegarse como una sola app en Webflow Cloud para evitar consumir múltiples slots del workspace.

---

# 1. Cambio importante de flujo visual

El flujo principal de diseño y desarrollo será:

```txt
Cursor / React / TypeScript
↓
Code Components
↓
Webflow Designer
↓
Webflow Cloud
```

No asumiremos que todos los componentes visuales serán diseñados primero en Webflow Designer.

En este proyecto, Cursor debe ayudar a diseñar, programar y estructurar componentes React reutilizables que después puedan importarse o usarse dentro de Webflow Designer como **Code Components**.

Esto significa:

* Cursor puede diseñar la UI en React.
* Los componentes deben tener buena calidad visual.
* Los componentes deben estar preparados para exponerse como Code Components.
* Las props importantes deben ser editables desde Webflow Designer.
* Webflow Designer se usará principalmente para montar páginas, ajustar contenido, usar props, combinar secciones, publicar y mantener el sitio.
* La lógica compleja debe vivir en React/Webflow Cloud, no en elementos nativos de Webflow.

---

# 2. Objetivo general del proyecto

Construir una aplicación modular en Webflow Cloud con tres herramientas principales:

## 2.1 Quiz multistep de diagnóstico de marketing digital

Debe:

* Evaluar el estado actual de marketing digital de una empresa.
* Calcular un score.
* Detectar fortalezas.
* Detectar áreas de oportunidad.
* Recomendar servicios de Hiweb Marketing.
* Capturar leads.
* Enviar datos a n8n de forma asíncrona.

## 2.2 Calendario dinámico de agendamiento

Debe:

* Permitir que un prospecto agende una llamada o reunión con Hiweb.
* Consultar disponibilidad.
* Mostrar fechas y horarios disponibles.
* Guardar citas.
* Disparar automatizaciones en n8n.
* Prepararse para una posible conexión con Google Calendar vía n8n.

## 2.3 Calculadora de ROI de marketing digital

Debe:

* Permitir al usuario estimar resultados potenciales de inversión en marketing digital.
* Calcular leads estimados, costo por lead, tasa de conversión, ventas potenciales, ingresos estimados y ROI.
* Mostrar resultados claros y visualmente atractivos.
* Recomendar servicios de Hiweb según los resultados.
* Capturar leads de forma opcional o estratégica.
* Enviar datos a n8n de forma asíncrona.

---

# 3. Principio arquitectónico principal

No crear una app separada por cada herramienta.

Usar:

```txt
1 repositorio en GitHub
1 app en Webflow Cloud
Varias rutas internas
Módulos separados por feature
SQLite compartido con tablas separadas
KV Store para sesiones temporales
n8n para automatizaciones externas
Code Components para módulos interactivos
Webflow Designer para composición visual de páginas
```

---

# 4. Stack técnico esperado

Usa:

* Next.js con App Router.
* React.
* TypeScript.
* Webflow Cloud.
* Webflow Code Components.
* DevLink CLI / Webflow CLI cuando aplique.
* GitHub como repositorio principal.
* SQLite para guardar leads, resultados y citas.
* KV Store para estado efímero de sesiones.
* n8n para automatizaciones externas.
* API routes bajo convención Next.js: `app/api/.../route.ts`.

No uses Supabase, Firebase, MongoDB, Prisma, Express ni backend externo salvo que sea estrictamente necesario y primero me expliques por qué.

---

# 5. Rutas esperadas

La app deberá organizarse con rutas como:

```txt
/diagnostico-marketing-digital
/calendario
/calculadora-roi
```

Y APIs separadas por módulo:

```txt
/app/api/quiz/session/route.ts
/app/api/quiz/submit/route.ts

/app/api/calendar/availability/route.ts
/app/api/calendar/book/route.ts
/app/api/calendar/cancel/route.ts

/app/api/roi/calculate/route.ts
/app/api/roi/submit/route.ts
```

---

# 6. Estructura recomendada del proyecto

```txt
app/
  diagnostico-marketing-digital/
    page.tsx

  calendario/
    page.tsx

  calculadora-roi/
    page.tsx

  api/
    quiz/
      session/
        route.ts
      submit/
        route.ts

    calendar/
      availability/
        route.ts
      book/
        route.ts
      cancel/
        route.ts

    roi/
      calculate/
        route.ts
      submit/
        route.ts

components/
  code-components/
    QuizToolComponent.tsx
    CalendarToolComponent.tsx
    RoiCalculatorComponent.tsx

  quiz/
    MarketingQuiz.tsx
    QuizIntro.tsx
    QuizStep.tsx
    LeadCaptureStep.tsx
    QuizResult.tsx

  calendar/
    CalendarTool.tsx
    ServiceSelector.tsx
    DateSelector.tsx
    TimeSlotSelector.tsx
    BookingForm.tsx
    BookingConfirmation.tsx

  roi/
    RoiCalculator.tsx
    RoiInputForm.tsx
    RoiResults.tsx
    RoiRecommendationCard.tsx

  shared/
    Button.tsx
    Card.tsx
    Input.tsx
    ProgressBar.tsx
    Badge.tsx
    Alert.tsx
    Spinner.tsx
    SectionHeader.tsx

lib/
  quiz/
    questions.ts
    scoring.ts
    result-levels.ts
    service-recommendations.ts
    types.ts
    validators.ts

  calendar/
    availability.ts
    booking.ts
    calendar-rules.ts
    types.ts
    validators.ts

  roi/
    calculator.ts
    formulas.ts
    result-levels.ts
    service-recommendations.ts
    types.ts
    validators.ts

  db/
    client.ts
    schema.ts
    queries.ts

  n8n/
    client.ts
    payloads.ts

  shared/
    env.ts
    errors.ts
    utils.ts
```

Puedes ajustar esta estructura si tienes una razón técnica clara, pero primero explícala.

---

# 7. Reglas de Code Components

Los componentes principales deben estar preparados para usarse como **Webflow Code Components**.

Esto significa que cada herramienta interactiva debe poder exponerse como componente configurable desde Webflow Designer.

Componentes principales esperados:

```txt
QuizToolComponent
CalendarToolComponent
RoiCalculatorComponent
```

Cada uno debe:

* Ser un componente React limpio.
* Usar TypeScript.
* Tener props claras.
* Tener defaults seguros.
* Ser responsive.
* Tener estados de loading, error y success.
* No depender de variables globales ocultas.
* No exponer secretos.
* No hacer llamadas directas a n8n desde el cliente.
* Usar APIs internas de Webflow Cloud para submit, cálculo o guardado.
* Poder insertarse en páginas de Webflow como componente reutilizable.

---

# 8. Props configurables desde Webflow Designer

Los Code Components deben exponer props que tenga sentido editar desde Webflow Designer.

## QuizToolComponent

Props sugeridas:

```ts
type QuizToolComponentProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  startButtonLabel?: string;
  leadCaptureTitle?: string;
  leadCaptureDescription?: string;
  resultCtaLabel?: string;
  resultCtaUrl?: string;
  themeVariant?: "light" | "dark" | "brand";
};
```

## CalendarToolComponent

Props sugeridas:

```ts
type CalendarToolComponentProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  defaultService?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  themeVariant?: "light" | "dark" | "brand";
};
```

## RoiCalculatorComponent

Props sugeridas:

```ts
type RoiCalculatorComponentProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  defaultMonthlyBudget?: number;
  defaultLeadValue?: number;
  ctaLabel?: string;
  ctaUrl?: string;
  themeVariant?: "light" | "dark" | "brand";
};
```

No pongas como props desde Webflow cosas que puedan romper la lógica crítica, como fórmulas internas, endpoints secretos o scoring final.

---

# 9. Regla importante sobre diseño

Como Cursor diseñará los componentes, debe aplicar criterios sólidos de UI.

Estilo visual deseado:

* Moderno.
* Profesional.
* B2B SaaS.
* Claro.
* Mobile-first.
* Limpio.
* Con buena jerarquía visual.
* Enfocado en conversión.
* Compatible con una agencia de marketing digital.

Componentes deben incluir:

* Buen espaciado.
* Tipografía clara.
* Botones consistentes.
* Cards.
* Estados hover.
* Estados focus.
* Estados disabled.
* Estados error.
* Estados success.
* Estados loading.
* Layout responsive.
* Accesibilidad básica.

No crear diseños recargados, genéricos o difíciles de mantener.

---

# 10. Relación entre Code Components y Webflow Designer

Webflow Designer se usará para:

* Armar la landing.
* Insertar Code Components.
* Editar props visibles.
* Ajustar copy de secciones.
* Combinar componentes con secciones nativas de Webflow.
* Publicar el sitio.
* Mantener páginas comerciales.

React/Cursor se usará para:

* Crear los componentes interactivos.
* Crear lógica de negocio.
* Crear APIs.
* Crear cálculos.
* Crear validaciones.
* Crear estado.
* Crear integración con SQLite, KV y n8n.

No asumir que el equipo podrá editar cada div interno del componente desde Webflow Designer.

Los cambios internos de estructura, layout profundo o lógica deben hacerse desde código.

---

# 11. Reglas de Webflow Cloud

Webflow Cloud debe usarse para:

* Cálculos rápidos e inmediatos.
* Validaciones del servidor.
* Cálculo de score del quiz.
* Cálculos de ROI.
* Consultas rápidas a SQLite.
* Guardado de leads.
* Guardado de citas.
* Manejo de sesiones efímeras con KV Store.

No usar Webflow Cloud para procesos lentos o externos como:

* Enviar correos directamente.
* Crear eventos directamente en Google Calendar si implica latencia alta.
* Sincronizar con CRM.
* Generar archivos pesados.
* Procesos largos de nutrición comercial.

Esos procesos deben delegarse a n8n.

---

# 12. Reglas de n8n

n8n debe usarse para procesos asíncronos:

* Enviar correo al lead.
* Notificar al equipo comercial.
* Crear o actualizar lead en CRM.
* Guardar datos en Google Sheets.
* Crear evento en Google Calendar.
* Mandar mensaje interno.
* Iniciar flujo de seguimiento.
* Sincronizar información externa.

La comunicación desde Webflow Cloud hacia n8n debe ser asíncrona y no bloqueante.

Usar patrón fire-and-forget:

```txt
Webflow Cloud recibe datos
↓
Valida
↓
Guarda en SQLite
↓
Calcula resultado
↓
Dispara webhook a n8n sin esperar respuesta completa
↓
Responde rápido al usuario
```

Si n8n falla, la experiencia del usuario no debe romperse.

---

# 13. SQLite

Usa SQLite para datos estructurados.

Tablas sugeridas:

```sql
CREATE TABLE quiz_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  industry TEXT,
  score_total INTEGER NOT NULL,
  score_percentage REAL NOT NULL,
  result_level TEXT NOT NULL,
  recommended_services TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  category_scores_json TEXT NOT NULL,
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_quiz_leads_email ON quiz_leads(email);
CREATE INDEX idx_quiz_leads_created_at ON quiz_leads(created_at);

CREATE TABLE calendar_bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  selected_date TEXT NOT NULL,
  selected_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_calendar_bookings_email ON calendar_bookings(email);
CREATE INDEX idx_calendar_bookings_selected_date ON calendar_bookings(selected_date);

CREATE TABLE roi_leads (
  id TEXT PRIMARY KEY,
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  monthly_budget REAL NOT NULL,
  estimated_leads REAL NOT NULL,
  estimated_sales REAL NOT NULL,
  estimated_revenue REAL NOT NULL,
  estimated_roi REAL NOT NULL,
  inputs_json TEXT NOT NULL,
  recommendations_json TEXT NOT NULL,
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_roi_leads_email ON roi_leads(email);
CREATE INDEX idx_roi_leads_created_at ON roi_leads(created_at);
```

Guarda JSON como string cuando sea necesario.

No guardes archivos pesados en SQLite.

---

# 14. KV Store

Usa KV Store solo para estado efímero de sesión.

Ejemplos:

```ts
type QuizSession = {
  sessionId: string;
  currentStep: number;
  answers: Record<string, string>;
  updatedAt: string;
};

type CalendarSession = {
  sessionId: string;
  selectedService?: string;
  selectedDate?: string;
  selectedTime?: string;
  updatedAt: string;
};

type RoiSession = {
  sessionId: string;
  inputs: Record<string, number>;
  updatedAt: string;
};
```

No uses KV para almacenar leads finales. Para eso usa SQLite.

---

# 15. API routes esperadas

## Quiz

```txt
POST /api/quiz/session
POST /api/quiz/submit
```

## Calendario

```txt
GET /api/calendar/availability
POST /api/calendar/book
POST /api/calendar/cancel
```

## ROI

```txt
POST /api/roi/calculate
POST /api/roi/submit
```

Reglas:

* El frontend nunca debe llamar directamente a n8n.
* El frontend debe llamar a APIs internas.
* El backend debe validar.
* El backend debe recalcular lo importante.
* El backend debe guardar.
* El backend debe disparar n8n sin bloquear.

---

# 16. Validaciones

Valida en servidor:

* Nombre requerido cuando aplique.
* Email requerido y formato válido cuando aplique.
* Teléfono con formato razonable cuando aplique.
* Respuestas completas del quiz.
* IDs válidos de preguntas y respuestas.
* Fechas válidas del calendario.
* Horarios disponibles.
* Que un slot no esté ocupado.
* Inputs de ROI positivos y dentro de rangos razonables.
* Payloads no gigantes.
* Strings sanitizados.

No confíes en cálculos críticos enviados desde frontend.

El backend debe recalcular:

* Score del quiz.
* Nivel del quiz.
* Disponibilidad del calendario.
* Resultados del ROI.

---

# 17. Seguridad básica

Usa variables de entorno:

```txt
N8N_WEBHOOK_QUIZ_URL=
N8N_WEBHOOK_CALENDAR_URL=
N8N_WEBHOOK_ROI_URL=
N8N_WEBHOOK_SECRET=
APP_URL=
```

No expongas secretos en frontend.

No subas `.env` al repositorio.

Crea `.env.example`.

Evita logs con datos sensibles innecesarios.

---

# 18. GitHub y deploy

El proyecto debe vivir en GitHub para poder desplegarse en Webflow Cloud.

Debe incluir:

```txt
README.md
.gitignore
.env.example
package.json
tsconfig.json
next.config.ts
app/
components/
lib/
```

No subir:

```txt
.env
.env.local
.env.production
tokens
webhook secrets
credenciales
```

Flujo esperado:

```txt
Desarrollo local
↓
Commit
↓
GitHub
↓
Webflow Cloud
↓
Deploy
```

Antes de deploy:

* Confirmar que `npm run build` funcione.
* Confirmar variables de entorno.
* Confirmar que rutas principales carguen.
* Confirmar que APIs respondan.
* Confirmar que los Code Components estén importados/configurados según el flujo de Webflow.

---

# 19. README mínimo

Crear o actualizar `README.md` con:

```txt
- Nombre del proyecto
- Descripción
- Stack usado
- Herramientas incluidas
- Cómo instalar dependencias
- Cómo correr localmente
- Variables de entorno necesarias
- Cómo usar Code Components
- Cómo conectar con Webflow Designer
- Cómo hacer deploy en Webflow Cloud desde GitHub
- Cómo funciona n8n
- Estructura de carpetas
```

---

# 20. Plan de implementación por fases

Trabaja por fases:

## Fase 1 — Preparación del proyecto

* Revisar framework.
* Confirmar Next.js App Router.
* Confirmar Git.
* Crear `.gitignore`.
* Crear `README.md`.
* Crear `.env.example`.
* Preparar estructura modular.
* Confirmar flujo de GitHub.

## Fase 2 — Design system en React

Crear componentes base:

```txt
Button
Card
Input
ProgressBar
Badge
Alert
Spinner
SectionHeader
```

Estos componentes deben tener buen diseño y ser reutilizables.

## Fase 3 — Code Components shell

Crear los tres componentes principales:

```txt
QuizToolComponent
CalendarToolComponent
RoiCalculatorComponent
```

Estos serán los componentes que se prepararán para usarse en Webflow Designer.

## Fase 4 — Quiz funcional

* Modelo de preguntas.
* Scoring.
* UI funcional.
* Captura de lead.
* Resultado personalizado.
* API submit.
* Guardado en SQLite.
* Webhook a n8n.

## Fase 5 — Calendario funcional

* Modelo de disponibilidad.
* Selección de fecha y hora.
* Validación de slots.
* Guardado de cita.
* Webhook a n8n.
* Preparación para Google Calendar mediante n8n.

## Fase 6 — Calculadora ROI funcional

* Inputs de inversión.
* Inputs de conversión.
* Fórmulas.
* Resultado estimado.
* Recomendaciones.
* Captura opcional de lead.
* Webhook a n8n.

## Fase 7 — Integración con Webflow Code Components

* Revisar requisitos de Code Components.
* Declarar componentes con props editables.
* Exponer props seguras.
* Confirmar que los componentes puedan usarse desde Webflow Designer.
* No exponer lógica crítica como props editables.

## Fase 8 — Deploy

* Confirmar build.
* Subir a GitHub.
* Conectar repo a Webflow Cloud.
* Configurar variables de entorno.
* Desplegar.
* Validar rutas principales.

## Fase 9 — Resiliencia

* Agregar manejo de errores.
* Agregar `pending_sync`.
* Agregar logs seguros.
* Agregar estados de UI.
* Confirmar que n8n caído no rompa la experiencia.

## Fase 10 — Pulido visual

* Mejorar responsive.
* Mejorar accesibilidad.
* Mejorar microcopy.
* Mejorar conversiones.
* Mejorar estados vacíos.
* Mejorar recomendaciones.

---

# 21. Orden de prioridad

Prioridad:

```txt
1. Arquitectura limpia
2. Componentes React reutilizables
3. UI funcional y agradable
4. Lógica de negocio
5. Validaciones
6. Guardado de datos
7. n8n
8. Code Components en Webflow Designer
9. Deploy
10. Pulido visual
```

No sobrearquitectures desde el inicio.

---

# 22. Qué quiero que hagas primero

Antes de escribir código, revisa el proyecto actual y dime:

1. Qué framework detectaste.
2. Si existe Git.
3. Si existe conexión con GitHub.
4. Si existe configuración de Webflow Cloud.
5. Si existe configuración de Code Components o DevLink CLI.
6. Qué carpetas existen.
7. Qué archivos faltan.
8. Qué estructura recomiendas crear.
9. Qué componentes base recomiendas crear primero.
10. Qué harás primero.

No escribas todo el código de golpe si no conoces la estructura actual.

---

# 23. Resultado final esperado

Quiero terminar con una app donde:

* El usuario pueda hacer un quiz de diagnóstico.
* El usuario pueda agendar una llamada.
* El usuario pueda calcular ROI estimado de marketing digital.
* Las tres herramientas vivan en una sola app.
* El proyecto esté en GitHub.
* El proyecto pueda desplegarse en Webflow Cloud.
* Los módulos interactivos puedan usarse como Code Components en Webflow Designer.
* Los marketers puedan editar props útiles desde Webflow.
* El backend use Webflow Cloud para cálculos, validaciones y guardado.
* n8n maneje procesos asíncronos externos.
* El sistema sea mantenible, modular y escalable.
