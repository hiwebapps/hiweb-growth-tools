-- Evita doble reserva del mismo slot (solo citas confirmadas).
CREATE UNIQUE INDEX IF NOT EXISTS idx_calendar_bookings_confirmed_slot
ON calendar_bookings(selected_date, selected_time)
WHERE status = 'confirmed';
