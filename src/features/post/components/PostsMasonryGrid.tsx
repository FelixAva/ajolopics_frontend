import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import usePostQueries from '../hooks/post.queries';
import type { GetFeedRequestDTO } from '../types/post.api.types';
import PostCard from './PostCard';
import MasonryGrid, { type MasonryElement } from '@/components/layout/MasonryGrid';

interface PostMasonryGridProps {
  filters: {
    tags?: string;
    authors?: string;
    search?: string;
    aspectRatio?: string;
  };
  onPostClick: (id: string) => void;
}

const PostsMasonryGrid = ({ filters, onPostClick }: PostMasonryGridProps) => {
  const [columnsNumber, setColumnsNumber] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumnsNumber(4);
      else if (width >= 768) setColumnsNumber(3);
      else setColumnsNumber(2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const feedParams: GetFeedRequestDTO = useMemo(
    () => ({
      size: 20,
      search: filters.search,
      filters: {
        tagIds: filters.tags ? filters.tags.split(',').map(Number) : undefined,
        authorIds: filters.authors ? filters.authors.split(',') : undefined,
        aspectRatio: filters.aspectRatio || undefined,
      },
    }),
    [filters]
  );

  const { getPostFeed } = usePostQueries(feedParams);

  const {
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    data,
  } = getPostFeed;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });
  const hasStartedTrackingRef = useRef(false);
  const prevInViewRef = useRef(false);

  useEffect(() => {
    hasStartedTrackingRef.current = false;
    prevInViewRef.current = false;
  }, [feedParams]);

  useEffect(() => {
    if (!isLoading && data && !hasStartedTrackingRef.current) {
      hasStartedTrackingRef.current = true;
      prevInViewRef.current = inView;
    }
  }, [isLoading, data, inView]);

  useEffect(() => {
    if (!hasStartedTrackingRef.current) return;

    const enteredView = inView && !prevInViewRef.current;

    if (enteredView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    prevInViewRef.current = inView;
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.items) ?? [];

  const masonryElements: MasonryElement[] = useMemo(() => {
    return allPosts.map((post) => {
     const thumbnail = post.assets[0]?.variants.find((variant) => variant.variant === 'THUMBNAIL');
      const estimatedHeight = thumbnail?.height || 250;

      return {
        id: `${post.author}-${post.id}`,
        content: (
          <PostCard
            post={post}
            onClick={() => onPostClick(post.id)}
          />
        ),
        height: estimatedHeight,
      };
    });
  }, [allPosts, onPostClick]);

  return (
    <>
      {isLoading && masonryElements.length === 0 ? (
        <p className="text-center py-4">Cargando galería...</p>
      ) : (
        <MasonryGrid
          columns_number={columnsNumber}
          elements={masonryElements}
          containerStyle="m-auto max-w-7xl px-2 gap-4"
          columnStyle="gap-4"
          threshold={20}
        />
      )}

      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center py-4 min-h-10">
          {isFetchingNextPage && <p>Cargando más...</p>}
        </div>
      )}
    </>
  );
};

export default PostsMasonryGrid;
