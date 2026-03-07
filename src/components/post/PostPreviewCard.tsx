import type { Post } from '../../features/post/post.types';

const PostPreviewCard = ( post: Post) => {
  return (
    <div key={post.id} className="break-inside-avoid mb-4 relative group">
      <img
        src={post.assets[0].variants[0].url}
        alt={post.id.toString()}
        className="w-full rounded-xl object-cover bg-gray-200" // bg-gray-200 sirve de placeholder mientras carga
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl pointer-events-none">
      </div>

    </div>
  );
};

export default PostPreviewCard;
