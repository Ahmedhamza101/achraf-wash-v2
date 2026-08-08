import { type LucideIcon } from "lucide-react";
import { Car, Sparkles, MapPin, User } from "lucide-react";

export type VehicleTypeKey =
  | "citadine"
  | "berline"
  | "suv-moyen"
  | "suv-grand"
  | "moto-scooter";

export type ReservationPackage = {
  name: string;
  price: string;
  popular?: boolean;
  features: { label: string; available: boolean }[];
};

export type VehicleType = {
  key: VehicleTypeKey;
  name: string;
  image: string;
};

export type VehicleBrandKey =
  | "toyota"
  | "renault"
  | "peugeot"
  | "volkswagen"
  | "bmw"
  | "mercedes"
  | "audi"
  | "hyundai"
  | "kia"
  | "nissan";

export type VehicleBrand = {
  key: VehicleBrandKey;
  name: string;
  logo: string;
  logoBackground: string;
  models: string[];
};

export const vehicleBrands: VehicleBrand[] = [
  {
    key: "toyota",
    name: "Toyota",
    logo: "TOY",
    logoBackground: "#ef4444",
    models: ["Corolla", "Yaris", "RAV4", "C-HR"],
  },
  {
    key: "renault",
    name: "Renault",
    logo: "R",
    logoBackground: "#2563eb",
    models: ["Clio", "Mégane", "Captur", "Kangoo"],
  },
  {
    key: "peugeot",
    name: "Peugeot",
    logo: "P",
    logoBackground: "#0f766e",
    models: ["208", "308", "3008", "2008"],
  },
  {
    key: "volkswagen",
    name: "Volkswagen",
    logo: "VW",
    logoBackground: "#1d4ed8",
    models: ["Golf", "Polo", "Tiguan", "Passat"],
  },
  {
    key: "bmw",
    name: "BMW",
    logo: "BMW",
    logoBackground: "#0e7490",
    models: ["Série 1", "Série 3", "X1", "X3"],
  },
  {
    key: "mercedes",
    name: "Mercedes",
    logo: "M",
    logoBackground: "#1f2937",
    models: ["A-Class", "C-Class", "GLC", "E-Class"],
  },
  {
    key: "audi",
    name: "Audi",
    logo: "A",
    logoBackground: "#111827",
    models: ["A3", "A4", "Q3", "Q5"],
  },
  {
    key: "hyundai",
    name: "Hyundai",
    logo: "H",
    logoBackground: "#2563eb",
    models: ["i10", "i20", "Tucson", "Santa Fe"],
  },
  {
    key: "kia",
    name: "Kia",
    logo: "KIA",
    logoBackground: "#b91c1c",
    models: ["Picanto", "Rio", "Sportage", "Seltos"],
  },
  {
    key: "nissan",
    name: "Nissan",
    logo: "N",
    logoBackground: "#f59e0b",
    models: ["Micra", "Qashqai", "X-Trail", "Leaf"],
  },
];

export const steps: Array<{ key: string; label: string; icon: LucideIcon }> = [
  { key: "vehicle", label: "Véhicule", icon: Car },
  { key: "service", label: "Service", icon: Sparkles },
  { key: "date", label: "Date", icon: MapPin },
  { key: "contact", label: "Contact", icon: User },
];

export const vehicleTypes: VehicleType[] = [
  {
    key: "citadine",
    name: "Citadine",
    image: new URL("../../assets/citadine.png", import.meta.url).href,
  },
  {
    key: "berline",
    name: "Berline",
    image: new URL("../../assets/berline.png", import.meta.url).href,
  },
  {
    key: "suv-moyen",
    name: "SUV Moyen",
    image: new URL("../../assets/suv-moyen.png", import.meta.url).href,
  },
  {
    key: "suv-grand",
    name: "SUV Grand",
    image: new URL("../../assets/suv-grand.png", import.meta.url).href,
  },
  {
    key: "moto-scooter",
    name: "Moto / Scooter",
    image: new URL("../../assets/moto-scooter.png", import.meta.url).href,
  },
];

const sharedCarFeatures = [
  { label: "Lavage carrosserie", available: true },
  { label: "Aspiration intérieur et coffre", available: true },
  { label: "Nettoyage intérieur", available: true },
  { label: "Nettoyage jantes et cirage des pneus", available: true },
  { label: "Nettoyage des vitres", available: true },
];

const carPackages: ReservationPackage[] = [
  {
    name: "Lavage Express",
    price: "70",
    popular: false,
    features: [
      ...sharedCarFeatures,
      { label: "Lavage carrosserie avec finition brillance", available: false },
      { label: "Rénovation des plastiques et brillance", available: false },
      { label: "Traitement des taches sur les sièges et les tapis", available: false },
      { label: "Lavage moteur", available: false },
    ],
  },
  {
    name: "Lavage Spécial",
    price: "100",
    popular: false,
    features: [
      ...sharedCarFeatures,
      { label: "Lavage carrosserie avec finition brillance", available: true },
      { label: "Rénovation des plastiques et brillance", available: false },
      { label: "Traitement des taches sur les sièges et les tapis", available: false },
      { label: "Lavage moteur", available: false },
    ],
  },
  {
    name: "Lavage Premium",
    price: "200",
    popular: true,
    features: [
      ...sharedCarFeatures,
      { label: "Lavage carrosserie avec finition brillance", available: true },
      { label: "Rénovation des plastiques et brillance", available: true },
      { label: "Traitement des taches sur les sièges et les tapis", available: true },
      { label: "Lavage moteur", available: false },
    ],
  },
];

const sharedMotoFeatures = [
  { label: "Lavage carrosserie", available: true },
  { label: "Nettoyage intérieur", available: true },
  { label: "Nettoyage des vitres", available: true },
];

const motoPackages: ReservationPackage[] = [
  {
    name: "Petits Motos",
    price: "50",
    popular: false,
    features: [
      ...sharedMotoFeatures,
      { label: "Nettoyage jantes et cirage des pneus", available: true },
      { label: "Lavage carrosserie avec finition brillance", available: false },
    ],
  },
  {
    name: "Grands Motos",
    price: "90",
    popular: true,
    features: [
      ...sharedMotoFeatures,
      { label: "Nettoyage jantes et cirage des pneus", available: true },
      { label: "Lavage carrosserie avec finition brillance", available: true },
    ],
  },
];

export const servicePackagesByVehicleType: Record<VehicleTypeKey, ReservationPackage[]> = {
  citadine: carPackages,
  berline: carPackages,
  "suv-moyen": carPackages,
  "suv-grand": carPackages,
  "moto-scooter": motoPackages,
};

export const cities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
];
