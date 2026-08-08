import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Tag,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { useAdminAuth } from "../context/AdminAuthContext";
import { cn } from "../components/ui/utils";

const navItems = [
  { to: "/admin", label: "Aperçu", icon: LayoutDashboard, end: true },
  { to: "/admin/tarifs", label: "Tarifs", icon: Tag, end: false },
  { to: "/admin/reservations", label: "Réservations", icon: CalendarCheck, end: false },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare, end: false },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center px-6 py-5 text-blue-600">
        <span className="text-xl font-semibold">ACHRAF</span>
        <span className="text-xl font-light">WASH</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t px-3 py-4">
        <div className="mb-3 px-3">
          <p className="truncate text-sm font-medium text-gray-900">{admin?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{admin?.email}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r bg-white md:block">
          <SidebarNav />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b bg-white px-4 py-3 md:hidden">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu administrateur</SheetTitle>
                </SheetHeader>
                <SidebarNav onNavigate={() => setIsMobileNavOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="text-blue-600">
              <span className="text-lg font-semibold">ACHRAF</span>{" "}
              <span className="text-lg font-light">WASH</span>
            </span>
          </header>

          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
