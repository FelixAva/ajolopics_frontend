import { useState } from 'react';
import usePost from '../../features/post/usePost';
import { Input, Button, Spinner } from '../';

export const CreatePostForm = () => { // ! Put this component into the modal
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<number[]>([]); // ! Complete Tags Form Input
  const { createPost } = usePost();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      alert('Debes seleccionar al menos una foto para la galería');
      return;
    }

    createPost.mutate({
      title,
      description,
      media: files,
      tags
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Title'
        placeholder='Summer sunsent 1987'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder='Description (optional)'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Change the UI to a Drop area */}
      <Input
        label='Drop your images'
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        required
      />

      {
        files.length > 0 && (
          <p>Files {files.length}</p>
        )
      }

      {
        createPost.isPending
        ? (
          <div className='self-center'>
            <Spinner />
          </div>
        )
        : (
          <Button
            title='Publish to Gallery'
            type='submit'
            icon='upload'
          />
        )
      }
    </form>
  )
};
