import { useState } from 'react';
import { Input, Badge, Button } from '..';
import { useTranslation } from 'react-i18next';

const filterTags = [
  {id: 1, title: 'Abstract'},
  {id: 2, title: 'B/W'},
  {id: 3, title: 'Nature'},
  {id: 4, title: 'B/W'},
  {id: 5, title: 'Nature'},
  {id: 6, title: 'B/W'},
  {id: 7, title: 'Nature'},
  {id: 8, title: 'B/W'},
  {id: 9, title: 'Nature'},
]

const FiltersComponent = () => {
  const { t } = useTranslation('post');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const toggleTag = (id: number) => {
    setSelectedTags(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  };

  return (
    <form className='flex flex-col flex-1 justify-between'>
      <div className='flex flex-col gap-5 text-left'>
        <div>
          <Input
            label={t('filtersPostForm.searchInput.name')}
            placeholder={t('filtersPostForm.searchInput.placeholder')}
            type='text'
          />
        </div>

        <div>
          <p className='text-lg'>{t('filtersPostForm.tagsInput.name')}</p>

          <div className='max-w-113.75 h-auto pt-1.5 flex flex-wrap gap-2'>
            {
              filterTags.map((tag: {id: number, title: string}) => (
                <Badge
                  key={tag.id}
                  id={tag.id}
                  title={tag.title}
                  checked={selectedTags.includes(tag.id)}
                  onChange={toggleTag}
                />
              ))
            }
          </div>
        </div>

        <div className='flex gap-3'>
          <Input
            label={t('filtersPostForm.aspectInput.name')}
            type='text'
          />
          <Input
            label={t('filtersPostForm.authorInput.name')}
            type='text'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <Button
          title={t('filtersPostForm.clearButton.titleDefault')}
          icon='x'
          type='reset'
          action={() => setSelectedTags([])}
          variant='inverted'
        />
        <Button
          title={t('filtersPostForm.submitButton.titleDefault')}
          icon='search'
          type='submit'
          action={() => setSelectedTags([])}
        />
      </div>
    </form>
  );
};

export default FiltersComponent;
