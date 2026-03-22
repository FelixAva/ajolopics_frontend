import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import usePost from '../hooks/usePost';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import HorizontalPostComponent from './PostHorizontalCard';
import ChangeImageComponent from './ChangeImageComponent';
import VerticalPostComponent from './PostVerticalCard';
import type { AspectRatioType } from '../types/post.types';

interface Props {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal = ({ postId, isOpen, onClose }: Props) => {
  const { t } = useTranslation('post');
  const { getSinglePost } = usePost(undefined, postId || undefined);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const { data: post, isLoading, isError } = getSinglePost;

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

  const currentAsset = post?.assets[currentImageIndex];
  const currentVariant = currentAsset?.variants[1];
  const isMultiple = post && post.assets.length > 1;

  const width = currentVariant?.width;
  const height = currentVariant?.height;

  let aspectType: AspectRatioType = 'SQUARE'; // Valor por defecto
  if (width && height) {
    if (width > height) aspectType = 'LANDSCAPE';
    else if (width < height) aspectType = 'PORTRAIT';
  }

  const getAspectText = (w?: number, h?: number) => {
    if (!w || !h) return '-';
    if (w > h) return t('aspectOptions.landscape');
    if (w < h) return t('aspectOptions.portrait');
    return t('filtersPostForm.aspectOptions.square');
  };

  const onModalClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex flex-col flex-1 items-center justify-center bg-black/70 backdrop-blur-md">

      {aspectType === 'LANDSCAPE' ? (
        <HorizontalPostComponent
          post={post}
          currentVariant={currentVariant}
          isLoading={isLoading}
          isError={isError}
          onClose={onModalClose}
          getAspectText={getAspectText}
        >
          <ChangeImageComponent
            currentImageIndex={currentImageIndex}
            assetLength={post?.assets.length}
            isShown={isMultiple}
            prevImage={prevImage}
            nextImage={nextImage}
          />
        </HorizontalPostComponent>
      ) : (
        <VerticalPostComponent
          post={post}
          currentVariant={currentVariant}
          isLoading={isLoading}
          isError={isError}
          onClose={onModalClose}
          getAspectText={getAspectText}
        >
          <ChangeImageComponent
            currentImageIndex={currentImageIndex}
            assetLength={post?.assets.length}
            isShown={isMultiple}
            prevImage={prevImage}
            nextImage={nextImage}
          />
        </VerticalPostComponent>
      )}

    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PostDetailModal;
