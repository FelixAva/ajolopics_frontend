import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';

import Button from '@/components/ui/Button';

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
          "flex flex-col overflow-hidden md:mt-0 md:flex-row md:items-center transition-all duration-500 ease-in-out",
          isOpen
            ? "mt-4 max-h-80 opacity-100 flex flex-col justify-around"
            : "max-h-0 opacity-0 md:opacity-100 md:overflow-auto md:max-h-80"
        )}
      >
        { showButton && (
          <>
            <Button
              onClick={ () =>  setIsFiltersModalOpen(true)}
              variant='ghost'
            >
              <DynamicIcon name='sliders-horizontal' size={22} />
              <span>{t('filters')}</span>
            </Button>

            {isAuthenticated && canCreatePost && (
              <Button
                onClick={ () => setIsCreatePostModalOpen(true) }
                variant='ghost'
              >
                <DynamicIcon name='plus' size={22} />
                <span>{t('createPost')}</span>
              </Button>
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
      </nav>
  );
};

export default Navigation;
