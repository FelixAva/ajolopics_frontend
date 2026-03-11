import usePost from '../../features/post/usePost';
import Masonry from 'react-masonry-css';
import PostPreviewCard from './PostPreviewCard';
import type { GetFeedRequestDTO } from '../../features/post/post.api.types';
import { Route } from '../../routes/index';
import { useState } from 'react';
import PostDetailModal from './PostDetailModal';

const PostsMasonryGrid = () => {
  const { tags, authors, search, aspectRatio } = Route.useSearch();

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const feedParams: GetFeedRequestDTO = {
    page: 1,
    size: 20,
    search: search,
    filters: {
      tagIds: tags ? tags.split(',').map(Number) : undefined,
      authorIds:authors ? authors.split(',') : undefined,
      aspectRatio: aspectRatio ? aspectRatio : undefined,
    }
  }

  const { getPostFeed } = usePost(feedParams);

  const breakpointColums = {
    default: 4,
    1024: 3,
    768: 2,
    640: 2
  };

  return (
    <Masonry
      breakpointCols={breakpointColums}
      className='flex m-auto max-w-7xl w-auto'
      columnClassName='px-2 bg-clip-padding'
    >
      {
        getPostFeed.isLoading ? (
          <p>Cargando galería...</p> // ! Translation
        ) :
        getPostFeed.data?.items.map(post => (
          <PostPreviewCard
            key={`${post.author}-${post.id}`}
            post={post}
            onClick={(id) => setSelectedPostId(id)}
          />
      ))}

      <PostDetailModal
        postId={selectedPostId}
        isOpen={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />
    </Masonry>
  );
};

export default PostsMasonryGrid;
