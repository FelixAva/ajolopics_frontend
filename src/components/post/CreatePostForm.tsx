import usePost from '../../features/post/usePost';
import useTag from '../../features/tag/useTag';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input, Button, SelectInput, InputFile, InputArea } from '../';
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
    formState: { errors, isValid },
  } = useForm<ICreatePostFormInput>({
    defaultValues: {
      media: [],
      tags: [],
      title: '',
      description: ''
    }
  });
  const { createPost } = usePost();
  const { getTags } = useTag();

  // Get tags query
  const tagOptions = getTags.data?.map(tag => ({
    value: tag.id.toString(),
    label: tag.name
  })) || [];

  const onSubmit: SubmitHandler<ICreatePostFormInput> = async(data) => {
    const tagIds = data.tags.map(tag => Number(tag.value));
    const rawFiles = data.media.map(f => f.file);

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
          validate: (value) =>{
            if (value.length === 0) {
              return 'You must upload at least one picture'
            } else if (value.length > 10) {
              return 'You can upload up to 10 pictures'
            }
          }
        }}
        render={({ field }) => (
          <InputFile
            label="Gallery Images"
            accept="image/*"
            multiple
            error={ errors.media?.message }
            value={field.value}
            onChange={field.onChange}
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
        rules={{
          validate: (value) => {
            if(value && value.length > 5) {
              return 'You can select up to 5 tags';
            }
          }
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            label='Tags'
            isMulti
            placeholder="Select tags..."
            options={tagOptions}
            value={field.value}
            onChange={field.onChange}
            isLoading={getTags.isLoading}
            isDisabled={getTags.isLoading || getTags.isError}
            error={ errors.tags?.message }
          />
        )}
      />


      <div className="pt-2">
        <Button
          title={createPost.isPending ? 'Uploading...' : 'Publish to Gallery'}
          type='submit'
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white disabled:opacity-50"
          isDisabled={createPost.isPending || !isValid}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
