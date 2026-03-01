import { createFileRoute } from '@tanstack/react-router'
import { Input } from '../components';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
      <div className='flex-1'>
        <p className='text-3xl text-center text-black'>Welcome to the virtual gallery</p>
      </div>
    );
}
