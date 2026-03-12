import { useState } from 'react';
import { createPortal } from 'react-dom';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslation } from 'react-i18next';
import usePost from '../../features/post/usePost';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { Button, Badge } from '../'; // Asumiendo que Badge también se exporta desde '../'

interface Props {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal = ({ postId, isOpen, onClose }: Props) => {
  const { t } = useTranslation('post');
  const { getSinglePost } = usePost(undefined, postId || undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;

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
  // Usamos el índice 0 de variants porque usualmente contiene la resolución original/más alta de ese asset
  const currentVariant = currentAsset?.variants[1];
  const isMultiple = post && post.assets.length > 1;

  const getAspectText = (w?: number, h?: number) => {
    if (!w || !h) return '-';
    if (w > h) return t('aspectOptions.landscape');
    if (w < h) return t('aspectOptions.portrait');
    return t('filtersPostForm.aspectOptions.square');
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex flex-col flex-1 items-center justify-center bg-black/70 backdrop-blur-md md:p-4">
      {/* Contenedor Principal: Transición suave de ancho y altura fija */}
      <div
        className="max-w-152 bg-white rounded-2xl h-full lg:max-w-none md:w-auto lg:max-h-198 gap-4 lg:gap-0 flex flex-col lg:flex-row shadow-2xl overflow-hidden relative transition-all duration-500 ease-in-out"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition-colors bg-white/80 rounded-full p-1"
        >
          <DynamicIcon name="x" size={24} />
        </button>

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
            <div className="max-h-[50%] md:h-auto md:max-h-none bg-[#F0F0F0] relative flex items-center justify-center">

              {currentVariant && (
                <img
                  src={currentVariant.url}
                  alt={post.title}
                  className="w-full h-full object-contain"
                />
              )}

              {isMultiple && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                  >
                    <DynamicIcon name="chevron-left" size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                  >
                    <DynamicIcon name="chevron-right" size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {post.assets.length}
                  </div>
                </>
              )}
            </div>

            {/* LADO DERECHO: Detalles (Ancho restante, scroll interno si rebasa los 818px) */}
            <div className="lg:w-120 h-full px-6 md:p-8 lg:px-4 flex flex-col gap-6 overflow-y-auto bg-white">

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

              {/* Implementación de Custom Badge */}
              {post.tags && post.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('fields.tags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        id={tag.id}
                        title={tag.name}
                        checked={true} // Siempre en true para que tome el estilo activo de deep-teal
                        isDisable={true} // Desactivado para que no se pueda interactuar
                        onChange={() => {}} // Función vacía
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

              {/* Implementación de Custom Button */}
              <Button
                action={() => alert('download')}
                icon='download'
                title={isUserAuthenticated ? t('post:detail.download', 'Download') : t('post:detail.loginToDownload')}
                isDisabled={!isUserAuthenticated} // Corrección lógica aquí
                className="w-full mt-2 disabled:opacity-50" // Usamos w-full a través del prop className
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PostDetailModal;
