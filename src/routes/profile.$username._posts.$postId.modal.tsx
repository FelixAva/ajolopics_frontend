import ModalOverlay from '@/components/ui/ModalOverlay';
import { singlePostQueryOptions } from '@/features/post/api/post.query-options';
import PostModal from '@/features/post/components/PostModal';
import PostModalSkeleton from '@/features/post/components/skeletons/PostModalSkeleton';
import { getFallbackPostHead, getPostHead } from '@/features/post/utils/postSeo';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$username/_posts/$postId/modal')({
  loader: async ({ context: { queryClient }, params: { postId } }) => ({
    post: await queryClient.ensureQueryData(singlePostQueryOptions(postId)),
  }),
  head: ({ loaderData, params: { postId } }) =>
    loaderData?.post ? getPostHead(loaderData.post) : getFallbackPostHead(postId),
  pendingComponent: PostModalPendingRoute,
  pendingMs: 0,
  component: RouteComponent,
});

function useCloseModal() {
  const navigate = useNavigate();
  const { username } = Route.useParams();

  return () => {
    navigate({
      to: '/profile/$username',
      params: { username },
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

function RouteComponent() {
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
