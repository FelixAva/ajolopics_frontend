import type { Post } from '../../features/post/post.types';

interface Props {
  post: Post,
  onClick: (postId: string) => void;
}

const PostPreviewCard = ({ post, onClick }: Props) => {
  return (
    <div key={post.id} className="break-inside-avoid mb-4 relative group cursor-pointer">
      <img
        onClick={() => onClick(post.id)}
        src={post.assets[0].variants[0].url}
        alt={post.id.toString()}
        className="w-full rounded-xl object-cover bg-gray-200" // bg-gray-200 sirve de placeholder mientras carga
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 flex flex-col items-center justify-end pb-2 group-hover:bg-black/40 transition-colors rounded-xl pointer-events-none">
        <p
          className='text-transparent text-lg font-medium group-hover:text-beige'
        >{ post.title }</p>
        <p
          className='text-transparent text-md group-hover:text-beige'
        >{ post.author.name }</p>
      </div>

    </div>
  );
};

export default PostPreviewCard;
