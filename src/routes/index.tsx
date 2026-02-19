import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        <p>Welcome to the virtual gallery</p>
      </>
    );
}
