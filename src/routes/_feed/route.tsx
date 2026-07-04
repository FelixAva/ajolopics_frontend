import { useMemo } from 'react';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import PostsMasonryGrid from '@/features/post/components/PostsMasonryGrid';
import { postFeedQueryOptions } from '@/features/post/api/post.query-options';
import PostMasonrySkeleton from '@/features/post/components/skeletons/PostMasonrySkeleton';
import type { AspectRatioType } from '@/features/post/types/post.types';
import { getFeedParams, type FeedSearch } from '@/utils/getFeedParams';

export const Route = createFileRoute('/_feed')({
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    return {
      tags: search.tags as string | undefined,
      authors: search.authors as string | undefined,
      aspectRatio: search.aspectRatio as AspectRatioType | undefined,
      search: search.search as string | undefined,
      postId: search.postId as string | undefined,
    }
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureInfiniteQueryData(
      postFeedQueryOptions(getFeedParams(deps))
    );
  },
  pendingComponent: PostMasonrySkeleton,
  pendingMs: 0,
  component: FeedLayout,
})

function FeedLayout() {
  const searchParams = Route.useSearch();
  const { authors, aspectRatio, search, tags } = searchParams;
  const navigate = useNavigate({ from: Route.fullPath });

  const feedParams = useMemo(
    () => getFeedParams({ authors, aspectRatio, search, tags }),
    [
      authors,
      aspectRatio,
      search,
      tags,
    ]
  );

  const handleOpenPost = (id: string) => {
    navigate({
      to: '/posts/$postId/modal',
      params: { postId: id },
      search: { ...searchParams, postId: id },
      mask: {
        to: '/posts/$postId', // La "máscara" visual en la barra de direcciones
        params: { postId: id }, // Los parámetros a usar en la mascara
        unmaskOnReload: true, // Permite desenmascarar al recargar
      }
    });
  };

  return (
    <div className='flex-1 my-5 lg:my-10'>
      <PostsMasonryGrid
        feedParams={feedParams}
        onPostClick={handleOpenPost}
      />

      <Outlet />
    </div>
  );
}
