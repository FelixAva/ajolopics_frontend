import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileTabNavigation from '@/features/user/components/layout/ProfileTabNavigation';
import ProfileHeaderSkeleton from '@/features/user/components/skeletons/ProfileHeaderSkeleton';
import { userProfileQueryOptions } from '@/features/user/api/user.query-options';
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/profile/$username')({
  loader: ({ context: { queryClient }, params: { username } }) => {
    void queryClient.prefetchQuery(userProfileQueryOptions(username));
  },
  head: ({ params: { username } }) => createSeoHead({
    title: getSeoTranslation('profile.title'),
    description: getSeoTranslation('profile.description'),
    path: `/profile/${username}`,
    type: 'profile',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = Route.useParams();
  const { t } = useTranslation('components');

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(userProfileQueryOptions(username));

  return (
    <main>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : isError || !user ? (
        <section className="h-80 flex items-center justify-center">
          <p>{t('loadingFailure.profileData')}</p>
        </section>
      ) : (
        <ProfileHeader user={user} />
      )}

      <ProfileTabNavigation username={username} />

      <Outlet />
    </main>
  );
}
