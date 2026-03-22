import { createFileRoute } from '@tanstack/react-router'
import PostsMasonryGrid from '@/features/post/components/PostsMasonryGrid';
// import { useTranslation } from 'react-i18next';
import type { AspectRatioType } from '../features/post/types/post.types';

type FeedSearch = {
  tags?: string;
  authors?: string;
  aspectRatio?: string;
  search?: string;
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    return {
      tags: search.tags as string | undefined,
      authors: search.authors as string | undefined,
      aspectRatio: search.aspectRatio as AspectRatioType | undefined,
      search: search.search as string | undefined,
    }
  }
})

function RouteComponent() {
  // const { t } = useTranslation(); // ! Translation

  return (
      <div className='flex-1 mt-5 lg:mt-10'>
        <PostsMasonryGrid />
      </div>
    );
}
