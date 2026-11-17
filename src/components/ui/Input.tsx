import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

const INPUT_CLASSES =
  "w-full rounded-xl border-none bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white";

const Input = ({ label, id, ...inputProps }: InputProps) => {
  const inputId = id ?? inputProps.name;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input id={inputId} className={INPUT_CLASSES} {...inputProps} />
    </div>
  );
};

export default Input;
