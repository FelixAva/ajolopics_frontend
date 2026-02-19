import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <p>Login</p>
      <Link to="/auth/register" className="[&.active]:font-bold]" preload="intent">
        Register
      </Link>
    </>
  );
}
