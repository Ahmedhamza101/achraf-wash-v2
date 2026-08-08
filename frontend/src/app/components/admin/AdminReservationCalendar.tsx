import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { AdminReservation } from "../../pages/admin/AdminReservationsPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ReservationStatusSelect } from "./ReservationStatusSelect";

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales,
});

interface ReservationEvent extends Event {
  reservation: AdminReservation;
}

interface AdminReservationCalendarProps {
  reservations: AdminReservation[];
  updatingId: number | null;
  onStatusChange: (reservation: AdminReservation, status: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#2563eb",
  done: "#16a34a",
  cancelled: "#dc2626",
};

export function AdminReservationCalendar({
  reservations,
  updatingId,
  onStatusChange,
}: AdminReservationCalendarProps) {
  const [selected, setSelected] = useState<AdminReservation | null>(null);

  const events = useMemo<ReservationEvent[]>(
    () =>
      reservations.map((reservation) => {
        const start = new Date(`${reservation.date}T${reservation.time}`);
        const end = new Date(start.getTime() + 60 * 60 * 1000);

        return {
          title: `${reservation.first_name} ${reservation.last_name} — ${reservation.package_name}`,
          start,
          end,
          reservation,
        };
      }),
    [reservations],
  );

  return (
    <div className="rounded-lg border bg-white p-4">
      <div style={{ height: 650 }}>
        <Calendar
          localizer={localizer}
          culture="fr"
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={{
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
            today: "Aujourd'hui",
            previous: "Précédent",
            next: "Suivant",
            noEventsInRange: "Aucune réservation sur cette période.",
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: STATUS_COLORS[(event as ReservationEvent).reservation.status] ?? "#6b7280",
              border: "none",
            },
          })}
          onSelectEvent={(event) => setSelected((event as ReservationEvent).reservation)}
        />
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.first_name} {selected.last_name}
                </DialogTitle>
                <DialogDescription>
                  {selected.vehicle_type} — {selected.package_name} ({Number(selected.package_price).toFixed(0)} MAD)
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-900">Date : </span>
                  {selected.date} à {selected.time}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Ville : </span>
                  {selected.city}
                </p>
                {selected.address && (
                  <p>
                    <span className="font-medium text-gray-900">Adresse : </span>
                    {selected.address}
                  </p>
                )}
                <p>
                  <span className="font-medium text-gray-900">Contact : </span>
                  {selected.email} — {selected.phone}
                </p>
                {selected.notes && (
                  <p>
                    <span className="font-medium text-gray-900">Notes : </span>
                    {selected.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm font-medium text-gray-900">Statut :</span>
                <ReservationStatusSelect
                  value={selected.status}
                  disabled={updatingId === selected.id}
                  onChange={(status) => {
                    onStatusChange(selected, status);
                    setSelected((prev) => (prev ? { ...prev, status } : prev));
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
