import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch } from "../../lib/api";

const TOKEN_STORAGE_KEY = "achraf_wash_admin_token";

interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface AdminAuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    apiFetch<AdminUser>("/admin/me", { token: storedToken })
      .then((user) => {
        if (!cancelled) {
          setToken(storedToken);
          setAdmin(user);
        }
      })
      .catch(() => {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: AdminUser }>("/admin/login", {
      method: "POST",
      body: { email, password },
    });

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);
    setAdmin(data.user);
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await apiFetch("/admin/logout", { method: "POST", token });
      } catch {
        // Best-effort: proceed with local logout even if the API call fails.
      }
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setAdmin(null);
  }, [token]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      admin,
      token,
      isLoading,
      isAuthenticated: admin !== null,
      login,
      logout,
    }),
    [admin, token, isLoading, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
}
