import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageModal, BurgerButton } from '../';
import Navigation from './Navigation';

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

        <BurgerButton
          isOpen={isNavigationOpen}
          onClick={onMenuClick}
        />
      </div>

      <Navigation isOpen={isNavigationOpen} />
    </div>
  )
};

export default Header;
