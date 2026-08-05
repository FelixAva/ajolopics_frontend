import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../store/auth.store'; // Ajusta tu ruta
import Button from '@/components/ui/Button';
import { showAjolopicsToast } from '@/components/ui/Alerts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ onClose, isOpen }: Props) => {
  const { t } = useTranslation(['header', 'toast']);
  const logout = useAuthStore((state) => state.logout);

  const handleConfirmLogout = () => {
    logout();
    showAjolopicsToast('info', t('toast:loggedOut'));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-5 mt-2 w-40 bg-background rounded-lg shadow-lg z-50 overflow-hidden p-1">
      <p className="text-xs text-subtle-foreground font-medium px-3 py-2 pb-1 text-center">
        {t('header:logoutConfirm')}
      </p>
      <ul className="flex flex-col gap-1 mt-1">
        <li>
          <Button
            variant='danger'
            size='sm'
            onClick={handleConfirmLogout}
            className="w-full font-semibold hover:text-danger-contrast"
          >
            {t('header:accept')}
          </Button>
        </li>
        <li>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className="w-full text-primary-soft-foreground hover:bg-primary-subtle"
          >
            {t('header:cancel')}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default LogoutModal;
