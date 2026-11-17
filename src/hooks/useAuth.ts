import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  //O useContext retornará os dados do estado onde as telas estiverem dentro
  // de AuthProvider
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser uisado dentro de AuthProvider");
  }

  return context;
};
