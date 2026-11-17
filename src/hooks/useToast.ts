import { ToastContext } from "@/context/ToastContext";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }

  return context;
};
