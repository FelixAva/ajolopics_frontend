import useTag from '../../features/tag/useTag.ts';
import useUser from '../../features/user/useUser.ts';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input, Button, SelectInput } from '..';
import { useTranslation } from 'react-i18next';
import type { IGetFeedFiltersFormInput } from '../../features/post/post.forms.types.ts';
import type { User } from '../../features/user/user.types.ts';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '../../routes/index';

interface Props {
  onClose?: () => void;
}

const FiltersForm = ({ onClose }: Props) => {
  const { t } = useTranslation('post');
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
    { value: "LANDSCAPE", label: t('filtersPostForm.aspectOptions.landscape') },
    { value: "PORTRAIT", label: t('filtersPostForm.aspectOptions.portrait') },
    { value: "SQUARE", label: t('filtersPostForm.aspectOptions.square') }
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
        label={t('filtersPostForm.searchInput.name')}
        type='text'
        placeholder={t('filtersPostForm.searchInput.placeholder')}
        {...register('search', {
          maxLength: {
            value: 255,
            message: t('filtersPostForm.searchInput.errors.maxLength')
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
              return t('filtersPostForm.tagsInput.errors.maxLength');
            }
          }
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            label={t('filtersPostForm.tagsInput.name')}
            isMulti
            placeholder={t('filtersPostForm.tagsInput.placeholder')}
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
              return t('filtersPostForm.authorInput.errors.maxLength');
            }
          }
        }}
        render={({ field }) => (
          <SelectInput
            {...field}
            label={t('filtersPostForm.authorInput.name')}
            isMulti
            placeholder={t('filtersPostForm.authorInput.placeholder')}
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
          <SelectInput
            {...field}
            label={t('filtersPostForm.aspectInput.name')}
            placeholder={t('filtersPostForm.aspectInput.placeholder')}
            options={aspectRatioOptions}
            value={field.value}
            onChange={field.onChange}
            error={ errors.aspectRatio?.message }
          />
        )}
      />

      <div className='flex flex-col gap-2.5'>
        <Button
          title={t('filtersPostForm.clearButton.titleDefault')}
          icon='x'
          type='button'
          action={handleClear}
          variant='inverted'
        />
        <Button
          title={t('filtersPostForm.submitButton.titleDefault')}
          icon='search'
          type='submit'
        />
      </div>
    </form>
  );
};

export default FiltersForm;
