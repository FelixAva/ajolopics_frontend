import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/profile/$userId')({
  head: ({ params: { userId } }) => createSeoHead({
    title: getSeoTranslation('profile.title'),
    description: getSeoTranslation('profile.description'),
    path: `/profile/${userId}`,
    type: 'profile',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile"!</div>
}
