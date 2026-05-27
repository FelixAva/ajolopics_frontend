import { createPortal } from 'react-dom';
import CreatePostForm from './CreatePostForm';
import { useTranslation } from 'react-i18next'
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import Button from '@/components/ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation('post');

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-surface-muted">
          <h2 className="text-2xl font-semibold text-foreground">{t('create.title')}</h2>
          <Button
            onClick={onClose}
            variant='none'
            icon='x'
            className="hover:text-overlay! p-0!"
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <CreatePostForm onClose={onClose} />
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body)
};

export default CreatePostModal;
