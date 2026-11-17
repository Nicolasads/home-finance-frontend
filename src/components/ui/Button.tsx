import { cn } from "@heroui/react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  loading?: boolean;
}

const BASE =
  "rounded-xl px-5 py-2.5 text-xs font-semibold shadow-md transition disabled:opacity-60";

const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
  success: "bg-emerald-600 text-white hover:bg-emerald-500",
  danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
};

const Button = ({
  variant = "primary",
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading || props.disabled}
      className={cn(BASE, VARIANTS[variant], className)}
      {...props}
    >
      {loading ? "Aguarde..." : children}
    </button>
  );
};

export default Button;
