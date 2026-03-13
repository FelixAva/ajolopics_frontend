// PostSidebar.tsx
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { Button, Badge } from '../';
import type { MediaVariant, Post } from '../../features/post/post.types';

interface PostSidebarProps {
  post: Post;
  currentVariant: MediaVariant | undefined;
  getAspectText: (w?: number, h?: number) => string;
}

const PostSidebar = ({ post, currentVariant, getAspectText }: PostSidebarProps) => {
  const { t } = useTranslation('post');
  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;

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

      <Button
        action={() => alert('download')}
        icon='download'
        title={isUserAuthenticated ? t('post:detail.download', 'Download') : t('post:detail.loginToDownload')}
        isDisabled={!isUserAuthenticated}
        className="w-full mt-2 disabled:opacity-50"
      />
    </>
  );
};

export default PostSidebar;
