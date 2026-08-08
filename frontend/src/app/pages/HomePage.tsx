import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
