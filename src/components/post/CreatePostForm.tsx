import { useState } from 'react';
import usePost from '../../features/post/usePost';
import useTag from '../../features/tag/useTag';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input, Button, SelectInput, InputFile, InputArea } from '../';
import type { FileWithPreview } from '../../features/post/post.types';
import type { ICreatePostFormInput } from '../../features/post/form.createPost.types';

interface Props {
  onClose?: () => void;
}

const CreatePostForm = ({ onClose }: Props) => {
  // Custom hooks
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ICreatePostFormInput>();
  const { createPost } = usePost();
  const { getTags } = useTag();

  // React hooks
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  // Get tags query
  const tagOptions = getTags.data?.map(tag => ({
    value: tag.id.toString(),
    label: tag.name
  })) || [];

  const onSubmit: SubmitHandler<ICreatePostFormInput> = async(data) => {
    if (files.length === 0) {
      alert('Debes seleccionar al menos una foto para la galería');
      return;
    }

    const tagIds = selectedTags.map(tag => Number(tag.value));
    const rawFiles = files.map(f => f.file);

    const newData = {
      ...data, // Title and description
      media: rawFiles,
      tags: tagIds
    }

    createPost.mutate(newData, {
      onSuccess: () => {
        if (onClose) onClose();
      }
    });
  };

  return (
    <form
      className='flex flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='media'
        control={control}
        rules={{
          maxLength: {
            value: 10,
            message: 'Limit of pictures 10'
          }
        }}
        render={({ field }) => (
          <InputFile
            {...field}
            label="Gallery Images"
            accept="image/*"
            multiple
            error={ errors.media?.message }
            value={files}
            onChange={setFiles}
          />
        )}
      />

      <Input
        label='Title'
        type='text'
        placeholder='Miami sunset...'
        {...register('title', {
          required: 'The title is required',
          minLength: {
            value: 1,
            message: 'The min length is of 1'
          },
          maxLength: {
            value: 255,
            message: 'The max length is of 255'
          },
        })}
        error={ errors.title?.message }
      />

      <InputArea
        label='Description'
        placeholder='What did inspired you...'
        {...register('description', {
          maxLength: {
            value: 5000,
            message: 'The max length is 5000'
          }
        })}
      />

      <Controller
        name='tags'
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            label='Tags'
            isMulti
            placeholder="Select tags..."
            options={tagOptions}
            value={selectedTags}
            onChange={(newValue) => setSelectedTags(newValue as any[])}
            isLoading={getTags.isLoading}
            isDisabled={getTags.isLoading || getTags.isError}
          />
        )}
      />


      <div className="pt-2">
        <Button
          title={createPost.isPending ? 'Uploading...' : 'Publish to Gallery'}
          type='submit'
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
