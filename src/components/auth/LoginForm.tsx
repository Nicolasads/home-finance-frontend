"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useFormLogin } from "@/hooks/useLoginForm";
import { useToast } from "@/hooks/useToast";
import { FormField } from "../ui/FormField";

export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    errors,
    formError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormLogin(() => {
    showToast("Bem-vindo de volta ao Home Finance!");
    router.replace(ROUTES.HOME);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        label="Endereço de e-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="seu.email@exemplo.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        icon={<Mail className="h-4 w-4" />}
      />

      <FormField
        label="Sua senha"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="••••••••"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        icon={<Lock className="h-4 w-4" />}
        action={
          <button
            type="button"
            onClick={() =>
              showToast(
                "Enviaremos um link de redefinição para o e-mail informado.",
                "info",
              )
            }
            className="text-[11px] font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Esqueceu a senha?
          </button>
        }
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
      />

      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          name="rememberMe"
          checked={values.rememberMe}
          onChange={handleChange}
          className="h-4 w-4 cursor-pointer rounded accent-indigo-600"
        />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Lembrar deste dispositivo
        </span>
      </label>

      {formError && (
        <p role="alert" className="text-xs font-semibold text-rose-500">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        loading={isSubmitting}
        className="flex w-full items-center justify-center gap-2 py-3.5"
      >
        {!isSubmitting && (
          <>
            <span>Entrar no painel</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
