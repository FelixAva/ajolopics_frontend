import { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import usePostQueries from '@/features/post/hooks/post.queries';
import usePostMutations from '@/features/post/hooks/post.mutations';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import CarouselControls from '@/features/post/components/PostModalControls';
import PostModalSide from '@/features/post/components/PostModalSide';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams();
  const { t } = useTranslation('post');
  const navigate = useNavigate({ from: Route.fullPath });
  const { getSinglePost } = usePostQueries(undefined, postId);
  const { downloadPost } = usePostMutations();
  const token = useAuthStore((state) => state.token);
  const isUserAuthenticated = !!token;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
  const currentVariant = currentAsset?.variants.find((variant) => variant.variant === 'MEDIUM')
    || currentAsset?.variants.find((variant) => variant.variant === 'ORIGINAL')
    || currentAsset?.variants.find((variant) => variant.variant === 'THUMBNAIL');
  const originalVariant = currentAsset?.variants.find((variant) => variant.variant === 'ORIGINAL');
  const isMultiple = post && post.assets.length > 1;

  const getAspectText = (w?: number, h?: number) => {
    if (!w || !h) return '-';
    if (w > h) return t('aspectOptions.landscape');
    if (w < h) return t('aspectOptions.portrait');
    return t('aspectOptions.square');
  };

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleDownload = () => {
    if (!post || !originalVariant) return;

    downloadPost.mutate({
      post,
      variant: originalVariant,
    });
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center">
        <DynamicIcon name="loader-2" className="animate-spin text-deep-teal" size={40} />
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center">
        <div className="text-center text-lg font-medium text-red-500">
          Error al cargar la publicacion.
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div>
          <Button
            onClick={handleBack}
            variant="ghost"
            icon="arrow-left"
            aria-label="Back to feed"
            className="px-3!"
          />
        </div>

        <section className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="relative flex min-h-[55vh] items-center justify-center overflow-hidden rounded-lg bg-black shadow-xl lg:min-h-[calc(100vh-14rem)]">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                className="h-full max-h-[calc(100vh-14rem)] w-full object-contain"
              />
            )}

            {!currentVariant && (
              <div className="px-6 text-center text-sm font-medium text-white/80">
                -
              </div>
            )}

            <CarouselControls
              currentImageIndex={currentImageIndex}
              assetLength={post.assets.length}
              isShown={isMultiple}
              prevImage={prevImage}
              nextImage={nextImage}
            />
          </div>

          <aside className="flex flex-col rounded-lg border border-deep-teal-100 bg-beige-100/70 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]">
            <div className="flex flex-col gap-4 overflow-y-auto p-5">
              <PostModalSide
                post={post}
                currentVariant={currentVariant}
                getAspectText={getAspectText}
              />
            </div>

            <div className="border-t border-deep-teal-100 p-5">
              <Button
                onClick={handleDownload}
                icon={downloadPost.isPending ? 'loader-2' : 'download'}
                title={isUserAuthenticated ? t('detail.download', 'Download') : t('detail.loginToDownload')}
                disabled={!isUserAuthenticated || !originalVariant || downloadPost.isPending}
                className="w-full"
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
