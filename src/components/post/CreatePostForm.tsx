import { useState } from 'react';
import usePost from '../../features/post/usePost';
import useTag from '../../features/tag/useTag';
import { Input, Button, SelectInput, InputFile } from '../';
import type { FileWithPreview } from '../../features/post/post.types';

interface Props {
  onClose?: () => void;
}

const ASPECT_RATIO_OPTIONS = [
  { value: 'LANDSCAPE', label: 'Horizontal' },
  { value: 'PORTRAIT', label: 'Vertical' },
  { value: 'SQUARE', label: 'Square' },
];

const CreatePostForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  // El estado de los archivos se mantiene aquí para poder enviarlo
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [aspectRatio, setAspectRatio] = useState<any>(null);

  const { createPost } = usePost();
  const { getTags } = useTag();

  const tagOptions = getTags.data?.map(tag => ({
    value: tag.id.toString(),
    label: tag.name
  })) || [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      alert('Debes seleccionar al menos una foto para la galería');
      return;
    }

    const tagIds = selectedTags.map(tag => Number(tag.value));
    const rawFiles = files.map(f => f.file); // Extraemos los archivos reales

    createPost.mutate({
      title,
      description,
      media: rawFiles,
      tags: tagIds,
    }, {
      onSuccess: () => {
        if (onClose) onClose();
      }
    });
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

      {/* MAGIA: Toda la complejidad se redujo a esta línea */}
      <InputFile
        label="Gallery Images"
        value={files}
        onChange={setFiles}
        accept="image/*"
        multiple
      />

      <Input
        label='Title'
        placeholder='February Sunset..'
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <div className='w-auto flex flex-col text-left'>
        <p className='text-lg'>Description</p>
        <textarea
          placeholder='Share a message..'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full border border-dusty-olive rounded-lg px-2.5 py-1.5 focus:outline-dusty-olive-700 min-h-20 resize-y'
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          label='Tags'
          name="tags"
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={(newValue) => setSelectedTags(newValue as any[])}
          placeholder="Select tags..."
          isLoading={getTags.isLoading}
          isDisabled={getTags.isLoading || getTags.isError}
        />

        <SelectInput
          label='Aspect Ratio'
          name="aspectRatio"
          options={ASPECT_RATIO_OPTIONS}
          value={aspectRatio}
          onChange={(newValue) => setAspectRatio(newValue)}
          placeholder="Horizontal"
        />
      </div>

      <div className="pt-2">
        <Button
          title={createPost.isPending ? 'Uploading...' : 'Publish to Gallery'}
          type='submit'
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white disabled:opacity-50"
          action={() => {}}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
