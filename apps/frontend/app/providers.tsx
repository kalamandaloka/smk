"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchJson } from "./lib/api";
import { AuthUser, clearToken, getStoredToken, storeToken } from "./lib/auth";

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
  }, []);

  const refreshMe = useCallback(async (nextToken?: string | null) => {
    const t = nextToken ?? token ?? getStoredToken();
    if (!t) {
      setUser(null);
      return;
    }
    const me = await fetchJson<AuthUser>("/auth/me", { token: t, cache: "no-store" });
    setUser(me);
  }, [token]);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await fetchJson<{ accessToken: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    storeToken(res.accessToken);
    setToken(res.accessToken);
    await refreshMe(res.accessToken);
  }, [refreshMe]);

  useEffect(() => {
    const t = getStoredToken();
    setToken(t);
    if (!t) {
      setLoading(false);
      return;
    }
    refreshMe(t)
      .catch(() => {
        signOut();
      })
      .finally(() => setLoading(false));
  }, [refreshMe, signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({ token, user, loading, signIn, signOut, refreshMe: () => refreshMe() }),
    [token, user, loading, signIn, signOut, refreshMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within Providers");
  return ctx;
}
