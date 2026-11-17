export const AUTH_TABS = Object.freeze({
  LOGIN: "login",
  REGISTER: "register",
} as const);

export const OAUTH_PROVIDERS = Object.freeze({
  GOOGLE: "google",
  APPLE: "apple",
  GITHUB: "github",
} as const);

export type OAuthProvider =
  (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS];

export type AuthTab = (typeof AUTH_TABS)[keyof typeof AUTH_TABS];

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MIN_SCORE_TO_SUBMIT = 75;

export const AUTH_MESSAGES = Object.freeze({
  INVALID_EMAIL: "Insira um e-mail válido",
  REQUIRED_PASSWORD: "A senha é obrigatória",
  REQUIRED_NAME: "Informe seu nome completo",
  WEAK_PASSWORD: "Sua senha deve atender aos requisitos de segurança",
  PASSWORDS_MISMATCH: "As senhas não coincidem",
  TERMS_REQUIRED: "Você precisa aceitar os termos de serviço",
  LOGIN_FAILED: "E-mail ou senha inválidos.",
});
