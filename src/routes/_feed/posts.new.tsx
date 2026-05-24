import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_feed/posts/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_feed/posts/new"!</div>
}
