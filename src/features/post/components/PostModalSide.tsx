import { useTranslation } from 'react-i18next';

import Badge from '@/components/ui/Badge';
import type { Post } from '../types/post.types';

interface PostSidebarProps {
  post: Post;
  aspectLabel: string;
  resolutionLabel: string;
}

const PostModalSide = ({ post, aspectLabel, resolutionLabel }: PostSidebarProps) => {
  const { t } = useTranslation('post');

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">{post.title}</h2>
        <p className="text-supporting-foreground font-medium">{t('detail.by')} {post.author.name}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-subtle-foreground mb-1">{t('fields.description')}</h3>
        <p className="text-label text-sm leading-relaxed whitespace-pre-wrap">
          {post.description || 'Sin descripción.'}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-subtle-foreground mb-3">{t('fields.tags')}</h3>
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
          <h3 className="text-sm font-semibold text-subtle-foreground mb-1">{t('fields.aspectRatio')}</h3>
          <div className="w-full border border-disabled-border rounded-lg px-3 py-2 text-sm text-label text-center bg-transparent">
            {aspectLabel}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-subtle-foreground mb-1">{t('fields.resolution')}</h3>
          <div className="w-full border border-disabled-border rounded-lg px-3 py-2 text-sm text-label text-center bg-transparent">
            {resolutionLabel}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModalSide;
