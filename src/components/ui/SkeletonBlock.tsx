import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type SkeletonBlockShape = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface SkeletonBlockProps extends HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonBlockShape;
}

const shapeStyles: Record<SkeletonBlockShape, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const SkeletonBlock = ({
  className,
  shape = 'md',
  ...props
}: SkeletonBlockProps) => {
  return (
    <div
      aria-hidden="true"
      className={clsx('animate-pulse bg-surface-border', shapeStyles[shape], className)}
      {...props}
    />
  );
};

export default SkeletonBlock;
