import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import LogoutModal from '@/features/auth/components/LogoutModal';
import FiltersModal from '@/features/post/components/FiltersModal';
import CreatePostModal from '@/features/post/components/CreatePostModal';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface Props {
  isOpen: boolean;
}

const Navigation = ({ isOpen }: Props) => {
  const location = useLocation();
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const { t } = useTranslation('header');

    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);

    const isAuthenticated = !!token;

    const canCreatePost = user?.role === 'ADMIN' || user?.role === 'CREATOR';

    const hiddenRoutes = ['/auth', '/auth/register'];
    const showButton = !hiddenRoutes.includes(location.pathname);

  return (
    <nav
        className={clsx(
          "flex flex-col lg:gap-3 overflow-hidden md:mt-0 md:flex-row md:items-center transition-all duration-500 ease-in-out",
          isOpen
            ? "mt-4 max-h-80opacity-100 flex flex-col justify-around"
            : "max-h-0 opacity-0 md:opacity-100 md:overflow-auto md:max-h-80"
        )}
      >
        { showButton && (
          <>
            <Button
              title={t('filters')}
              onClick={ () =>  setIsFiltersModalOpen(true)}
              icon='sliders-horizontal'
              variant='ghost'
              />

            {isAuthenticated && canCreatePost && (
              <Button
                title={t('createPost')}
                onClick={ () => setIsCreatePostModalOpen(true) }
                icon='plus'
                variant='ghost'
              />
            )}
            {isAuthenticated && canCreatePost && (
              <CreatePostModal
                isOpen={isCreatePostModalOpen}
                onClose={() => setIsCreatePostModalOpen(false)}
              />
            )}
            <FiltersModal
              isOpen={isFiltersModalOpen}
              onClose={() => setIsFiltersModalOpen(false)}
            />

          </>
        )}

        {isAuthenticated ? (
          <div>
            <Button
              title={t('logout')}
              onClick={ () => setIsLogoutModalOpen(true) }
              icon='log-out'
              variant='ghost'
            />

            <LogoutModal
              isOpen={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
            />
          </div>
        ) : (
          <Link
            to="/auth"
            className="[&.active]:font-bold] w-auto h-min px-3.5 py-2 rounded-lg text-deep-teal transition-colors duration-200 select-none hover:cursor-pointer hover:bg-deep-teal-100 hover:border-deep-teal-100 sm:text-lg"
            preload="intent"
          >
            <div className="flex items-center justify-center gap-3 text-center">
              <DynamicIcon name='log-in' size={22} />
              <p>{t('login')}</p>
            </div>
          </Link>
        )}

      </nav>
  );
};

export default Navigation;
