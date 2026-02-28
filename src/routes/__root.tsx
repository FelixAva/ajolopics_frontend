import { Outlet, Link, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const RootComponent = () => {
  return (
    <div className='flex flex-col w-auto h-screen'>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold]" preload="intent">
          Ajolopics
        </Link>
        <span className='self-center text-smoky-rose text-[14px] font-thin'>Virtual Gallery</span>
        <Link to="/auth" className="[&.active]:font-bold]" preload="intent">
          Login
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootComponent });
