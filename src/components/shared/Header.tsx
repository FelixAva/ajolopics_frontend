import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslation } from 'react-i18next';

import { Button, FiltersModal, CreatePostModal } from '../';
import clsx from 'clsx';

const Header = () => {
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('header');

  const hiddenRoutes = ['/auth', '/auth/register'];
  const showButton = !hiddenRoutes.includes(location.pathname);

  const onMenuClick = () => setIsNavigationOpen(!isNavigationOpen);

  return (
    <div className="sticky top-0 z-20 bg-beige/70 backdrop-blur-md w-full h-auto px-5 py-3 items-center md:w-auto md:h-auto md:flex md:justify-between lg:px-10">
      <div className='w-full h-auto flex items-center justify-between md:w-auto md:inline'>
        <div>
          <Link to="/" className="[&.active]:font-bold] text-xl" preload="intent">
            Ajolopics
          </Link>
          <span className='ml-2 text-smoky-rose text-[14px] font-thin'>{t('subTitle')}</span>
        </div>

        <div className='flex items-center md:inline'>
          <Button
            icon='globe'
            action={() => alert('Choose language')}
            variant='none'
            className='inline md:hidden'
          />

          <div className='flex gap-2 items-center'>
            <button
              onClick={onMenuClick}
              className="w-12.5 h-12.5 flex items-center justify-center bg-deep-teal-100 rounded-lg md:hidden"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <span
                  className={clsx(
                    "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
                    isNavigationOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                  )}
                />
                <span
                  className={clsx(
                    "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
                    isNavigationOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={clsx(
                    "absolute h-0.75 rounded-2xl w-7 bg-deep-teal transition-all duration-300",
                    isNavigationOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

      </div>

      <nav
        className={clsx(
          "flex flex-col lg:gap-3 overflow-hidden md:mt-0 md:flex-row md:items-center transition-all duration-500 ease-in-out",
          isNavigationOpen
            ? "mt-4 max-h-80opacity-100 flex flex-col justify-around"
            : "max-h-0 opacity-0 md:opacity-100 md:overflow-auto md:max-h-80"
        )}
      >
        <Button
          icon='globe'
          action={() => alert('Choose language')}
          variant='none'
          className='hidden md:inline'
        />

        { showButton && (
          <>
            <Button
              title={t('filters')}
              action={ () =>  setIsFiltersModalOpen(true)}
              icon='sliders-horizontal'
              variant='ghost'
            />

            <Button
              title={t('createPost')}
              action={ () => setIsCreatePostModalOpen(true) }
              icon='plus'
              variant='ghost'
            />

            <CreatePostModal
              isOpen={isCreatePostModalOpen}
              onClose={() => setIsCreatePostModalOpen(false)}
            />

            <FiltersModal
              isOpen={isFiltersModalOpen}
              onClose={() => setIsFiltersModalOpen(false)}
            />
          </>
        )}

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
      </nav>
    </div>
  )
};

export default Header;
