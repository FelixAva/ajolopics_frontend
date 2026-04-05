import { useTranslation } from 'react-i18next';

import Badge from '@/components/ui/Badge';
import type { MediaVariant, Post } from '../types/post.types';

interface PostSidebarProps {
  post: Post;
  currentVariant: MediaVariant | undefined;
  getAspectText: (w?: number, h?: number) => string;
}

const PostModalSide = ({ post, currentVariant, getAspectText }: PostSidebarProps) => {
  const { t } = useTranslation('post');



  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{post.title}</h2>
        <p className="text-gray-600 font-medium">{t('detail.by')} {post.author.name}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-1">{t('fields.description')}</h3>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {post.description || 'Sin descripción.'}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('fields.tags')}</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag.id}
                id={tag.id}
                title={tag.name}
                checked={true}
                isDisable={true}
                onChange={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{t('fields.aspectRatio')}</h3>
          <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 text-center bg-transparent">
            {getAspectText(currentVariant?.width, currentVariant?.height)}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{t('fields.resolution')}</h3>
          <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 text-center bg-transparent">
            {currentVariant ? `${currentVariant.width} x ${currentVariant.height}` : '-'}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModalSide;
