import { Badge, Card } from "@/components/shared";
import type { BookingRecord } from "@/lib/calendar/types";

type BookingConfirmationProps = {
  booking: BookingRecord;
};

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  const dateLabel = new Date(
    `${booking.selectedDate}T12:00:00`,
  ).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card padding="md" elevated={false}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="success">Confirmada</Badge>
        <span className="text-xs text-muted">ID: {booking.id.slice(0, 8)}…</span>
      </div>
      <dl className="grid gap-3 text-sm">
        <div>
          <dt className="text-muted">Servicio</dt>
          <dd className="font-medium">{booking.service}</dd>
        </div>
        <div>
          <dt className="text-muted">Fecha</dt>
          <dd className="font-medium capitalize">{dateLabel}</dd>
        </div>
        <div>
          <dt className="text-muted">Hora</dt>
          <dd className="font-medium tabular-nums">{booking.selectedTime}</dd>
        </div>
        <div>
          <dt className="text-muted">Contacto</dt>
          <dd className="font-medium">
            {booking.name} — {booking.email}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
