import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Header } from '../components';

const RootComponent = () => {
  return (
    <div className='flex flex-col w-auto h-screen'>
      <Header />

      <hr />

      <div className='sm:px-5 flex flex-1 md:px-10'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootComponent });
