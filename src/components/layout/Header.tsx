import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';

import { useAuthStore } from '@/features/auth/store/useAuthStore';
import LogoutModal from '@/features/auth/components/LogoutModal';
import LanguageModal from '@/features/language/components/LanguageModal';
import Navigation from './Navigation';
import Button from '../ui/Button';
import clsx from 'clsx';

interface LogoutButtonProps {
  label: string;
  className?: string;
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const LogoutButtonWithModal = ({ label, className, onOpen, isOpen, onClose }: LogoutButtonProps) => (
  <div className="relative">
    <Button
      onClick={onOpen}
      variant='ghost'
      className={className}
    >
      <DynamicIcon name='log-out' size={22} />
      <p className="hidden sm:block">{label}</p>
    </Button>
    <div className="absolute right-0 top-full mt-1 z-50">
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </div>
  </div>
);

const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('header');

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  const onMenuClick = () => setIsNavigationOpen(!isNavigationOpen);

  const sharedLogoutProps = {
    label: t('logout'),
    isOpen: isLogoutModalOpen,
    onOpen: () => setIsLogoutModalOpen(true),
    onClose: () => setIsLogoutModalOpen(false),
  };

  const loginButton = (
    <Link
      to="/auth"
      className="[&.active]:font-bold] w-auto h-min px-3.5 py-2 rounded-lg text-primary transition-colors duration-200 select-none hover:cursor-pointer hover:bg-primary-hover hover:border-primary-hover sm:text-lg"
      preload="intent"
    >
      <div className="flex items-center justify-center gap-2 text-center">
        <DynamicIcon name='log-in' size={22} />
        <p className="hidden sm:block">{t('login')}</p>
      </div>
    </Link>
  );

  return (
    <div className="sticky top-0 z-20 bg-background/70 backdrop-blur-md w-full h-auto px-3 py-3 items-center md:w-auto md:h-auto md:flex md:justify-between lg:px-10">
      <div className='w-auto h-auto flex flex-1 gap-2'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex md:items-center md:gap-1'>
            <Link to="/" className="[&.active]:font-bold] text-xl flex items-center gap-2" preload="intent">
              <img src='/ajologo_frame.webp' className='w-10' />
              <h1 className='font-poppins text-2xl tracking-[0.1rem]'>ajolopics</h1>
            </Link>
          </div>

          <div className='inline-flex items-center shrink-0'>
            <LanguageModal />

            {isAuthenticated
              ? (
              <div className="md:hidden">
                <LogoutButtonWithModal {...sharedLogoutProps} className='w-auto' />
              </div>
            ) : (
              <div className='md:hidden flex'>
                {loginButton}
              </div>
            )
          }
          </div>
        </div>

        <Button
          onClick={onMenuClick}
          variant='secondary'
          size='sm'
          className='w-12.5 h-12.5 shrink-0 md:hidden'
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <span className={clsx("absolute h-0.75 rounded-2xl w-7 bg-primary transition-all duration-300", isNavigationOpen ? "rotate-45 translate-y-0" : "-translate-y-2")} />
            <span className={clsx("absolute h-0.75 rounded-2xl w-7 bg-primary transition-all duration-300", isNavigationOpen ? "opacity-0" : "opacity-100")} />
            <span className={clsx("absolute h-0.75 rounded-2xl w-7 bg-primary transition-all duration-300", isNavigationOpen ? "-rotate-45 translate-y-0" : "translate-y-2")} />
          </div>
        </Button>
      </div>

      <Navigation isOpen={isNavigationOpen} />

      <div className="hidden md:flex md:items-center">
        {isAuthenticated
          ? <LogoutButtonWithModal {...sharedLogoutProps} className='w-auto' />
          : loginButton
        }
      </div>
    </div>
  )
};

export default Header;
