import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$username/likes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$userId/likes"!</div>
}
