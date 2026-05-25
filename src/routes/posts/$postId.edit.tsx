import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/posts/$postId/edit')({
  head: ({ params: { postId } }) => createSeoHead({
    title: getSeoTranslation('posts.editTitle'),
    description: getSeoTranslation('posts.editDescription'),
    path: `/posts/${postId}/edit`,
    noIndex: true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/$postId/edit"!</div>
}
