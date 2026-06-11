import { useMemo } from 'react';

import MasonryGrid, { type MasonryElement } from '@/components/layout/MasonryGrid';
import SkeletonBlock from '@/components/ui/SkeletonBlock';
import { useResponsiveMasonryColumns } from '@/hooks/useResponsiveMasonryColumns';
import type { AspectRatioType } from '../../types/post.types';

const aspectOptions: AspectRatioType[] = ['PORTRAIT', 'SQUARE', 'LANDSCAPE'];

const aspectHeights: Record<AspectRatioType, number> = {
  LANDSCAPE: 180,
  PORTRAIT: 320,
  SQUARE: 240,
};

const aspectStyles: Record<AspectRatioType, string> = {
  LANDSCAPE: 'aspect-4/3',
  PORTRAIT: 'aspect-3/4',
  SQUARE: 'aspect-square',
};

const getSkeletonAspect = (index: number) =>
  aspectOptions[(index * 7 + 1) % aspectOptions.length] ?? 'SQUARE';

const PostMasonrySkeleton = () => {
  const columnsNumber = useResponsiveMasonryColumns();

  const masonryElements: MasonryElement[] = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const aspect = getSkeletonAspect(index);

        return {
          id: `post-card-skeleton-${index}`,
          content: <SkeletonBlock className={`w-full ${aspectStyles[aspect]}`} />,
          height: aspectHeights[aspect],
        };
      }),
    []
  );

  return (
    <MasonryGrid
      columns_number={columnsNumber}
      elements={masonryElements}
      containerStyle="m-auto max-w-7xl px-2 gap-4"
      columnStyle="gap-4"
      threshold={20}
    />
  );
};

export default PostMasonrySkeleton;
