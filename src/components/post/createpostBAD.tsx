import React, { useEffect, useRef, useState } from 'react';
import usePost from '../../features/post/usePost';
import { Input, Button, SelectInput } from '../';
import { DynamicIcon } from 'lucide-react/dynamic';

interface Props {
  onClose?: () => void;
}

interface FileWithPreview {
  file: File;
  preview: string;
}

const MOCK_TAGS = [
  { value: '1', label: 'Portrait' },
  { value: '2', label: 'Nature' },
  { value: '3', label: 'Wildlife' },
  { value: '4', label: 'Urban' },
  { value: '5', label: 'Architecture' },
];

const ASPECT_RATIO_OPTIONS = [
  { value: 'LANDSCAPE', label: 'Horizontal' },
  { value: 'PORTRAIT', label: 'Vertical' },
  { value: 'SQUARE', label: 'Square' },
];

export default function CreatePostForm({ onClose }: Props) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [aspectRatio, setAspectRatio] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { createPost } = usePost();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Ref to keep the latest files for the unmount cleanup
  const filesRef = useRef<FileWithPreview[]>([]);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // Helper that creates previews once when files are added
  const createFilePreviews = (incoming: File[]) => {
    return incoming.map(file => ({
      file,
      preview: URL.createObjectURL(file), // created once here
    }));
  };

  // 1) Añadir archivos desde input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const incoming = Array.from(e.target.files);
    const withPreview = createFilePreviews(incoming);

    setFiles(prev => [...prev, ...withPreview]);

    // Reset input so selecting the same file again triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 2) Añadir archivos desde drag & drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const incoming = Array.from(e.dataTransfer.files);
    const withPreview = createFilePreviews(incoming);

    setFiles(prev => [...prev, ...withPreview]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // 3) Remover un archivo: revocamos su preview inmediatamente
  const removeFile = (indexToRemove: number) => {
    setFiles(prev => {
      const fileToRemove = prev[indexToRemove];
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  // Delegación: click en miniatura para eliminar
  const handleThumbnailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const thumbnailItem = target.closest('[data-index]') as HTMLElement | null;

    if (thumbnailItem) {
      e.preventDefault();
      e.stopPropagation();

      const indexToRemove = Number(thumbnailItem.getAttribute('data-index'));
      if (!isNaN(indexToRemove)) removeFile(indexToRemove);
    }
  };

  // 4) Enviar formulario -> enviamos solo los File y limpiamos previews
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Debes seleccionar al menos una foto para la galería');
      return;
    }

    const mediaFiles = files.map(f => f.file);
    const tagIds = selectedTags.map(tag => Number(tag.value));

    createPost.mutate(
      {
        title,
        description,
        media: mediaFiles,
        tags: tagIds,
      },
      {
        onSuccess: () => {
          // revocamos todas las previews y limpiamos
          files.forEach(f => URL.revokeObjectURL(f.preview));
          setFiles([]);

          if (onClose) onClose();
        },
      }
    );
  };

  // 5) Limpieza final al desmontar: revocar cualquier preview restante
  useEffect(() => {
    return () => {
      filesRef.current.forEach(f => {
        try {
          URL.revokeObjectURL(f.preview);
        } catch (err) {
          // noop
        }
      });
      filesRef.current = [];
    };
  }, []);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="w-full">
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full min-h-40 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            isDragging
              ? 'border-deep-teal bg-deep-teal/10'
              : 'border-dusty-olive hover:bg-dusty-olive/5'
          }`}
        >
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-dusty-olive">
              <DynamicIcon name="upload" size={32} className={`mb-3 transition-transform ${isDragging ? 'scale-110 text-deep-teal' : ''}`} />
              <p className="text-lg font-medium">Drag and drop or click to upload</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full" onClick={handleThumbnailClick}>
                {files.map((fileObj, index) => (
                  <div
                    key={index}
                    data-index={index}
                    className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 shadow-sm cursor-pointer"
                    title="Click to remove"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(ev) => {
                      if (ev.key === 'Enter' || ev.key === ' ') removeFile(index);
                    }}
                  >
                    <img src={fileObj.preview} alt={`preview-${index}`} className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/40 flex items-center justify-center transition-all pointer-events-none">
                      <DynamicIcon name="trash-2" size={24} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm font-medium text-dusty-olive hover:text-deep-teal transition-colors">+ Click here to add more photos</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Input label="Title" placeholder="February Sunset.." value={title} onChange={e => setTitle(e.target.value)} required />

      <div className="w-auto flex flex-col text-left">
        <p className="text-lg">Description</p>
        <textarea
          placeholder="Share a message.."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700 min-h-20 resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput label="Tags" name="tags" isMulti options={MOCK_TAGS} value={selectedTags} onChange={(newValue) => setSelectedTags(newValue as any[])} placeholder="Select tags..." />

        <SelectInput label="Aspect Ratio" name="aspectRatio" options={ASPECT_RATIO_OPTIONS} value={aspectRatio} onChange={(newValue) => setAspectRatio(newValue)} placeholder="Horizontal" />
      </div>

      <div className="pt-2">
        <Button
          title={createPost.isPending ? 'Uploading...' : 'Publish to Gallery'}
          type="submit"
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white"
          action={() => {}}
        />
      </div>
    </form>
  );
}
