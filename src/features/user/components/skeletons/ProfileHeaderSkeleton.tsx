import SkeletonBlock from '@/components/ui/SkeletonBlock';

const ProfileHeaderSkeleton = () => {
  return (
    <section className="h-80 flex items-center justify-center">
      <SkeletonBlock className="w-70 h-70" shape="full" />

      <div className="pl-5 self-center">
        <div className="flex gap-3 items-center">
          <SkeletonBlock className="h-9 w-44" />
          <SkeletonBlock className="h-6 w-6" shape="full" />
          <SkeletonBlock className="h-6 w-6" shape="full" />
        </div>
        <SkeletonBlock className="h-7 w-36 mt-2" />
      </div>
    </section>
  );
};

export default ProfileHeaderSkeleton;
