import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { useAuthStore } from '@/features/auth/store/useAuthStore';
import LanguageModal from '@/features/language/components/LanguageModal';
import Navigation from './Navigation';
import Button from '../ui/Button';
import clsx from 'clsx';
import ProfileButton from '../ui/ProfileButton';

const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);

  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const isAuthenticated = !!token;

  const onMenuClick = () => setIsNavigationOpen(!isNavigationOpen);

  return (
    <div className="sticky top-0 z-20 bg-background/70 backdrop-blur-md w-full h-auto px-3 py-3 items-center md:w-auto md:h-auto md:flex md:justify-between lg:px-10">
      <div className='w-auto h-auto flex flex-1 sm:gap-2'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex md:items-center md:gap-1'>
            <Link to="/" className="[&.active]:font-bold] text-xl flex items-center gap-2" preload="intent">
              <img src='/ajologo_frame.webp' className='w-10' />
              <h1 className='hidden font-poppins tracking-[0.1rem] text-foreground text-2xl sm:block'>ajolopics</h1>
            </Link>
          </div>

          <div className='inline-flex items-center shrink-0'>
            <LanguageModal />

            <div className="flex justify-center md:hidden">
              <ProfileButton
                isAuthenticated={isAuthenticated}
                user={user}
                logout={logout}
              />
            </div>
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
        <ProfileButton
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logout}
        />
      </div>
    </div>
  )
};

export default Header;
