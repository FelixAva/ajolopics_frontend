import { useMemo } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import usePostMutations from '@/features/post/hooks/post.mutations';
import useTag from '@/features/tag/hooks/useTag';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import InputSelect from '@/components/ui/InputSelect';
import InputFile from '@/components/ui/InputFile';
import InputArea from '@/components/ui/InputArea';
import type { ICreatePostFormInput } from '../types/post.forms.types';

interface Props {
  onClose?: () => void;
}

const CreatePostForm = ({ onClose }: Props) => {
  const { t } = useTranslation(['post', 'components']);

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
  const { createPost } = usePostMutations();
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
          <InputSelect
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
          <span className='text-sm text-error text-center'>{createPost.error.response?.data.message}</span>
        )
      }

      <div className="pt-2">
        <Button
          title={createPost.isPending ? t('post:create.submitting') : t('post:create.submit')}
          type='submit'
          icon={createPost.isPending ? 'loader-2' : 'upload'}
          className="w-full"
          disabled={createPost.isPending}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
