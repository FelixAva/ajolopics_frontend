import type { Post } from '../../features/post/post.types';

const PostPreviewCard = ( post: Post) => {

  // const getThumbnail = () => {
  //   post.assets.map(asset => {
  //     asset.
  //   })
  // }

  return (
    <div key={post.id} className="break-inside-avoid mb-4 relative group">
      <img
        src=''
        alt={post.id.toString()}
        className="w-full rounded-xl object-cover bg-gray-200" // bg-gray-200 sirve de placeholder mientras carga
        loading="lazy"
      />

      {/* Overlay oscuro opcional para hover (sin el botón que pediste ignorar) */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl pointer-events-none">
      </div>

    </div>
  );
};

export default PostPreviewCard;
