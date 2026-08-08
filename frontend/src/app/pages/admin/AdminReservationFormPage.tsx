import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { apiFetch, ApiError } from "../../../lib/api";
import {
  vehicleTypes,
  servicePackagesByVehicleType,
  cities,
  type VehicleTypeKey,
} from "../../components/reservation/data";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const defaultForm = {
  marque: "",
  modele: "",
  annee: "",
  couleur: "",
  vehicleType: vehicleTypes[0].key as VehicleTypeKey,
  packageName: "",
  packagePrice: "",
  date: "",
  time: "",
  city: cities[0],
  address: "",
  civilite: "Monsieur",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export default function AdminReservationFormPage() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const packages = useMemo(
    () => servicePackagesByVehicleType[form.vehicleType],
    [form.vehicleType],
  );

  const update = (payload: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...payload }));
  };

  const handleVehicleTypeChange = (key: string) => {
    update({ vehicleType: key as VehicleTypeKey, packageName: "", packagePrice: "" });
  };

  const handlePackageChange = (name: string) => {
    const selected = packages.find((pkg) => pkg.name === name);
    update({ packageName: name, packagePrice: selected?.price ?? "" });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await apiFetch("/admin/reservations", {
        method: "POST",
        token,
        body: {
          marque: form.marque,
          modele: form.modele,
          annee: form.annee,
          couleur: form.couleur,
          vehicle_type: form.vehicleType,
          package_name: form.packageName,
          package_price: form.packagePrice ? Number(form.packagePrice) : 0,
          date: form.date,
          time: form.time,
          city: form.city,
          address: form.address || undefined,
          civilite: form.civilite,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          notes: form.notes || undefined,
        },
      });
      navigate("/admin/reservations");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Une erreur est survenue. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Nouvelle réservation</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Réserver un créneau pour un client (par téléphone, sur place, etc.).
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6 rounded-lg border bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="marque">Marque</Label>
            <Input
              id="marque"
              required
              value={form.marque}
              onChange={(event) => update({ marque: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modele">Modèle</Label>
            <Input
              id="modele"
              required
              value={form.modele}
              onChange={(event) => update({ modele: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annee">Année</Label>
            <Input
              id="annee"
              required
              value={form.annee}
              onChange={(event) => update({ annee: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="couleur">Couleur</Label>
            <Input
              id="couleur"
              required
              value={form.couleur}
              onChange={(event) => update({ couleur: event.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Type de véhicule</Label>
            <Select value={form.vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger id="vehicleType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((vehicle) => (
                  <SelectItem key={vehicle.key} value={vehicle.key}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageName">Forfait</Label>
            <Select value={form.packageName} onValueChange={handlePackageChange}>
              <SelectTrigger id="packageName">
                <SelectValue placeholder="Choisir un forfait" />
              </SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg.name} value={pkg.name}>
                    {pkg.name} — {pkg.price} MAD
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="packagePrice">Prix (MAD)</Label>
            <Input
              id="packagePrice"
              type="number"
              min="0"
              step="1"
              required
              value={form.packagePrice}
              onChange={(event) => update({ packagePrice: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Select value={form.city} onValueChange={(value) => update({ city: value })}>
              <SelectTrigger id="city">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              required
              value={form.date}
              onChange={(event) => update({ date: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Input
              id="time"
              type="time"
              required
              value={form.time}
              onChange={(event) => update({ time: event.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            value={form.address}
            onChange={(event) => update({ address: event.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Civilité</Label>
          <div className="flex gap-2">
            {(["Monsieur", "Madame"] as const).map((title) => (
              <Button
                key={title}
                type="button"
                variant={form.civilite === title ? "default" : "outline"}
                onClick={() => update({ civilite: title })}
              >
                {title}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              required
              value={form.firstName}
              onChange={(event) => update({ firstName: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              required
              value={form.lastName}
              onChange={(event) => update({ lastName: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => update({ email: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(event) => update({ phone: event.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={(event) => update({ notes: event.target.value })}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/reservations")}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Créer la réservation
          </Button>
        </div>
      </form>
    </div>
  );
}
