import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, X } from "lucide-react";

// Images are referenced via `new URL(..., import.meta.url).href` below

const vehicleTypes = [
  {
    key: "citadine",
    name: "Citadine",
    category: "Petite voiture",
    description:
      "Tarifs adaptés aux citadines compactes : rapide, propre et léger sur votre budget.",
    image: new URL("../assets/citadine.png", import.meta.url).href,
    packages: [
      {
        name: "Lavage Express",
        price: "70",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: false,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Spécial",
        price: "100",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Premium",
        price: "200",
        popular: true,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: true },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: true,
          },
        ],
      },
    ],
  },
  {
    key: "berline",
    name: "Berline",
    category: "Voiture familiale",
    description:
      "Solution complète pour berlines : protection extérieure et confort intérieur.",
    image: new URL("../assets/berline.png", import.meta.url).href,
    packages: [
      {
        name: "Lavage Express",
        price: "90",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: false,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Spécial",
        price: "120",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Premium",
        price: "210",
        popular: true,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: true },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: true,
          },
        ],
      },
    ],
  },
  {
    key: "suv-moyen",
    name: "SUV Moyen",
    category: "Véhicule familial",
    description:
      "Performances supérieures pour SUV moyens : nettoyage profond et finition brillante.",
    image: new URL("../assets/suv-moyen.png", import.meta.url).href,
    packages: [
      {
        name: "Lavage Express",
        price: "110",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: false,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Spécial",
        price: "150",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Premium",
        price: "250",
        popular: true,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: true },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: true,
          },
        ],
      },
    ],
  },
  {
    key: "suv-grand",
    name: "SUV Grand",
    category: "Grand véhicule",
    description:
      "Tarifs spécifiques aux grands SUV : soin des surfaces larges et des intérieurs spacieux.",
    image: new URL("../assets/suv-grand.png", import.meta.url).href,
    packages: [
      {
        name: "Lavage Express",
        price: "130",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: false,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Spécial",
        price: "170",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: false,
          },
        ],
      },
      {
        name: "Lavage Premium",
        price: "200",
        popular: true,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Aspiration intérieur et coffre", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: true },
          {
            label: "Traitement des taches sur les sièges et les tapis",
            available: true,
          },
        ],
      },
    ],
  },
  {
    key: "moto-scooter",
    name: "Moto / Scooter",
    category: "Deux-roues",
    description:
      "Options rapides et précises pour motos et scooters, avec un résultat net et brillant.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kawa_Ninja_white.JPG/1280px-Kawa_Ninja_white.JPG",
    packages: [
      {
        name: "Petits Motos",
        price: "50",
        popular: false,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: false,
          },
          { label: "Rénovation des plastiques et brillance", available: false },
        ],
      },
      {
        name: "Grands Motos",
        price: "200",
        popular: true,
        features: [
          { label: "Lavage carrosserie", available: true },
          { label: "Nettoyage intérieur", available: true },
          { label: "Nettoyage jantes et cirage des pneus", available: true },
          { label: "Nettoyage des vitres", available: true },
          {
            label: "Lavage carrosserie avec finition brillance",
            available: true,
          },
          { label: "Rénovation des plastiques et brillance", available: true },
        ],
      },
    ],
  },
];

export function Services() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleSelectVehicle = (
    vehicle: (typeof vehicleTypes)[number],
    index: number,
  ) => {
    setSelectedVehicle(vehicle);
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">
            Nos Tarifs par Véhicule
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sélectionnez votre type de véhicule pour afficher un tarif clair et
            dédié à votre besoin.
          </p>
        </div>

        <div
          ref={tabsRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-none justify-center md:justify-center"
        >
          {vehicleTypes.map((vehicle, index) => {
            const selected = selectedVehicle.key === vehicle.key;
            return (
              <button
                key={vehicle.key}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                onClick={() => handleSelectVehicle(vehicle, index)}
                className={`snap-center w-[220px] flex-shrink-0 rounded-3xl border p-5 text-left transition-all duration-300 ease-in-out focus:outline-none ${
                  selected
                    ? "border-blue-100 bg-blue-400 text-white shadow-lg"
                    : "border-gray-300 bg-white text-gray-900 hover:border-blue-400 hover:shadow-sm"
                }`}
              >
                <div className="mb-4 rounded-3xl border border-blue-200 bg-white p-2 text-center">
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-24 object-contain mx-auto"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">Image</p>
                  )}
                </div>
                <div>
                  <p className="text-xl font-semibold">{vehicle.name}</p>
                  <p className="text-sm text-black">{vehicle.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className={`grid gap-6 mt-10 max-w-5xl mx-auto justify-center ${
            selectedVehicle.packages.length === 2
              ? "lg:grid-cols-2"
              : "lg:grid-cols-3"
          }`}
        >
          {selectedVehicle.packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`rounded-[2rem] border ${
                pkg.popular
                  ? "border-yellow-400 bg-yellow-50 shadow-xl"
                  : "border-gray-200 bg-white"
              } p-6 flex flex-col justify-between`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-slate-900">
                      {pkg.name}
                    </p>
                  </div>
                  {pkg.popular && (
                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Populaire
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <p className="text-5xl font-extrabold text-slate-900">
                    {pkg.price}
                  </p>
                  <p className="text-sm text-slate-500">MAD</p>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      {feature.available ? (
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                      ) : (
                        <X className="mt-1 h-4 w-4 flex-shrink-0 text-gray-300" />
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
              </div>

              <Button
                className={`w-full ${pkg.popular ? "bg-slate-900 text-white" : ""}`}
                variant={pkg.popular ? "default" : "outline"}
              >
                Choisir ce lavage
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
