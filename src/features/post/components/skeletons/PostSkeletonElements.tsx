import SkeletonBlock from '@/components/ui/SkeletonBlock';

interface PostSidebarSkeletonProps {
  className?: string;
  contentClassName?: string;
  downloadClassName?: string;
}

const sectionTitleClassName = 'h-5 w-1/3';
const sectionClassName = 'space-y-2';
const contentGroupClassName = 'space-y-1.5';

export const PostSidebarSkeleton = ({
  className = '',
  contentClassName = '',
  downloadClassName = '',
}: PostSidebarSkeletonProps) => (
  <div className={className}>
    <div className={contentClassName}>
      <div className={sectionClassName}>
        <SkeletonBlock className={sectionTitleClassName} />
        <SkeletonBlock className="h-5 w-1/2" />
      </div>

      <div className={sectionClassName}>
        <SkeletonBlock className={sectionTitleClassName} />
        <div className={contentGroupClassName}>
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>
      </div>

      <div className={sectionClassName}>
        <SkeletonBlock className={sectionTitleClassName} />
        <div className="flex flex-wrap gap-1.5">
          <SkeletonBlock className="h-8 w-16" shape="full" />
          <SkeletonBlock className="h-8 w-20" shape="full" />
          <SkeletonBlock className="h-8 w-14" shape="full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={sectionClassName}>
          <SkeletonBlock className={sectionTitleClassName} />
          <SkeletonBlock className="h-10 w-full" shape="lg" />
        </div>
        <div className={sectionClassName}>
          <SkeletonBlock className={sectionTitleClassName} />
          <SkeletonBlock className="h-10 w-full" shape="lg" />
        </div>
      </div>
    </div>

    <div className={downloadClassName}>
      <SkeletonBlock className="h-12 w-full" />
    </div>
  </div>
);
