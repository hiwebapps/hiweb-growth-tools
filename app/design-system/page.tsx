import type { Metadata } from "next";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  ProgressBar,
  SectionHeader,
  Spinner,
} from "@/components/shared";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { CodeComponentsShowcase } from "./CodeComponentsShowcase";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

function DemoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <ToolPageShell
      eyebrow="Interno"
      title="Design system"
      description="Componentes base reutilizables para quiz, calendario y calculadora ROI."
      status="preview"
      className="max-w-4xl"
    >
      <div className="flex flex-col gap-12">
        <DemoBlock title="SectionHeader">
          <SectionHeader
            eyebrow="Ejemplo"
            title="Título de sección"
            description="Descripción de apoyo con buen contraste y espaciado mobile-first."
          />
        </DemoBlock>

        <DemoBlock title="Button">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" isLoading>
              Cargando
            </Button>
            <Button variant="primary" disabled>
              Deshabilitado
            </Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Éxito</Badge>
            <Badge variant="warning">Aviso</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </DemoBlock>

        <DemoBlock title="Alert">
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="Información">
              Mensaje informativo para el usuario.
            </Alert>
            <Alert variant="success" title="Listo">
              La acción se completó correctamente.
            </Alert>
            <Alert variant="warning" title="Revisa">
              Algunos campos necesitan atención.
            </Alert>
            <Alert variant="error" title="Error">
              No pudimos procesar tu solicitud.
            </Alert>
          </div>
        </DemoBlock>

        <DemoBlock title="Input">
          <div className="grid max-w-md gap-4">
            <Input label="Nombre" name="name" placeholder="Tu nombre" />
            <Input
              label="Email"
              name="email"
              type="email"
              hint="Usaremos este email solo para contactarte."
            />
            <Input
              label="Teléfono"
              name="phone"
              error="Introduce un número válido."
              defaultValue="abc"
            />
          </div>
        </DemoBlock>

        <DemoBlock title="ProgressBar">
          <ProgressBar label="Progreso del quiz" value={65} />
        </DemoBlock>

        <DemoBlock title="Spinner">
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </DemoBlock>

        <DemoBlock title="Card">
          <Card>
            <CardHeader
              title="Card de ejemplo"
              description="Contenedor para formularios, resultados y CTAs."
              action={<Badge variant="brand">Nuevo</Badge>}
            />
            <p className="text-sm text-muted leading-relaxed">
              Las herramientas usarán cards para agrupar pasos del flujo y
              mantener jerarquía visual clara.
            </p>
            <CardFooter>
              <Button variant="secondary" size="sm">
                Cancelar
              </Button>
              <Button size="sm">Continuar</Button>
            </CardFooter>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card themeVariant="dark" padding="md">
              <p className="text-sm">Variante dark</p>
            </Card>
            <Card themeVariant="brand" padding="md">
              <p className="text-sm">Variante brand</p>
            </Card>
          </div>
        </DemoBlock>

        <DemoBlock title="Code Components (Fase 3)">
          <p className="text-sm text-muted">
            Usa las pestañas para previsualizar estados sin interactuar con el
            flujo mock.
          </p>
          <CodeComponentsShowcase />
        </DemoBlock>
      </div>
    </ToolPageShell>
  );
}
