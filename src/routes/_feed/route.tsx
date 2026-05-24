import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import PostsMasonryGrid from '@/features/post/components/PostsMasonryGrid';
import type { AspectRatioType } from '@/features/post/types/post.types';

type FeedSearch = {
  tags?: string;
  authors?: string;
  aspectRatio?: string;
  search?: string;
  postId?: string;
}

export const Route = createFileRoute('/_feed')({
  component: FeedLayout,
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

function FeedLayout() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

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
        filters={searchParams}
        onPostClick={handleOpenPost}
      />

      <Outlet />
    </div>
  );
}
