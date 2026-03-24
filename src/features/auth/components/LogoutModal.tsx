import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@/features/auth/store/useAuthStore'; // Ajusta tu ruta
import { router } from '@/app/router'; // Ajusta tu ruta
import Button from '@/components/ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ onClose, isOpen }: Props) => {
  const { t } = useTranslation(['header', 'toast']);
  const logout = useAuthStore((state) => state.logout);

  const handleConfirmLogout = () => {
    logout();
    onClose();

    router.navigate({ to: '/auth' });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-5 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden p-1">
      <p className="text-xs text-gray-500 font-medium px-3 py-2 pb-1 text-center">
        {t('header:logoutConfirm')}
      </p>
      <ul className="flex flex-col gap-1 mt-1">
        <li>
          <Button
            title={t('header:accept')}
            variant='danger'
            size='sm'
            onClick={handleConfirmLogout}
            className="w-full font-semibold hover:text-white"
          />
        </li>
        <li>
          <Button
            title={t('header:cancel')}
            variant='ghost'
            size='sm'
            onClick={onClose}
            className="w-full text-deep-teal-900 hover:bg-deep-teal-50"
          />
        </li>
      </ul>
    </div>
  );
};

export default LogoutModal;
