import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/profile/$userId/edit')({
  head: ({ params: { userId } }) => createSeoHead({
    title: getSeoTranslation('profile.editTitle'),
    description: getSeoTranslation('profile.editDescription'),
    path: `/profile/${userId}/edit`,
    noIndex: true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile"!</div>
}
