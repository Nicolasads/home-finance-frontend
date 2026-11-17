"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { useToast } from "@/hooks/useToast";
import { FormField } from "../ui/FormField";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const toggleVisibility = (
  visible: boolean,
  onToggle: () => void,
): ReactNode => (
  <button
    type="button"
    onClick={onToggle}
    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
  >
    {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </button>
);

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useRegisterForm(() => {
      showToast("Conta criada com sucesso! Seja bem-vindo.");
      router.replace(ROUTES.HOME);
    });
  const strength = usePasswordStrength(values.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        label="Nome completo"
        name="name"
        autoComplete="name"
        placeholder="Seu nome"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        icon={<User className="h-4 w-4" />}
      />

      <FormField
        label="E-mail principal"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="seu.email@exemplo.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        icon={<Mail className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Criar senha"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon={<Lock className="h-4 w-4" />}
          trailing={toggleVisibility(showPassword, () =>
            setShowPassword((prev) => !prev),
          )}
        />

        <FormField
          label="Confirmar senha"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<Lock className="h-4 w-4" />}
          trailing={toggleVisibility(showConfirm, () =>
            setShowConfirm((prev) => !prev),
          )}
        />
      </div>

      {values.password && <PasswordStrengthMeter strength={strength} />}

      <div className="space-y-1">
        <label className="flex cursor-pointer items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={values.termsAccepted}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-indigo-600"
          />
          <span className="text-xs leading-normal text-slate-600 dark:text-slate-400">
            Li e concordo com os{" "}
            <a
              href="#"
              className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Termos de Serviço
            </a>{" "}
            e a{" "}
            <a
              href="#"
              className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        {errors.termsAccepted && (
          <p role="alert" className="text-[11px] font-semibold text-rose-500">
            {errors.termsAccepted}
          </p>
        )}
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="flex w-full items-center justify-center gap-2 py-3.5"
      >
        {!isSubmitting && (
          <>
            <span>Criar minha conta</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
