import { createFileRoute } from '@tanstack/react-router'
import { PostsMasonryGrid } from '../components';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();

  return (
      <div className='flex-1'>
        <h1 className='text-3xl text-center text-black'>Welcome to the virtual gallery</h1>

        <PostsMasonryGrid />
        {/* <PostPreviewCard /> */}
      </div>
    );
}
