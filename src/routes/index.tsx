import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
      <div className='flex-1'>
        <h1 className='text-3xl text-center text-black'>Welcome to the virtual gallery</h1>
        {/* <PostsMansoryGrid /> */}
        {/* <PostPreviewCard /> */}
      </div>
    );
}
