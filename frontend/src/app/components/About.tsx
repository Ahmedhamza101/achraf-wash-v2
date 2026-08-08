import { Card, CardContent } from "./ui/card";
import { Shield, Leaf, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garantie Qualité",
    description:
      "Nous garantissons votre satisfaction à 100 % sur tous nos services.",
  },
  {
    icon: Leaf,
    title: "Éco-responsable",
    description:
      "Nous utilisons des produits biodégradables et respectueux de l'environnement pour protéger votre voiture et la planète.",
  },
  {
    icon: Clock,
    title: "Service Rapide",
    description:
      "Un service efficace sans compromis sur la qualité. La plupart des lavages sont terminés en moins d'une heure.",
  },
  {
    icon: Award,
    title: "Équipe Experte",
    description:
      "Nos professionnels formés ont des années d'expérience en entretien et détailing automobile.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl mb-6 text-gray-900">
                Pourquoi choisir
                <span className="text-4xl mb-6 text-gray-900 font-semibold ml-2">
                  ACHRAF
                </span>
                <span className="text-4xl mb-6 text-gray-900 font-light ">
                  WASH
                </span>
                ?{" "}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Achraf Wash est né d'une conviction simple : chaque voiture
                mérite un lavage minutieux, réalisé par des mains expertes et
                avec des produits de qualité. Depuis notre ouverture, nous avons
                à cœur d'offrir un service rapide, fiable et sans mauvaise
                surprise à tous nos clients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Notre engagement envers la qualité, l&apos;attention aux détails
                et la satisfaction client nous a hissés au rang de premier
                service de lavage auto de la région. Chaque véhicule reçoit
                toute notre attention et notre soin.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl text-blue-600 mb-2">950+</h3>
                  <p className="text-gray-600">Clients Satisfaits</p>
                </div>
                <div>
                  <h3 className="text-2xl text-blue-600 mb-2">8+</h3>
                  <p className="text-gray-600">Ans d&apos;Expérience</p>
                </div>
                <div>
                  <h3 className="text-2xl text-blue-600 mb-2">4.9/5</h3>
                  <p className="text-gray-600">Notation Clients</p>
                </div>
                <div>
                  <h3 className="text-2xl text-blue-600 mb-2">100%</h3>
                  <p className="text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="h-32 bg-blue-50 border-none">
                  <CardContent className="h-full flex items-center justify-center">
                    <Shield className="w-12 h-12 text-blue-600" />
                  </CardContent>
                </Card>
                <Card className="h-48 bg-green-50 border-none">
                  <CardContent className="h-full flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-green-600" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="h-48 bg-orange-50 border-none">
                  <CardContent className="h-full flex items-center justify-center">
                    <Clock className="w-16 h-16 text-orange-600" />
                  </CardContent>
                </Card>
                <Card className="h-32 bg-purple-50 border-none">
                  <CardContent className="h-full flex items-center justify-center">
                    <Award className="w-12 h-12 text-purple-600" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <IconComponent className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
