import { useEffect, useState } from "react";

// Retorna false no servidor e na primeira renderização do cliente,
// e true depois que o componente monta no navegador.
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const setClientTrue = () => {
      setIsClient(true);
    };

    setClientTrue();
  }, [setIsClient]);

  return isClient;
}
