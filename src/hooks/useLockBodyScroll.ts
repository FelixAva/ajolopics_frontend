import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    // Si el modal no está abierto, no hacemos nada
    if (!isLocked) return;

    // 1. Guardamos el estilo original por si el body tenía algún overflow específico
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // 2. Bloqueamos el scroll de la página principal
    document.body.style.overflow = 'hidden';

    // 3. Función de limpieza (Cleanup): React ejecuta esto cuando `isLocked` pasa a false
    // o cuando el componente que usa el hook se desmonta.
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]); // El efecto se vuelve a ejecutar si isLocked cambia
};
