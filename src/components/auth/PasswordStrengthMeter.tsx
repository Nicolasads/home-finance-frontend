import { CheckCircle } from "lucide-react";
import { cn } from "@/utils/classNames";
import type { PasswordStrength } from "@/utils/passwordStrength";

const CHECKLIST = [
  { key: "minLength", label: "Mínimo 8 caracteres" },
  { key: "hasUpper", label: "Letra maiúscula" },
  { key: "hasNumber", label: "Caractere numérico" },
  { key: "hasSpecial", label: "Símbolo especial (!@#$)" },
] as const;

const getStrengthLabel = (score: number) => {
  if (score <= 25)
    return { label: "Muito fraca", bar: "bg-rose-500", text: "text-rose-500" };
  if (score <= 50)
    return { label: "Fraca", bar: "bg-amber-500", text: "text-amber-500" };
  if (score <= 75)
    return { label: "Média", bar: "bg-blue-500", text: "text-blue-500" };
  return {
    label: "Forte e segura",
    bar: "bg-emerald-500",
    text: "text-emerald-500",
  };
};

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
}

export function PasswordStrengthMeter({
  strength,
}: PasswordStrengthMeterProps) {
  const style = getStrengthLabel(strength.score);

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700/60 dark:bg-slate-800/40">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-600 dark:text-slate-400">
          Força da senha
        </span>
        <span className={style.text}>{style.label}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          style={{ width: `${strength.score}%` }}
          className={cn(
            "h-full rounded-full transition-all duration-300",
            style.bar,
          )}
        />
      </div>

      <ul className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
        {CHECKLIST.map(({ key, label }) => {
          const met = strength.requirements[key];
          return (
            <li
              key={key}
              className={cn(
                "flex items-center gap-1.5",
                met ? "font-bold text-emerald-500" : "text-slate-400",
              )}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
