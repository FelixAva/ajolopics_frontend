import type { Post } from '../types/post.types';

interface Props {
  post: Post,
  onClick: (postId: string) => void;
}

const PostCard = ({ post, onClick }: Props) => {
  const mainVariant = post.assets[0]?.variants.find((variant) => variant.variant === 'THUMBNAIL');

  return (
    <div key={post.id} className="break-inside-avoid relative group cursor-pointer select-none">
      <img
        onClick={() => onClick(post.id)}
        src={mainVariant?.url}
        alt={post.title}
        className="w-full rounded-xl object-cover bg-surface-border"
        loading="lazy"
        style={{
          aspectRatio: mainVariant ? `${mainVariant.width} / ${mainVariant.height}` : 'auto'
        }}
      />

      <div className="absolute inset-0 bg-overlay/0 flex flex-col items-center justify-end pb-2 group-hover:bg-overlay/40 transition-colors rounded-xl pointer-events-none">
        <p
          className='text-transparent text-lg font-medium group-hover:text-background'
        >{ post.title }</p>
        <p
          className='text-transparent text-md group-hover:text-background'
        >{ post.author.name }</p>
      </div>
    </div>
  );
};

export default PostCard;
