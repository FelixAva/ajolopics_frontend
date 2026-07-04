import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId/bookmarks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$userId/bookmarks"!</div>
}
