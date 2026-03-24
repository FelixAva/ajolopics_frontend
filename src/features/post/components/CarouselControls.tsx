import Button from "@/components/ui/Button";

interface Props {
  currentImageIndex: number;
  assetLength?: number;
  isShown?: boolean;
  prevImage: () => void;
  nextImage: () => void;
}

const ChangeImageComponent = ({
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
        icon='chevron-left'
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800! p-2! rounded-full! shadow-md"
      />
      <Button
        variant='none'
        icon='chevron-right'
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800! p-2! rounded-full! shadow-md"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        {currentImageIndex + 1} / {assetLength}
      </div>
    </>
  )
}

export default ChangeImageComponent;
