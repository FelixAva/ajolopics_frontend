import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { Button, Badge } from '../'; // Asumiendo que Badge también se exporta desde '../'
import type { MediaVariant, Post } from '../../features/post/post.types';

interface Props {
  post: Post | undefined;
  currentVariant: MediaVariant | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  getAspectText: (w?: number, h?: number) => string;
}

const HorizontalPostComponent = ({
  post,
  currentVariant,
  isLoading,
  isError,
  onClose,
  getAspectText
}: Props ) => {
  const { t } = useTranslation('post');

  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;

  return (
    <div
      className="h-full relative flex flex-col bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out sm:max-h-min sm:rounded-2xl lg:h-min lg:flex-row"
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
          <div className="bg-gray-100 relative flex items-center justify-center">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                className={`w-130 sm:h-75 lg:h-auto sm:object-cover lg:w-145 xl:w-186 2xl:w-250`}
              />
            )}
          </div>

          {/* LADO DERECHO: Detalles (Ancho restante, scroll interno si rebasa los 818px) */}
          <div
            className="h-full px-6 flex flex-col justify-evenly overflow-y-auto bg-white sm:py-4 sm:justify-start sm:gap-4 lg:w-90 lg:py-4 xl:p-8">

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
          </div>
        </>
      )}
    </div>
  );
};

export default HorizontalPostComponent;
