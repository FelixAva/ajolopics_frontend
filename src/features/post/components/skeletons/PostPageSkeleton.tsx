import SkeletonBlock from '@/components/ui/SkeletonBlock';

import { PostSidebarSkeleton } from './PostSkeletonElements';

const PostPageSkeleton = () => {
  return (
    <main className="flex-1 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div>
          <SkeletonBlock className="h-10 w-10" shape="lg" />
        </div>

        <section className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="relative flex min-h-[55vh] items-center justify-center overflow-hidden rounded-lg bg-overlay shadow-xl lg:min-h-[calc(100vh-14rem)]">
            <SkeletonBlock
              className="h-[55vh] w-full lg:h-[calc(100vh-14rem)]"
              shape="lg"
            />
          </div>

          <aside className="flex flex-col rounded-lg shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]">
            <PostSidebarSkeleton
              contentClassName="flex flex-col gap-5 overflow-y-auto p-5"
              downloadClassName="p-5"
            />
          </aside>
        </section>
      </div>
    </main>
  );
};

export default PostPageSkeleton;
