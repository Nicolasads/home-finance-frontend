import type { OAuthProvider } from "@/constants/auth";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Session {
  user: User;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  termsAccepted?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<Session>;
  register: (data: RegisterPayload) => Promise<Session>;
  loginWithProvider: (provider: OAuthProvider) => void;
  logout: () => Promise<void>;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
