import React, { createContext, useContext, useMemo, useState } from "react";
import type { AuthState, Role, User } from "../../shared/types/auth";
import { api } from "../../shared/api/client";

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (minRole: Role) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const roleRank: Record<Role, number> = { TECH: 1, SUPERVISOR: 2, ADMIN: 3 };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const payload = res.data as { token: string; user: User };

    setToken(payload.token);
    setUser(payload.user);
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user", JSON.stringify(payload.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const hasRole = (minRole: Role) => {
    if (!user) return false;
    return roleRank[user.role] >= roleRank[minRole];
  };

  const value = useMemo(() => ({ token, user, login, logout, hasRole }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
