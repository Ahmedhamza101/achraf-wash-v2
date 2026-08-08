export const RESERVATION_STATUSES = ["pending", "confirmed", "done", "cancelled"] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  done: "Terminée",
  cancelled: "Annulée",
};

export function reservationStatusBadgeVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "confirmed":
      return "default";
    case "done":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}
