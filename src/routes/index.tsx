import { createFileRoute } from '@tanstack/react-router'
import { PostPreviewCard, SelectInput } from '../components';
import CreatePostForm from '../components/post/CreatePostForm';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function RouteComponent() {

  return (
      <div className='flex-1'>
        <h1 className='text-3xl text-center text-black'>Welcome to the virtual gallery</h1>
        {/* <PostsMansoryGrid /> */}
        {/* <PostPreviewCard /> */}
        <SelectInput
          label='Select the tags'
          name='tags'
          isMulti
          options={options}
        />

        <CreatePostForm />
      </div>
    );
}
