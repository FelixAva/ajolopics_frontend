import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from 'lucide-react/dynamic';
import clsx from 'clsx';

import Button from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface PostActionsProps {
  canDownload: boolean;
  isDownloading?: boolean;
  onDownload: () => void;
  onShare?: () => void;
  className?: string;
}

const tooltipStyles =
  'pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-56 -translate-x-1/2 rounded-lg bg-overlay px-3 py-2 text-center text-xs font-medium text-overlay-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100';

const PostActions = ({
  canDownload,
  isDownloading = false,
  onDownload,
  onShare,
  className,
}: PostActionsProps) => {
  const { t } = useTranslation('post');
  const isUserAuthenticated = useAuthStore((state) => !!state.token);
  const likeTooltipId = useId();
  const commentTooltipId = useId();
  const bookmarkTooltipId = useId();
  const downloadTooltipId = useId();
  const isDownloadDisabledBySession = !isUserAuthenticated;
  const isDownloadDisabled =
    isDownloadDisabledBySession || !canDownload || isDownloading;

  return (
    <div
      role="group"
      aria-label={t('detail.actions')}
      className={clsx('flex justify-between', className)}
    >
      <div className='flex items-center gap-4'>
        <div
          className="group relative inline-flex cursor-not-allowed"
          tabIndex={0}
          aria-describedby={likeTooltipId}
        >
          <Button
            variant="none"
            size="none"
            disabled
            aria-label={t('detail.like')}
            aria-describedby={likeTooltipId}
          >
            <DynamicIcon name="heart" size={30} />
          </Button>
          <span id={likeTooltipId} role="tooltip" className={tooltipStyles}>
            {t('detail.notAvailableYet')}
          </span>
        </div>

        <div
          className="group relative inline-flex cursor-not-allowed"
          tabIndex={0}
          aria-describedby={commentTooltipId}
        >
          <Button
            variant="none"
            size="none"
            disabled
            aria-label={t('detail.comment')}
            aria-describedby={commentTooltipId}
          >
            <DynamicIcon name="message-circle" size={30} />
          </Button>
          <span id={commentTooltipId} role="tooltip" className={tooltipStyles}>
            {t('detail.notAvailableYet')}
          </span>
        </div>

        <Button
          variant="none"
          size="none"
          onClick={onShare}
          aria-label={t('detail.share')}
        >
          <DynamicIcon name="share" size={30} />
        </Button>
      </div>

      <div className='flex items-center gap-4'>
        <div
          className="group relative inline-flex cursor-not-allowed"
          tabIndex={0}
          aria-describedby={bookmarkTooltipId}
        >
          <Button
            variant="none"
            size="none"
            disabled
            aria-label={t('detail.bookmark')}
            aria-describedby={bookmarkTooltipId}
          >
            <DynamicIcon name="bookmark" size={30} />
          </Button>
          <span id={bookmarkTooltipId} role="tooltip" className={tooltipStyles}>
            {t('detail.notAvailableYet')}
          </span>
        </div>

        <div
          className={clsx(
            'group relative inline-flex',
            isDownloadDisabledBySession && 'cursor-not-allowed',
          )}
          tabIndex={isDownloadDisabledBySession ? 0 : undefined}
          aria-describedby={
            isDownloadDisabledBySession ? downloadTooltipId : undefined
          }
        >
          <Button
            variant="none"
            size="none"
            onClick={onDownload}
            disabled={isDownloadDisabled}
            aria-label={t('detail.download')}
            aria-describedby={
              isDownloadDisabledBySession ? downloadTooltipId : undefined
            }
          >
            <DynamicIcon
              name={isDownloading ? 'loader-2' : 'download'}
              size={30}
              className={isDownloading ? 'animate-spin' : undefined}
            />
          </Button>

          {isDownloadDisabledBySession && (
            <span
              id={downloadTooltipId}
              role="tooltip"
              className={tooltipStyles}
            >
              {t('detail.loginToDownload')}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default PostActions;
