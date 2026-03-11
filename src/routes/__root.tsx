import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Header } from '../components';

import useUser from '../features/user/useUser';

const RootComponent = () => {
  useUser();
  return (
    <div className='flex flex-col flex-1 w-auto h-screen'>
      <Header />

      <hr className='text-gray-300' />

      <div className='px-5 flex flex-1 lg:px-10'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootComponent });
