import Masonry from 'react-masonry-css';
import PostPreviewCard from './PostPreviewCard';


interface Props {
  posts: Post[];
}

const PostsMasonryGrid = () => {
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
      

    </Masonry>
  );
};

export default PostsMasonryGrid;
