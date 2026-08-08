import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { ReservationPackage } from "./data";

type StepServiceProps = {
  packages: ReservationPackage[];
  selectedPackageName: string | null;
  onSelectPackage: (pkgName: string, price: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function StepService({
  packages,
  selectedPackageName,
  onSelectPackage,
  onPrevious,
  onNext,
}: StepServiceProps) {
  const isValid = !!selectedPackageName;

  return (
    <Card className="rounded-[2rem] border-gray-200 p-4 shadow-sm sm:p-6">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Choisissez votre service
        </CardTitle>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Sélectionnez le type de lavage souhaité
        </p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => {
            const selected = selectedPackageName === pkg.name;
            return (
              <Card
                key={pkg.name}
                className={`rounded-[2rem] border p-6 transition ${
                  selected
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {pkg.name}
                    </p>
                    <p className="text-sm text-gray-500">{pkg.price} MAD</p>
                  </div>
                  {pkg.popular && (
                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Populaire
                    </span>
                  )}
                </div>
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      {feature.available ? (
                        <Check className="mt-1 h-4 w-4 text-green-500" />
                      ) : (
                        <X className="mt-1 h-4 w-4 text-gray-300" />
                      )}
                      <span
                        className={
                          feature.available ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant={selected ? "default" : "outline"}
                  className={`w-full ${selected ? "bg-blue-600 text-white" : ""}`}
                  onClick={() => onSelectPackage(pkg.name, pkg.price)}
                >
                  Choisir ce lavage
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onPrevious}
          >
            Précédent
          </Button>
          <Button
            type="button"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
            onClick={onNext}
            disabled={!isValid}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
