import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { type VehicleTypeKey } from "./data";

type StepContactProps = {
  reservation: {
    marque: string;
    modele: string;
    annee: string;
    couleur: string;
    vehicleType: VehicleTypeKey | null;
    packageName: string | null;
    packagePrice: string | null;
    date: string;
    time: string;
    city: string;
    address: string;
    civilite: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
  onUpdateReservation: (
    payload: Partial<StepContactProps["reservation"]>,
  ) => void;
  onPrevious: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
};

export function StepContact({
  reservation,
  onUpdateReservation,
  onPrevious,
  onConfirm,
  isSubmitting,
}: StepContactProps) {
  const isValid =
    reservation.firstName.trim().length > 0 &&
    reservation.lastName.trim().length > 0 &&
    reservation.phone.trim().length > 0 &&
    reservation.email.trim().length > 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <Card className="rounded-[2rem] border-gray-200 p-6 shadow-sm">
        <CardHeader className="px-0 pb-4">
          <CardTitle className="text-3xl font-semibold text-gray-900">
            Vos coordonnées
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["Monsieur", "Madame"] as const).map((title) => (
              <button
                key={title}
                type="button"
                onClick={() => onUpdateReservation({ civilite: title })}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  reservation.civilite === title
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700">
              <span>Prénom *</span>
              <input
                value={reservation.firstName}
                onChange={(event) =>
                  onUpdateReservation({ firstName: event.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-700">
              <span>Nom *</span>
              <input
                value={reservation.lastName}
                onChange={(event) =>
                  onUpdateReservation({ lastName: event.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700">
              <span>Adresse e-mail *</span>
              <input
                value={reservation.email}
                onChange={(event) =>
                  onUpdateReservation({ email: event.target.value })
                }
                type="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-700">
              <span>Numéro de téléphone *</span>
              <div className="flex gap-3">
                <span className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-100 px-4 text-gray-700">
                  +212 Maroc
                </span>
                <input
                  value={reservation.phone}
                  onChange={(event) =>
                    onUpdateReservation({ phone: event.target.value })
                  }
                  placeholder="6XXXXXXXX"
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
                />
              </div>
            </label>
          </div>

          <label className="space-y-2 text-sm text-gray-700">
            <span>Description / Commentaires</span>
            <textarea
              value={reservation.notes}
              onChange={(event) =>
                onUpdateReservation({ notes: event.target.value })
              }
              placeholder="Détails particuliers, instructions d'accès..."
              className="min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
            />
          </label>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-gray-200 p-6 shadow-sm">
        <CardHeader className="px-0 pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Résumé
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-4 text-gray-700">
          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Véhicule</span>
              <span>
                {reservation.marque} {reservation.modele} {reservation.annee}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Service</span>
              <span>{reservation.packageName || "—"}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Date et heure</span>
              <span>
                {reservation.date || "—"} {reservation.time || ""}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Localisation</span>
              <span>{reservation.city || "—"}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Adresse</span>
              <span>{reservation.address || "—"}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-lg font-semibold text-gray-900">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>
                {reservation.packagePrice
                  ? `${reservation.packagePrice} MAD`
                  : "—"}
              </span>
            </div>
          </div>
        </CardContent>
        <div className="mt-4 flex flex-col gap-3">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Précédent
          </Button>
          <Button
            type="button"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={onConfirm}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Envoi en cours…" : "Confirmer la réservation"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
