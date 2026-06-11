import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { singlePostQueryOptions } from '@/features/post/api/post.query-options';
import { getFallbackPostHead, getPostHead } from '@/features/post/utils/postSeo';
import ModalOverlay from '@/components/ui/ModalOverlay';
import PostModalSkeleton from '@/features/post/components/PostModalSkeleton';
import PostModal from '@/features/post/components/PostModal';


export const Route = createFileRoute('/_feed/posts/$postId/modal')({
  loader: async ({ context: { queryClient }, params: { postId } }) => ({
    post: await queryClient.ensureQueryData(singlePostQueryOptions(postId)),
  }),
  head: ({ loaderData, params: { postId } }) =>
    loaderData?.post ? getPostHead(loaderData.post) : getFallbackPostHead(postId),
  pendingComponent: PostModalPendingRoute,
  pendingMs: 0,
  component: PostModalRoute,
});

function useCloseModal() {
  const navigate = useNavigate();

  return () => {
    navigate({
      to: '/',
      replace: true,
    });
  };
}

function PostModalPendingRoute() {
  const onClose = useCloseModal();

  return (
    <ModalOverlay
      showHeader={false}
      onClose={onClose}
    >
      <PostModalSkeleton />
    </ModalOverlay>
  );
}

function PostModalRoute() {
  const { post } = Route.useLoaderData();
  const onClose = useCloseModal();

  return (
    <ModalOverlay
      onClose={onClose}
      showHeader={false}
    >
      <PostModal {...post} />
    </ModalOverlay>
  );
}
