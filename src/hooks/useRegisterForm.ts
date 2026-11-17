import { useState, type ChangeEvent, type FormEvent } from "react";
import { AUTH_MESSAGES, PASSWORD_MIN_SCORE_TO_SUBMIT } from "@/constants/auth";
import { useAuth } from "./useAuth";
import { getPasswordStrength } from "@/utils/passwordStrength";
import { isFilled, isValidEmail } from "@/utils/validators";
import type { FormErrors, RegisterFormValues } from "@/types/auth";

const INITIAL_VALUES: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const validateRegister = (
  values: RegisterFormValues,
): FormErrors<RegisterFormValues> => {
  const errors: FormErrors<RegisterFormValues> = {};
  if (!isFilled(values.name)) errors.name = AUTH_MESSAGES.REQUIRED_NAME;
  if (!isValidEmail(values.email)) errors.email = AUTH_MESSAGES.INVALID_EMAIL;
  if (
    getPasswordStrength(values.password).score < PASSWORD_MIN_SCORE_TO_SUBMIT
  ) {
    errors.password = AUTH_MESSAGES.WEAK_PASSWORD;
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = AUTH_MESSAGES.PASSWORDS_MISMATCH;
  }
  if (!values.termsAccepted)
    errors.termsAccepted = AUTH_MESSAGES.TERMS_REQUIRED;
  return errors;
};

export function useRegisterForm(onSuccess: () => void) {
  const { register } = useAuth();
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors<RegisterFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}
