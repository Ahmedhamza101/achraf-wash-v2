import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Phone, MapPin } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const navigateToSection = (id: string) => {
    // navigate to home route first so the section exists, then scroll
    navigate("/");

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

    const smoothScrollTo = (targetY: number, duration = 600) => {
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

    void waitForElement(id, 1500, 30).then((el) => {
      if (!el) {
        // fallback to hash change if element not found
        window.location.hash = `#${id}`;
        return;
      }

      const header = document.querySelector("header");
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 64;
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - headerHeight - 8; // small padding

      smoothScrollTo(targetY, 700);
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-2 right-2 z-50 h-16 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/60 shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}

        {/* Main navigation */}
        <div className="flex items-center justify-between pt-3 h-full">
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <a href="/#home" className="flex items-center">
              <h1 className="text-2xl font-semibold">ACHRAF</h1>
              <h1 className="text-2xl font-light">WASH</h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("home");
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Accueil
            </a>
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("services");
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Services
            </a>
            <a
              href="/#about"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("about");
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              À propos
            </a>
            <a
              href="/#reviews"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("reviews");
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Avis
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("contact");
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <Link to="/reservation">Réserver</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-white hover:text-blue-600 hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white bg-white backdrop-blur-sm rounded-b-xl pl-4 ">
            <nav className="flex flex-col space-y-4">
              <a
                href="/#home"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  navigateToSection("home");
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              >
                Accueil
              </a>
              <a
                href="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  navigateToSection("services");
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              >
                Services
              </a>
              <a
                href="/#about"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  navigateToSection("about");
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              >
                À propos
              </a>
              <a
                href="/#reviews"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  navigateToSection("reviews");
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              >
                Avis
              </a>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  navigateToSection("contact");
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              >
                Contact
              </a>
              <Button asChild className="mt-4 mr-4">
                <Link to="/reservation">Réserver</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
