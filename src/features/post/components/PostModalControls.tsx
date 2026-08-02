import Button from "@/components/ui/Button";
import { DynamicIcon } from 'lucide-react/dynamic';

interface Props {
  currentImageIndex: number;
  assetLength?: number;
  isShown?: boolean;
  prevImage: () => void;
  nextImage: () => void;
}

const PostModalControls = ({
  currentImageIndex,
  assetLength,
  isShown,
  prevImage,
  nextImage,
}: Props) => {
  if (!isShown) return null;

  return (
    <>
      <Button
        variant='none'
        onClick={prevImage}
        aria-label='Previous image'
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80! hover:bg-card! text-heading-foreground! p-2! rounded-full! shadow-md"
      >
        <DynamicIcon name='chevron-left' size={22} />
      </Button>
      <Button
        variant='none'
        onClick={nextImage}
        aria-label='Next image'
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80! hover:bg-card! text-heading-foreground! p-2! rounded-full! shadow-md"
      >
        <DynamicIcon name='chevron-right' size={22} />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-overlay/50 text-overlay-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        {currentImageIndex + 1} / {assetLength}
      </div>
    </>
  )
}

export default PostModalControls;
