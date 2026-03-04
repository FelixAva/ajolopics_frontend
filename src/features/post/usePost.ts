import { useMutation } from '@tanstack/react-query';
import { PostService } from './post.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types'
import type {
  CreatePostDTO,
} from './api.post.types'
import type { PaginatedResponseDTO } from '../../types/api.paginated.response.types';
import type { Post } from './post.types';

const usePost = () => {
  const createPost = useMutation<PaginatedResponseDTO<Post>, AxiosError<ErrorDTO>, CreatePostDTO>({
    mutationFn: (data: CreatePostDTO) => PostService.createPost(data),
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
