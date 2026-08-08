import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  type VehicleBrand,
  type VehicleType,
  type VehicleTypeKey,
  vehicleBrands as initialVehicleBrands,
} from "./data";

type StepVehiculeProps = {
  vehicleBrands: VehicleBrand[];
  vehicleTypes: VehicleType[];
  selectedVehicleType: VehicleTypeKey | null;
  reservation: {
    marque: string;
    modele: string;
    annee: string;
    couleur: string;
  };
  onUpdateReservation: (
    payload: Partial<StepVehiculeProps["reservation"]>,
  ) => void;
  onSelectVehicleType: (vehicleType: string) => void;
  onNext: () => void;
};

export function StepVehicule({
  vehicleBrands,
  vehicleTypes,
  selectedVehicleType,
  reservation,
  onUpdateReservation,
  onSelectVehicleType,
  onNext,
}: StepVehiculeProps) {
  const [brands, setBrands] = useState<VehicleBrand[]>(initialVehicleBrands);

  useEffect(() => {
    async function loadBrands() {
      try {
        const response = await fetch("/car-brands.json");
        if (!response.ok) {
          throw new Error("Failed to load brands");
        }
        const data = (await response.json()) as VehicleBrand[];
        setBrands(data);
      } catch {
        setBrands(initialVehicleBrands);
      }
    }

    loadBrands();
  }, []);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.name === reservation.marque),
    [brands, reservation.marque],
  );

  const isValid =
    reservation.marque.trim().length > 0 &&
    reservation.modele.trim().length > 0 &&
    reservation.annee.trim().length > 0 &&
    reservation.couleur.trim().length > 0 &&
    !!selectedVehicleType;

  return (
    <Card className="rounded-[2rem] border-gray-200 p-4 shadow-sm sm:p-6">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Sélectionnez votre véhicule
        </CardTitle>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Choisissez la marque et le modèle de votre véhicule.
        </p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Marque</span>
            <select
              value={reservation.marque}
              onChange={(event) =>
                onUpdateReservation({ marque: event.target.value, modele: "" })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
            >
              <option value="">Sélectionner une marque</option>
              {brands.map((brand) => (
                <option key={brand.key} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Modèle</span>
            <select
              value={reservation.modele}
              onChange={(event) =>
                onUpdateReservation({ modele: event.target.value })
              }
              disabled={!selectedBrand}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {selectedBrand
                  ? "Sélectionner un modèle"
                  : "Choisissez une marque d'abord"}
              </option>
              {selectedBrand?.models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Année</span>
            <input
              value={reservation.annee}
              onChange={(event) =>
                onUpdateReservation({ annee: event.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Couleur</span>
            <input
              value={reservation.couleur}
              onChange={(event) =>
                onUpdateReservation({ couleur: event.target.value })
              }
              placeholder="Ex: Noir, Blanc, Gris..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Type de véhicule
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {vehicleTypes.map((vehicle) => {
              const selected = selectedVehicleType === vehicle.key;
              return (
                <button
                  key={vehicle.key}
                  type="button"
                  onClick={() => onSelectVehicleType(vehicle.key)}
                  className={`rounded-[2rem] border p-4 text-left transition-all focus:outline-none ${
                    selected
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="mb-4 flex h-24 items-center justify-center rounded-3xl bg-gray-50">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        selected ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {vehicle.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:mt-12">
          <Button
            type="button"
            onClick={onNext}
            className="w-full max-w-xs bg-blue-600 text-white hover:bg-blue-700 sm:w-52"
            disabled={!isValid}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
