import { createFileRoute } from '@tanstack/react-router'
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/_feed/')({
  head: () => createSeoHead({
    title: getSeoTranslation('home.title'),
    description: getSeoTranslation('home.description'),
    path: '/',
  }),
  component: FeedIndex,
})

function FeedIndex() {
  return null;
}
