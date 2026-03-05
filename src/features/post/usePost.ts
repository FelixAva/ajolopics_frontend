import { useMutation } from '@tanstack/react-query';
import { PostService } from './post.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types'
import type { PaginatedResponseDTO } from '../../types/api.paginated.response.types';
import type { Post } from './post.types';
import type { CreatePostRequestDTO, GetFeedRequestDTO } from './api.post.types';

const usePost = () => {
  const createPost = useMutation<Post, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      alert('Post created successfully');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const getPostFeed = useMutation<PaginatedResponseDTO<Post>, AxiosError<ErrorDTO>, GetFeedRequestDTO>({
    mutationKey: ['feed'],
    mutationFn: (data: GetFeedRequestDTO) => PostService.getFeed(data),
  });

  return {
    createPost,
    getPostFeed
  };
};

export default usePost;
