import { useMutation } from '@tanstack/react-query';
import { PostService } from './post.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types'
import type { PaginatedResponseDTO } from '../../types/api.paginated.response.types';
import type { Post } from './post.types';
import type { CreatePostRequestDTO } from './api.post.types';

const usePost = () => {
  const createPost = useMutation<PaginatedResponseDTO<Post>, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      alert('Post created successfully');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return { createPost };
};

export default usePost;
