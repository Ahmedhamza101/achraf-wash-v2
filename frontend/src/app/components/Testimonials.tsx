import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Youssef El Amrani",
    rating: 5,
    comment:
      "Un service absolument fantastique ! Ma voiture est comme neuve à chaque fois. L'équipe est professionnelle et l'attention aux détails est incroyable.",
    location: "Hay Salam, Agadir",
  },
  {
    name: "Nadia Benali",
    rating: 5,
    comment:
      "Je viens ici depuis 3 ans. Le meilleur lavage auto de la ville ! Ils utilisent des produits écologiques et livrent toujours des résultats époustouflants.",
    location: "Avenue Mohammed V, Agadir",
  },
  {
    name: "Omar Tazi",
    rating: 5,
    comment:
      "Le forfait Détail Luxe vaut chaque centime. Mes sièges en cuir sont magnifiques et la brillance extérieure dure plusieurs semaines.",
    location: "Sidi Bibi, Agadir",
  },
  {
    name: "Fatima Zahra Alaoui",
    rating: 5,
    comment:
      "Rapide, fiable et abordable. Le personnel est sympathique et va toujours au-delà des attentes. Je recommande vivement !",
    location: "Hay Hassani, Agadir",
  },
  {
    name: "Saïd M.",
    rating: 5,
    comment:
      "Excellent service client et travail de qualité. Ils ont nettoyé ma voiture après un long voyage et elle était plus belle qu'à l'achat !",
    location: "Hay Essalam, Agadir",
  },
  {
    name: "Khalid Berrada",
    rating: 5,
    comment:
      "Un nettoyage professionnel qui a dépassé toutes mes attentes. Mon intérieur est impeccable après chaque visite.",
    location: "Lotissement Les Dunes, Agadir",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <Card className="w-80 shrink-0 mx-3">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-700 mb-6 flex-grow italic leading-relaxed">
          &ldquo;{testimonial.comment}&rdquo;
        </p>
        <div className="border-t pt-4">
          <p className="text-gray-900 mb-1">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">
            Ce que Disent nos Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ne nous croyez pas sur parole. Voici ce que nos clients satisfaits
            pensent de nos services.
          </p>
        </div>
      </div>

      {/* Marquee track — full-bleed so cards bleed off both edges */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

        <div
          className="flex"
          style={{
            animation: "marquee 30s linear infinite",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white rounded-full px-8 py-4 shadow-sm">
            <div className="flex items-center mr-6">
              <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
              <span className="text-2xl text-gray-900 mr-2">4.9</span>
              <span className="text-gray-600">sur 5</span>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <span className="text-2xl text-gray-900 mr-2">500+</span>
              <span className="text-gray-600">Avis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
