import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { apiFetch, ApiError } from "../../../lib/api";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ReservationStatusSelect } from "../../components/admin/ReservationStatusSelect";
import { reservationStatusBadgeVariant, RESERVATION_STATUS_LABELS } from "../../components/admin/reservationStatus";
import { AdminReservationCalendar } from "../../components/admin/AdminReservationCalendar";

export interface AdminReservation {
  id: number;
  marque: string;
  modele: string;
  annee: string;
  couleur: string;
  vehicle_type: string;
  package_name: string;
  package_price: string;
  date: string;
  time: string;
  city: string;
  address: string | null;
  civilite: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  notes: string | null;
  status: string;
}

export default function AdminReservationsPage() {
  const { token } = useAdminAuth();
  const [reservations, setReservations] = useState<AdminReservation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadReservations() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiFetch<AdminReservation[]>("/admin/reservations", { token });
        if (!cancelled) {
          setReservations(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Impossible de charger les réservations. Veuillez réessayer.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadReservations();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleStatusChange = async (reservation: AdminReservation, status: string) => {
    setUpdatingId(reservation.id);

    try {
      const updated = await apiFetch<AdminReservation>(`/admin/reservations/${reservation.id}`, {
        method: "PATCH",
        token,
        body: { status },
      });
      setReservations((prev) =>
        prev ? prev.map((item) => (item.id === updated.id ? updated : item)) : prev,
      );
    } catch {
      // Best-effort: leave the reservation state unchanged if the update fails.
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Réservations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Liste des réservations reçues.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/reservations/new">
            <Plus className="h-4 w-4" />
            Nouvelle réservation
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des réservations...
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-8 rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && reservations && reservations.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-muted-foreground">
          Aucune réservation pour le moment.
        </div>
      )}

      {!isLoading && !error && reservations && reservations.length > 0 && (
        <Tabs defaultValue="list" className="mt-6">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="overflow-x-auto rounded-lg border bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Véhicule</th>
                    <th className="px-4 py-3">Forfait</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">
                          {reservation.first_name} {reservation.last_name}
                        </p>
                        <p className="text-muted-foreground">{reservation.email}</p>
                      </td>
                      <td className="px-4 py-3">{reservation.vehicle_type}</td>
                      <td className="px-4 py-3">{reservation.package_name}</td>
                      <td className="px-4 py-3">
                        {reservation.date} à {reservation.time}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={reservationStatusBadgeVariant(reservation.status)}>
                            {RESERVATION_STATUS_LABELS[
                              reservation.status as keyof typeof RESERVATION_STATUS_LABELS
                            ] ?? reservation.status}
                          </Badge>
                          <ReservationStatusSelect
                            value={reservation.status}
                            disabled={updatingId === reservation.id}
                            onChange={(status) => handleStatusChange(reservation, status)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <AdminReservationCalendar
              reservations={reservations}
              onStatusChange={handleStatusChange}
              updatingId={updatingId}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
