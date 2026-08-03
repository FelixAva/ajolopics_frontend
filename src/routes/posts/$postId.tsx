import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';

import Button from '@/components/ui/Button';
import usePostMutations from '@/features/post/hooks/post.mutations';
import CarouselControls from '@/features/post/components/PostModalControls';
import PostModalSide from '@/features/post/components/PostModalSide';
import PostActions from '@/features/post/components/PostActions';
import SharePostModal from '@/features/post/components/SharePostModal';
import PostPageSkeleton from '@/features/post/components/skeletons/PostPageSkeleton';
import type { AspectRatioType } from '@/features/post/types/post.types';
import { singlePostQueryOptions } from '@/features/post/api/post.query-options';
import { getFallbackPostHead, getPostHead } from '@/features/post/utils/postSeo';

type PostSearch = {
  share?: boolean;
};

export const Route = createFileRoute('/posts/$postId')({
  validateSearch: (search: Record<string, unknown>): PostSearch => ({
    share: search.share === true || search.share === 'true' || undefined,
  }),
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    const post = await queryClient.ensureQueryData(singlePostQueryOptions(postId));
    return { post };
  },
  head: ({ loaderData, params: { postId } }) =>
    loaderData?.post ? getPostHead(loaderData.post) : getFallbackPostHead(postId),
  pendingComponent: PostPageSkeleton,
  pendingMs: 0,
  component: RouteComponent,
});

function RouteComponent() {
  const { post } = Route.useLoaderData();
  const { share } = Route.useSearch();
  const { t } = useTranslation('post');
  const navigate = useNavigate({ from: Route.fullPath });

  const { downloadPost } = usePostMutations();
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

  const currentAsset = post?.assets[currentImageIndex];
  const currentVariant = currentAsset?.variants.find((variant) => variant.variant === 'MEDIUM')
    || currentAsset?.variants.find((variant) => variant.variant === 'ORIGINAL')
    || currentAsset?.variants.find((variant) => variant.variant === 'THUMBNAIL');
  const originalVariant = currentAsset?.variants.find((variant) => variant.variant === 'ORIGINAL');
  const isMultiple = post && post.assets.length > 1;

  const getAspectType = (w?: number, h?: number): AspectRatioType => {
    if (w && h && w > h) return 'LANDSCAPE';
    if (w && h && w < h) return 'PORTRAIT';
    return 'SQUARE';
  };

  const width = currentVariant?.width;
  const height = currentVariant?.height;
  const aspectType = getAspectType(width, height);
  const aspectLabel = width && height ? t(`aspectOptions.${aspectType.toLowerCase()}`) : '-';
  const resolutionLabel = originalVariant ? `${originalVariant.width} x ${originalVariant.height}` : '-';

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

  const setShareSearch = (isOpen: boolean) => {
    navigate({
      search: (previous) => ({
        ...previous,
        share: isOpen || undefined,
      }),
      replace: isOpen,
    });
  };

  return (
    <main className="flex-1 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div>
          <Button
            onClick={handleBack}
            variant="ghost"
            aria-label="Back to feed"
            className="px-3!"
          >
            <DynamicIcon name='arrow-left' size={22} />
          </Button>
        </div>

        <section className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="relative flex min-h-[55vh] items-center justify-center overflow-hidden rounded-lg bg-overlay shadow-xl lg:min-h-[calc(100vh-14rem)]">
            {currentVariant && (
              <img
                src={currentVariant.url}
                alt={post.title}
                className="h-full max-h-[calc(100vh-14rem)] w-full object-contain"
              />
            )}

            {!currentVariant && (
              <div className="px-6 text-center text-sm font-medium text-overlay-foreground/80">
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

          <aside className="flex flex-col rounded-lg shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:justify-between">
            <div className="flex flex-col gap-4 overflow-y-auto p-5">
              <PostModalSide
                post={post}
                aspectLabel={aspectLabel}
                resolutionLabel={resolutionLabel}
              />
            </div>

            <div className="p-5">
              <PostActions
                canDownload={!!originalVariant}
                isDownloading={downloadPost.isPending}
                onDownload={handleDownload}
                onShare={() => setShareSearch(true)}
              />
            </div>
          </aside>
        </section>
      </div>

      {share && currentVariant && (
        <SharePostModal
          onClose={() => setShareSearch(false)}
          post={post}
          image={currentVariant}
        />
      )}
    </main>
  );
}
