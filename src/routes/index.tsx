import { createFileRoute, useNavigate } from '@tanstack/react-router';
import PostsMasonryGrid from '@/features/post/components/PostsMasonryGrid';
import PostModalWrapper from '@/features/post/components/PostModalWrapper';
import type { AspectRatioType } from '../features/post/types/post.types';

type FeedSearch = {
  tags?: string;
  authors?: string;
  aspectRatio?: string;
  search?: string;
  postId?: string;
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    return {
      tags: search.tags as string | undefined,
      authors: search.authors as string | undefined,
      aspectRatio: search.aspectRatio as AspectRatioType | undefined,
      search: search.search as string | undefined,
      postId: search.postId as string | undefined,
    }
  }
})

function RouteComponent() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const handleOpenPost = (id: string) => {
    navigate({ search: (prev) => ({ ...prev, postId: id }) });
  }

  const handleClosePost = () => {
    navigate({ search: (prev) => ({ ...prev, postId: undefined }) });
  }

  return (
      <div className='flex-1 my-5 lg:my-10'>
        <PostsMasonryGrid
          filters={searchParams}
          onPostClick={handleOpenPost}
        />

        <PostModalWrapper
          postId={searchParams.postId || null}
          isOpen={!!searchParams.postId}
          onClose={handleClosePost}
        />
      </div>
    );
}
