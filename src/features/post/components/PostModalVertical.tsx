import { DynamicIcon } from 'lucide-react/dynamic';
import type { MediaVariant, Post } from '../types/post.types';
import type { ReactNode } from 'react';
import PostModalSide from './PostModalSide'; // <-- Importamos nuestra pieza de Lego
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTranslation } from 'react-i18next';

interface Props {
  post: Post | undefined;
  currentVariant: MediaVariant | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  getAspectText: (w?: number, h?: number) => string;
  children: ReactNode;
}

const PostModalVertical = ({
  post,
  currentVariant,
  isLoading,
  isError,
  onClose,
  getAspectText,
  children
}: Props) => {
  const { t } = useTranslation('post');
  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;
  // const originalVariant = post.assets[0]?.variants.find((variant) => variant.variant === 'ORIGINAL');

  return (
    <div
      className="h-full w-full relative flex flex-col md:w-auto md:h-auto bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:rounded-2xl md:flex-row"
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
        <div className="w-full h-screen flex flex-col justify-center items-center text-red-500 text-lg font-medium">
          Error al cargar la publicación.
        </div>
      ) : (
        <>
          {/* LADO IZQUIERDO: Contenedor específico para imágenes verticales */}
          <div className="max-h-[60%] md:max-h-none bg-gray-100 relative flex items-center justify-center">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                className="h-full sm:object-cover md:w-100 lg:w-110 2xl:w-120"
              />
            )}
            {children}
          </div>

          {/* LADO DERECHO: Slot mediante Composición */}
          <div className='max-h-[40%] md:max-h-none px-6 flex flex-col'>
            <div
              className="h-full relative flex flex-col py-4 gap-4 overflow-y-auto bg-white sm:py-4 sm:justify-start sm:gap-4 md:w-75 lg:w-90"
            >
              <PostModalSide
                post={post}
                currentVariant={currentVariant}
                getAspectText={getAspectText}
              />
            </div>

            <div className='py-2 md:py-4'>
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

export default PostModalVertical;
