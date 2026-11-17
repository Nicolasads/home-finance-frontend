"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const TOAST_DURATION_MS = 4000;

export const ToastContext = createContext<{
  showToast: (message: string, type?: string) => void;
} | null>(null);

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  const showToast = useCallback((message: string, type: string = "success") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [toast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-2xl
           bg-slate-900 px-5 py-4 text-sm font-medium
            text-white shadow-2xl dark:bg-white dark:text-black"
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
