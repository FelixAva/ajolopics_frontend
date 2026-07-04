import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$username/$postId/modal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$userId/posts/$postId/modal"!</div>
}
