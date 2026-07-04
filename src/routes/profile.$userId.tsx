import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';
import Button from '@/components/ui/Button';
import { userProfileQueryOptions } from '@/features/user/api/user.query-options';

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({context: { queryClient }, params: { userId }}) => {
    const user = await queryClient.ensureQueryData(userProfileQueryOptions(userId))
    return { user };
  },
  head: ({ params: { userId } }) => createSeoHead({
    title: getSeoTranslation('profile.title'),
    description: getSeoTranslation('profile.description'),
    path: `/profile/${userId}`,
    type: 'profile',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams();
  const { user } = Route.useLoaderData();

  return (
    <main>
      <section className='h-80 flex items-center justify-center'>
        <img src='https://placehold.co/200' className='w-62.5 h-62.5 rounded-full' />

        <div className='pl-5 self-center'>
          <div className='flex gap-3'>
            <h2 className='text-xl'>{user.name}</h2>

            <>
              <Button icon='pencil' variant='none' size='none' />
              <Button icon='share' variant='none' size='none' />
            </>
          </div>
          <h3>@{user.username}</h3>
        </div>
      </section>

      <nav>
        <Link
          to="/profile/$userId"
          params={{ userId }}
        >Posts</Link>
      </nav>

      <section>
        {/* Masonry */}
      </section>

      <Outlet />
    </main>
  );
}
