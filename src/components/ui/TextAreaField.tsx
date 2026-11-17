import { TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({
  label,
  id,
  name,
  ...props
}: TextAreaFieldProps) {
  const fieldId = id ?? name;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <textarea
        id={fieldId}
        name={name}
        rows={2}
        className="w-full resize-none rounded-xl border-none bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
        {...props}
      />
    </div>
  );
}
