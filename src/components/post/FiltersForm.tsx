import usePost from '../../features/post/usePost.ts';
import useTag from '../../features/tag/useTag.ts';
import useUser from '../../features/user/useUser.ts';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input, Button, SelectInput } from '..';
import { useTranslation } from 'react-i18next';
import type { IGetFeedFiltersFormInput } from '../../features/post/post.forms.types.ts';
import type { User } from '../../features/user/user.types.ts';

interface Props {
  onClose?: () => void;
}

const FiltersComponent = ({ onClose }: Props) => {
  const { t } = useTranslation('post');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IGetFeedFiltersFormInput>({
    defaultValues: {
      search: null,
      tags: null,
      aspectRatio: null,
      authors: null
    }
  });

  const { getPostFeed } = usePost();
  const { getTags } = useTag();
  const { getUser } = useUser();

  const aspectRatioOptions = [
  { value: "SQUARE", label: "SQUARE" }, // El value es para el backend, el label para el usuario
  { value: "LANDSCAPE", label: "LANDSCAPE" },
  { value: "PORTRAIT", label: "PORTRAIT" },
  ];

  const tagOptions = getTags.data?.map(tag => ({
    value: tag.id.toString(),
    label: tag.name,
  })) || []; // Repeat it with authors

  const userList = getUser.data?.filter((user: User) => user.role === "ADMIN");

  const creatorOptions = userList?.map((user: User) => ({
    value: user.id,
    label: user.name
  })) || [];

  const onSubmit: SubmitHandler<IGetFeedFiltersFormInput> = async(data) => {
    const tagIds = data.tags ?  data.tags.map(tag => Number(tag.value)): null;
    const aspect = data.aspectRatio ? [data.aspectRatio.value] : null;
    const author = data.authors ? data.authors.map(author => author.value) : null;

    const dataFormat = {
      page: 1,
      size: 20,
      filters: {
        tagIds: tagIds,
        aspectRatio: aspect,
        authorIds: author
      }
    };

    getPostFeed.mutate(dataFormat);
  }

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
            isLoading={getUser.isLoading}
            isDisabled={getUser.isLoading || getUser.isError}
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
          type='reset'
          action={() => console.log('hola')}
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

export default FiltersComponent;
