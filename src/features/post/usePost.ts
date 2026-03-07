import { useMutation, useQuery } from '@tanstack/react-query';
import { PostService } from './post.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types'
import type { PaginatedResponseDTO } from '../../types/api.paginated.response.types';
import type { Post } from './post.types';
import type { CreatePostRequestDTO, GetFeedRequestDTO } from './post.api.types';
import { queryClient } from '../../lib/queryClient';

const usePost = (feedBodyParameters: GetFeedRequestDTO) => {
  const createPost = useMutation<Post, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      alert('Post created successfully');
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const getPostFeed = useQuery<PaginatedResponseDTO<Post>, AxiosError<ErrorDTO>>({
    queryKey: ['feed', feedBodyParameters],
    queryFn: () => PostService.getFeed(feedBodyParameters),
  });

  return {
    createPost,
    getPostFeed
  };
};

export default usePost;
