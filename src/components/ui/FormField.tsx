import type { InputHTMLAttributes, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/classNames";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  action?: ReactNode;
  trailing?: ReactNode;
}

export function FormField({
  label,
  icon,
  error,
  action,
  trailing,
  id,
  name,
  ...inputProps
}: FormFieldProps) {
  const inputId = id ?? name;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
        {action}
      </div>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          aria-invalid={Boolean(error)}
          className={cn(
            "w-full rounded-2xl border bg-slate-50 py-3 pl-10 pr-10 text-xs font-medium text-slate-900 transition focus:outline-none focus:ring-2 dark:bg-slate-800/60 dark:text-white",
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-200 focus:ring-indigo-500 dark:border-slate-700",
          )}
          {...inputProps}
        />
        {trailing && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-rose-500"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
