import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        <p>Register</p>
        <Link to="/auth" className="[&.active]:font-bold]">
          Login
        </Link>
      </>
    );
}
