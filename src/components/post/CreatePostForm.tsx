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
  const { t } = useTranslation(['post', 'components']);

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
  const { createPost } = usePost();
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
              return t('post:validation.minPhotos');
            } else if (value.length > 3) {
              return t('post:validation.maxPhotos')
            }
          }
        }}
        render={({ field }) => (
          <InputFile
            label={t('post:fields.photos')}
            accept="image/*"
            multiple
            error={errors.media?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        label={t('post:fields.title')}
        type='text'
        placeholder={t('post:fields.titlePlaceholder')}
        {...register('title', {
          required: t('components:validation.required', { field: t('post:fields.title') }),
          minLength: {
            value: 1,
            message: t('components:validation.minLength', { min: 1 })
          },
          maxLength: {
            value: 255,
            message: t('components:validation.maxLength', { max: 255 })
          },
        })}
        error={ errors.title?.message }
      />

      <InputArea
        label={t('post:fields.description')}
        placeholder={t('post:fields.descriptionPlaceholder')}
        {...register('description', {
          maxLength: {
            value: 5000,
            message: t('components:validation.maxLength', { max: 5000 })
          }
        })}
      />

      <Controller
        name='tags'
        control={control}
        rules={{
          validate: (value) => {
            if(value && value.length > 5) {
              return t('post:validation.maxTags');
            }
          }
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            label={t('post:fields.tags')}
            isMulti
            placeholder={t('post:fields.tagsPlaceholder')}
            options={tagOptions}
            value={field.value}
            onChange={field.onChange}
            isLoading={getTags.isLoading}
            isDisabled={getTags.isLoading || getTags.isError}
            error={ errors.tags?.message }
          />
        )}
      />

      {
        createPost.isError && (
          <span className='text-sm text-red-400 text-center'>{createPost.error.response?.data.message}</span>
        )
      }

      <div className="pt-2">
        <Button
          title={createPost.isPending ? t('post:create.submitting') : t('post:create.submit')}
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
