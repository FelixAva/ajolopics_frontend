import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, BurgerButton } from '../';
import Navigation from './Navigation';

const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const { t } = useTranslation('header');

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

          <BurgerButton
            isOpen={isNavigationOpen}
            onClick={onMenuClick}
          />
        </div>
      </div>

      <Navigation isOpen={isNavigationOpen} />
    </div>
  )
};

export default Header;
