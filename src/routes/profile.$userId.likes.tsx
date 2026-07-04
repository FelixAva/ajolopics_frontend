import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId/likes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$userId/likes"!</div>
}
