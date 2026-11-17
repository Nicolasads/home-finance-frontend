import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly Option[];
  error?: string;
}

export function SelectField({
  label,
  options,
  error,
  id,
  name,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? name;

  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          name={name}
          aria-invalid={Boolean(error)}
          className="w-full appearance-none rounded-xl border-none bg-slate-100 py-2.5 pl-4 pr-9 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error && (
        <p
          role="alert"
          className="mt-1 text-[11px] font-semibold text-rose-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
