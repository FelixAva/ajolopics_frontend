import { postFeedQueryOptions } from '@/features/post/api/post.query-options';
import PostsMasonryGrid from '@/features/post/components/PostsMasonryGrid';
import PostMasonrySkeleton from '@/features/post/components/skeletons/PostMasonrySkeleton';
import type { AspectRatioType } from '@/features/post/types/post.types';
import { userProfileQueryOptions } from '@/features/user/api/user.query-options';
import { getFeedParams, type FeedSearch } from '@/utils/getFeedParams';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react';

export const Route = createFileRoute('/profile/$username/')({
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    return {
      tags: search.tags as string | undefined,
      aspectRatio: search.aspectRatio as AspectRatioType | undefined,
      search: search.search as string | undefined,
      postId: search.postId as string | undefined,
    }
  },
  loaderDeps: ({ search }) => ({
    tags: search.tags,
    aspectRatio: search.aspectRatio,
    search: search.search,
  }),
  loader: async ({ context: { queryClient }, deps, params: { username } }) => {
    const user = await queryClient.ensureQueryData(userProfileQueryOptions(username));

    await queryClient.ensureInfiniteQueryData(
      postFeedQueryOptions(getFeedParams({ ...deps, authors: user.id }))
    );

    return { authorId: user.id };
  },
  pendingComponent: PostMasonrySkeleton,
  pendingMs: 0,
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { username } = Route.useParams();
  const { authorId } = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const { aspectRatio, search, tags } = searchParams;

  const feedParams = useMemo(
    () => getFeedParams({ authors: authorId, aspectRatio, search, tags }),
    [
      authorId,
      aspectRatio,
      search,
      tags
    ]
  )

  const handleOpenPost = (id: string) => {
    navigate({
      to: '/profile/$username/$postId/modal',
      params: { username: username, postId: id },
      search: { ...searchParams, postId: id },
      mask: {
        to: '/posts/$postId', // La "máscara" visual en la barra de direcciones
        params: { postId: id }, // Los parámetros a usar en la mascara
        unmaskOnReload: true, // Permite desenmascarar al recargar
      }
    });
  };


  return (
    <div>
      <PostsMasonryGrid
        feedParams={feedParams}
        onPostClick={handleOpenPost}
      />

      <Outlet />
    </div>
  );
}
