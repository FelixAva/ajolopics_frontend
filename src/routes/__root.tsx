import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import Header from '../components/layout/Header';
import { getDefaultSeoDescription } from '@/utils/seoTranslations';

const RootComponent = () => {
  return (
    <div className='flex flex-col flex-1 w-auto min-h-screen'>
      <HeadContent />
      <Header />

      <hr className='text-gray-300' />

      <div className='px-5 flex flex-col flex-1 lg:px-10'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
};

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta:[
      {
        title: 'Ajolopics',
      },
      {
        name: 'description',
        content: getDefaultSeoDescription()
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ]
  }),
  component: RootComponent
});
