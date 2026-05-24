import { createFileRoute, useNavigate } from '@tanstack/react-router'
import ModalOverlay from '@/components/ui/ModalOverlay';
import PostModal from '@/features/post/components/PostModal';
import usePostQueries from '@/features/post/hooks/post.queries';

export const Route = createFileRoute('/_feed/posts/$postId/modal')({
  component: PostModalRoute,
})

function PostModalRoute() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  const { getSinglePost } = usePostQueries(undefined, postId);

  const onClose = () => {
    navigate({
      to: '/',
      replace: true,
    })
  }

  return (
    <ModalOverlay
      showHeader={false}
      onClose={onClose}
    >
      <PostModal
        post={getSinglePost.data}
        isLoading={getSinglePost.isLoading}
        isError={getSinglePost.isError}
      />
    </ModalOverlay>
  );
}
