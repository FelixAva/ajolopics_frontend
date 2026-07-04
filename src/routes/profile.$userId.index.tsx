import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams();

  return (
    <div>
      <p>User: {userId} posts</p>
    </div>
  );
}
