import { createFileRoute, useNavigate } from '@tanstack/react-router'
import ModalOverlay from '@/components/ui/ModalOverlay';
import PostModal from '@/features/post/components/PostModal';
import { singlePostQueryOptions } from '@/features/post/api/post.query-options';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_feed/posts/$postId/modal')({
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(singlePostQueryOptions(postId));
  },
  component: PostModalRoute,
})

function PostModalRoute() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  const { data: post } = useSuspenseQuery(
    singlePostQueryOptions(postId),
  );

  const onClose = () => {
    navigate({
      to: '/',
      replace: true,
    })
  };

  return (
    <ModalOverlay
      showHeader={false}
      onClose={onClose}
    >
      <PostModal
        post={post}
        isLoading={false}
        isError={false}
      />
    </ModalOverlay>
  );
}
