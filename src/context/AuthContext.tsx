"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "@/services/authService";
import type {
  AuthContextValue,
  Credentials,
  RegisterPayload,
  User,
} from "@/types/auth";
import type { OAuthProvider } from "@/constants/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .getSession()
      .then((session) => setUser(session.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    const session = await authService.login(credentials);
    setUser(session.user);
    return session;
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    const session = await authService.register(data);
    setUser(session.user);
    return session;
  }, []);

  const loginWithProvider = useCallback((provider: OAuthProvider) => {
    // returnTo volta o usuário para a página em que ele estava
    const returnTo = window.location.pathname + window.location.search;
    window.location.assign(authService.getOAuthUrl(provider, returnTo));
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, register, loginWithProvider, logout }),
    [user, isLoading, login, register, loginWithProvider, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
