import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/_feed/posts/new')({
  head: () => createSeoHead({
    title: getSeoTranslation('posts.newTitle'),
    description: getSeoTranslation('posts.newDescription'),
    path: '/posts/new',
    noIndex: true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_feed/posts/new"!</div>
}
