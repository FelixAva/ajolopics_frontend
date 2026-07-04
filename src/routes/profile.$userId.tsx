import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';
import { userProfileQueryOptions } from '@/features/user/api/user.query-options';
import { useQuery } from '@tanstack/react-query';
import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileHeaderSkeleton from '@/features/user/components/skeletons/ProfileHeaderSkeleton';

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({context: { queryClient }, params: { userId }}) => {
    void queryClient.prefetchQuery(userProfileQueryOptions(userId))
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

  const {
    data: user,
    isLoading,
    isError
  } = useQuery(userProfileQueryOptions(userId));

  return (
    <main>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : isError || !user ? (
        <section className="h-80 flex items-center justify-center">
          <p>No se pudo cargar el perfil.</p>
        </section>
      ) : (
        <ProfileHeader user={user} />
      )}

      <nav>
        <Link
          to="/profile/$userId"
          params={{ userId }}
        >Posts</Link>
      </nav>

      <Outlet />
    </main>
  );
}
