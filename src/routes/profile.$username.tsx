import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';
import { userProfileQueryOptions } from '@/features/user/api/user.query-options';
import { useQuery } from '@tanstack/react-query';
import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileHeaderSkeleton from '@/features/user/components/skeletons/ProfileHeaderSkeleton';

export const Route = createFileRoute('/profile/$username')({
  loader: ({context: { queryClient }, params: { username }}) => {
    void queryClient.prefetchQuery(userProfileQueryOptions(username))
  },
  head: ({ params: { username } }) => createSeoHead({
    title: getSeoTranslation('profile.title'),
    description: getSeoTranslation('profile.description'),
    path: `/profile/${username}`,
    type: 'profile',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams();

  const {
    data: user,
    isLoading,
    isError
  } = useQuery(userProfileQueryOptions(username));

  return (
    <main>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : isError || !user ? (
        <section className="h-80 flex items-center justify-center">
          <p>No se pudo cargar la información del perfil.</p>
        </section>
      ) : (
        <ProfileHeader user={user} />
      )}

      <nav>
        <Link
          to="/profile/$username"
          params={{ username }}
        >Posts</Link>
      </nav>

      <Outlet />
    </main>
  );
}
