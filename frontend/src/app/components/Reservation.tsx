import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check } from "lucide-react";
import { API_BASE_URL } from "../../lib/api";
import {
  steps,
  vehicleBrands,
  vehicleTypes,
  servicePackagesByVehicleType,
  type VehicleTypeKey,
} from "./reservation/data";
import { StepVehicule } from "./reservation/StepVehicule";
import { StepService } from "./reservation/StepService";
import { StepDate } from "./reservation/StepDate";
import { StepContact } from "./reservation/StepContact";

const defaultReservation = {
  marque: "",
  modele: "",
  annee: "",
  couleur: "",
  vehicleType: null as VehicleTypeKey | null,
  packageName: null as string | null,
  packagePrice: null as string | null,
  date: "",
  time: "",
  city: "Casablanca",
  address: "",
  civilite: "Monsieur",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reservation, setReservation] = useState(defaultReservation);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedPackages = useMemo(() => {
    if (!reservation.vehicleType) return [];
    return servicePackagesByVehicleType[reservation.vehicleType];
  }, [reservation.vehicleType]);

  const handleUpdate = (payload: Partial<typeof reservation>) => {
    setReservation((prev) => ({ ...prev, ...payload }));
  };

  const activeStep = currentStep;

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirm = async () => {
    setError(null);
    setConfirmation(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marque: reservation.marque,
          modele: reservation.modele,
          annee: reservation.annee,
          couleur: reservation.couleur,
          vehicle_type: reservation.vehicleType,
          package_name: reservation.packageName,
          package_price: reservation.packagePrice
            ? Number(reservation.packagePrice)
            : 0,
          date: reservation.date,
          time: reservation.time,
          city: reservation.city,
          address: reservation.address,
          civilite: reservation.civilite,
          first_name: reservation.firstName,
          last_name: reservation.lastName,
          email: reservation.email,
          phone: reservation.phone,
          notes: reservation.notes,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(
          payload?.message ??
            "Impossible d'envoyer la réservation. Veuillez réessayer.",
        );
        return;
      }

      setConfirmation(
        "Votre réservation a été envoyée. Nous vous contacterons bientôt.",
      );
      setReservation(defaultReservation);
      setCurrentStep(1);
    } catch (error) {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="scroll-mt-24 py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900">Réservation</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Suivez chaque étape pour réserver votre lavage auto avec ACHRAFWASH.
          </p>
        </div>

        <div className="mb-12 overflow-hidden rounded-[2rem] border border-gray-200 bg-white px-4 py-8 shadow-sm">
          <div className="relative mx-auto max-w-5xl px-4">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" />
            <div className="relative flex items-center justify-between space-x-4">
              {steps.map((step, index) => {
                const isCompleted = index + 1 < activeStep;
                const isCurrent = index + 1 === activeStep;
                return (
                  <div
                    key={step.key}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl transition ${
                        isCompleted || isCurrent
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {confirmation && (
          <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-900 shadow-sm">
            {confirmation}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-red-900 shadow-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {activeStep === 1 && (
            <StepVehicule
              vehicleBrands={vehicleBrands}
              vehicleTypes={vehicleTypes}
              selectedVehicleType={reservation.vehicleType}
              reservation={reservation}
              onUpdateReservation={(payload) => handleUpdate(payload)}
              onSelectVehicleType={(vehicleType) => {
                handleUpdate({
                  vehicleType: vehicleType as VehicleTypeKey,
                  packageName: null,
                  packagePrice: null,
                });
              }}
              onNext={nextStep}
            />
          )}

          {activeStep === 2 && (
            <StepService
              packages={selectedPackages}
              selectedPackageName={reservation.packageName}
              onSelectPackage={(pkgName, price) =>
                handleUpdate({ packageName: pkgName, packagePrice: price })
              }
              onPrevious={previousStep}
              onNext={nextStep}
            />
          )}

          {activeStep === 3 && (
            <StepDate
              date={reservation.date}
              time={reservation.time}
              onUpdate={(payload) => handleUpdate(payload)}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          )}

          {activeStep === 4 && (
            <StepContact
              reservation={reservation}
              onUpdateReservation={(payload) => handleUpdate(payload)}
              onPrevious={previousStep}
              onConfirm={handleConfirm}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </section>
  );
}
