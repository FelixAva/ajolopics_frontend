import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import Button from './Button';
import { FiltersModal, CreatePostModal } from '../';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../../features/auth/useAuthStore';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
}

const Navigation = ({ isOpen }: Props) => {
  const location = useLocation();
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
    const { t } = useTranslation('header');

    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

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
              action={ () =>  setIsFiltersModalOpen(true)}
              icon='sliders-horizontal'
              variant='ghost'
            />

            {isAuthenticated && canCreatePost && (
              <Button
                title={t('createPost')}
                action={ () => setIsCreatePostModalOpen(true) }
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
          <Button
            action={logout}
            title={t('logoutButton')}
            icon='log-in'
            variant='ghost'
          />
        ) : (
          <Link
            to="/auth"
            className="[&.active]:font-bold] w-auto h-min px-3.5 py-2 rounded-lg text-deep-teal transition-colors duration-200 select-none hover:cursor-pointer hover:bg-deep-teal-100 hover:border-deep-teal-100 sm:text-lg"
            preload="intent"
          >
            <div className="flex items-center justify-center gap-3 text-center">
              <DynamicIcon name='log-in' size={22} />
              <p>{t('loginButton')}</p>
            </div>
          </Link>
        )}

      </nav>
  );
};

export default Navigation;
