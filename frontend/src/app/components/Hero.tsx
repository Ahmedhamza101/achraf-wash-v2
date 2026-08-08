import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Star, Award, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const navigate = useNavigate();

  const waitForElement = (id: string, timeout = 1000, interval = 50) =>
    new Promise<HTMLElement | null>((resolve) => {
      const start = Date.now();
      const iv = setInterval(() => {
        const el = document.getElementById(id) as HTMLElement | null;
        if (el) {
          clearInterval(iv);
          resolve(el);
        } else if (Date.now() - start > timeout) {
          clearInterval(iv);
          resolve(null);
        }
      }, interval);
    });

  const smoothScrollTo = (targetY: number, duration = 700) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (time: number) => {
      if (startTime === null) startTime = time;
      const t = Math.min(1, (time - startTime) / duration);
      const eased = ease(t);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollToServices = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }

    void waitForElement("services", 1500, 30).then((el) => {
      if (!el) {
        window.location.hash = "#services";
        return;
      }

      const header = document.querySelector("header");
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 64;
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - headerHeight - 8;
      smoothScrollTo(targetY, 700);
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center -mt-[64px] pt-[64px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1716341279865-5a07ab2a0492?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Professional car washing service"
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
        {/* dark overlay above image */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl mb-6">
            Meilleurs Services de
            <span className="block text-blue-400">Lavage Auto À Agadir</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Un lavage soigné pour garder votre voiture propre et comme neuve.
            Des produits de qualité et un travail fait avec soin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => navigate("/reservation")}
            >
              Réserver un Lavage
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
              onClick={scrollToServices}
            >
              Voir les Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-2xl">4.9</span>
              </div>
              <p className="text-sm text-gray-300">Notation Moyenne</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-400 mr-1" />
                <span className="text-2xl">950+</span>
              </div>
              <p className="text-sm text-gray-300">Clients Satisfaits</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-green-400 mr-1" />
                <span className="text-2xl">8+</span>
              </div>
              <p className="text-sm text-gray-300">Ans d&apos;Expérience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
