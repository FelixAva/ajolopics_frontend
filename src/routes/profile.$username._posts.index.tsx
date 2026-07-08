import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/$username/_posts/')({
  component: ProfilePostsIndex,
});

function ProfilePostsIndex() {
  return null;
}
