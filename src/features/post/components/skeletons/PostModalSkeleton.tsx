import SkeletonBlock from '@/components/ui/SkeletonBlock';

import { PostSidebarSkeleton } from './PostSkeletonElements';

const PostModalSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-background shadow-2xl sm:max-h-min sm:w-auto sm:rounded-2xl lg:h-auto lg:max-h-none lg:max-w-[85%] lg:flex-row xl:h-auto xl:max-w-[80%]"
        onClick={event => event.stopPropagation()}
      >
        <div className="relative flex items-stretch justify-center bg-overlay sm:flex-1">
          <SkeletonBlock
            className="aspect-4/3 w-full sm:h-72 sm:w-120 sm:aspect-auto lg:h-full lg:min-h-108 lg:w-160 xl:w-176 2xl:w-200"
            shape="none"
          />
        </div>

        <PostSidebarSkeleton
          className="flex w-full flex-col px-6 lg:w-90"
          contentClassName="flex h-full flex-col justify-start gap-5 overflow-y-auto py-4 lg:pt-4 lg:py-0"
          downloadClassName="py-2 sm:py-4"
        />
      </div>
    </div>
  );
};

export default PostModalSkeleton;
