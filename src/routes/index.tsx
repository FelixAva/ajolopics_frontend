import { createFileRoute } from '@tanstack/react-router'
import { Input, Button, Badge, FiltersModal } from '../components';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
      <div className='flex-1'>
        <p className='text-3xl text-center text-black'>Welcome to the virtual gallery</p>
        <Input label='Input' placeholder='Title, author, tag...' error='Errores de input' />
        <Button
          title='Filters'
          action={ FiltersModal }
          icon='sliders-horizontal'
          variant='ghost'
        />
        <Badge title='Abstract' />
      </div>
    );
}
