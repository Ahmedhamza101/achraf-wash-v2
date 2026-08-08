import { useEffect, useState } from "react";
import {
  CalendarClock,
  CalendarCheck2,
  MessageSquareWarning,
  Wallet,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { apiFetch, ApiError } from "../../../lib/api";

interface AdminStats {
  pending_reservations: number;
  reservations_this_week: number;
  unread_messages: number;
  revenue_this_month: number;
}

const currencyFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

export default function AdminOverviewPage() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiFetch<AdminStats>("/admin/stats", { token });
        if (!cancelled) {
          setStats(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Impossible de charger les statistiques. Veuillez réessayer.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const cards = stats
    ? [
        {
          label: "Réservations en attente",
          value: stats.pending_reservations,
          icon: CalendarClock,
        },
        {
          label: "Réservations cette semaine",
          value: stats.reservations_this_week,
          icon: CalendarCheck2,
        },
        {
          label: "Messages non lus",
          value: stats.unread_messages,
          icon: MessageSquareWarning,
        },
        {
          label: "Revenu estimé ce mois-ci",
          value: currencyFormatter.format(stats.revenue_this_month),
          icon: Wallet,
        },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Aperçu</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Vue d'ensemble de l'activité ACHRAF WASH.
      </p>

      {isLoading && (
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des statistiques...
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-8 rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && stats && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
