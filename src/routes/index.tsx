import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        <p className='text-3xl text-center'>Welcome to the virtual gallery</p>
      </>
    );
}
