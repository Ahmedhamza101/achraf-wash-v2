import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MatomoTracker } from "./components/MatomoTracker";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminTarifsPage from "./pages/admin/AdminTarifsPage";
import AdminReservationsPage from "./pages/admin/AdminReservationsPage";
import AdminReservationFormPage from "./pages/admin/AdminReservationFormPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminLayout from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

function SiteLayout() {
  return (
    <div className="min-h-screen">
      <MatomoTracker />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverviewPage />} />
        <Route path="tarifs" element={<AdminTarifsPage />} />
        <Route path="reservations" element={<AdminReservationsPage />} />
        <Route path="reservations/new" element={<AdminReservationFormPage />} />
        <Route
          path="reservations/:id/edit"
          element={<AdminReservationFormPage />}
        />
        <Route path="messages" element={<AdminMessagesPage />} />
      </Route>
    </Routes>
  );
}
