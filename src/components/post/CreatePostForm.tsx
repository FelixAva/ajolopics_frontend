import usePost from '../../features/post/usePost';
import useTag from '../../features/tag/useTag';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input, Button, SelectInput, InputFile, InputArea } from '../';
import type { ICreatePostFormInput } from '../../features/post/post.forms.types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface Props {
  onClose?: () => void;
}

const CreatePostForm = ({ onClose }: Props) => {
  const { t } = useTranslation('post');

  // Custom hooks
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreatePostFormInput>({
    defaultValues: {
      media: [],
      tags: [],
      title: '',
      description: ''
    }
  });
  const { createPost } = usePost({});
  const { getTags } = useTag();

  // Get tags query
  const tagOptions = useMemo(() => {
    return getTags.data?.map(tag => ({
     value: tag.id.toString(),
     label: tag.name
   })) || [];
  }, [getTags.data]);

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
              return t('createPostForm.filesInput.errors.minLength');
            } else if (value.length > 10) {
              return t('createPostForm.filesInput.errors.maxLength')
            }
          }
        }}
        render={({ field }) => (
          <InputFile
            label={t('createPostForm.filesInput.name')}
            accept="image/*"
            multiple
            error={errors.media?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        label={t('createPostForm.titleInput.name')}
        type='text'
        placeholder={t('createPostForm.titleInput.placeholder')}
        {...register('title', {
          required: t('createPostForm.titleInput.errors.required'),
          minLength: {
            value: 1,
            message: t('createPostForm.titleInput.errors.minLength')
          },
          maxLength: {
            value: 255,
            message: t('createPostForm.titleInput.errors.maxLength')
          },
        })}
        error={ errors.title?.message }
      />

      <InputArea
        label={t('createPostForm.descriptionInput.name')}
        placeholder={t('createPostForm.descriptionInput.placeholder')}
        {...register('description', {
          maxLength: {
            value: 5000,
            message: t('createPostForm.descriptionInput.errors.maxLength')
          }
        })}
      />

      <Controller
        name='tags'
        control={control}
        rules={{
          validate: (value) => {
            if(value && value.length > 5) {
              return t('createPostForm.tagsInput.errors.maxLength');
            }
          }
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            label={t('createPostForm.tagsInput.name')}
            isMulti
            placeholder={t('createPostForm.tagsInput.placeholder')}
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
          title={createPost.isPending ? t('createPostForm.submitButton.titleUploading') : t('createPostForm.submitButton.titleDefault')}
          type='submit'
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full bg-[#4A6E5A] hover:bg-[#3D5B4A] text-white disabled:opacity-50"
          isDisabled={createPost.isPending}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
