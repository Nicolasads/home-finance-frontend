import { AUTH_MESSAGES } from "@/constants/auth";
import { FormErrors, LoginFormValues } from "@/types/auth";
import { isFilled, isValidEmail } from "@/utils/validators";
import { useAuth } from "./useAuth";
import { ChangeEvent, FormEvent, useState } from "react";

const INITIAL_VALUES: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

const validateLogin = (
  values: LoginFormValues,
): FormErrors<LoginFormValues> => {
  const errors: FormErrors<LoginFormValues> = {};
  if (!isValidEmail(values.email)) errors.email = AUTH_MESSAGES.INVALID_EMAIL;
  if (!isFilled(values.password))
    errors.password = AUTH_MESSAGES.REQUIRED_PASSWORD;

  return errors;
};

export function useFormLogin(onSuccess: () => void) {
  const { login } = useAuth();
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors<LoginFormValues>>({});
  const [formError, setFormError] = useState("");
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

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setFormError("");
    try {
      await login({ email: values.email, password: values.password });
      onSuccess();
    } catch {
      setFormError(AUTH_MESSAGES.LOGIN_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    formError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
