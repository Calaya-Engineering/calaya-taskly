"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN_KEY } from "@/lib/auth-config";

type AuthUser = {
  email: string;
  role: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  /** Clear session without redirecting. Use when starting fresh login or after OTP failure. */
  clearSession: () => void;
  /** Call after storing token to update session and avoid redirect back to login */
  setSession: (token: string) => void;
  /** Get current Bearer token for API requests */
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type DecodedToken = {
  email: string;
  role: string;
  exp?: number;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = window.sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
        setLoading(false);
        return;
      }

      setUser({ email: decoded.email, role: decoded.role });
    } catch {
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      // Clear all auth-related storage
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      
      // Attempt to clear session/auth cookies by expiration
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setUser(null);
    router.push("/login");
  };

  const clearSession = () => {
    if (typeof window !== "undefined") {
      // ONLY clear sessionStorage for THIS tab.
      // This allows other tabs to keep their own independent sessions.
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
    setUser(null);
  };

  const setSession = (token: string) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
        return;
      }
      setUser({ email: decoded.email, role: decoded.role });
    } catch {
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        clearSession,
        setSession,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}


