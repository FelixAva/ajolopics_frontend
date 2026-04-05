import { DynamicIcon } from 'lucide-react/dynamic';
import type { MediaVariant, Post } from '../types/post.types';
import type { ReactNode } from 'react';
import PostModalSide from './PostModalSide';
import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface Props {
  post: Post | undefined;
  currentVariant: MediaVariant | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  getAspectText: (w?: number, h?: number) => string;
  children: ReactNode;
}

const PostModalHorizontal = ({
  post,
  currentVariant,
  isLoading,
  isError,
  onClose,
  getAspectText,
  children
}: Props ) => {
  const { t } = useTranslation('post');
    const token = useAuthStore((state) => state.token);
    const isUserAuthenticated = !!token;
    // const originalVariant = post.assets[0]?.variants.find((variant) => variant.variant === 'ORIGINAL');

  return (
    <div
      className="h-full w-full relative flex flex-col bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out sm:max-h-min sm:rounded-2xl sm:w-auto lg:max-w-[85%] lg:max-h-none lg:h-auto xl:max-w-[75%] xl:h-auto lg:flex-row"
    >
      <Button
        onClick={onClose}
        variant='none'
        icon='x'
        className="absolute top-4 right-4 z-10 hover:text-black! bg-white/80 rounded-full! p-1!"
      />

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <DynamicIcon name="loader-2" className="animate-spin text-deep-teal" size={40} />
        </div>
      ) : isError || !post ? (
        <div className="w-full h-full flex justify-center items-center text-red-500 text-lg font-medium">
          Error al cargar la publicación.
        </div>
      ) : (
        <>
          {/* LADO IZQUIERDO: Visor de Imagen */}
          <div className="bg-gray-100 relative flex sm:flex-1 items-center justify-center">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                  className="w-130 sm:h-75 sm:object-cover lg:h-110 lg:w-auto lg:object-fill xl:object-cover xl:h-auto xl:w-186 2xl:w-250"
              />
            )}
            {children}
          </div>

          {/* LADO DERECHO: Slot mediante Composición */}
          <div className='px-6 flex flex-col lg:max-w-[40%] xl:max-w-[50%] 2xl:w-[29%]'>
            <div
              className="h-full py-4 flex flex-col justify-start gap-4 overflow-y-auto bg-white lg:py-4"
            >
              <PostModalSide
                post={post}
                currentVariant={currentVariant}
                getAspectText={getAspectText}
              />
            </div>
            <div className='py-2 sm:py-4'>
              <Button
                onClick={() => alert('download')}
                icon='download'
                title={isUserAuthenticated ? t('post:detail.download', 'Download') : t('post:detail.loginToDownload')}
                disabled={!isUserAuthenticated}
                className="w-full"
              />
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default PostModalHorizontal;
