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
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        className={`relative bg-white rounded-xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {!showHeader && (
          <Button
            onClick={onClose}
            variant='none'
            icon='x'
            aria-label='Close'
            className="absolute top-4 right-4 z-10 hover:text-black! bg-white/80 rounded-full! p-1!"
          />
        )}

        {showHeader && (
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
        )}

        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
