import type { ReactNode } from 'react';
import Button from './Button';

interface ModalOverlayProps {
  children: ReactNode;
  title?: ReactNode;
  maxWidth?: string;
  showHeader?: boolean;
  onClose: () => void;
}

const ModalOverlay = ({
  children,
  title,
  maxWidth,
  showHeader = true,
  onClose
}: ModalOverlayProps) => {
  const widthClass = maxWidth ?? '';

  if (!showHeader) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col flex-1 items-center justify-center bg-black/70 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={onClose}
          aria-label="Close modal"
        />

        <div
          className={`relative z-10 flex h-full w-full items-center justify-center ${widthClass}`}
          onClick={onClose}
        >
          <Button
            onClick={onClose}
            variant='none'
            icon='x'
            aria-label='Close'
            className="absolute top-4 right-4 z-20 hover:text-black! bg-white/80 rounded-full! p-1!"
          />

          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col flex-1 items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        className={`relative bg-white rounded-xl shadow-xl w-full ${widthClass} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          <Button
            onClick={onClose}
            variant='none'
            icon='x'
            aria-label='Close'
            className="hover:text-black! bg-white/80 rounded-full! p-1!"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
