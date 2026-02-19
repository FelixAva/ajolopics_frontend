import { createFileRoute } from '@tanstack/react-router'
// import { Tag } from '../components';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        <p className='text-3xl text-center text-black'>Welcome to the virtual gallery</p>
      </>
    );
}
