import { DynamicIcon } from 'lucide-react/dynamic';
import type { MediaVariant, Post } from '../types/post.types';
import type { ReactNode } from 'react';
import PostModalSide from './PostModalSide'; // <-- Importamos nuestra pieza de Lego
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTranslation } from 'react-i18next';
import usePostMutations from '../hooks/post.mutations';

interface Props {
  post: Post | undefined;
  currentVariant: MediaVariant | undefined;
  originalVariant: MediaVariant | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  getAspectText: (w?: number, h?: number) => string;
  children: ReactNode;
}

const PostModalVertical = ({
  post,
  currentVariant,
  originalVariant,
  isLoading,
  isError,
  onClose,
  getAspectText,
  children
}: Props) => {
  const { t } = useTranslation('post');
  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;
  const { downloadPost } = usePostMutations();

  const handleDownload = () => {
    if (!post || !originalVariant) return;

    downloadPost.mutate({
      post,
      variant: originalVariant,
    });
  };

  return (
    <div
      className="h-full w-full relative flex flex-col bg-beige shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:w-auto md:h-auto md:max-w-[85%] md:max-h-[75%] md:rounded-2xl md:flex-row lg:max-h-[85%] 2xl:max-h-[80%]"
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
          <div className="max-h-[60%] relative flex items-center justify-center md:max-h-none">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                className="h-full sm:object-cover"
              />
            )}
            {children}
          </div>

          {/* LADO DERECHO: Slot mediante Composición */}
          <div className='max-h-[40%] px-6 flex flex-col md:max-h-none md:w-80 lg:w-90'>
            <div
              className="h-full relative flex flex-col py-4 gap-4 overflow-y-auto sm:justify-start sm:gap-4"
            >
              <PostModalSide
                post={post}
                currentVariant={currentVariant}
                getAspectText={getAspectText}
              />
            </div>

            <div className='py-2 md:py-4'>
              <Button
                onClick={handleDownload}
                icon={downloadPost.isPending ? 'loader-2' : 'download'}
                title={isUserAuthenticated ? t('post:detail.download', 'Download') : t('post:detail.loginToDownload')}
                disabled={!isUserAuthenticated || !originalVariant || downloadPost.isPending}
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
