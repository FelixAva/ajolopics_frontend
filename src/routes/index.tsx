import { createFileRoute } from '@tanstack/react-router'
import { PostsMasonryGrid } from '../components';
import { useTranslation } from 'react-i18next';
import type { AspectRatioType } from '../features/post/post.types';

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
  const { t } = useTranslation();

  return (
      <div className='flex-1'>
        <h1 className='text-3xl text-center text-black'>Welcome to the virtual gallery</h1>

        <PostsMasonryGrid />
        {/* <PostPreviewCard /> */}
      </div>
    );
}
