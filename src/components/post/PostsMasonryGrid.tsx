import { useEffect, useMemo, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';

import usePost from '../../features/post/usePost';
import type { GetFeedRequestDTO } from '../../features/post/post.api.types';
import { Route } from '../../routes/index';

import PostPreviewCard from './PostPreviewCard';
import PostDetailModal from './PostDetailModal';

const PostsMasonryGrid = () => {
  const { tags, authors, search, aspectRatio } = Route.useSearch();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const feedParams: GetFeedRequestDTO = useMemo(
    () => ({
      size: 20,
      search,
      filters: {
        tagIds: tags ? tags.split(',').map(Number) : undefined,
        authorIds: authors ? authors.split(',') : undefined,
        aspectRatio: aspectRatio || undefined,
      },
    }),
    [tags, authors, search, aspectRatio]
  );

  const { getPostFeed } = usePost(feedParams);

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

  const breakpointColumns = {
    default: 4,
    1024: 3,
    768: 2,
    640: 2,
  };

  const allPosts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex m-auto max-w-7xl w-auto"
        columnClassName="px-2 bg-clip-padding"
      >
        {isLoading ? (
          <p>Cargando galería...</p>
        ) : (
          allPosts.map((post) => (
            <PostPreviewCard
              key={`${post.author}-${post.id}`}
              post={post}
              onClick={(id) => setSelectedPostId(id)}
            />
          ))
        )}
      </Masonry>

      <PostDetailModal
        postId={selectedPostId}
        isOpen={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />

      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center py-4 min-h-10">
          {isFetchingNextPage && <p>Cargando más...</p>}
        </div>
      )}
    </>
  );
};

export default PostsMasonryGrid;
