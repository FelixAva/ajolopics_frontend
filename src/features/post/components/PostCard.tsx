import type { Post } from '../types/post.types';

interface Props {
  post: Post,
  onClick: (postId: string) => void;
}

const PostPreviewCard = ({ post, onClick }: Props) => {
  const mainVariant = post.assets[0]?.variants.find((variant) => variant.variant === 'THUMBNAIL');

  return (
    <div key={post.id} className="break-inside-avoid relative group cursor-pointer">
      <img
        onClick={() => onClick(post.id)}
        src={mainVariant?.url}
        alt={post.title}
        className="w-full rounded-xl object-cover bg-gray-200"
        loading="lazy"
        style={{
          aspectRatio: mainVariant ? `${mainVariant.width} / ${mainVariant.height}` : 'auto'
        }}
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
