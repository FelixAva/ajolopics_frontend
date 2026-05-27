import { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTranslation } from 'react-i18next';
import CarouselControls from './PostModalControls';
import type { AspectRatioType, Post } from '../types/post.types';
import usePostMutations from '../hooks/post.mutations';
import PostModalSide from './PostModalSide';
import Button from '@/components/ui/Button';

interface Props {
  post: Post | undefined;
  isLoading: boolean;
  isError: boolean;
}

const modalStyles = {
  landscape: {
    container: 'h-full w-full relative flex flex-col bg-background shadow-2xl overflow-hidden transition-all duration-500 ease-in-out sm:max-h-min sm:rounded-2xl sm:w-auto lg:max-w-[85%] lg:max-h-none lg:h-auto xl:max-w-[75%] xl:h-auto lg:flex-row',
    error: 'w-full h-full flex justify-center items-center text-remove-hover text-lg font-medium',
    media: 'bg-overlay relative flex items-center justify-center sm:flex-1',
    image: 'w-130 sm:h-75 sm:object-cover lg:h-110 lg:w-auto lg:object-fill xl:object-cover xl:h-auto xl:w-186 2xl:w-250',
    sidebar: 'px-6 flex flex-col lg:max-w-[40%] xl:max-w-[50%] 2xl:w-[29%]',
    sidebarContent: 'h-full py-4 flex flex-col justify-start gap-4 overflow-y-auto lg:py-4',
    download: 'py-2 sm:py-4',
  },
  vertical: {
    container: 'h-full w-full relative flex flex-col bg-background shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:w-auto md:h-auto md:max-w-[85%] md:max-h-[75%] md:rounded-2xl md:flex-row lg:max-h-[85%] 2xl:max-h-[80%]',
    error: 'w-full h-screen flex flex-col justify-center items-center text-remove-hover text-lg font-medium',
    media: 'max-h-[60%] relative flex items-center justify-center md:max-h-none',
    image: 'h-full sm:object-cover',
    sidebar: 'max-h-[40%] px-6 flex flex-col md:max-h-none md:w-80 lg:w-90',
    sidebarContent: 'h-full relative flex flex-col py-4 gap-4 overflow-y-auto sm:justify-start sm:gap-4',
    download: 'py-2 md:py-4',
  },
};

const PostModal = ({ post, isLoading, isError }: Props) => {
  const { t } = useTranslation('post');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (post && post.assets.length > 0) {
      setCurrentImageIndex((prev) => (prev === post.assets.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (post && post.assets.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? post.assets.length - 1 : prev - 1));
    }
  };

  const handleDownload = () => {
    if (!post || !originalVariant) return;

    downloadPost.mutate({
      post,
      variant: originalVariant,
    });
  };

  const getAspectType = (w?: number, h?: number): AspectRatioType => {
    if (w && h && w > h) return 'LANDSCAPE';
    if (w && h && w < h) return 'PORTRAIT';
    return 'SQUARE';
  };

  const currentAsset = post?.assets[currentImageIndex];
  const currentVariant = currentAsset?.variants.find((variant) => variant.variant === 'MEDIUM');
  const originalVariant = currentAsset?.variants.find((variant) => variant.variant === 'ORIGINAL');
  const isMultiple = post && post.assets.length > 1;

  const width = currentVariant?.width;
  const height = currentVariant?.height;
  const aspectType = getAspectType(width, height);
  const aspectLabel = width && height ? t(`aspectOptions.${aspectType.toLowerCase()}`) : '-';
  const resolutionLabel = originalVariant ? `${originalVariant.width} x ${originalVariant.height}` : '-';

  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;
  const { downloadPost } = usePostMutations();
  const styles = aspectType === 'LANDSCAPE' ? modalStyles.landscape : modalStyles.vertical;

  return (
    <div className="flex h-full w-full flex-col flex-1 items-center justify-center">
      <div
        className={styles.container}
        onClick={e => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <DynamicIcon name="loader-2" className="animate-spin text-primary" size={40} />
          </div>
        ) : isError || !post ? (
          <div className={styles.error}>
            Error al cargar la publicacion.
          </div>
        ) : (
          <>
            <div className={styles.media}>
              {currentVariant && (
                <img
                  src={currentVariant.url}
                  alt={post.title}
                  className={styles.image}
                />
              )}
              <CarouselControls
                currentImageIndex={currentImageIndex}
                assetLength={post?.assets.length}
                isShown={isMultiple}
                prevImage={prevImage}
                nextImage={nextImage}
              />
            </div>

            <div className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <PostModalSide
                  post={post}
                  aspectLabel={aspectLabel}
                  resolutionLabel={resolutionLabel}
                />
              </div>

              <div className={styles.download}>
                <Button
                  onClick={handleDownload}
                  icon={downloadPost.isPending ? 'loader-2' : 'download'}
                  title={isUserAuthenticated ? t('detail.download', 'Download') : t('detail.loginToDownload')}
                  disabled={!isUserAuthenticated || !originalVariant || downloadPost.isPending}
                  className="w-full"
                />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default PostModal;
