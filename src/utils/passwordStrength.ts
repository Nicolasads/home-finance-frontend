import { PASSWORD_MIN_LENGTH } from "@/constants/auth";

export interface PasswordRequirements {
  minLength: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordStrength {
  score: number;
  requirements: PasswordRequirements;
}

const SPECIAL_CHAR_PATTERN = /[!@#$%^&*(),.?":{}|<>]/;

export const getPasswordRequirements = (
  password: string,
): PasswordRequirements => ({
  minLength: password.length >= PASSWORD_MIN_LENGTH,
  hasUpper: /[A-Z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecial: SPECIAL_CHAR_PATTERN.test(password),
});

// Cada requisito vale 25 pontos, então o score vai de 0 a 100
export const calculatePasswordScore = (
  requirements: PasswordRequirements,
): number => Object.values(requirements).filter(Boolean).length * 25;

export const getPasswordStrength = (password: string): PasswordStrength => {
  const requirements = getPasswordRequirements(password);
  return { score: calculatePasswordScore(requirements), requirements };
};
