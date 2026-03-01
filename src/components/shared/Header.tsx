import { Link, useLocation } from '@tanstack/react-router';
import { DynamicIcon } from 'lucide-react/dynamic';

import { useState } from 'react';

import { Button, FiltersModal } from '../';
import clsx from 'clsx';

const Header = () => {
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);

  const hiddenRoutes = ['/auth', '/auth/register'];
  const showButton = !hiddenRoutes.includes(location.pathname);

  const onMenuClick = () => setIsNavigationOpen(!isNavigationOpen);

  return (
    <div className="w-full h-auto px-5 py-3 items-center sm:w-auto sm:h-auto sm:flex sm:justify-between md:px-10">
      <div className='w-full h-auto flex items-center justify-between sm:w-auto sm:inline'>
        <div>
          <Link to="/" className="[&.active]:font-bold] text-xl" preload="intent">
            Ajolopics
          </Link>
          <span className='ml-2 text-smoky-rose text-[14px] font-thin'>Virtual Gallery</span>
        </div>

        <div className='flex gap-2 items-center'>
          <button
            onClick={onMenuClick}
            className="w-12.5 h-12.5 flex items-center justify-center bg-deep-teal-100 rounded-lg sm:hidden"
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

      <nav
        className={clsx(
          "flex flex-col gap-3 overflow-hidden sm:mt-0 sm:flex-row sm:items-center transition-all duration-500 ease-in-out",
          isNavigationOpen
            ? "mt-4 max-h-80opacity-100 flex flex-col justify-around"
            : "max-h-0 opacity-0 sm:opacity-100 sm:overflow-auto sm:max-h-80"
        )}
      >
        <Button
          icon='globe'
          action={() => alert('Choose language')}
          variant='none'
        />

        { showButton && (
          <>
            <Button
              title='Filters'
              action={ FiltersModal }
              icon='sliders-horizontal'
              variant='ghost'
            />

            <Button
              title='Make a Post'
              action={ FiltersModal }
              icon='plus'
              variant='ghost'
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
            <p>Login</p>
          </div>
        </Link>
      </nav>
    </div>
  )
};

export default Header;
