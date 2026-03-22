import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@/features/auth/store/useAuthStore'; // Ajusta tu ruta
import { router } from '@/app/router'; // Ajusta tu ruta
import Button from './Button'; // Tu componente Button base

const LogoutButton = () => {
  const { t } = useTranslation(['header', 'toast']);

  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const handleConfirmLogout = () => {
    // 1. Limpiamos sesión
    logout();

    // 2. Cerramos el popover
    setIsOpen(false);

    // 3. Mostramos feedback discreto y redirigimos
    router.navigate({ to: '/auth' });
  };

  return (
    <div className="inline-block text-left">
      {/* Botón disparador */}
      <Button
        title={t('header:logout')}
        icon="log-out"
        variant="ghost"
        action={() => setIsOpen(!isOpen)}
      />

      {/* Popover discreto de confirmación */}
      {isOpen && (
        <div className="absolute right-5 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden p-1">
          <p className="text-xs text-gray-500 font-medium px-3 py-2 pb-1 text-center">
            {t('header:logoutConfirm')}
          </p>
          <ul className="flex flex-col gap-1 mt-1">
            <li>
              <button
                onClick={handleConfirmLogout}
                className="w-full text-center px-4 py-2 text-sm font-semibold bg-smoky-rose-50 text-smoky-rose-700 hover:bg-smoky-rose-500 hover:text-white rounded-md transition-colors"
              >
                 {t('header:accept')}
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2 text-sm text-deep-teal-700 hover:bg-deep-teal-50 rounded-md transition-colors"
              >
                 {t('header:cancel')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
