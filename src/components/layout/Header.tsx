import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageModal from '@/features/language/components/LanguageModal';
import Navigation from './Navigation';
import Button from '../ui/Button';
import clsx from 'clsx';

const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const { t } = useTranslation('header');

  const onMenuClick = () => setIsNavigationOpen(!isNavigationOpen);

  return (
    <div className="sticky top-0 z-20 bg-beige/70 backdrop-blur-md w-full h-auto px-3 py-3 items-center md:w-auto md:h-auto md:flex md:justify-between lg:px-10">
      <div className='w-auto h-auto flex flex-1 justify-between'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <Link to="/" className="[&.active]:font-bold] text-xl" preload="intent">
              Ajolopics
            </Link>
            <span className='ml-2 text-smoky-rose text-[14px] font-thin'>{t('subTitle')}</span>
          </div>

          <LanguageModal />
        </div>

        <Button
          onClick={onMenuClick}
          variant='secondary'
          size='sm'
          className='w-12.5 h-12.5 md:hidden'
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
        </Button>
      </div>

      <Navigation isOpen={isNavigationOpen} />
    </div>
  )
};

export default Header;
