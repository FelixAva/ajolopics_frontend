import { useState } from 'react';
import { Input, Badge, Button } from '../../';

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
            label='Search'
            placeholder='Title, author, tag...'
            type='text'
          />
        </div>

        <div>
          <p className='text-lg'>Tags</p>

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
            label='Aspect'
            type='text'
          />
          <Input
            label='Author'
            type='text'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <Button
          title='Clear Filters'
          icon='x'
          type='reset'
          action={() => setSelectedTags([])}
          variant='inverted'
        />
        <Button
          title='Search'
          icon='search'
          type='submit'
          action={() => setSelectedTags([])}
        />
      </div>
    </form>
  );
};

export default FiltersComponent;
