import { forwardRef, useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { imageCompressor } from '..';
import type { InputHTMLAttributes, ChangeEvent, DragEvent, MouseEvent } from 'react';
import type { FileWithPreview } from '../../features/post/types/post.types';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  value: FileWithPreview[];
  onChange: (files: FileWithPreview[]) => void;
}

const InputFile = forwardRef<HTMLInputElement, Props>(function InputFile(
  { label, error, className, value = [], onChange, ...rest },
  ref
) {
  const { t } = useTranslation('components');

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = async (newFiles: File[]) => {
    setIsProcessing(true);
    try {
      const processed = await Promise.all(
        newFiles.map(async (file) => {
          const previewUrl = await imageCompressor(file);
          return { file, previewUrl };
        })
      );
      // Emitimos el nuevo valor al componente padre
      onChange([...value, ...processed]);
    } catch (error) {
      console.error(t('fileUpload.processError'), error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await processFiles(Array.from(e.target.files));
      e.target.value = ''; // Reseteamos el input interno
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleThumbnailClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const thumbnailItem = target.closest('[data-index]');

    if (thumbnailItem) {
      e.preventDefault();
      e.stopPropagation(); // Evita que el clic abra el explorador de archivos
      const indexToRemove = Number(thumbnailItem.getAttribute('data-index'));
      // Emitimos el arreglo filtrado al padre
      onChange(value.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <div className={`w-full flex flex-col text-left select-none ${className ?? ''}`}>
      {label && <p className='text-lg mb-1'>{label}</p>}

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full min-h-40 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          isDragging ? 'border-deep-teal bg-deep-teal/10' :
          isProcessing ? 'border-gray-300 bg-gray-50 cursor-not-allowed' :
          'border-dusty-olive hover:bg-dusty-olive/5'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-6 text-dusty-olive">
            <DynamicIcon name="loader-2" size={32} className="mb-3 animate-spin text-deep-teal" />
            <p className="text-lg font-medium">Processing images...</p>
          </div>
        ) : value.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-dusty-olive">
            <DynamicIcon name="upload" size={32} className={`mb-3 transition-transform ${isDragging ? 'scale-110 text-deep-teal' : ''}`} />
            <p className="text-lg font-medium">{t('fileUpload.placeholder')}</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full" onClick={handleThumbnailClick}>
              {value.map((fileObj, index) => (
                <div
                  key={index}
                  data-index={index}
                  className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 shadow-sm cursor-pointer bg-gray-100"
                  title={t('fileUpload.remove')}
                >
                  <img src={fileObj.previewUrl} alt={`preview-${index}`} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/40 flex items-center justify-center transition-all pointer-events-none">
                    <DynamicIcon name="trash-2" size={24} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-dusty-olive hover:text-deep-teal transition-colors">{t('fileUpload.addMore')}</p>
          </div>
        )}

        <input
          ref={ref}
          type="file"
          className="hidden"
          disabled={isProcessing}
          onChange={handleFileChange}
          {...rest}
        />
      </label>

      {error && <span className='text-sm text-red-400 mt-1'>{error}</span>}
    </div>
  );
});

export default InputFile;
