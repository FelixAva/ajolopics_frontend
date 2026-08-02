import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';
import EditProfileForm from '@/features/user/components/EditProfileForm';

export const Route = createFileRoute('/profile/$username_/edit')({
  head: ({ params: { username } }) => createSeoHead({
    title: getSeoTranslation('profile.editTitle'),
    description: getSeoTranslation('profile.editDescription'),
    path: `/profile/${username}/edit`,
    noIndex: true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <EditProfileForm />
  );
}
