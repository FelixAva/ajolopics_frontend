import { DynamicIcon } from 'lucide-react/dynamic';
import Button from './Button';
import Popover from './Popover';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/__root';
import { useTranslation } from 'react-i18next';
import type { User } from '@/features/user/types/user.types';
import type { PopoverAction } from './Popover';

interface ProfileButtonProps {
  isAuthenticated: boolean;
  user?: User | null;
  logout: () => void;
}

const ProfileButton = ({
  isAuthenticated,
  user,
  logout
}: ProfileButtonProps ) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { t } = useTranslation(['header', 'components']);

  const handleProfile = () => {
    if (!user) {
      return;
    }

    navigate({
      to: '/profile/$username',
      params: { username: user.username },
    })
  };

  const handleLogin = () => {
    navigate({
      to: '/auth'
    })
  }

  const handleLogout = () => {
    logout();
  }

  const actions: PopoverAction[] = [
    ...(user
      ? [{ id: 'profile', label: t('components:popovers.viewProfile'), icon: 'user-2' as const, onClick: handleProfile }]
      : []),
    isAuthenticated
      ? { id: 'logout', label: t('header:logout'), icon: 'log-out', onClick: handleLogout }
      : { id: 'login', label: t('header:login'), icon: 'log-in', onClick: handleLogin },
  ];

  return (
    <Popover
      trigger={({ isOpen, ...triggerProps }) => (
        <Button
          {...triggerProps}
          size='none'
          variant='none'
          className={`pr-1.5 pl-0.5 md:pr-0 ${isOpen ? 'text-primary-active' : ''}`}
        >
          <DynamicIcon name='user-circle-2' size={32} className='stroke-[1.8]' />
        </Button>
      )}
      title={user?.name ?? t('header:login')}
      description={user ? `@${user.username}` : ''}
      actions={actions}
    />
  )
};

export default ProfileButton;
