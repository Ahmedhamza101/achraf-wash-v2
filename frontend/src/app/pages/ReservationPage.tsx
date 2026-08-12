import { useEffect } from "react";
import { Reservation } from "../components/Reservation";
import { scrollToTop } from "../../lib/scroll";

export default function ReservationPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Reservation />
    </main>
  );
}
