import type { Credentials, RegisterPayload, Session } from "@/types/auth";
import type { OAuthProvider } from "@/constants/auth";
import { request, BASE_URL } from "./httpClient";

const BASE_ENDPOINT = "/auth";

export const authService = {
  login: (credentials: Credentials) =>
    request<Session>(`${BASE_ENDPOINT}/login`, {
      method: "POST",
      body: credentials,
    }),

  register: (data: RegisterPayload) =>
    request<Session>(`${BASE_ENDPOINT}/register`, {
      method: "POST",
      body: data,
    }),

  logout: () => request<null>(`${BASE_ENDPOINT}/logout`, { method: "POST" }),

  getSession: () => request<Session>(`${BASE_ENDPOINT}/me`, { method: "GET" }),

  // Não usa fetch: o navegador precisa seguir o redirect do provedor
  getOAuthUrl: (provider: OAuthProvider, returnTo: string) => {
    const params = new URLSearchParams({ returnTo });
    return `${BASE_URL}/auth/oauth/${provider}?${params.toString()}`;
  },
};
