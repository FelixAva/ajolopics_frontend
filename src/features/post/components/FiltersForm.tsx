import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';

import { Route } from '@/routes/index';
import useTag from '@/features/tag/hooks/useTag.ts';
import useUser from '@/features/user/hooks/useUser.ts';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import InputSelect from '@/components/ui/InputSelect.tsx';
import type { IGetFeedFiltersFormInput } from '../types/post.forms.types.ts';
import type { User } from '@/features/user/types/user.types.ts';

interface Props {
  onClose?: () => void;
}

const FiltersForm = ({ onClose }: Props) => {
  // Importamos 'post' para etiquetas/placeholders y 'components' para errores
  const { t } = useTranslation(['post', 'components']);
  const navigate = useNavigate({ from: Route.fullPath });


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IGetFeedFiltersFormInput>({
    defaultValues: {
      search: undefined,
      tags: undefined,
      aspectRatio: undefined,
      authors: undefined
    }
  });

  const { getTags } = useTag();
  const { getUsers } = useUser();

  const aspectRatioOptions = [
    { value: "LANDSCAPE", label: t('post:aspectOptions.landscape') },
    { value: "PORTRAIT", label: t('post:aspectOptions.portrait') },
    { value: "SQUARE", label: t('post:aspectOptions.square') }
  ];

  const tagOptions = getTags.data?.map(tag => ({
    value: tag.id.toString(),
    label: tag.name,
  })) || []; // Repeat it with authors

  const creatorOptions = getUsers.data?.map((user: User) => ({
    value: user.id,
    label: user.name
  })) || [];

  const onSubmit: SubmitHandler<IGetFeedFiltersFormInput> = async(data) => {

    const tagsString = data.tags?.length ?  data.tags.map(tag => tag.value).join(','): undefined;
    const authorsString = data.authors?.length ? data.authors.map(author => author.value).join(',') : undefined;
    const aspectString = data.aspectRatio ? data.aspectRatio.value : undefined;
    const searchString = data.search ? data.search : undefined;

    navigate({
      search: (prev) => ({
        ...prev,
        tags: tagsString,
        authors: authorsString,
        aspectRatio: aspectString,
        search: searchString,
      })
    });

    if (onClose) {
      onClose();
    }
  };

  const handleClear = () => {
    reset();

    navigate({
      search: (prev) => ({
        ...prev,
        tags: undefined,
        authors: undefined,
        aspectRatio: undefined,
        search: undefined
      })
    })
  };

  return (
    <form
      className='flex flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={t('post:fields.search')}
        type='text'
        placeholder={t('post:fields.searchPlaceholder')}
        {...register('search', {
          maxLength: {
            value: 255,
            message: t('components:validation.maxLength', { max: 255 })
          }
        })}
        error={ errors.search?.message }
      />

      <Controller
        name='tags'
        control={control}
        rules={{
          validate: (value) => {
            if(value && value.length > 10) {
              // Si tienes esta validación en el viejo JSON, puedes crearla en components.json
              // o reusar un texto. Asumiremos que tienes algo similar a maxTags pero genérico
              return t('components:validation.maxLength', { max: 10 });
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

      <Controller
        name='authors'
        control={control}
        rules={{
          validate: (value) => {
            if(value && value.length > 5) {
              return t('components:validation.maxLength', { max: 5 });
            }
          }
        }}
        render={({ field }) => (
          <InputSelect
            {...field}
            label={t('post:fields.author')}
            isMulti
            placeholder={t('post:fields.authorPlaceholder')}
            options={creatorOptions}
            value={field.value}
            onChange={field.onChange}
            isLoading={getUsers.isLoading}
            isDisabled={getUsers.isLoading || getUsers.isError}
            error={ errors.authors?.message }
          />
        )}
      />

      <Controller
        name='aspectRatio'
        control={control}
        render={({ field }) => (
          <InputSelect
            {...field}
            label={t('post:fields.aspectRatio')}
            placeholder={t('post:fields.aspectRatio')}
            options={aspectRatioOptions}
            value={field.value}
            onChange={field.onChange}
            error={ errors.aspectRatio?.message }
          />
        )}
      />

      <div className='flex flex-col gap-2.5'>
        <Button
          title={t('post:filters.clear')}
          icon='x'
          onClick={handleClear}
          variant='outline'
        />
        <Button
          title={t('post:filters.submit')}
          icon='search'
          type='submit'
        />
      </div>
    </form>
  );
};

export default FiltersForm;
