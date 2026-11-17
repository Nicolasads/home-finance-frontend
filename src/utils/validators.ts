const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export const isValidEmail = (email: string): boolean =>
  EMAIL_PATTERN.test(email.trim());

export const isFilled = (value: string): boolean => value.trim().length > 0;
